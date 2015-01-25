var $ = require("jquery");
var React = require("react");
var LoadMask = require("./LoadMask");
var Page = require("./cmp/Page");
var stats = require("./stats");

class App {
    run() {
        $(document).ready(function(){
            this.refreshStats();

            $(window).bind('hashchange', this.refreshStats.bind(this));
        }.bind(this));
    }

    getCssFilename() {
        var matches = window.location.hash.match(/#!file=(.*)/);
        return matches[1] || "samples/xrebel.css";
    }

    refreshStats() {
        this.loadCss(this.getCssFilename(), function(cssSource) {
            React.render(
                React.createElement(Page, {css: cssSource, stats: stats(cssSource)}),
                document.getElementById('content')
            );
        }.bind(this));
    }

    loadCss(cssFilename, callback) {
        if (!this.loadMask) {
            this.loadMask = new LoadMask($(".load-mask"));
        }

        this.loadMask.show();
        $.get(this.getCssFilename(), function(cssSource) {
            callback(cssSource);

            this.loadMask.hide();
        }.bind(this));
    }
}

module.exports = function() {
    new App().run();
};
