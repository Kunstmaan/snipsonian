# Snipsonian

JS Snippets powered by Kunstmaan Development


## Goal

* Provide some small re-usable javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6 syntax) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle where you may only need a small part of)

## Usage

WIP

## Setup

    npm run setup

If you want to watch jest tests:

    brew install watchman

## Development

runs sequentially the js linter the unit tests:

    npm run test [-- --watch]
    
runs a localhost server for developing with live reloading:

    npm run start
    
does the gatsby build:

    npm run build
    
runs the builded site in a local server:
    
    npm run serve-build
    
## New Versions

When it's time to move to a new version, here's what to do: 

        npm version --new-version [major|minor|patch]

Use 'major' if there are any breaking changes!! 

That's it! The script will make sure that:
* all files are copied from 'src' to 'prev_versions'
* everything is set up correctly and pushed under a new tag to git

## Gatsby

The documentation site is using the static-site-generator Gatsby.

Some gatsby specials:
* wrapRootComponent:
    * wraps the root component with a redux wrapper
    * used in gatsby-browser.js & gatsby-ssr.js

## License

The ISC License