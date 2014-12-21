var _ = require("lodash");
var selectorTypes = require("./selectorTypes");
var specificityChart = require("./specificityChart");
var complexityChart = require("./complexityChart");

module.exports = function(iterator) {
    return {
        types: selectorTypes(iterator),
        specificityChart: specificityChart(iterator),
        complexityChart: complexityChart(iterator),
    };
};
