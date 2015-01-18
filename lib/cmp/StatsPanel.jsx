var React = require("react");
var ColorsGrid = require("./ColorsGrid");
var StyleStats = require("./StyleStats");
var GroupedStyleStats = require("./GroupedStyleStats");
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
                    series={stats.selectorStats.specificityChart}
                    onRender={chartsRenderer.renderSpecificity}/>
                <Chart title="Complexity chart" id="complexity-chart"
                    series={stats.selectorStats.complexityChart}
                    onRender={chartsRenderer.renderComplexity}/>
                <StyleStats title="Colors" stats={stats.colorStats} onSelect={this.props.onSelect}/>
                <StyleStats title="Gradients" stats={stats.gradientStats} onSelect={this.props.onSelect}/>
                <GroupedStyleStats title="Sizes" stats={stats.sizeStats} onSelect={this.props.onSelect}/>
            </div>
        );
    }
});
