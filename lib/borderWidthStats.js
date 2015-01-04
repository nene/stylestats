var _ = require("lodash");
var groupByUnit = require("./groupByUnit");

module.exports = function(iterator) {
    var sizePropertyNamesMap = {
        "border-width": true,
        "border-top-width": true,
        "border-right-width": true,
        "border-bottom-width": true,
        "border-left-width": true,
    };

    var borderPropertyNamesMap = {
        "border": true,
        "border-top": true,
        "border-right": true,
        "border-bottom": true,
        "border-left": true,
    };

    var sizeTypesMap = {
        number: true,
        dimension: true,
        percentage: true,
    };

    var sizes = [];
    iterator.eachDecl(function(decl) {
        if (sizePropertyNamesMap[decl.prop]) {
            decl.values.forEach(function(val) {
                sizes.push(val);
            });
        }
        else if (borderPropertyNamesMap[decl.prop]) {
            decl.values.forEach(function(val) {
                if (sizeTypesMap[val.type]) {
                    sizes.push(val);
                }
            });
        }
    });

    return groupByUnit(sizes, "border widths");
};
