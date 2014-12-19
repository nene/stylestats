var _ = require("lodash");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator, title, propertyNames) {
    var propertyNamesMap = _(propertyNames).countBy().value();

    var sizes = [];
    iterator.eachDecl(function(prop, values) {
        if (propertyNamesMap[prop]) {
            values.forEach(function(r) {
                sizes.push(r);
            });
        }
    });

    return groupByUnit(sizes, title);
};
