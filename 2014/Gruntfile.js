module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

    // when this task is run, lint the Gruntfile and all js files in src
      build: ['Grunfile.js', 'js/custom.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/custom.min.js': 'js/custom.js'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/custom.min.css': 'css/custom.css'
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
          dest: 'dist/images/'
        }]
      }
    },

    watch: {
      css: {
        files: [
          'css/custom.css'
        ],
        tasks: ['cssmin']
      },
      js: {
        files: [
          'js/custom.js'
        ],
        tasks: ['jshint','uglify']
      },
      images: {
        files: [
          'images/*'
        ],
        tasks: ['imagemin']
      }
    }

  });

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'imagemin']);
  grunt.registerTask('dev', ['watch']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

};
