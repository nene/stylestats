var postcss = require("postcss");
var valueParser = require("css-value-parser");
var Iterator = require("./Iterator");

module.exports = {
    parse: function(css) {
        var ast = postcss.parse(css);
        parseValues(ast);
        return new Iterator(ast);
    }
};

function parseValues(ast) {
    ast.eachDecl(function(decl) {
        decl.values = valueParser.parse(decl.value);
    });
}

