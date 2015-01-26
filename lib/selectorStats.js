var _ = require("lodash");
var selectorCount = require("./selectorCount");
var selectorTypes = require("./selectorTypes");

module.exports = function(iterator) {
    return {
        count: selectorCount(iterator),
        types: selectorTypes(iterator)
    };
};
