# Swagger to fibjs Codegen

This package generates a fibjs class from a [swagger specification file](https://github.com/wordnik/swagger-spec). The code is generated using [mustache templates](https://github.com/mtennoe/swagger-js-codegen/tree/master/templates) and is quality checked by [jshint](https://github.com/jshint/jshint/) and beautified by [js-beautify](https://github.com/beautify-web/js-beautify).

The generator is based on [superagent](https://github.com/visionmedia/superagent) and can be used for fibjs.

This fork was made to simplify some parts, add some more features, and tailor it more to specific use cases.

## Installation

```bash
fibjs --install fib-swagger
```

## cli

```bash
fibjs node-modules/fib-swagger/lib/cli -c Test gen test.json test.js
```

## Example Code

```javascript
var fs = require("fs");
var CodeGen = require("fib-swagger").CodeGen;

var file = "swagger/spec.json";
var swagger = JSON.parse(fs.readFileSync(file, "UTF-8"));
var tsSourceCode = CodeGen.getFibjsCode({
  className: "Test",
  swagger: swagger
});
console.log(tsSourceCode);
```
