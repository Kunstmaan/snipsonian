# Snipsonian

JS Snippets powered by Kunstmaan Development


## Goal

* Provide some small re-usable javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle where you may only need a small part of)

## Usage

WIP

## Dependencies

* yarn
    * Not really a hard dependency, but it is preferred to npm for this project.
    * To install:
          
          brew update
          brew install yarn

## Setup

    yarn run setup

If you want to watch jest tests:

    brew install watchman

## Development

runs sequentially the js linter the unit tests:

    yarn run test [-- --watch]
    
runs a localhost server for developping with live reloading:

    yarn run develop
    
does the gatsby build:

    yarn build
    
runs the builded site in a local server:
    
    yarn run serve-build
    
## New Versions
When it's time to move to a new version, here's what to do: 

        yarn version --new-version [patch|minor|major]
        
That's it! The script will make sure all files are copied from 'src' to 'prev_versions', everything is set up correctly
 and pushed under a new tag to git.

## Gatsby

The documentation site is using Gatsby.

Some gatsby specials:
* wrapRootComponentWithRedux (gatsby-browser.js & gatsby-ssr.js)

## License

The ISC License