
/**
 * @desc SearchDirective directive
 * @example <github-search></github-search>
 */

'use strict';

import './search.scss';
import template from './search.html';

class SearchDirective {
    constructor(template) {
        this.restrict = 'EA';
        this.scope = {};
        this.controller = 'SearchController';
        this.controllerAs = 'searchCtrl';
        this.bindToController = {};
        this.replace = true;
        this.template = template;
    }

    static directiveFactory() {
        return new SearchDirective(template);
    }
}

export default SearchDirective.directiveFactory;