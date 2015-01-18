var _ = require("lodash");
var valueParser = require("css-value-parser");
var isColorValue = require("./isColorValue");
var toSortableColorNumber = require("./toSortableColorNumber");

module.exports = function(iterator) {
    var gradientFunctions = {
        "linear-gradient": true,
        "radial-gradient": true,
        "repeating-linear-gradient": true,
        "repeating-radial-gradient": true,
    };
    var allGrads = [];

    iterator.eachValue(function(value, decl) {
        if (value.type === "function" && gradientFunctions[value.name]) {
            allGrads.push({
                value: valueParser.format(value),
                decl: decl,
                sortableColors: value.params.filter(isColorValue)
                    .map(valueParser.format)
                    .map(toSortableColorNumber),
            });
        }
    });

    function groupAndSort(grads) {
        return _(grads).groupBy("value").mapValues(function(sameGrads){
            return {
                value: sameGrads[0].value,
                decls: _.map(sameGrads, "decl"),
                sortableColors: sameGrads[0].sortableColors
            };
        }).map(function(variant, value){
            return {
                backgroundStyle: value,
                variants: [variant],
                count: variant.decls.length,
                sortableColors: variant.sortableColors
            };
        }).sortBy(function(grad){
            return grad.sortableColors[0];
        }).value();
    }

    return [
        {
            title: "unique gradients",
            styles: groupAndSort(allGrads)
        },
    ];
};
