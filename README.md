# Kunstmaan - SnippetJS

## Goal

* Provide some small re-usable javascript code snippets that can be used in a variety of javascript projects.
* Idea is that you just import (es6) the code snippet(s) you need and bundle it yourself with the rest of your project code (vs. having to include a 'large' concatenated/minified bundle where you may only need a small part of)

## Usage

WIP

## Development

* npm run test : runs sequentially the 'lint:js' and 'unit' (= karma) tasks
* npm run serve : runs a server (documentation pages) with live reloading
* npm run dev : runs the 'serve' task + watches in parallel for changes to re-trigger the 'test' task

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