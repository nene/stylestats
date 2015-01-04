var _ = require("lodash");
var React = require("react");
var stats = require("../stats");
var StatsContent = require("./StatsContent");
var CssContent = require("./CssContent");

module.exports = React.createClass({
    displayName: "Page",

    getInitialState: function() {
        return {
            css: this.props.css
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
        var css = _(declarations).map("parent").uniq().invoke("toString").join("\n");
        this.setState({css: css});
    }
});
