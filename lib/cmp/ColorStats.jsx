var React = require("react");
var ColorTable = require("./ColorTable");

/**
 * Renders colors statistics view.
 * <ColorStats title={string} stats={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorStats",

    render: function() {
        return (
            <div className="color-stats">
                <h1>{this.props.title}</h1>
                {this.renderTables()}
            </div>
        );
    },

    renderTables: function() {
        return this.props.stats.filter(function(group){
            return group.colors.length > 0;
        }).map(function(group){
            return <ColorTable title={group.title} colors={group.colors} onSelect={this.props.onSelect}/>;
        }, this);
    }
});
