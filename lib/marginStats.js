var _ = require("lodash");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator) {
    var marginProps = {
        "margin": true,
        "margin-top": true,
        "margin-bottom": true,
        "margin-left": true,
        "margin-right": true,
    };
    var margins = [];
    iterator.eachDecl(function(prop, values) {
        if (marginProps[prop]) {
            values.forEach(function(r) {
                margins.push(r);
            });
        }
    });

    return groupByUnit(margins, "margins");
};
