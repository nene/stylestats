var React = require("react");

module.exports = React.createClass({
    displayName: "ColorTable",

    render: function() {
        return (
            <table className="style-table">
                <tr className="style-table-h1">
                    <th></th>
                    <th className="style-values">{this.props.title}</th>
                    <th className="style-count">{this.props.colors.length}</th>
                </tr>
                {this.renderRows()}
            </table>
        );
    },

    renderRows: function() {
        return this.props.colors.map(function(color) {
            var css = {
                backgroundColor: color.hexColor
            };

            return (
                <tr className="style-table-row">
                    <td className="style-example" style={css}></td>
                    <td className="style-values">{color.variants}</td>
                    <td className="style-count">{color.count}</td>
                </tr>
            );
        });
    }
});
