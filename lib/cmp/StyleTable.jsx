var _ = require("lodash");
var React = require("react");
var StyleVariant = require("./StyleVariant");
var CountedStyleVariant = require("./CountedStyleVariant");
var Group = require("./Group");

/**
 * Renders table with style stats.
 * <StyleTable title={string} styles={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleTable",

    render: function() {
        return (
            <Group title={this.props.title} count={this.props.styles.length}>
                {this.renderRows()}
            </Group>
        );
    },

    renderRows: function() {
        return this.props.styles.map(function(style) {
            var css = {
                background: style.backgroundStyle
            };

            return (
                <div className="style-example" key={style.backgroundStyle}>
                    <span className="style-example__example" style={css} onClick={this.onStyleSelect.bind(this, style)}></span>
                    <span className="style-example__variants">{this.renderVariants(style.variants)}</span>
                    <span className="style-example__count">{style.count}</span>
                </div>
            );
        }, this);
    },

    onStyleSelect: function(style) {
        var decls = _(style.variants).map("decls").flatten().value();
        this.props.onSelect(decls);
    },

    renderVariants: function(variants) {
        var elements = variants.map((group) => {
            if (variants.length > 1) {
                return <CountedStyleVariant group={group} onSelect={this.props.onSelect}/>;
            } else {
                return <StyleVariant group={group} onSelect={this.props.onSelect}/>;
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
