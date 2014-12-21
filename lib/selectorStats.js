var _ = require("lodash");
var SelectorIterator = require("./SelectorIterator");
var specificity = require("specificity");
var chartable = require("chartable");

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

    types = _(parts).countBy().map(function(count, type) {
        return {type: type, count: count};
    }).sortBy("count").reverse().value();

    var specificities = [];
    iterator.eachSelector(function(selector){
        specificities.push(specificity.calculate(selector)[0].specificity);
    });
    var specificityValues = specificities.map(function(str){
        return str.split(/,/).map(parseFloat);
    });
    var max = _(specificityValues).flatten().max();
    var specificityValues = specificityValues.map(function(specs){
        return specs[1]*max*max + specs[2]*max + specs[3];
    });

    var complexities = [];
    iterator.eachSelector(function(selector){
        var count = 0;
        new SelectorIterator(selector).eachSelectorPart(function(sel) {
            count++;
        });
        if (count > 0) {
            complexities.push(count);
        }
    });

    return {
        types: types,
        specificityChart: chartable.lineGraph(specificityValues, { width: 1152, height: 320 }),
        complexityChart: chartable.lineGraph(complexities, { width: 1152, height: 320 }),
    };

};
