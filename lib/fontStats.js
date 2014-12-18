var _ = require("lodash");
var valueParser = require("css-property-value-parser");
var parseFont = require("./parseFont");

module.exports = function(iterator) {
    var fontSizes = [];
    iterator.eachDecl(function(prop, values) {
        if (prop === "font-size") {
            fontSizes.push(values[0]);
        }
        else if (prop === "font") {
            var font = parseFont(values);
            if (font["font-size"]) {
                fontSizes.push(font["font-size"]);
            }
        }
    });

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

    var groups = _(fontSizes).groupBy(getGroupName).map(function(values, groupName) {
        return {
            title: "unique " + groupName + " font sizes",
            values: _(values).sortBy("value").map(valueParser.format).countBy().map(function(count, value) {
                return {value: value, count: count};
            }).value()
        };
    }).sortBy(groupLength).reverse().value();

    var total = groups.map(groupLength).reduce(add, 0);

    return {
        total: total,
        groups: groups
    };
};
