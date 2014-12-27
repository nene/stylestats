var _ = require("lodash");
var valueParser = require("css-value-parser");

module.exports = function(iterator) {
    var gradsByProp = {
        all: []
    };

    iterator.eachValue(function(value, prop) {
        if (value.type === "function" && value.name === "linear-gradient") {
            gradsByProp.all.push(valueParser.format(value));
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
            gradients: groupAndSort(gradsByProp.all)
        },
    ];
};
