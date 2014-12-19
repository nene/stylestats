var _ = require("lodash");
var parseFont = require("./parseFont");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator) {
    var fontSizes = [];
    iterator.eachDecl(function(prop, values) {
        if (prop === "font-size") {
            fontSizes.push(values[0]);
        }
        else if (prop === "font") {
            var font = parseFont(values);
            if (font["font-size"]) {
                fontSizes.push(font["font-size"]);
            }
        }
    });

    return groupByUnit(fontSizes, "font sizes");
};
