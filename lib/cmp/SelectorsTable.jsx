var _ = require("lodash");
var React = require("react");
var Group = require("./Group");

/**
 * Renders table with selectors stats.
 * <SelectorsTable stats={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "GroupedStyleTable",

    render: function() {
        return (
            <Group title="Selectors" count={this.props.stats.count}>
                {this.renderTypes()}
            </Group>
        );
    },

    renderTypes: function(values) {
        return this.props.stats.types.map(function(type){
            return (
                <div className="style-example">
                    <span className="style-example__example"></span>
                    <span className="style-example__variants">{type.type}</span>
                    <span className="style-example__count">{type.count}</span>
                </div>
            );
        });
    }
});
