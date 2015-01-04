var _ = require("lodash");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator, title, propertyNames) {
    var propertyNamesMap = _(propertyNames).countBy().value();

    var sizes = [];
    iterator.eachDecl(function(decl) {
        if (propertyNamesMap[decl.prop]) {
            decl.values.forEach(function(r) {
                sizes.push(r);
            });
        }
    });

    return groupByUnit(sizes, title);
};
