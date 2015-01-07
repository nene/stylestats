var React = require("react");

/**
 * Renders single cell in colors grid.
 * <ColorsGridCell size={number} hexColor={string} onClick={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorsGridCell",

    render: function() {
        var css = {
            width: this.props.size + "px",
            height: this.props.size + "px",
            // Scale the bubbles up 2x, so that the largest ones
            // will reach up to the center of surrounding bubbles.
            transform: "scale(" + (this.props.scale * 2) + ")",
            // To avoid larger bubbles covering up smaller ones,
            // render the smaller ones at the top.
            zIndex: Math.floor((1 - this.props.scale)*100)+1,
            backgroundColor: this.props.hexColor
        };

        return (
            <span className="colors-grid-cell" style={css} onClick={this.props.onClick}></span>
        );
    }
});
