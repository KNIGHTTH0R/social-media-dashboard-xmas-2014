module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    smdc: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= smdc.app %>/js/{,*/}*.js'],
        tasks: ['jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= smdc.app %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= smdc.app %>/{,*/}*.html',
          '<%= smdc.app %>/sass/{,*/}*.css',
          '<%= smdc.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              // connect.static('.tmp'),
              // connect().use(
              //   '/bower_components',
              //   connect.static('./bower_components')
              // ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= smdc.dist %>'
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= smdc.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= smdc.app %>/sass/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= smdc.app %>/js/{,*/}*.js'
        ]
      }
    },

    //copy development files to dist to make a distribution version
    copy: {
      build: {
        cwd: '<%= smdc.app %>',
        src: [
          'sass/*.css',
          'views/{,*/}*.html',
          'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '*.html'
        ],
        dest: '<%= smdc.dist %>',
        expand: true
      },
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= smdc.dist %>/{,*/}*',
            '!<%= smdc.dist %>/.git{,*/}*'
          ]
        }]
      },
      build: {
        src: [ 
          'dist/js/{,*/}*.js',
          '!dist/js/main.min.js',
          '!dist/js/vendor.min.js',
          'dist/sass/{,*/}*',
          '!dist/sass/style.css'
        ]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dev: {
        expand: true,
        cwd: '<%= smdc.app %>/sass',
        src: [ '**/*.css' ],
        dest: '<%= smdc.app %>/sass'
      },
      build: {
        expand: true,
        cwd: '<%= smdc.dist %>/sass',
        src: [ '**/*.css' ],
        dest: '<%= smdc.dist %>/sass'
      }
      // dist: {
      //   files: [{
      //     expand: true,
      //     cwd: '.tmp/sass/',
      //     src: '{,*/}*.css',
      //     dest: '.tmp/sass/'
      //   }]
      // }
    },

    'sails-linker': {
      defaultOptions: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: 'app/'
        },
        files: {
          // Target-specific file lists and/or options go here.
          'app/index.html': ['app/js/**/*.js']
        },
      },
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= smdc.app %>/index.html',
      options: {
        dest: '<%= smdc.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= smdc.dist %>/{,*/}*.html'],
      css: ['<%= smdc.dist %>/sass/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= smdc.dist %>','<%= smdc.dist %>/images']
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested

    // OLD Compass
    //  compass: {
    //   options: {
    //     sassDir: '<%= smdc.app %>/sass',
    //     cssDir: '.tmp/sass',
    //     generatedImagesDir: '.tmp/images/generated',
    //     imagesDir: '<%= smdc.app %>/images',
    //     javascriptsDir: '<%= smdc.app %>/js',
    //     fontsDir: '<%= smdc.app %>../font',
    //     importPath: './bower_components',
    //     httpImagesPath: '/images',
    //     httpGeneratedImagesPath: '/images/generated',
    //     httpFontsPath: '../font',
    //     relativeAssets: false,
    //     assetCacheBuster: false,
    //     raw: 'Sass::Script::Number.precision = 10\n'
    //   },
    //   dist: {
    //     options: {
    //       generatedImagesDir: '<%= smdc.dist %>/images/generated'
    //     }
    //   },
    //   server: {
    //     options: {
    //       debugInfo: true
    //     }
    //   }
    // },

    // new compass
    compass: {
      server: {
        options: {
          sassDir: '<%= smdc.app %>/sass',
          cssDir: '<%= smdc.app %>/sass'
        }
      }
    },

    //run bower install
    bower: {
      options: {
        targetDir: 'bower_components'
      },
      install: {}
    },

    // minify js files
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
            'dist/js/vendor.min.js': ['dist/js/vendor.js'],
            'dist/js/main.min.js': ['dist/js/main.js']
        }
      }
    },

    // concat js files into library and custom js file
    concat: {
      options: {
        separator: ';',
      },
      libraries: {
        src: ['./bower_components/{,*/}*.js', '!./bower_components/{,*/}*min.js'],
        dest: 'dist/js/vendor.js',
      },
      customJS: {
        src: ['<%= smdc.app %>/js/{,*/}*.js' ],
        dest: 'dist/js/main.js',
      },
    },

    //create build html file
    processhtml: {
        build: {
            files: {
                'dist/index.html' : ['<%= smdc.app %>/index.html']
            }
        }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'bower',
      'npm-install',
      'wiredep',
      'sails-linker',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'bower',
    'npm-install',
    'wiredep',
    'sails-linker',
    'copy',
    'useminPrepare',
    'autoprefixer:build',
    'concat',
    'uglify',
    'processhtml',
    'usemin',
    'clean:build'
    
  ]);

  grunt.registerTask('default', ['jshint']);

};