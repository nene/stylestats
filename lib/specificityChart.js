var _ = require("lodash");
var specificity = require("specificity");

module.exports = function(iterator) {
    var specificities = [];
    iterator.eachSelector(function(selector){
        var str = specificity.calculate(selector)[0].specificity;
        var arr = str.split(/,/).map(parseFloat);
        specificities.push(arr);
    });

    // Find maximum value of each specificity category
    var max = [0,1,2,3].map(function(i) {
        return _(specificities).pluck(i).max();
    });

    // Array of number representing relative specificity
    var specificityValues = specificities.map(function(specs){
        return [specs[1]*max[2]*max[3], specs[2]*max[3], specs[3]];
    });

    return JSON.stringify(specificityValues);
};
