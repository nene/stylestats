var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * A grouped section.
 * <Group title={string}>{children}</Group>
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

    toggle: function(event) {
        event.preventDefault();
        this.setState({expanded: !this.state.expanded});
    }
});
