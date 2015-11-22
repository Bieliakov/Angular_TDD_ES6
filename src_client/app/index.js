import angular from 'angular';
import './modules/search/search.module.js';

import 'normalize.css';
import '../styles/main.scss';

import './common/directives/repeat/repeat.module.js';
import './common/directives/angularRepeat/angularRepeat.module.js';

angular.module('github', ['github.search', 'repeat', 'angularRepeat']);

angular.bootstrap(document, ['github']);


