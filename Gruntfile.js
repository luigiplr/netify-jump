var path = require('path');
var execFile = require('child_process').execFile;
var packagejson = require('./package.json');
var electron = require('electron-prebuilt');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var target = grunt.option('target') || 'development';

    var BASENAME = 'Netify Jump';
    var arch = grunt.option('arch') ? grunt.option('arch') : process.arch;



    console.log(' ');
    console.log('Compiling For:', (process.platform === 'win32') ? 'Windows' : 'Mac', arch);
    console.log(' ');


    grunt.initConfig({
        electron: {
            windows: {
                options: {
                    name: BASENAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packagejson.optionalDependencies['electron-prebuilt'],
                    platform: 'win32',
                    arch: arch,
                    prune: true,
                    asar: false
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['package.json', 'index.html'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*'],
                    dest: 'build/images/'
                }, {
                    expand: true,
                    cwd: 'fonts/',
                    src: ['**/*'],
                    dest: 'build/fonts/'
                }, {
                    cwd: 'node_modules/',
                    src: Object.keys(packagejson.dependencies).map(function(dep) {
                        return dep + '/**/*';
                    }),
                    dest: 'build/node_modules/',
                    expand: true
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['package.json', 'index.html'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*'],
                    dest: 'build/images/'
                }, {
                    expand: true,
                    cwd: 'fonts/',
                    src: ['**/*'],
                    dest: 'build/fonts/'
                }, {
                    cwd: 'node_modules/',
                    src: Object.keys(packagejson.dependencies).map(function(dep) {
                        return dep + '/**/*';
                    }),
                    dest: 'build/node_modules/',
                    expand: true
                }]
            },
            releaseWin: {
                files: [{
                    expand: true,
                    cwd: 'util/images/',
                    src: ['icon.ico', 'icon.png'],
                    dest: 'dist/<%= BASENAME %>-win32-ia32/resources/'
                }]
            }
        },
        sass: {
            options: {
                outputStyle: 'compressed',
                sourceMapEmbed: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'styles/src/main.scss',
                    'build/css/vender.css': 'styles/vender/**/*.css'
                }
            }
        },
        babel: {
            options: {
                sourceMap: 'inline',
                plugins: ['transform-minify-booleans', 'transform-property-literals', 'transform-simplify-comparison-operators', 'transform-merge-sibling-variables'],
                presets: ['es2015', 'react'],
                compact: true,
                comments: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/js'
                }]
            }
        },
        shell: {
            electron: {
                command: electron + ' . ' + (grunt.option('dev') ? '--dev' : ''),
                options: {
                    async: true,
                    execOptions: {
                        cwd: 'build'
                    }
                }
            }
        },
        clean: {
            unusedWin: ['dist/' + BASENAME + '-win32-' + arch + '/resources/default_app'],
            release: ['build/', 'dist/'],
        },
        compress: {
            windows: {
                options: {
                    archive: './dist/' + BASENAME + '-' + packagejson.version + '-Windows-' + arch + '.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './dist/' + BASENAME + '-win32-' + arch,
                    src: '**/*'
                }]
            }
        },
        watchChokidar: {
            options: {
                spawn: true
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['build/**/*']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['newer:babel']
            },
            sass: {
                files: ['styles/**/*.scss'],
                tasks: ['sass']
            },
            copy: {
                files: ['images/*', 'index.html', 'fonts/*'],
                tasks: ['newer:copy:dev']
            }
        }
    });

    grunt.registerTask('default', ['newer:babel', 'sass', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);

    grunt.registerTask('run', ['newer:babel', 'shell:electron', 'watchChokidar']);


    if (process.platform === 'win32') {
        grunt.registerTask('release', ['clean:release', 'babel', 'sass', 'copy:release', 'electron:windows', 'clean:unusedWin', 'copy:releaseWin', 'compress:windows']);
    }

    process.on('SIGINT', function() {
        grunt.task.run(['shell:electron:kill']);
        process.exit(1);
    });
};