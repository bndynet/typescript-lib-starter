const path = require('path');
const readline = require('readline');
const { echo, exec } = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

echo(`
# This utility will walk you through creating a package.json file.
# It only covers the most common items, and tries to guess sensible defaults.

# Use "npm i"  to install the default packages.
`);

rl.question('package name: ', (pkgName: string) => {
  const libName = pkgName.indexOf('/') > 0 ? pkgName.split('/')[1].toLowerCase() : pkgName.toLowerCase();
  rl.question('package description: ', (pkgDescription: string) => {
    rl.question('author name: ', (username: string) => {
      rl.question('author email: ', (useremail: string) => {
        rl.question('git repository url: ', (repoUrl: string) => {
          const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '..', 'package.json')));
          pkg.name = pkgName;
          pkg.description = pkgDescription;
          pkg.main = `dist/${libName}.umd.js`;
          pkg.module = `dist/${libName}.es5.js`;
          if (username) {
            pkg.author.name = username.trim();
          }
          if (useremail) {
            pkg.author.email = useremail.trim();
          }
          pkg.repository.url = repoUrl.trim();

          const pkgContent = JSON.stringify(pkg, null, 2);
          writeFileSync(path.resolve(__dirname, '..', 'package.json'), pkgContent);

          echo('#################################');
          echo('# Generate package.json:');
          echo(pkgContent);
          rl.close();

          echo('#################################');
          echo('# Generate site:');
          const templateIndexFilePath = path.resolve(__dirname, '../_templates', 'index.html');
          const indexFilePath = path.resolve(__dirname, '../site', 'index.html');
          let siteIndexHtml =  readFileSync(templateIndexFilePath, 'utf8');
          siteIndexHtml = siteIndexHtml.replace(/{{package.name}}/g, pkg.name)
            .replace(/{{package.subname}}/g, libName)
            .replace(/{{package.repository.url}}/g, pkg.repository.url);
          writeFileSync(indexFilePath, siteIndexHtml, (werr: any) => {
            if (werr) {
              throw werr;
            }
          });

          echo('#################################');
          echo('# Install dependencies:');
          exec('npm i');
        });
      });
    });
  });
});
