var React = require("react");

/**
 * Renders single cell in colors grid.
 * <ColorsGridCell size={number} hexColor={string}/>
 */
module.exports = React.createClass({
    displayName: "ColorsGridCell",

    render: function() {
        var css = {
            width: this.props.size + "px",
            height: this.props.size + "px",
            backgroundColor: this.props.hexColor
        };

        return (
            <span className="colors-grid-cell" style={css}></span>
        );
    }
});
