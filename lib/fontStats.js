var _ = require("lodash");
var valueParser = require("css-property-value-parser");
var parseFont = require("./parseFont");

module.exports = function(iterator) {
    var fontSizes = [];
    iterator.eachDecl(function(prop, values) {
        if (prop === "font-size") {
            fontSizes.push(valueParser.format(values));
        }
        else if (prop === "font") {
            var font = parseFont(values);
            if (font["font-size"]) {
                fontSizes.push(valueParser.format(font["font-size"]));
            }
        }
    });

    var groupedFontSizes = _(fontSizes).countBy().map(function(count, value) {
        return {value: value, count: count};
    }).value();

    return [
        {
            title: "unique font sizes",
            values: groupedFontSizes
        },
    ];
};
