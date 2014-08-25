module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    
    concurrent: {
        front: ['uglify:front','sass:front'],
        admin: ['uglify:admin','sass:admin']
    },
    
    // https://github.com/gruntjs/grunt-contrib-sass
    // For development env its set to expanded
    sass: {
      front: {
        options:{
          style: 'expanded', // nested, compact, compressed, expanded
          compass: true
        },
        files:{
          'app/style.min.css': 'app/scss/main.scss'
        }
      },
      admin: {
        options:{
          style: 'expanded', // nested, compact, compressed, expanded
          compass: true
        },
        files:{
          'app-admin/admin.min.css': 'app-admin/scss/main.scss'
        }
      }
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['**/*.html','app/style.min.css','app/app.min.js','app-admin/admin.css','app-admin/admin.min.js'],
      },
      jsFront:{
        files: [
            'app/main.js',
            'app/controllers/*.js',
            'app/directives/*.js',
            'app/filters/*.js',
            'app/services/*.js',
            'app/views/*.js'],
        tasks: ['uglify:front']
      },
      jsAdmin:{
        files: [
            'app-admin/main.js',
            'app-admin/controllers/*.js',
            'app-admin/directives/*.js',
            'app-admin/services/*.js',
            'app-admin/views/*.js'],
        tasks: ['uglify:admin']
      },
      sassFront: {
        files: 'app/scss/*.scss',
        tasks: ['sass:front']
      },
      sassAdmin: {
        files: 'app-admin/scss/*.scss',
        tasks: ['sass:admin']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false,
        beautify: true
      },
      front: {
        src: [
            'app/main.js',
            'app/controllers/*.js',
            'app/directives/*.js',
            'app/filters/*.js',
            'app/services/*.js',
            'app/views/*.js'],
        dest: 'app/app.min.js'
      },
      admin: {
        src: [
            'app-admin/main.js',
            'app-admin/controllers/*.js',
            'app-admin/directives/*.js',
            'app-admin/services/*.js',
            'app-admin/views/*.js'],
        dest: 'app-admin/admin.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // @todo Maybe add grunt-ng-annotate or next project
  // for build perfromance and best practices just using long hand notations
  // https://www.npmjs.org/package/grunt-ng-annotate


  // Default task(s).
  grunt.registerTask('default', ['concurrent:front', 'concurrent:admin', 'watch']);
};