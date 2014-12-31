var $ = require("jquery");
var mustache = require("mustache");
var stats = require("./lib/stats");
var renderCharts = require("./lib/renderCharts");

function getCssFilename() {
    var matches = window.location.hash.match(/#!file=(.*)/);
    return matches[1] || "samples/xrebel.css";
}

$(document).ready(function(){
    $.get(getCssFilename(), function(cssSource) {
        $.get("template.html", function(templateSource) {
            var html = mustache.render(templateSource, stats(cssSource));

            $("#content").html(html);

            renderCharts();
        });
    });
});

