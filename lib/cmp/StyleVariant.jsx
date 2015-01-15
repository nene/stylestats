var React = require("react");

/**
 * Renders a simple link with style name and registers a
 * click callback.
 * <StyleVariant group={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleVariant",

    render: function() {
        return (
            <a href="#" onClick={this.onClick}>
                {this.props.group.value}
            </a>
        );
    },

    onClick: function(e) {
        e.preventDefault();
        this.props.onSelect(this.props.group.decls);
    }
});
