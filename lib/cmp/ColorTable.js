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
                    <td className="style-values">{this.renderVariants(color.variants)}</td>
                    <td className="style-count">{color.count}</td>
                </tr>
            );
        }, this);
    },

    renderVariants: function(variants) {
        var renderFn = (variants.length > 1) ? this.renderCountedVariant : this.renderPlainVariant;
        var elements = variants.map(renderFn, this);

        return this.addSeparators(elements, ", ");
    },

    renderCountedVariant: function(group) {
        return (
            <span>
                {this.renderPlainVariant(group)}
                {" "}
                ({group.decls.length})
            </span>
        );
    },

    renderPlainVariant: function(group) {
        return <a href="#" onClick={this.createClickHandler(this.onVariantSelect, group)}>{group.value}</a>;
    },

    createClickHandler: function(fn, param) {
        var boundFn = fn.bind(this, param);
        return function(e){
            e.preventDefault();
            return boundFn();
        };
    },

    onVariantSelect: function(group) {
        this.props.onSelect(group.decls);
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
