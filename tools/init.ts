const path = require("path");
const readline = require('readline');
const { echo, exec } = require("shelljs");
const { readFileSync, writeFileSync } = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

echo(`
# This utility will walk you through creating a package.json file.
# It only covers the most common items, and tries to guess sensible defaults.

# Use "npm i"  to install the default packages.
`);

rl.question('package name: ', (pkgName: string) => {
    const libName = pkgName.indexOf("/") > 0 ? pkgName.split("/")[1].toLowerCase() : pkgName.toLowerCase();
    rl.question('package description: ', (pkgDescription: string) => {
        rl.question("author name: ", (username: string) => {
            rl.question("author email: ", (useremail: string) => {
                rl.question("git repository url: ", (repoUrl: string) => {
                    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "..", "package.json")));
                    pkg.name = pkgName;
                    pkg.description = pkgDescription;
                    pkg.main = `dist/${libName}.umd.js`;
                    pkg.module = `dist/${libName}.es5.js`;
                    pkg.typings = `dist/types/${libName}.d.ts`;
                    if (username) {
                        pkg.author.name = username.trim();
                    }
                    if (useremail) {
                        pkg.author.email = useremail.trim();
                    }
                    pkg.repository.url = repoUrl.trim();

                    const pkgContent = JSON.stringify(pkg, null, 2);
                    writeFileSync(path.resolve(__dirname, "..", "_package.json"), pkgContent);

                    echo("#################################")
                    echo("# About to write to package.json:")
                    echo(pkgContent);
                    rl.close();

                    echo("#################################")
                    echo("# Install dependencies:")
                    exec("npm i");
                });
            })
        });
    });
});