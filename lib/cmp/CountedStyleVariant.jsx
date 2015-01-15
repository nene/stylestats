var React = require("react");
var StyleVariant = require("./StyleVariant");

/**
 * Like StyleVariant, but also displays the count of declarations
 * using this style variant.
 * <CountedStyleVariant group={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "CountedStyleVariant",

    render: function(group) {
        return (
            <span>
                <StyleVariant group={this.props.group} onSelect={this.props.onSelect}/>
                {" "}
                ({this.props.group.decls.length})
            </span>
        );
    }
});
