var React = require("react");
var ColorTable = require("./ColorTable");

module.exports = React.createClass({
    displayName: "ColorStats",

    render: function() {
        return (
            <div className="color-stats">
                <h1>Colors</h1>
                {this.renderTables()}
            </div>
        );
    },

    renderTables: function() {
        return this.props.stats.filter(function(group){
            return group.colors.length > 0;
        }).map(function(group){
            return <ColorTable title={group.title} colors={group.colors}/>;
        });
    }
});
