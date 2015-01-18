var React = require("react");
var Group = require("./Group");
var ColorsGridCell = require("./ColorsGridCell");

/**
 * Renders summary-grid of colors.
 * <ColorsGrid colors={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorsGrid",

    render: function() {
        var title = this.props.colors.length + " unique colors";
        return (
            <Group title={title}>
                <div className="colors-grid">
                    {this.renderCells()}
                </div>
            </Group>
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
