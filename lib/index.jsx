var $ = require("jquery");
var React = require("react");
var LoadMask = require("./LoadMask");
var Page = require("./cmp/Page");

class App {
    run() {
        $(document).ready(function(){
            this.renderPage();

            $(window).bind('hashchange', this.refreshStats.bind(this));

            this.refreshStats();
        }.bind(this));
    }

    renderPage() {
        this.page = React.render(
            React.createElement(Page),
            document.getElementById('content')
        );
    }

    refreshStats() {
        this.loadCss(this.getCssFilename(), function(cssSource) {
            this.page.setCss(cssSource);
        }.bind(this));
    }

    getCssFilename() {
        var matches = window.location.hash.match(/#!file=(.*)/);
        return matches[1] || "samples/xrebel.css";
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
