var React = require("react");
var stats = require("../stats");
var StatsContent = require("./StatsContent");
var CssContent = require("./CssContent");

module.exports = React.createClass({
    displayName: "Page",

    render: function() {
        var statsData = stats(this.props.css);

        return (
            <div className="page">
                <StatsContent data={statsData}/>
                <CssContent css={this.props.css}/>
            </div>
        );
    }
});
