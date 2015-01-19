var _ = require("lodash");
var React = require("react");
var Group = require("./Group");

/**
 * Renders table with style stats.
 * <GroupedStyleTable title={string} total={number} groups={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "GroupedStyleTable",

    render: function() {
        return (
            <Group title={this.props.title} count={this.props.total}>
                {this.renderRows()}
            </Group>
        );
    },

    renderRows: function() {
        return this.props.groups.map(function(group) {
            return (
                <Group title={group.title} count={group.values.length}></Group>
            );
        }, this);
    },
});
