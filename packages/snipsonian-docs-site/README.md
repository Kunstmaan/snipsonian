# Snipsonian Docs Site

Using the `react-static` static site generator

## Commands

* `npm run start` - Start the development server
* `npm run build` - Build for production
* `npm run serve` - Test a production build locally

## Roadmap

* Each snippet should have a test (.spec.js)
* Keep documentation for each snippet simple (so that it is not a hassle to add documentation). The combo of the following info should be enough documentation:
    * in the snippet a simple comment block for the description
    * the extracted signature of each snippet
    * the code itself (only shown after click)
    * Example code is best written in a .js file itself so that we avoid typo's
        * in a <snippetName>.example.js file
        * implement a mechanism where the export of the snippet-execution-result can be replaced by a comment? (so that the documentation example shows the real result) 
* Also make it possible to include documentation (via a markfown file ?) on package and folder level
* Flow to build the static-site:
    * node script (generateDocMeta) that generates a json file with the documentation of a single version
        * when making a new version, the resulted json file should be committed
        * only the json file for the 'latest' version is git-ignored
    * react-static (static-site-generator) takes those json files and generates the site pages for it
        * we can use redux for the interactive parts: version chooser, ...
* By adding typings (typescript) for each snippet, we would achieve an additional level of documentation
* Lerna monorepo
