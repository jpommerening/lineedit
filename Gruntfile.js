module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      dist: {
        options: {
          name: '<%= pkg.name %>',
          baseUrl: '.',
          out: 'dist/<%= pkg.name %>.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          paths: {
            'input': 'input-jquery'
          },
          map: {
            '*': { 'jquery': 'jquery-private' },
            'jquery-private': { 'jquery': 'jquery' }
          },
          include: [
            'binding',
            'input',
            'events',
            'move',
            'edit',
            'history',
            'kill',
            'completion'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);

};
