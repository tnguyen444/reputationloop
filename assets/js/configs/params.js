/*global angular*/
angular.module('myApp.configs').factory('appParams', function() {
	return {
		API		: {
			url	: 'http://www.t-nguyen.com/reviews/api',//'http://test.localfeedbackloop.com/api',
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
