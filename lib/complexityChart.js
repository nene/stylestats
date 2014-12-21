var _ = require("lodash");
var chartable = require("chartable");
var SelectorIterator = require("./SelectorIterator");

module.exports = function(iterator) {
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

    return chartable.lineGraph(complexities, { width: 1152, height: 320 });
};
