'use strict';

import '../mainSearch.css';

export default class MainSearch {
    constructor(){
        this.elem = document.createElement('div');
        this.elem.className = 'search';
        this.elem.innerHTML = 'abrakadabra';
    }
}