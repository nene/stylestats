var parser = require("./parser");
var gridColors = require("./gridColors");
var colorStats = require("./colorStats");
var gradientStats = require("./gradientStats");
var sizeStats = require("./sizeStats");
var selectorStats = require("./selectorStats");
var specificityChart = require("./specificityChart");
var complexityChart = require("./complexityChart");

module.exports = function(cssSource) {
    var iterator = parser.parse(cssSource);

    var colorStatsData = colorStats(iterator);
    var selectors = selectorStats(iterator);

    return {
        gridColors: gridColors(colorStatsData[0].styles),
        specificityChart: specificityChart(iterator),
        complexityChart: complexityChart(iterator),
        colorStats: colorStatsData,
        gradientStats: gradientStats(iterator),
        sizeStats: sizeStats(iterator),
        selectorStats: selectorStats(iterator),
    };
};

