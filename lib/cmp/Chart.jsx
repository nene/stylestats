var React = require("react");
var Group = require("./Group");
var RawChart = require("./RawChart");

/**
 * Renders container for Specificity or Complexity chart.
 * <Chart title={string} id={string} series={string} onRender={Function}/>
 */
module.exports = React.createClass({
    displayName: "Chart",

    render: function() {
        return (
            <Group title={this.props.title}>
                <RawChart id={this.props.id} series={this.props.series} onRender={this.props.onRender}/>
            </Group>
        );
    },

});
