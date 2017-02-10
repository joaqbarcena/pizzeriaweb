//var imagemin = require('imagemin-mozjpeg');

//initialize grunt tasks

module.exports = function(grunt){
    grunt.initConfig({
        
        uglify : {
            build : {
                files : {
                    'Views/UserView/build/js/app.min.js' : ['Views/UserView/js/*.js',
                                                            '!Views/UserView/js/materialize.js',
                                                            '!Views/UserView/js/*.min.js'],
                    
                    'Views/AdminView/build/js/app.min.js' : ['Views/AdminView/js/*.js',
                                                            '!Views/AdminView/js/materialize.js',
                                                            '!Views/AdminView/js/*.min.js']
                }
            }
        },
        
        cssmin : {
            build : {
                files : {
                    'Views/UserView/build/css/override.min.css' : ['Views/UserView/css/*.css','!Views/UserView/css/materialize.css'],
                    'Views/AdminView/build/css/override.min.css' : ['Views/AdminView/css/*.css','!Views/AdminView/css/materialize.css']
                }
            }
        },
        
        imagemin : {
            static : {
                options : {
                    optimizationLevel : 7,
//                    use : [imagemin()]
                },
                files : {
                    'Views/UserView/build/images/wall.jpg' : 'Views/UserView/images/wall.jpg'
                }
            }
        },
        
        processhtml : {
            dist : {
                files : {
                    'Views/UserView/build/index.html' :['Views/UserView/index.html'],
                    'Views/AdminView/build/index.html' :['Views/AdminView/index.html']
                }
            }
        },
        
        watch : {
            
            css : {
                files : ['Views/UserView/css/*.css'],
                tasks : ['cssmin']
            },
            js : {
                files : ['Views/UserView/js/*.js'],
                tasks : ['uglify']
            },
            jpeg : {
                files : ['Views/UserView/images/*.jpg'],
                tasks : ['imagemin']
            },
            html : {
                files : ['Views/UserView/*.html'],
                tasks : ['processhtml']
            }
            
        },
        
        nodemon : {
            dev : {
                script : "server.js"
            }
        },
        
        concurrent : {
            options : {
                logConcurrentOutput : true,
            },
            tasks : ['nodemon' , 'watch']
        }
        
    });
    
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
    
  grunt.registerTask('default',['uglify','cssmin','imagemin','processhtml','nodemon','concurrent']);
};


//"imagemin-mozjpeg" : "latest"