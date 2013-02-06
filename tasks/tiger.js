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
    grunt.registerTask("tiger", function() {
        var done = this.async();

        prompt.start();
        
        prompt.get(
            [
                {
                    name: 'Name',
                    description:'Enter the name of your app',
                    required: true
                },
                {
                    name: 'framework',
                    description:'Which framework do you want to use ? jquerymobile/sencha/phonegap',
                    required: true
                }
          ], function (err, result) {

                var name = result.Name;
                var framework = result.framework;

                if(framework=="jquery") {
                    grunt.file.mkdir(name);
                    grunt.file.copy("libs/jquerymobile/jquery.mobile-1.2.0.min.js", name+"/jquery.js");
                }
                else if(framework=="phonegap") {
                    grunt.file.mkdir(rootFolder);
                    grunt.file.setBase(rootFolder);
                    grunt.file.mkdir("phonegap");
                    grunt.file.setBase("phonegap");

                    grunt.log.writeln("Building the PhoneGap app in "+rootFolder+"/libs/phonegap/"+name+"....");

                    exec("../../libs/phonegap/lib/ios/bin/create "+name+" fr.florentlamoureux.fr "+name, function (error, stdout, stderr) {
                        if (error !== null) {
                          console.log('exec error: ' + error);
                        }
                        done(true);
                    });
                }
                else if(framework=="sencha") {
                    grunt.file.mkdir(rootFolder);
                    grunt.file.mkdir(rootFolder+"/sencha");
                    grunt.file.setBase("libs/sencha");

                    grunt.log.writeln("Building the Sencha Touch 2 app in "+rootFolder+"/"+name+"....");

                    exec("sencha generate app "+name+" ../../"+rootFolder+"/sencha/"+name, function (error, stdout, stderr) {
                        console.log('Build result : ' + stdout);

                        if (error !== null) {
                          console.log('exec error: ' + error);
                        }
                        done(true);
                    });
                }
                else {
                    grunt.log.writeln("Framework unknown.");
                }
        });
    });
};