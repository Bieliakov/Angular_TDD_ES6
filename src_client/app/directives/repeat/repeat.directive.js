
/**
 * @desc RepeatDirective directive
 * @example <repeat></repeat>
 */

'use strict';

//import './search.scss';
import template from './repeat.html';

class RepeatDirective {
    constructor(template) {
        this.restrict = 'EA';
        this.scope = {};
        //this.controller = 'SearchController';
        //this.controllerAs = 'searchCtrl';
        //this.bindToController = {};
        //this.replace = true;
        this.template = template;
    }

    static directiveFactory() {
        return new RepeatDirective(template);
    }
}

export default RepeatDirective.directiveFactory;