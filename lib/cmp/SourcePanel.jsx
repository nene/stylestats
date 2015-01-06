var React = require("react");

/**
 * Renders CSS source panel.
 * <SourcePanel css={string}/>
 */
module.exports = React.createClass({
    displayName: "SourcePanel",

    render: function() {
        return (
            <div className="source-panel">
                <pre><code dangerouslySetInnerHTML={{__html:this.props.css}} /></pre>
            </div>
        );
    }
});
