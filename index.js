var $ = require("jquery");
var mustache = require("mustache");
var stats = require("./lib/stats");
var renderCharts = require("./lib/renderCharts");

var templateSource;
function afterTemplateLoaded(callback) {
    $.get("template.html", function(tpl) {
        templateSource = tpl;
        callback();
    });
}

function getCssFilename() {
    var matches = window.location.hash.match(/#!file=(.*)/);
    return matches[1] || "samples/xrebel.css";
}

function refreshStats() {
    $.get(getCssFilename(), function(cssSource) {
        var html = mustache.render(templateSource, stats(cssSource));

        $("#content").html(html);

        renderCharts();
    });
}

$(document).ready(function(){
    afterTemplateLoaded(function() {
        refreshStats();

        $(window).bind('hashchange', refreshStats);
    });
});

