# typescript-lib-starter

[![npm](https://img.shields.io/npm/v/@bndynet/typescript-lib-starter.svg)](https://www.npmjs.com/package/@bndynet/typescript-lib-starter)
[![Build Status](https://travis-ci.com/bndynet/typescript-lib-starter.svg?branch=master)](https://travis-ci.com/bndynet/typescript-lib-starter)
[![Coverage Status](https://coveralls.io/repos/github/bndynet/typescript-lib-starter/badge.svg?branch=master)](https://coveralls.io/github/bndynet/typescript-lib-starter?branch=master)
[![Code Styles](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This starter project implements following features:

- :school_satchel: Include all packages for coding, linting, testing and building
- :art: Compile sass to css using node-sass, autoprefixer and postcss
- :package: Release to NPM automatically
- :inbox_tray: Build library to UMD and CommonJS modules
- :blue_book: Generate documentation of your TypeScript files automatically
- :running: Script for publishing documentation to your gh-pages branch
- :heavy_check_mark: Check your commit message when `git commit ...`
- :book: Publish your unit tests report to coveralls.io by CI
- :cl: Default CI scripts for Travis CI includes release and publish automatically

## Start your library

1. Clone this repo:

    `git clone https://github.com/bndynet/typescript-lib-starter.git <your-location>`

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


Note: If you want to use Travis CI to publish and release automatically. You must set tokens(**GH_TOKEN** and **NPM_TOKEN**) in Travis CI repo.
