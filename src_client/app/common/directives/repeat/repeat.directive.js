
/**
 * @desc RepeatDirective directive
 * @example <repeat></repeat>
 */

'use strict';

import template from './repeat.html';

var NG_REMOVED = '$$NG_REMOVED';


var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
    // TODO(perf): generate setters to shave off ~40ms or 1-1.5%
    scope[valueIdentifier] = value;
    if (keyIdentifier) scope[keyIdentifier] = key;
    scope.$index = index;
    scope.$first = (index === 0);
    scope.$last = (index === (arrayLength - 1));
    scope.$middle = !(scope.$first || scope.$last);
    // jshint bitwise: false
    scope.$odd = !(scope.$even = (index&1) === 0);
    // jshint bitwise: true
};

class RepeatDirective {
    constructor(template) {
        this.restrict = 'A';
        //this.scope = {};
        //this.controller = 'SearchController';
        //this.controllerAs = 'searchCtrl';
        //this.bindToController = {};
        //this.replace = true;
        this.priority = 1000;
        this.terminal = true;
        this.transclude = 'element';
        //this.template = template;

        this.compile = function repeatCompile($element, $attr) {
            var expression = $attr.repeat;
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            // match[0] =  "result in searchCtrl.searchResults"
            // lhs = "result"
            // rhs = "searchCtrl.searchResults"

            console.log('$attr in compile',$attr);
            var lhs = match[1];
            var rhs = match[2];

            var valueIdentifier = match[1];
            var keyIdentifier = match[2];

            var trackByIdArrayFn = function(key, value) {
                return hashKey(value);
            };

            return function repeatLink($scope, $element, $attr, ctrl, $transclude) {
                var lastBlockMap = {};

                // maybe compare ng-bind value with lastBlockMap property content

                //console.log('$scope', $scope);
                //console.log('$attr',$attr);
                //console.log('$scope', $scope);
                //console.log('rhs', rhs);

                var objectsForRemoval = [];
                var objectsForAppending = [];

                $scope.$watchCollection(rhs, function repeatAction(collection, previousCollection) {
                    var length;
                    var key;
                    var block;
                    var value;
                    var index;
                    var nextBlockMap = {};
                    if (!collection){
                        return;
                    }

                    var collectionKeys = collection;
                    var trackByIdFn = trackByIdArrayFn;

                    var collectionLength = collectionKeys.length;
                    var nextBlockOrder = new Array(collectionLength);

                    // locate existing items
                    //for (index = 0; index < collectionLength; index++) {
                    //    key = (collection === collectionKeys) ? index : collectionKeys[index];
                    //    value = collection[key];
                    //    var trackById = trackByIdFn(key, value, index);
                    //    if (lastBlockMap[trackById]) {
                    //        // found previously seen block
                    //        var block = lastBlockMap[trackById];
                    //        delete lastBlockMap[trackById];
                    //        //nextBlockMap[trackById] = block;
                    //        //nextBlockOrder[index] = block;
                    //    } else {
                    //        // new never before seen block
                    //        //nextBlockOrder[index] = {id: trackById, scope: undefined, clone: undefined};
                    //        //nextBlockMap[trackById] = true;
                    //    }
                    //}

                    //console.log('collection', collection);
                    objectsForRemoval = [];
                    objectsForAppending = [];

                    if (previousCollection && previousCollection.length > 0){
                        for (var i = collectionLength - 1; i >= 0; i--){
                            //console.log('angular.equals(previousCollection[i], collection[i])', angular.equals(previousCollection[i], collection[i]))
                            //console.log('previousCollection[i]', previousCollection[i]);
                            //console.log('collection[i]', collection[i]);
                            var found = false;
                            for (var j = previousCollection.length - 1; j >= 0; j--){

                                // id property hardcoded
                                if (collection[i]['id'] === previousCollection[j]['id']){
                                    found = true;
                                    previousCollection.splice(j, 1);
                                    break;
                                }
                                //if (j == 0){
                                //    objectsForRemoval.push(collection[i]);
                                //}
                            }
                            if (!found){
                                objectsForAppending.push(collection[i]);
                            }

                        }
                    } else {
                        //objectsForRemoval = [];
                        objectsForAppending = collection;
                    }
                    //console.log('objectsForRemoval', objectsForRemoval);

                    console.log('previousCollection', previousCollection);
                    console.log('objectsForAppending', objectsForAppending);

                    console.log('lastBlockMap', lastBlockMap);

                    //item1.isEqualNode(item2)
                    // remove leftover items
                    for (var blockKey in lastBlockMap) {

                        block = lastBlockMap[blockKey];
                        var remove = false;
                        if (previousCollection.length){
                            for (var i = 0; i < previousCollection.length; i++){
                                if (!block.scope){
                                    delete lastBlockMap[blockKey];
                                    remove = false;
                                    break;
                                }
                                if (block.scope[lhs]['id'] == previousCollection[i]['id']){
                                    //previousCollection.splice(i, 1);
                                    remove = true;
                                    break;
                                }
                            }
                        }
                        if (remove) {
                            console.log('remove block',  block);
                            //console.log('block.clone[0] in destroy', block.clone[0]);
                            //console.log('block.scope[lhs]', block.scope[lhs]);
                            var elementsToRemove = getBlockNodes(block.clone);
                            elementsToRemove.remove();
                            if (elementsToRemove[0].parentNode) {
                                // if the element was not removed yet because of pending animation, mark it as deleted
                                // so that we can ignore it later
                                for (index = 0, length = elementsToRemove.length; index < length; index++) {
                                    elementsToRemove[index][NG_REMOVED] = true;
                                }
                            }
                            block.scope.$destroy();
                        }
                    }

                    for (index = 0; index < objectsForAppending.length; index++) {
                        key = (collection === collectionKeys) ? index : collectionKeys[index];
                        value = objectsForAppending[key];
                        block = objectsForAppending[key];
                        //block = nextBlockOrder[index];

                        $transclude(function repeatTransclude(clone, scope) {

                            console.log('scope', scope);

                            block.scope = scope;

                            $element.parent().append(clone[0]);

                            //document.body.appendChild(clone[0])

                            // Note: We only need the first/last node of the cloned nodes.
                            // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                            // by a directive with templateUrl when its template arrives.
                            block.clone = clone;
                            lastBlockMap[block.id] = block;
                            updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                        });

                    }
                    //lastBlockMap = nextBlockMap;
                    //console.log('lastBlockMap', lastBlockMap);
                });
            }

        };

        //this.compile = function(tElement, tAttrs) {
        //    var parentElement = tElement.parent();
        //    return function(scope, element, attrs, ctrl, transclude) {
        //        transclude(scope.$new(), function(clone) {
        //            parentElement.append(clone);
        //        });
        //        transclude(scope.$new(), function(clone) {
        //            parentElement.append(clone);
        //        });
        //        transclude(scope.$new(), function(clone) {
        //            parentElement.append(clone);
        //        });
        //    };
        //};


        //this.link = {
        //    post: function(scope, element, attrs, ctrl, transclude) {
        //        transclude(scope.$new(),function(clone, scope) {
        //            element.append(clone);
        //        });
        //        transclude(scope.$new(),function(clone, scope) {
        //            element.append(clone);
        //        });
        //        transclude(scope.$new(),function(clone, scope) {
        //            element.append(clone);
        //        });
        //    }
        //};
        //
        //this.controller = function(){
        //    this.data = [0,1,2,3,4,5];
        //};
    }

