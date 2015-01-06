var React = require("react");
var RawChart = require("./RawChart");

/**
 * Renders container for Specificity or Complexity chart.
 * <Chart title={string} id={string} series={string} onRender={Function}/>
 */
module.exports = React.createClass({
    displayName: "Chart",

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    render: function() {
        return (
            <div className="uniq-sizes">
                <h2 onClick={this.toggle}>{this.props.title}</h2>
                {this.renderRawChart()}
            </div>
        );
    },

    renderRawChart: function() {
        if (this.state.expanded) {
            return <RawChart id={this.props.id} series={this.props.series} onRender={this.props.onRender}/>;
        }
        else {
            return [];
        }
    },

    toggle: function() {
        this.setState({expanded: !this.state.expanded});
    }

});
