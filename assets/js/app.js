/*global angular*/
// Init App
var myApp = angular.module('myApp', [
	// Call Libaries
	'ui.bootstrap',
	// Call Modules
	'myApp.configs',
	'myApp.controllers',
	'myApp.factories',
	'myApp.filters',
	'myApp.services',
]);

// Run App
myApp.run(function () {
	
});

// Init modules
angular.module('myApp.configs', []);
angular.module('myApp.controllers', []);
angular.module('myApp.factories', []);
angular.module('myApp.filters', []);
angular.module('myApp.services', []);