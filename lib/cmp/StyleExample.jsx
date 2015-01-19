var _ = require("lodash");
var React = require("react");
var StyleVariant = require("./StyleVariant");
var CountedStyleVariant = require("./CountedStyleVariant");

/**
 * Renders table with style stats.
 * <StyleExample style={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleExample",

    render: function() {
        var style = this.props.style;

        var css = {
            background: style.backgroundStyle
        };

        return (
            <div className="style-example">
                <span className="style-example__example" style={css} onClick={this.onStyleSelect.bind(this, style)}></span>
                <span className="style-example__variants">{this.renderVariants(style.variants)}</span>
                <span className="style-example__count">{style.count}</span>
            </div>
        );
    },

    onStyleSelect: function(style) {
        var decls = _(style.variants).map("decls").flatten().value();
        this.props.onSelect(decls);
    },

    renderVariants: function(variants) {
        var elements = variants.map((group) => {
            if (variants.length > 1) {
                return <CountedStyleVariant key={group.value} group={group} onSelect={this.props.onSelect}/>;
            } else {
                return <StyleVariant key={group.value} group={group} onSelect={this.props.onSelect}/>;
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
