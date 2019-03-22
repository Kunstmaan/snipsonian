# Snipsonian

Typescript Snippets powered by Kunstmaan Development.
For now only typescript, but we'll add transpiled javascript files in the future + some documentation on how to use the different snippets.


## Goal

* Provide some small re-usable typescript/javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6 syntax) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle of which you may only need a small part of)

## Usage

WIP

## Setup

If you want to watch jest tests:

    brew install watchman

## Development

runs sequentially the js linter and the unit tests:

    npm run test [-- --watch]
    
## New Versions

When it's time to move to a new version, here's what to do: 

    npm version [major|minor|patch]

Use 'major' if there are any breaking changes!! 

That's it! The script will make sure that:
* everything is set up correctly and pushed under a new tag to git

## License

The ISC License
