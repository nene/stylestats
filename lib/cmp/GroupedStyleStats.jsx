var React = require("react");
var GroupedStyleTable = require("./GroupedStyleTable");

/**
 * Renders grouped styles statistics view.
 * <GroupedStyleStats title={string} stats={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "GroupedStyleStats",

    render: function() {
        return (
            <div className="grouped-style-stats">
                <h1>{this.props.title}</h1>
                {this.renderTables()}
            </div>
        );
    },

    renderTables: function() {
        return this.props.stats.filter(function(stat){
            return stat.groups.length > 0;
        }).map(function(stat){
            return <GroupedStyleTable title={stat.title} total={stat.total}
                        groups={stat.groups} onSelect={this.props.onSelect}/>;
        }, this);
    }
});
