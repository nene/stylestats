var React = require("react");

/**
 * Renders Specificity or Complexity chart of selectors.
 * <Chart title={string} id={string} series={string}/>
 */
module.exports = React.createClass({
    displayName: "Chart",

    render: function() {
        return (
            <div className="uniq-sizes">
                <h2>{this.props.title}</h2>
                <div id={this.props.id} data-series={this.props.series}></div>
            </div>
        );
    }
});
