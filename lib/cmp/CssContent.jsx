var React = require("react");

/**
 * Renders CSS source panel.
 * <CssContent css={string}/>
 */
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
