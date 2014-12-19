var _ = require("lodash");
var fontSizeStats = require("./fontSizeStats");
var simpleSizeStats = require("./simpleSizeStats");

module.exports = function(iterator) {
    return [
        fontSizeStats(iterator),
        simpleSizeStats(iterator, "border radiuses", [
            "border-radius"
        ]),
        simpleSizeStats(iterator, "margins", [
            "margin",
            "margin-top",
            "margin-bottom",
            "margin-left",
            "margin-right"
        ]),
        simpleSizeStats(iterator, "paddings", [
            "padding",
            "padding-top",
            "padding-bottom",
            "padding-left",
            "padding-right"
        ]),
    ];
};
