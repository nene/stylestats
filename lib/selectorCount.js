
module.exports = function(iterator) {
    var count = 0;
    iterator.eachSelector(function(selector){
        count++;
    });

    return count;
};
