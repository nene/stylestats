var _ = require("lodash");
var fontSizeStats = require("./fontSizeStats");
var borderWidthStats = require("./borderWidthStats");
var simpleSizeStats = require("./simpleSizeStats");

module.exports = function(iterator) {
    return [
        fontSizeStats(iterator),
        borderWidthStats(iterator),
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
        simpleSizeStats(iterator, "absolute positions", [
            "top",
            "bottom",
            "left",
            "right"
        ]),
        simpleSizeStats(iterator, "widths and heights", [
            "width",
            "height",
            "max-width",
            "max-height",
            "min-width",
            "min-height",
        ]),
        simpleSizeStats(iterator, "z-indexes", [
            "z-index",
        ]),
        simpleSizeStats(iterator, "zoom values", [
            "zoom",
        ]),
        simpleSizeStats(iterator, "opacities", [
            "opacity",
        ]),
    ];
};
