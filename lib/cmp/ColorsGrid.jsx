var React = require("react");
var ColorsGridCell = require("./ColorsGridCell");

/**
 * Renders summary-grid of colors.
 * <ColorsGrid colors={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorsGrid",

    render: function() {
        return (
            <div>
                <h1>{this.props.colors.length} unique colors</h1>
                <div className="colors-grid">
                    {this.renderCells()}
                </div>
            </div>
        );
    },

    renderCells: function() {
        return this.props.colors.map(function(color){
            return <ColorsGridCell
                        size={color.size}
                        scale={color.scale}
                        hexColor={color.hexColor}
                        key={color.hexColor}
                        onClick={this.onColorSelect.bind(this, color)} />
        }, this);
    },

    onColorSelect: function(color) {
        this.props.onSelect(color.decls);
    }
});
