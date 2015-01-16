var React = require("react");

/**
 * Renders single cell in colors grid.
 * <ColorsGridCell size={number} hexColor={string} onClick={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorsGridCell",

    render: function() {
        var size = this.props.size;
        // Cap the max size at 50px
        if (size > 50) {
            size = 50;
        }

        // Enable more agressive scaling when we have more that 6 x 6 grid.
        var scaleMultiplier = size < 50 ? 2 : 1.2;

        var css = {
            width: size + "px",
            height: size + "px",
            // Scale the bubbles up 2x or 1.2x, so that the largest ones
            // will reach up to the center of surrounding bubbles.
            transform: "scale(" + (this.props.scale * scaleMultiplier) + ")",
            // To avoid larger bubbles covering up smaller ones,
            // render the smaller ones at the top.
            zIndex: Math.floor((1 - this.props.scale)*100)+1,
            backgroundColor: this.props.hexColor
        };

        return (
            <span className="colors-grid__cell" style={css} onClick={this.props.onClick}></span>
        );
    }
});
