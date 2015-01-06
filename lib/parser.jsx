var postcss = require("postcss");
var valueParser = require("css-value-parser");
var Iterator = require("./Iterator");

module.exports = {
    parse(css) {
        var ast = postcss.parse(css);
        this.parseValues(ast);
        return new Iterator(ast);
    },

    parseValues(ast) {
        ast.eachDecl(function(decl) {
            decl.values = valueParser.parse(decl.value);
        });
    }
};


