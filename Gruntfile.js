module.exports = function(grunt){
	grunt.initConfig({
		watch: {
			files: ["app/**/*.js", "test/**/*.js", "Gruntfile.js"],
			tasks: ['test']
		},
		mochaTest: {
			test: {
				options:{
					reporter: 'spec'
				},
				src: ["test/**/*.js"]
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-mocha-test')

	grunt.registerTask('default', ['watch'])
	grunt.registerTask('test', ['mochaTest'])
}