var _ = require("lodash");
var parseFont = require("./parseFont");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator) {
    var fontSizes = [];
    iterator.eachDecl(function(decl) {
        if (decl.prop === "font-size") {
            fontSizes.push(decl.values[0]);
        }
        else if (decl.prop === "font") {
            var font = parseFont(decl.values);
            if (font["font-size"]) {
                fontSizes.push(font["font-size"]);
            }
        }
    });

    return groupByUnit(fontSizes, "font sizes");
};
