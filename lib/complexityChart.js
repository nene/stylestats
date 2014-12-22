var _ = require("lodash");
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

    return JSON.stringify(complexities);
};
