import angular from 'angular';
import './search/search.module.js';
import './directives/index.js';

import 'normalize.css';
import '../styles/main.scss';

angular.module('github', ['github.search', 'directives']);

angular.bootstrap(document, ['github']);

//import MainSearch from './search';

//let search = new MainSearch();
//console.log('search', search);
//document.body.appendChild(search.elem);


