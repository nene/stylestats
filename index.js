var $ = require("jquery");
var postcss = require("postcss");
var mustache = require("mustache");
var Iterator = require("./lib/Iterator");
var colorStats = require("./lib/colorStats");
var gradientStats = require("./lib/gradientStats");
var sizeStats = require("./lib/sizeStats");
var selectorStats = require("./lib/selectorStats");
var renderCharts = require("./lib/renderCharts");

function generateStats(cssSource) {
    var ast = postcss.parse(cssSource);
    var iterator = new Iterator(ast);

    return {
        colorStats: colorStats(iterator),
        gradientStats: gradientStats(iterator),
        sizeStats: sizeStats(iterator),
        selectorStats: selectorStats(iterator),
    };
}

$(document).ready(function(){
    $.get("samples/xrebel.css", function(cssSource) {
        $.get("template.html", function(templateSource) {
            var html = mustache.render(templateSource, generateStats(cssSource));

            $("#content").html(html);

            renderCharts();
        });
    });
});

