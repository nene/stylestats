var React = require("react");

/**
 * Renders the actual Specificity or Complexity chart of selectors.
 * <RawChart id={string} series={string} onRender={Function}/>
 */
module.exports = React.createClass({
    displayName: "RawChart",

    render: function() {
        return (
            <div id={this.props.id} data-series={this.props.series}></div>
        );
    },

    componentDidMount: function() {
        this.props.onRender();
    }

});
