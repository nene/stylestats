var _ = require("lodash");
var valueParser = require("css-value-parser");

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
            allGrads.push(valueParser.format(value));
        }
    });

    function groupAndSort(grads) {
        return _(grads).countBy().map(function(count, grad){
            return {gradient: grad, count: count};
        }).value();
    }

    return [
        {
            title: "unique gradients",
            gradients: groupAndSort(allGrads)
        },
    ];
};
