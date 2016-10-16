'use strict';

var yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    path = require('path'),
    _ = require('lodash'),
    str = require('underscore.string'),
    mkdirp = require('mkdirp');

_.mixin(str);

var ModularMaintainableAngular = yeoman.Base.extend({
    constructor: function() {
        // arguments and options should be
        // defined in the constructor.
        yeoman.Base.apply(this, arguments);

        this.argument('appName', { type: String, required: false });
        this.argument('requestsArchitect', { type: String, required: false });
        this.appName = _.camelize(_.slugify(_.humanize(this.appName)));
    },
    welcome: function () {
        this.log(yosay(
            'Welcome to the Modular Maintainable AngularJS generator!'
        ));
    },
    prompting: function() {
        var prompts = [];
        // If we passed in the app name, don't prompt the user for it
        if (!this.appName) {
            prompts.push({
                type: 'input',
                name: 'appName',
                message: 'What would you like to name the app?',
                default: this.appName || path.basename(process.cwd())
            });
        }

        prompts.push({
            type: 'list',
            name: 'requestsArchitect',
            message: 'What type of request architecture do you want to use?',
            choices: ['REST', 'SOAP']
        });

        return this.prompt(prompts).then(function(answers) {
            this.appName = answers.appName;
            this.requestsArchitect = answers.requestsArchitect;
        }.bind(this));
    },
    displayName: function() {
        this.log('Creating ' + this.appName + ' app based on Modular Maintainable AngularJS.');
    },
    packageFiles: function() {
        var context = {
            appName: this.appName
        };

        this.copy('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_gulpfile.js', 'gulpfile.js');
        this.template('_gulp.config.js', 'gulp.config.js');
        this.template('_karma.conf.js', 'karma.conf.js');
    },
    appFiles: function() {
        this.directory('src/client/app');
        this.directory('src/client/images');
        this.directory('src/client/styles');
        this.directory('src/client/test-helpers');

        this.template('src/client/_index.html', 'src/client/index.html');

        if (this.requestsArchitect === 'REST') {
            this.template(
                'src/requestservices/restful_requestservice.js',
                'src/client/app/core/request_service.js'
            );
        }

        this.template('src/server/_app.js', 'src/server/app.js');
        this.template('src/server/_data.js', 'src/server/data.js');
        this.template('src/server/_routes.js', 'src/server/routes.js');
        this.directory('src/server/utils');
        this.copy('src/server/favicon.ico');
    },
    projectfiles: function() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('jscsrc', '.jscsrc');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
    },
    runNpm: function() {
        //        var done = this.async();
        //        this.npmInstall('', function () {
        //            console.log('\nEverything Setup!\n');
        //            done();
        //        });
        //this.npmInstall();
        //              this.bowerInstall();
        console.log('\nEverything Setup !!!\n');
    },

    end: function() {
        //        this.installDependencies();
    }
});

module.exports = ModularMaintainableAngular;