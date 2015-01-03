var React = require("react");
var ColorsGridCell = require("./ColorsGridCell");

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
            return <ColorsGridCell size={color.size} hexColor={color.hexColor} key={color.hexColor} />
        });
    }
});
