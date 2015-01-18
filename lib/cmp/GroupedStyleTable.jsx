var _ = require("lodash");
var React = require("react");

/**
 * Renders table with style stats.
 * <GroupedStyleTable title={string} total={number} groups={Object[]} onSelect={Function}/>
 */
module.exports = React.createClass({
    displayName: "GroupedStyleTable",

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    render: function() {
        return (
            <table className="grouped-style-table">
                <thead>
                    <tr className="style-table__h1" onClick={this.expand}>
                        <th></th>
                        <th className="style-table__values">{this.props.title}</th>
                        <th className="style-table__count">{this.props.total}</th>
                    </tr>
                </thead>
                {this.optionallyRenderRows()}
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
        return this.props.groups.map(function(group) {
            return (
                <tr className="style-table__h2">
                    <th></th>
                    <th className="style-table__values">{group.title}</th>
                    <th className="style-table__count">{group.values.length}</th>
                </tr>
            );
        }, this);
    },
});