    static directiveFactory() {
        return new RepeatDirective(template);
    }
}

/**
 * Return the DOM siblings between the first and last node in the given array.
 * @param {Array} array like object
 * @returns {Array} the inputted object or a jqLite collection containing the nodes
 */
function getBlockNodes(nodes) {
    // TODO(perf): update `nodes` instead of creating a new object?
    var node = nodes[0];
    var endNode = nodes[nodes.length - 1];
    var blockNodes;

    for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
        if (blockNodes || nodes[i] !== node) {
            if (!blockNodes) {
                blockNodes = angular.element(Array.prototype.slice.call(nodes, 0, i));
            }
            blockNodes.push(node);
        }
    }

    return blockNodes || nodes;
}

var uid  = 0;

/**
 * A consistent way of creating unique IDs in angular.
 *
 * Using simple numbers allows us to generate 28.6 million unique ids per second for 10 years before
 * we hit number precision issues in JavaScript.
 *
 * Math.pow(2,53) / 60 / 60 / 24 / 365 / 10 = 28.6M
 *
 * @returns {number} an unique alpha-numeric string
 */
function nextUid() {
    return ++uid;
}

/**
 * Computes a hash of an 'obj'.
 * Hash of a:
 *  string is string
 *  number is number as string
 *  object is either result of calling $$hashKey function on the object or uniquely generated id,
 *         that is also assigned to the $$hashKey property of the object.
 *
 * @param obj
 * @returns {string} hash string such that the same input will have the same hash string.
 *         The resulting string key is in 'type:hashKey' format.
 */
function hashKey(obj, nextUidFn) {
    var key = obj && obj.$$hashKey;

    if (key) {
        if (typeof key === 'function') {
            key = obj.$$hashKey();
        }
        return key;
    }

    var objType = typeof obj;
    if (objType == 'function' || (objType == 'object' && obj !== null)) {
        key = obj.$$hashKey = objType + ':' + (nextUidFn || nextUid)();
    } else {
        key = objType + ':' + obj;
    }

    return key;
}

export default RepeatDirective.directiveFactory;


