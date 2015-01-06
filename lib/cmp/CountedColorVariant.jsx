var React = require("react");
var ColorVariant = require("./ColorVariant");

/**
 * Like ColorVariant, but also displays the count of declarations
 * using this color variant.
 * <CountedColorVariant group={Object} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "CountedColorVariant",

    render: function(group) {
        return (
            <span>
                <ColorVariant group={this.props.group} onSelect={this.props.onSelect}/>
                {" "}
                ({this.props.group.decls.length})
            </span>
        );
    }
});
