var fs = require('fs');
var path = require('path');
var jsyaml = require('js-yaml');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

CodeGen.getFibjsCode = function (opt) {
    var _opt = {};

    if (opt) {
        for (var k in opt)
            _opt[k] = opt[k];
        opt = _opt;
    }

    if (opt.swagger.openapi) {
        opt.swagger.swagger = '2.0';
        opt.swagger.securityDefinitions = opt.swagger.components.securitySchemes;
    }

    opt.template = {
        class: fs.readFileSync(path.join(__dirname, "../templates/class.mustache"), 'utf-8'),
        method: fs.readFileSync(path.join(__dirname, "../templates/method.mustache"), 'utf-8'),
        type: fs.readFileSync(path.join(__dirname, "../templates/type.mustache"), 'utf-8')
    };

    return CodeGen.getCustomCode(opt);
};

exports.CodeGen = CodeGen;