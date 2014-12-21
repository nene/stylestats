var _ = require("lodash");
var selectorCount = require("./selectorCount");
var selectorTypes = require("./selectorTypes");
var specificityChart = require("./specificityChart");
var complexityChart = require("./complexityChart");

module.exports = function(iterator) {
    return {
        count: selectorCount(iterator),
        types: selectorTypes(iterator),
        specificityChart: specificityChart(iterator),
        complexityChart: complexityChart(iterator),
    };
};
