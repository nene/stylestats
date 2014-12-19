var _ = require("lodash");
var fontSizeStats = require("./fontSizeStats");
var borderRadiusStats = require("./borderRadiusStats");
var marginStats = require("./marginStats");

module.exports = function(iterator) {
    return [
        fontSizeStats(iterator),
        borderRadiusStats(iterator),
        marginStats(iterator),
    ];
};
