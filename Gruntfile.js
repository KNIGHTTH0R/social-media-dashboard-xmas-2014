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
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= smdc.app %>/{,*/}*.html',
          '.tmp/sass/{,*/}*.css',
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
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
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

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= smdc.dist %>/{,*/}*',
            '!<%= smdc.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/sass/',
          src: '{,*/}*.css',
          dest: '.tmp/sass/'
        }]
      }
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
    compass: {
      options: {
        sassDir: '<%= smdc.app %>/sass',
        cssDir: '.tmp/sass',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= smdc.app %>/images',
        javascriptsDir: '<%= smdc.app %>/js',
        fontsDir: '<%= smdc.app %>../font',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '../font',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= smdc.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    //run bower install
    bower: {
      install: {}
    },

    // minify js files
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
            'dist/build.min.js': ['dist/*.js'],
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
        dest: 'dist/lib.js',
      },
      customJS: {
        src: ['<%= smdc.app %>/js/{,*/}*.js' ],
        dest: 'dist/main.js',
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
      'clean:server',
      'bower',
      'npm-install',
      'wiredep',
      'sails-linker',
      'autoprefixer',
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
    'useminPrepare',
    'autoprefixer',
    'concat',
    'uglify',
    'processhtml',
    'usemin'
    
  ]);

  grunt.registerTask('default', ['jshint']);

};