var _ = require("lodash");
var specificity = require("specificity");

module.exports = function(iterator) {
    var specificities = [];
    iterator.eachSelector(function(selector, rule){
        var str = specificity.calculate(selector)[0].specificity;
        var arr = str.split(/,/).map(parseFloat);
        var important = hasImportant(rule) ? 1 : 0;
        specificities.push({
            selector: selector,
            imp: important,
            id: arr[1],
            cls: arr[2],
            el: arr[3]
        });
    });

    function hasImportant(rule) {
        return _(rule.childs).some({important: true});
    }

    // Find maximum value of each specificity category
    var max = {};
    ["imp", "id", "cls", "el"].forEach(function(key) {
        max[key] = _(specificities).pluck(key).max();
    });

    // Array of number representing relative specificity
    var specificityValues = specificities.map(function(specs){
        return [
            specs.selector,
            specs.el,
            specs.cls * max.el,
            specs.id  * max.el*max.cls,
            specs.imp * max.el*max.cls*max.id,
        ];
    });

    return JSON.stringify(specificityValues);
};
