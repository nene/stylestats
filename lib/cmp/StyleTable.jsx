var _ = require("lodash");
var React = require("react");
var Group = require("./Group");
var StyleExample = require("./StyleExample");

/**
 * Renders table with style stats.
 * <StyleTable title={string} styles={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleTable",

    render: function() {
        return (
            <Group title={this.props.title} count={this.props.styles.length}>
                {this.renderRows()}
            </Group>
        );
    },

    renderRows: function() {
        return this.props.styles.map(function(style) {
            return <StyleExample key={style.backgroundStyle} style={style} onSelect={this.props.onSelect}/>;
        }, this);
    },

});
