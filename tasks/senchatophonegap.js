var prompt = require('prompt'),
    path = require('path'),
    sys = require('sys'),
    exec = require('child_process').exec,
    wrench = require('wrench'),
    util = require('util'),
    rootFolder = "apps";

function puts(error, stdout, stderr) { 
    grunt.log.writeLn(stdout); 
    sys.puts(stdout);
}

module.exports = function(grunt) {

    grunt.registerTask("senchatophonegap", function() {
        var done = this.async();
        prompt.start();
        
        prompt.get([
            {
                name: 'name',
                description:'Enter the Sencha App you want to build',
                required: true
            }
          ],function (err, result) {
                var name = result.name;

                if(name) {
                    grunt.log.writeln("Copying the package app of "+name+" into PhoneGap folder... Please wait, this can take a few minutes....");
                    //grunt.file.copy(rootFolder+"/sencha/"+name+"/build/"+name+"/package/", rootFolder+"/phonegap/"+name+"/www/");
                    //grunt.file.copy("apps/sencha/myapp/build/myapp/package/", "apps/phonegap/myapp/www/");
                    wrench.copyDirSyncRecursive(rootFolder+"/sencha/"+name+"/build/"+name+"/package/", rootFolder+"/phonegap/"+name+"/www/",{preserveFiles:true});

                    done(true);
                }
                else {
                    grunt.log.writeln("Unknown app.");
                }
        })
    });
};