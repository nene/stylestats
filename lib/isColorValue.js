var colorFunctions = {
    rgb: true,
    rgba: true,
    hsl: true,
    hsla: true
};

function isColorFunction(val) {
    return val.type === "function" && colorFunctions[val.name];
}

/**
 * True when given CSS value is color literal or color function.
 * @param  {Object} val CSS value object from css-value-parser.
 * @return {Boolean}
 */
module.exports = function(val) {
    return val.type === "color" || isColorFunction(val);
};

