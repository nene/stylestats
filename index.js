var $ = require("jquery");
var LoadMask = require("./lib/LoadMask");
var React = require("react");
var Page = require("./lib/cmp/Page");
var stats = require("./lib/stats");

var loadMask;

function getCssFilename() {
    var matches = window.location.hash.match(/#!file=(.*)/);
    return matches[1] || "samples/xrebel.css";
}

function refreshStats() {
    loadMask.show();
    $.get(getCssFilename(), function(cssSource) {
        React.render(
            React.createElement(Page, {css: cssSource, stats: stats(cssSource)}),
            document.getElementById('content')
        );

        loadMask.hide();
    });
}

$(document).ready(function(){
    loadMask = new LoadMask($(".load-mask"));

    refreshStats();

    $(window).bind('hashchange', refreshStats);
});

