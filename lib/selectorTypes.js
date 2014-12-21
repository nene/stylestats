var _ = require("lodash");
var SelectorIterator = require("./SelectorIterator");

module.exports = function(iterator) {
    var parts = [];
    iterator.eachSelector(function(selector){
        new SelectorIterator(selector).eachSelectorPart(function(sel) {
            if (sel.type === "universal") {
                parts.push("*");
            }
            else if (sel.type === "element") {
                parts.push("E");
            }
            else if (sel.type === "id") {
                parts.push("#id");
            }
            else if (sel.type === "class") {
                parts.push(".class");
            }
            else if (sel.type === "combinator") {
                parts.push("E " + sel.operator + " F");
            }
            else if (sel.type === "attribute") {
                if (sel.operator) {
                    parts.push("[attr" + sel.operator + "value]");
                }
                else {
                    parts.push("[attr]");
                }
            }
            else if (sel.type === "pseudo") {
                parts.push(":" + sel.name + (sel.value ? "()" : ""));
            }
            else {
                parts.push(sel.type);
            }
        });
    });

    return _(parts).countBy().map(function(count, type) {
        return {type: type, count: count};
    }).sortBy("count").reverse().value();
};
