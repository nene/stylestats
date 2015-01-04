var React = require("react");
var ColorsGrid = require("./ColorsGrid");
var ColorStats = require("./ColorStats");
var Chart = require("./Chart");
var renderCharts = require("../renderCharts");

module.exports = React.createClass({
    displayName: "StatsContent",
    render: function() {
        var data = this.props.data;

        return (
            <div className="stats-content">
                <ColorsGrid colors={data.gridColors}/>
                <Chart title="Specificity chart" id="specificity-chart" series={data.selectorStats.specificityChart}/>
                <Chart title="Complexity chart" id="complexity-chart" series={data.selectorStats.complexityChart}/>
                <ColorStats stats={data.colorStats} onSelect={this.props.onSelect}/>
            </div>
        );
    },
    componentDidMount: function() {
        renderCharts();
    }
});
