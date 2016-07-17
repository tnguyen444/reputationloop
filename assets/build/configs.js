angular.module('myApp.configs').factory('appParams', function() {
	return {
		API		: {
			url	: 'http://local.test.com/workspace/api',//'http://test.localfeedbackloop.com/api',
			key	: '61067f81f8cf7e4a1f673cd230216112'
		},
		REVIEW	: {
			limit	: 0
		},
		GOOGLE	: {
			key	: 'AIzaSyC1AmaAkqvxYejTl9WpwrpjBcQ1gki5jos'
		}
	};
});

angular.module('myApp.configs').config(function () {
	
});