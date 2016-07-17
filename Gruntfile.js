module.exports = function(grunt) {
	grunt.initConfig({
		concat	: {
			options: {
				stripBanners: true,
				separator	: '\n\n',
			},
			main : {
				src	: ['assets/js/app.js'],
				dest: 'assets/build/app.js'
			},
			configs : {
				src	: ['assets/js/configs/*.js'],
				dest: 'assets/build/configs.js'
			},
			controllers : {
				src	: ['assets/js/controllers/*.js'],
				dest: 'assets/build/controllers.js'
			},
			factories : {
				src	: ['assets/js/factories/*.js'],
				dest: 'assets/build/factories.js'
			},
			filters : {
				src	: ['assets/js/filters/*.js'],
				dest: 'assets/build/filters.js'
			},
			services : {
				src	: ['assets/js/services/*.js'],
				dest: 'assets/build/services.js'
			}
		},
		jshint	: {
			options: {
				sub	: true
			},
			build		: ['assets/build/*.js'],
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat', 'jshint']);
};