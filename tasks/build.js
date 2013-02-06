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
    grunt.registerTask("build", function() {
        var done = this.async();
        prompt.start();
        
        prompt.get([
            {
                name: 'Name',
                required: true
            }
          ],function (err, result) {
                var name = result.Name;

                if(name) {
                    grunt.file.setBase(rootFolder+"/sencha/"+name);
                    grunt.log.writeln("Building the app "+name+"... Please wait, this can take a few minutes....");
                   
                    exec("sencha app build package ", function (error, stdout, stderr) {
                        console.log('Build result : ' + stdout);

                        if (error !== null) {
                          console.log('exec error: ' + error);
                        }
                        done(true);
                    });
                }
                else {
                    grunt.log.writeln("Unknown app.");
                    done(true);
                }
        })
    });
};