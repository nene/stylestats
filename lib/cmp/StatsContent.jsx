var React = require("react");
var ColorsGrid = require("./ColorsGrid");
var ColorStats = require("./ColorStats");
var Chart = require("./Chart");
var renderCharts = require("../renderCharts");

/**
 * Renders statistics panel.
 * <StatsContent stats={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StatsContent",

    render: function() {
        var stats = this.props.stats;

        return (
            <div className="stats-content">
                <ColorsGrid colors={stats.gridColors}/>
                <Chart title="Specificity chart" id="specificity-chart" series={stats.selectorStats.specificityChart}/>
                <Chart title="Complexity chart" id="complexity-chart" series={stats.selectorStats.complexityChart}/>
                <ColorStats stats={stats.colorStats} onSelect={this.props.onSelect}/>
            </div>
        );
    },

    componentDidMount: function() {
        renderCharts();
    }
});
