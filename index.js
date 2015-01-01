var $ = require("jquery");
var mustache = require("mustache");
var stats = require("./lib/stats");
var renderCharts = require("./lib/renderCharts");
var LoadMask = require("./lib/LoadMask");

var templateSource;
var loadMask;

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
    loadMask.show();
    $.get(getCssFilename(), function(cssSource) {
        var html = mustache.render(templateSource, stats(cssSource));

        $("#content").html(html);

        renderCharts();

        loadMask.hide();
    });
}

$(document).ready(function(){
    loadMask = new LoadMask($(".load-mask"));

    afterTemplateLoaded(function() {
        refreshStats();

        $(window).bind('hashchange', refreshStats);
    });
});

