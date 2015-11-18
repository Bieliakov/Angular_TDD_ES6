
/**
 * @desc RepeatDirective directive
 * @example <repeat></repeat>
 */

'use strict';

import template from './repeat.html';

class RepeatDirective {
    constructor(template) {
        this.restrict = 'A';
        this.scope = {};
        //this.controller = 'SearchController';
        //this.controllerAs = 'searchCtrl';
        //this.bindToController = {};
        //this.replace = true;
        this.template = template;

        this.controller = ['$scope', function($scope) {
            var vm = this;

            vm.array = [0,1,2,3,4,5,6];

        }];
    }

    static directiveFactory() {
        return new RepeatDirective(template);
    }
}

export default RepeatDirective.directiveFactory;


