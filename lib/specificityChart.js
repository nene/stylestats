var _ = require("lodash");
var specificity = require("specificity");
var chartable = require("chartable");

module.exports = function(iterator) {
    var specificities = [];
    iterator.eachSelector(function(selector){
        var str = specificity.calculate(selector)[0].specificity;
        var arr = str.split(/,/).map(parseFloat);
        specificities.push(arr);
    });

    // Maximum value of any specificity category
    var max = _(specificities).flatten().max();

    // Array of number representing relative specificity
    var specificityValues = specificities.map(function(specs){
        return specs[1]*max*max + specs[2]*max + specs[3];
    });

    return chartable.lineGraph(specificityValues, { width: 1152, height: 320 });
};
