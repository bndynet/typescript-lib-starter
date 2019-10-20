# typescript-lib-starter

[![npm](https://img.shields.io/npm/v/@bndynet/typescript-lib-starter.svg)](https://www.npmjs.com/package/@bndynet/typescript-lib-starter)
[![Build Status](https://travis-ci.com/bndynet/typescript-lib-starter.svg?branch=master)](https://travis-ci.com/bndynet/typescript-lib-starter)
[![Coverage Status](https://coveralls.io/repos/github/bndynet/typescript-lib-starter/badge.svg?branch=master)](https://coveralls.io/github/bndynet/typescript-lib-starter?branch=master)
[![Code Styles](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This starter project will standardize coding and publishing for your library, and implements following features:

- :school_satchel: Include all packages for coding, linting, testing and building
- :art: Compile sass to css using node-sass, autoprefixer and postcss
- :inbox_tray: Build library to UMD and CommonJS modules
- :blue_book: Generate API documentation of your TypeScript files automatically
- :heavy_check_mark: Check your commit message when `git commit ...`
- :cl: Default CI scripts for [Travis CI](https://travis-ci.com/) includes release and publish automatically
- :bookmark: Generate CHANGELOG.md according to your commits in CI publishing process
- :book: Publish your unit tests report to [coveralls.io](https://coveralls.io/) by CI
- :earth_asia: Publish API documentation, converage, demo and changelog to your gh-pages branch as your project site by CI
- :package: Release to NPM automatically by CI

## Start your library

1. Clone this repo:

    `git clone https://github.com/bndynet/typescript-lib-starter.git <your-location> --depth 1`

1. Initialize your library:

    `npm i && npm run init` and type your package informations

1. Now, you can code your library and bellow commands to start your work:

    ```bash
    npm start
    npm run lint
    npm run build
    npm run docs
    npm run test
    npm run test:watch
    npm run precommit
    ```

1. Commit your changes and push them to your REPO.

## Commit Message Guidelines

All commit message MUST follow https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

Format as:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Note: The **&lt;type&gt;** can be found in **./commitlint.config.js** file.

## Travis CI Integration

The below steps will guide you to use Travis CI to document, release and report automatically.

1. Use GitHub account to log in [Travis CI](https://travis-ci.com/), sync repos and enable your repo
1. Set tokens(**GH_TOKEN** and **NPM_TOKEN** that can be generated at [GitHub](https://github.com/settings/tokens) and [npmjs.com](https://www.npmjs.com/settings/bndy/tokens)) in Travis CI repo to allow to release to NPM and generate gh-pages
1. Use GitHub account to log in [coveralls.io](https://coveralls.io/), sync repos and enable your repo to allow to report testing
