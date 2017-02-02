//var imagemin = require('imagemin-mozjpeg');

//initialize grunt tasks

module.exports = function(grunt){
    grunt.initConfig({
        
        uglify : {
            build : {
                files : {
                    'Views/UserView/build/js/app.min.js' : ['Views/UserView/js/*.js','!Views/UserView/js/materialize.js']
                }
            }
        },
        
        cssmin : {
            build : {
                files : {
                    'Views/UserView/build/css/override.min.css' : ['Views/UserView/css/*.css','!Views/UserView/css/materialize.css']
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
        
        htmlbuild : {
            dist : {
                src  : 'Views/UserView/index.html',
                dest : 'Views/UserView/build/',
                options :{
                    scripts :{
                        appmin         : 'js/app.min.js',
                        materializemin : 'js/materialize.min.js' 
                    },
                    styles : {
                        cssmin : [
                            'css/materialize.min.css',
                            'css/override.min.css'
                        ]
                    }   
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
                tasks : ['htmlbuild']
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
  grunt.loadNpmTasks('grunt-html-build');
    
  grunt.registerTask('default',['uglify','cssmin','imagemin','htmlbuild','nodemon','concurrent']);
};


//"imagemin-mozjpeg" : "latest"