var _ = require("lodash");
var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var StyleVariant = require("./StyleVariant");
var CountedStyleVariant = require("./CountedStyleVariant");

/**
 * Renders table with style stats.
 * <StyleTable title={string} styles={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "StyleTable",

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    render: function() {
        return (
            <table className="style-table">
                <thead>
                    <tr className="style-table__h1" onClick={this.expand}>
                        <th></th>
                        <th className="style-table__values">{this.props.title}</th>
                        <th className="style-table__count">{this.props.styles.length}</th>
                    </tr>
                </thead>
                <ReactCSSTransitionGroup component="tbody" transitionName="transition">
                    {this.optionallyRenderRows()}
                </ReactCSSTransitionGroup>
            </table>
        );
    },

    expand: function() {
        this.setState({expanded: !this.state.expanded});
    },

    optionallyRenderRows: function() {
        if (this.state.expanded) {
            return this.renderRows();
        }
        else {
            return [];
        }
    },

    renderRows: function() {
        return this.props.styles.map(function(style) {
            var css = {
                background: style.backgroundStyle
            };

            return (
                <tr className="style-table__row" key={style.backgroundStyle}>
                    <td className="style-table__example" style={css} onClick={this.onStyleSelect.bind(this, style)}></td>
                    <td className="style-table__values">{this.renderVariants(style.variants)}</td>
                    <td className="style-table__count">{style.count}</td>
                </tr>
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
