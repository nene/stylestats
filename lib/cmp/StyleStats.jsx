var React = require("react");
var StyleTable = require("./StyleTable");

/**
 * Renders styles statistics view.
 * <StyleStats title={string} stats={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleStats",

    render: function() {
        return (
            <div className="style-stats">
                <h1>{this.props.title}</h1>
                {this.renderTables()}
            </div>
        );
    },

    renderTables: function() {
        return this.props.stats.filter(function(group){
            return group.colors.length > 0;
        }).map(function(group){
            return <StyleTable title={group.title} colors={group.colors} onSelect={this.props.onSelect}/>;
        }, this);
    }
});
