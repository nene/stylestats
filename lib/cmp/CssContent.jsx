var React = require("react");

module.exports = React.createClass({
    displayName: "CssContent",

    render: function() {
        return (
            <div className="css-content">
                <pre><code dangerouslySetInnerHTML={{__html:this.props.css}} /></pre>
            </div>
        );
    }
});
