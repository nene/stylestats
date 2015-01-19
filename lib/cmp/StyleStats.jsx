var React = require("react");
var StyleTable = require("./StyleTable");
var Group = require("./Group");

/**
 * Renders styles statistics view.
 * <StyleStats title={string} stats={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleStats",

    render: function() {
        return (
            <Group title={this.props.title}>
                {this.renderTables()}
            </Group>
        );
    },

    renderTables: function() {
        return this.props.stats.filter(function(group){
            return group.styles.length > 0;
        }).map(function(group){
            return <StyleTable key={group.title} title={group.title} styles={group.styles} onSelect={this.props.onSelect}/>;
        }, this);
    }
});
