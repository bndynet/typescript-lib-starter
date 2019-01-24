# typescript-lib-starter

This starter project implements following features:

- :package: Include packages for coding, linting, testing and building
- :package: Release to NPM automatically
- :inbox_tray: Build library to UMD and CommonJS modules
- :blue_book: Generate documentation of your TypeScript files automatically
- :running: Script for publishing documentation to your gh-pages branch
- :heavy_check_mark: Check your commit message when `git commit ...`
- :cl: Default CI scripts for Travis CI includes release and publish automatically

## Start your library

1. Clone this repo:

    `git clone https://github.com/bndynet/typescript-lib-starter.git <your-location>`

1. Initialize your library:

    `npm i && npm run init` and type your package informations


Note: If you want to use Travis CI to publish and release automatically. You must set tokens(**GH_TOKEN** and **NPM_TOKEN**) in Travis CI repo.
