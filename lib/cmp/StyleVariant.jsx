var React = require("react");

/**
 * Renders a simple link with style name and registers a
 * click callback.
 * <StyleVariant group={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleVariant",

    render: function() {
        var onClickHandler = this.createOnClickHandler(this.onSelect, this.props.group);
        return (
            <a href="#" onClick={onClickHandler}>
                {this.props.group.value}
            </a>
        );
    },

    createOnClickHandler: function(fn, param) {
        var boundFn = fn.bind(this, param);
        return function(e){
            e.preventDefault();
            return boundFn();
        };
    },

    onSelect: function(group) {
        this.props.onSelect(group.decls);
    }
});
