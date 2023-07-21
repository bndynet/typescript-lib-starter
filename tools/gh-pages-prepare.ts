const fs = require('fs');
const sh = require('shelljs');

sh.echo('⚑ gh-pages preparing...');


// copy root site
sh.cp('-R', './site/dist', './docs');

// replace file content 
sh.cd('./docs');
sh.ls('*.html').forEach((file: string) => {
  let data = fs.readFileSync(file, 'utf8');
  // remove <!-- dev --> ... <!-- /dev --> lines
  data = data.replace(/<!--\s*dev\s*-->[\s\S]*?<!--\s*\/dev\s*-->/gi, '');
  // uncomment <!-- prod ... -->
  data = data.replace(/<\!--\s*prod\s*([\s\S]*?)-->/gi, '$1');
  fs.writeFileSync(file, data, (werr: any) => {
    if (werr) {
      throw werr;
    }
  });
});

sh.cd('../');

// copy readme and changelog
sh.mkdir('-p', './docs');
sh.cp('README.md', './docs/README.md');
sh.cp('CHANGELOG.md', './docs/CHANGELOG.md');

// copy code coverage report
sh.rm('-rf', './docs/coverage-report');
sh.cp('-R', './coverage/lcov-report', './docs/coverage-report');

sh.echo(`✔ done at ${new Date().toISOString()}`);
