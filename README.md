# Preconditions

1) Install Node.js <br />
2) Install Yeoman 
``` 
npm install -g yo 
```
3) Install next NPM modules globally
``` 
npm install -g bower gulp nodemon 
```
# Quick Start

1) Pull repository
2) Go to generator root folder and link one
``` 
npm link 
```
3) Create a new folder for project and change directory to it
``` 
mkdir myapp
cd myapp
```
4) Run the generator 
```
yo mma 
```
5) Install dependencies (if they were not installed recently)
```
npm install
```
6) Start the project and begin coding
```
gulp serve-dev
```

# Gulp tasks

1) ``` gulp generate ```

For making new angular files (controller, models, routes etc.) creation easier you can use appropriate gulp task.

*