'use strict';

const fs = require('fs');
const pkg = require('../package.json');
const cli = require('commander');
const yaml = require('js-yaml').safeLoad;
const CodeGen = require('./index.js').CodeGen;

cli
    .version(pkg.version)
    .command('gen <file> <out>')
    .description('Generate from Swagger file')
    .option('-c, --class <class>', 'Class name [Test]', 'Test')
    .option('-l, --lint', 'Whether or not to run jslint on the generated code [false]')
    .option('-b, --beautify', 'Whether or not to beautify the generated code [false]')
    .action((file, out, options) => {
        const fn = CodeGen.getFibjsCode;
        options.lint = options.lint || false;
        options.beautify = options.beautify || false;

        const content = fs.readFileSync(file, 'utf-8');

        var swagger;
        try {
            swagger = JSON.parse(content);
        } catch (e) {
            swagger = yaml(content);
        }

        const result = fn({
            moduleName: options.module,
            className: options.class,
            swagger: swagger,
            lint: options.lint,
            beautify: options.beautify
        });

        fs.writeFileSync(out, result);
    });

cli.parse(process.argv);

if (!cli.args.length) {
    cli.help();
}
