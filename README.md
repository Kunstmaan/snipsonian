[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Snipsonian

Typescript Snippets powered by Kunstmaan Development.
Besides typescript source code, also transpiled javascript files are published.
We'll add some documentation on how to use the different snippets in the future.


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

1. `nvm use`
2. execute `npm run to-es` to transpile the typescript code to .js and .d.ts files under the /es folders (per package)
3. manually check the generated folders (snipsonian-analytics !)
4. switch to the appropriate npm user
5. execute `npx lerna publish` or `npx lerna publish from-package`. (see https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)


## License

The ISC License
