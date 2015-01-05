var _ = require("lodash");
var React = require("react");
var stats = require("../stats");
var StatsContent = require("./StatsContent");
var CssContent = require("./CssContent");

module.exports = React.createClass({
    displayName: "Page",

    getInitialState: function() {
        return {
            css: _.escape(this.props.css)
        };
    },

    render: function() {
        var statsData = stats(this.props.css);

        return (
            <div className="page">
                <StatsContent data={statsData} onSelect={this.onSelect}/>
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