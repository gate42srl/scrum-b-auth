# Microservice Boilerplate with ExpressJS, Typescript and Prettier

In order to use Prettier, which will indent and correct the style of your code you must install the corresponding extension for your editor.

For Visual Studio Code the extension is called **Prettier - Code formatter** the author is Prettier.

After the installation you can use this extension and whenever you save your file the extension will update the file according the best practice of programming. The config file for Prettier is inside the .prettierrc file. Files skipped by this one are listed inside the .prettierignore.

This project uses typescript as language and, maybe you don't know, in order to be executed the code must be "converted" into javascript (the real name is **Transpilation**). To obtain this conversion is used the tsc extension shipped with node and npm. The command for building the ts file in javascript is defined inside the package.json at build script. For development purposes you can use nodemon which is installed as dev dependency and ts-node the runtime for typescript installed in the same way. After you get all the packages the command "nodemon filanme.ts" will use the ts-node module to run without explicitly build typescript in javascript. For production purpose you need to use npm run start wich will execute the transpiled code in dist folder after the run the build command.

## Folder Structure

This section tries to give an insight on the folder and subfolders inside the repository:

- src: this folder contains all the source code of the microservice. Inside there are subfolder:

  - routes: here you define another subfolder which will contain route definition and handler definition for the defined routes;

  - config: contains the config file to be used with npm module "config";

- test: this folder contains all the unit tests written using the moduled "mocha", "chai" and "sinon".

### Troubleshoot

If automatic saves doesn't fire Prettier you can set this one as default formatter of the editor.

On Windows use the command: CTRL + SHIFT + P

On Mac use the commadn: CMD + SHIFT + P

This will open the command input box in which you can search for settings. After the settings windows will show you can search for formatter and in the dropdown menu you can choose Prettier as default formatter. This will trigger the extension every time a file is saved.
