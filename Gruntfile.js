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
    smdb: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= smdb.app %>/js/{,*/}*.js'],
        tasks: ['jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= smdb.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= smdb.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= smdb.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
          base: '<%= smdb.dist %>'
        }
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
          '<%= smdb.app %>/js/{,*/}*.js'
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
            '<%= smdb.dist %>/{,*/}*',
            '!<%= smdb.dist %>/.git{,*/}*'
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
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= smdb.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= smdb.app %>/images',
        javascriptsDir: '<%= smdb.app %>/js',
        fontsDir: '<%= smdb.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= smdb.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // minify js files
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'autoprefixer',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['jshint']);

};