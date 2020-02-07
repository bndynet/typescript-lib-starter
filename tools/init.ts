const path = require('path');
const readline = require('readline');
const { echo, exec } = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');

const cli = require('@bndynet/cli');

cli.info(`
# This utility will walk you through creating a package.json file.
# It only covers the most common items, and tries to guess sensible defaults.

# Use "npm i"  to install the default packages.
`);

cli.questions(['Your package name:', 'Your package description:', 'Author name:', 'Author email:', 'Git repository url:']).then((answers: any[]) => {
  const pkgName = answers[0];
  const libName = pkgName.indexOf('/') > 0 ? pkgName.split('/')[1].toLowerCase() : pkgName.toLowerCase();
  const pkgDescription = answers[1].trim();
  const username = answers[2].trim();
  const useremail = answers[3].trim();
  const repoUrl = answers[4].trim();
  const pkgJson = cli.getPackage('../package.json');

  pkgJson.name = pkgName;
  pkgJson.description = pkgDescription;
  pkgJson.main = `dist/${libName}.umd.js`;
  pkgJson.module = `dist/${libName}.es5.js`;
  if (username) {
    pkgJson.author.name = username;
  }
  if (useremail) {
    pkgJson.author.email = useremail;
  }
  pkgJson.repository.url = repoUrl;

  cli.startSection('Generate package.json file');
  const pkgContent = JSON.stringify(pkgJson, null, 2);
  writeFileSync(path.resolve(__dirname, '..', 'package.json'), pkgContent);
  cli.print(pkgContent);
  cli.success('done', true);

  cli.startSection('Generate Site');
  const templateIndexFilePath = path.resolve(__dirname, '../_templates', 'index.html');
  const indexFilePath = path.resolve(__dirname, '../site', 'index.html');
  let siteIndexHtml = readFileSync(templateIndexFilePath, 'utf8');
  siteIndexHtml = siteIndexHtml
    .replace(/{{package.name}}/g, pkgJson.name)
    .replace(/{{package.subname}}/g, libName)
    .replace(/{{package.repository.url}}/g, pkgJson.repository.url);
  writeFileSync(indexFilePath, siteIndexHtml, (werr: any) => {
    if (werr) {
      throw werr;
    }
  });

  cli.startSection('Install dependencies');
  cli.run('npm i');
});
