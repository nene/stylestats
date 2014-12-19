var _ = require("lodash");
var valueParser = require("css-property-value-parser");

module.exports = function(sizes, title) {
    function getGroupName(val) {
        if (val.type === "dimension") {
            return val.unit;
        } else {
            return val.type;
        }
    }

    function groupLength(group) {
        return group.values.length;
    }

    function add(a, b) {
        return a + b;
    }

    var groups = _(sizes).groupBy(getGroupName).map(function(values, groupName) {
        return {
            title: "unique " + groupName + " " + title,
            values: _(values).sortBy("value").map(valueParser.format).countBy().map(function(count, value) {
                return {value: value, count: count};
            }).value()
        };
    }).sortBy(groupLength).reverse().value();

    var total = groups.map(groupLength).reduce(add, 0);

    return {
        total: total,
        title: "unique " + title,
        groups: groups
    };
};
