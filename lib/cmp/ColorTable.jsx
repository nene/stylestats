var React = require("react");
var ColorVariant = require("./ColorVariant");
var CountedColorVariant = require("./CountedColorVariant");

/**
 * Renders table of colors.
 * <ColorTable title={string} colors={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "ColorTable",

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    render: function() {
        return (
            <table className="style-table">
                <tr className="style-table-h1" onClick={this.expand}>
                    <th></th>
                    <th className="style-values">{this.props.title}</th>
                    <th className="style-count">{this.props.colors.length}</th>
                </tr>
                {this.optionallyRenderRows()}
            </table>
        );
    },

    expand: function() {
        this.setState({expanded: !this.state.expanded});
    },

    optionallyRenderRows: function() {
        return this.state.expanded ? this.renderRows() : [];
    },

    renderRows: function() {
        return this.props.colors.map(function(color) {
            var css = {
                backgroundColor: color.hexColor
            };

            return (
                <tr className="style-table-row">
                    <td className="style-example" style={css}></td>
                    <td className="style-values">{this.renderVariants(color.variants)}</td>
                    <td className="style-count">{color.count}</td>
                </tr>
            );
        }, this);
    },

    renderVariants: function(variants) {
        var elements = variants.map((group) => {
            if (variants.length > 1) {
                return <CountedColorVariant group={group} onSelect={this.props.onSelect}/>;
            } else {
                return <ColorVariant group={group} onSelect={this.props.onSelect}/>;
            }
        });

        return this.addSeparators(elements, ", ");
    },

    addSeparators: function(items, separator) {
        var result = [];

        items.forEach(function(item, i){
            if (i > 0) {
                result.push(separator);
            }
            result.push(item);
        });

        return result;
    }
});
