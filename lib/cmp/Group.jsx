var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * A grouped section.
 * <Group title={string} count={number}>{children}</Group>
 */
module.exports = React.createClass({
    displayName: "Group",

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    render: function() {
        return (
            <div className="group">
                <h2 className="group__title">
                    <a href="#" className="group__link" onClick={this.toggle}>{this.props.title}</a>
                    {this.renderCount()}
                </h2>
                {this.renderChildren()}
            </div>
        );
    },

    renderChildren: function() {
        if (this.state.expanded) {
            return this.props.children;
        }
    },

    renderCount: function() {
        if (this.props.count) {
            return <span className="group__count">{this.props.count}</span>;
        }
    },

    toggle: function(event) {
        event.preventDefault();
        console.log("toggle");
        this.setState({expanded: !this.state.expanded});
    }
});
