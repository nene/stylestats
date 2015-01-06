var _ = require("lodash");
var React = require("react");
var StatsContent = require("./StatsContent");
var CssContent = require("./CssContent");

/**
 * Render the whole page.
 * <Page css={string} stats={Object}/>
 */
module.exports = React.createClass({
    displayName: "Page",

    getInitialState: function() {
        return {
            css: _.escape(this.props.css)
        };
    },

    render: function() {
        return (
            <div className="page">
                <StatsContent stats={this.props.stats} onSelect={this.onSelect}/>
                <CssContent css={this.state.css}/>
            </div>
        );
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
