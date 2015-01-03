var React = require("react");
var ColorsGrid = require("./ColorsGrid");
var Chart = require("./Chart");
var renderCharts = require("../renderCharts");

module.exports = React.createClass({
    displayName: "Stats",
    render: function() {
        var data = this.props.data;

        return (
            <div className="all-stats">
                <ColorsGrid colors={data.gridColors}/>
                <Chart title="Specificity chart" id="specificity-chart" series={data.selectorStats.specificityChart}/>
                <Chart title="Complexity chart" id="complexity-chart" series={data.selectorStats.complexityChart}/>
            </div>
        );
    },
    componentDidMount: function() {
        renderCharts();
    }
});
