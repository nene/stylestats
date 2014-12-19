var _ = require("lodash");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator) {
    var radiuses = [];
    iterator.eachDecl(function(prop, values) {
        if (prop === "border-radius") {
            values.forEach(function(r) {
                radiuses.push(r);
            });
        }
    });

    return groupByUnit(radiuses, "border radiuses");
};
