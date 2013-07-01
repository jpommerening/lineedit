module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      dist: {
        options: {
          name: '<%= pkg.name %>',
          baseUrl: '.',
          out: 'dist/<%= pkg.name %>-jquery.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          paths: {
            'input': 'input-jquery'
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);

};
