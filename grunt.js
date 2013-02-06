module.exports = function(grunt) {

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.initConfig({
        clean:{
            apps:"apps"
        }
    });

    grunt.registerTask("default","tiger");
};