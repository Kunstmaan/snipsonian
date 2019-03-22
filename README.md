[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Snipsonian

Typescript Snippets powered by Kunstmaan Development.
For now only typescript snippets offered, but we'll add transpiled javascript files in the future + some documentation on how to use the different snippets.


## Goal

* Provide some small re-usable typescript/javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6 syntax) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle of which you may only need a small part of)


## Installation

1. install nvm (https://github.com/creationix/nvm) if not installed yet
2. git clone <this repo>
3. switch to correct node version: `nvm install` (first time) or `nvm use` (later)
4. Link local packages together and install remaining package dependencies: `npx lerna bootstrap`


## Dev commands

### `npm test`

Runs sequentially the linters and the unit tests.


## Publish new version

1. switch to the appropriate npm user
2. execute `npx lerna publish` or `npx lerna publish from-package`. (see https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)


## License

The ISC License
