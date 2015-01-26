var React = require("react");
var ColorsGrid = require("./ColorsGrid");
var StyleStats = require("./StyleStats");
var GroupedStyleStats = require("./GroupedStyleStats");
var SelectorsTable = require("./SelectorsTable");
var Chart = require("./Chart");
var chartsRenderer = require("../chartsRenderer");

/**
 * Renders statistics panel.
 * <StatsPanel stats={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StatsPanel",

    render: function() {
        var stats = this.props.stats;

        return (
            <div className="stats-panel">
                <ColorsGrid colors={stats.gridColors} onSelect={this.props.onSelect}/>
                <Chart title="Specificity chart" id="specificity-chart"
                    series={stats.specificityChart}
                    onRender={chartsRenderer.renderSpecificity}/>
                <Chart title="Complexity chart" id="complexity-chart"
                    series={stats.complexityChart}
                    onRender={chartsRenderer.renderComplexity}/>
                <StyleStats title="Colors" stats={stats.colorStats} onSelect={this.props.onSelect}/>
                <StyleStats title="Gradients" stats={stats.gradientStats} onSelect={this.props.onSelect}/>
                <GroupedStyleStats title="Sizes" stats={stats.sizeStats} onSelect={this.props.onSelect}/>
                <SelectorsTable stats={stats.selectorStats} onSelect={this.props.onSelect}/>
            </div>
        );
    }
});
