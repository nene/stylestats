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

    iterator.eachValue(function(value, prop) {
        if (value.type === "function" && gradientFunctions[value.name]) {
            allGrads.push({
                rawGradient: valueParser.format(value),
                sortableColors: value.params.filter(isColorValue)
                    .map(valueParser.format)
                    .map(toSortableColorNumber),
            });
        }
    });

    function groupAndSort(grads) {
        return _(grads).groupBy("rawGradient").map(function(gradients, rawGradient){
            return {
                rawGradient: rawGradient,
                gradients: gradients,
                count: gradients.length,
                sortableColors: gradients[0].sortableColors
            };
        }).sortBy(function(grad){
            return grad.sortableColors[0];
        }).value();
    }

    return [
        {
            title: "unique gradients",
            gradients: groupAndSort(allGrads)
        },
    ];
};
