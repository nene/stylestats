var tinycolor = require("tinycolor2");

/**
 * Turns color string into integer value that can be used for sorting colors.
 * @param  {String} colorStr
 * @return {Number}
 */
module.exports = function(colorStr) {
    var hsl = tinycolor(colorStr).toHsl();
    return hsl.h*1000000 + hsl.s*10000 + hsl.l*100;
};
