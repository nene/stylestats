var _ = require("lodash");
var React = require("react");
var StatsPanel = require("./StatsPanel");
var SourcePanel = require("./SourcePanel");
var stats = require("../stats");

/**
 * Render the whole page.
 * <Page css={string}/>
 *
 * Call setCss() to update the CSS source.
 */
module.exports = React.createClass({
    displayName: "Page",

    getInitialState: function() {
        return {
            css: undefined,
            stats: undefined
        };
    },

    render: function() {
        return (
            <div className="page">
                {this.renderContent()}
            </div>
        );
    },

    renderContent: function() {
        // Only render page content after CSS and stats provided
        if (this.state.css && this.state.stats) {
            return [
                <StatsPanel stats={this.state.stats} onSelect={this.onSelect}/>,
                <SourcePanel css={this.state.css}/>
            ];
        }
    },

    /**
     * Generates stats for given CSS source.
     * @param {String} css
     */
    setCss: function(css) {
        this.setState({
            css: _.escape(css),
            stats: stats(css)
        });
    },

    onSelect: function(declarations) {
        this.setState({css: this.declarationsToHtml(declarations)});
    },

    declarationsToHtml: function(declarations) {
        var rules = _(declarations).map("parent").uniq().value();

        return _(rules).map(function(rule){
            return _.escape(rule.selector) + "{\n" + this.renderDecls(rule.childs, declarations) + "\n}";
        }, this).join("\n");
    },

    renderDecls: function(allDecls, selectedDecls) {
        return _(allDecls).map(function(decl) {
            var declStr = _.escape(decl.toString().trim()) + ";"

            return "    " + (_(selectedDecls).contains(decl) ? "<mark>"+declStr+"</mark>" : declStr);
        }).join("\n");
    }
});
