var React = require("react");

module.exports = React.createClass({
    displayName: "CssContent",

    render: function() {
        return (
            <div className="css-content">
                <pre><code>{this.props.css}</code></pre>
            </div>
        );
    }
});
