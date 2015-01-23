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
                <Group key={group.title} title={group.title} count={group.values.length}>
                    {this.renderValues(group.values)}
                </Group>
            );
        }, this);
    },

    renderValues: function(values) {
        return values.map(function(value){
            return (
                <div className="style-example">
                    <span className="style-example__example"></span>
                    <span className="style-example__variants">{value.value}</span>
                    <span className="style-example__count">{value.count}</span>
                </div>
            );
        });
    }
});
