var React = require("react/addons");
var RawChart = require("./RawChart");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        var transitionGroup = (
            <ReactCSSTransitionGroup transitionName="transition">
                {this.renderRawChart()}
            </ReactCSSTransitionGroup>
        );

        return (
            <div className="chart">
                <h2 className="chart__title" onClick={this.toggle}>{this.props.title}</h2>
                {transitionGroup}
            </div>
        );
    },

    renderRawChart: function() {
        if (this.state.expanded) {
            return <RawChart key={this.props.id} id={this.props.id} series={this.props.series} onRender={this.props.onRender}/>;
        }
        else {
            return [];
        }
    },

    toggle: function() {
        this.setState({expanded: !this.state.expanded});
    }

});
