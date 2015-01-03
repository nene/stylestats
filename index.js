var $ = require("jquery");
var mustache = require("mustache");
var stats = require("./lib/stats");
var LoadMask = require("./lib/LoadMask");
var React = require("react");
var Stats = require("./lib/cmp/Stats");

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
        $("#css-content-code").text(cssSource);

        var statsData = stats(cssSource);
        console.log(statsData.gridColors);
        React.render(
            React.createElement(Stats, {data: statsData}),
            document.getElementById('stats-content')
        );

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

