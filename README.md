# Snipsonian

JS Snippets powered by Kunstmaan Development


## Goal

* Provide some small re-usable javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle where you may only need a small part of)

## Usage

WIP

## Setup

    nvm install
OR

    yarn

If you want to watch jest tests:

    brew install watchman

## Development

runs sequentially the js linter the unit tests:

    yarn run test [-- --watch]
    
runs a localhost server for developping with live reloading:

    yarn run develop
    
does the gatsby build:

    yarn run build
    
runs the builded site in a local server:
    
    yarn run serve-build

## Gatsby

The documentation site is using Gatsby.

Some gatsby specials:
* wrapRootComponentWithReduxAndIntlProvider (gatsby-browser.js & gatsby-ssr.js)
* i18n (react-intl) : SSR sets the default lang (en) and when loaded on clientside - 
and if there is already a localStorage - the lang can be changed according to the user's 
previous language.
* reactdown so that we can do react (e.g. FormattedMessage for i18n) in markdown (.md) 
files (gatsby-node.js & .reactdownrc & wrappers/md.js)

## License

The ISC License