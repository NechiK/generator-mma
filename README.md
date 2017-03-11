Generator of AngularJS (1.x) project based on [Hottowel](https://github.com/johnpapa/generator-hottowel) generator.

For now it's on implementation stage so I am ready for your suggestions and remarks.

```Version: 1.0.0-beta.0```

The key differences:
- added gulp task for angular files generation
- added API service
- replaced LESS with SASS

# Preconditions

1. Install [Node.js](http://nodejs.org)
2. Install next NPM modules globally

    ```
    npm install -g bower gulp nodemon 
    ```
3. Install Yeoman 

    ```
    npm install -g yo
    ```
    
# Quick Start

1. Install generator-mma
    ```
    npm install -g generator-mma
    ```

2. Create a new folder for project and step inside it
    ``` 
    mkdir myapp
    cd myapp
    ```
    
3. Run the generator 
    ```
    yo mma 
    ```

4. Install dependencies
    ```
    npm install
    ```

5. Start the project and begin coding
    ```
    gulp serve-dev
    ```

# Project structure

    /src
        /client
            /app
                /core <!-- main module and config files -->
                /routes <!-- route files -->
                /models <!-- factories -->
                /directives <!-- folder with directives -->
                
                <!-- folders with controllers and corresponding views -->
                /main
                /dashboard

# Gulp tasks

- ``` gulp generate ```

    Use gulp tasks listed below to generate your controllers, models, routes etc. easily.
    
    * ``` gulp generate --controller controller_name``` - will add folder for controller (if it does not exist) and generate controller with name ```ControllerNameController```
    * ``` gulp generate --model model_name``` - will add file ```model_name.model.js``` to ```models``` folder and generate model with name ```ModelNameModel```
    * ``` gulp generate --model route_file_name``` - will add file ```route_file_name.route.js``` to ```routes``` folder
    * ``` gulp generate --directive directive_name``` - will add file ```directive_name.directive.js``` to ```directives``` folder and generate directive with name ```directiveName```
    * ``` gulp generate --module module_name``` - - will add folder for module (if it does not exist) and generate module with module name ```module_name```
    
    You can add ```--module [module_name]``` to all generators (except module generator) to attach a file to specified module. By default it will be attached to ```app.core```
    
- `gulp vet`

    Runs jshint and jscs on all javascript files.
    
- `gulp test`

    Runs all unit tests (using Karma runner and next frameworks: mocha, chai and sinon).
    
- `gulp styles`

    Compile scss files to CSS and copy to the build folder

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles sass to css in a temp folder.
    
- `gulp build`

    Copies all fonts, copies images and runs `gulp html` to build the production code to the build folder.
    
- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.
    
## TODOs

- fixing small issue with build task
- writing more detailed documentation
- replacing project commands (like npm install, gulp generate etc.) with ```make``` commands
- unit tests implementation
- generator tests implementation
- issues fixing
    
## License

MIT