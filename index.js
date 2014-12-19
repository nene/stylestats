var fs = require("fs");
var postcss = require("postcss");
var mustache = require("mustache");
var Iterator = require("./lib/Iterator");
var colorStats = require("./lib/colorStats");
var fontStats = require("./lib/fontStats");
var borderRadiusStats = require("./lib/borderRadiusStats");

var filename = process.argv[2];
var templateFilename = process.argv[3];

var cssSource = fs.readFileSync(filename, "utf8");
var ast = postcss.parse(cssSource);
var iterator = new Iterator(ast);

if (templateFilename) {
    var template = fs.readFileSync(templateFilename, "utf8");
    var html = mustache.render(template, {
        colorStats: colorStats(iterator),
        fontStats: fontStats(iterator),
        borderRadiusStats: borderRadiusStats(iterator),
    });
    console.log(html);
}
else {
    console.log(groupedFontSizes);
}

