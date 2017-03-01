Generator of AngularJS (1.x. project based on Hottowel generator.

The key differences:
- added gulp task for angular files generation
- added API service
- replaced LESS on SASS

# Preconditions

1. Install Node.js
2. Install next NPM modules globally

    ```
    npm install -g bower gulp nodemon 
    ```
    
# Quick Start

1. Install generator-mma
    ```
    npm install -g generator-mma
    ```

2. Create a new folder for project and change directory to it
    ``` 
    mkdir myapp
    cd myapp
    ```
    
3. Run the generator 
    ```
    yo mma 
    ```

4. Install dependencies (if they were not installed recently.
    ```
    npm install
    ```

5. Start the project and begin coding
    ```
    gulp serve-dev
    ```

# Gulp tasks

1. ``` gulp generate ```

For making new angular files (controller, models, routes etc.) creation easier you can use appropriate gulp task.

*