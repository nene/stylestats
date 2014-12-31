var postcss = require("postcss");
var Iterator = require("./Iterator");
var gridColors = require("./gridColors");
var colorStats = require("./colorStats");
var gradientStats = require("./gradientStats");
var sizeStats = require("./sizeStats");
var selectorStats = require("./selectorStats");

module.exports = function(cssSource) {
    var ast = postcss.parse(cssSource);
    var iterator = new Iterator(ast);

    var colorStatsData = colorStats(iterator);

    return {
        gridColors: gridColors(colorStatsData[0].colors),
        colorStats: colorStatsData,
        gradientStats: gradientStats(iterator),
        sizeStats: sizeStats(iterator),
        selectorStats: selectorStats(iterator),
    };
};

