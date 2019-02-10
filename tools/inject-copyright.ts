const fs = require("fs");
const sh = require("shelljs");
const pkg = JSON.parse(fs.readFileSync("package.json") as any);

sh.echo("⚑ copyright injecting...");
sh.cd("dist");
sh.ls("*.*").forEach((file: string) => {
    if (file.endsWith(".js") || file.endsWith(".css")) {
        let data = fs.readFileSync(file, "utf8");
        const copyright = `/**!
 * ${pkg.name} v${pkg.version}
 * ${pkg.repository.url}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 */
`;
        data = `${copyright}${data}`;
        fs.writeFileSync(file, data, (werr:any) => {
            if (werr) {
                throw werr;
            }
        });
    }
});
sh.cd("../");
sh.echo(`✔ done at ${new Date().toISOString()}`);