var postcss = require("postcss");
var Iterator = require("./Iterator");
var colorStats = require("./colorStats");
var gradientStats = require("./gradientStats");
var sizeStats = require("./sizeStats");
var selectorStats = require("./selectorStats");

module.exports = function(cssSource) {
    var ast = postcss.parse(cssSource);
    var iterator = new Iterator(ast);

    return {
        colorStats: colorStats(iterator),
        gradientStats: gradientStats(iterator),
        sizeStats: sizeStats(iterator),
        selectorStats: selectorStats(iterator),
    };
};
