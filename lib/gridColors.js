var _ = require("lodash");
var cbrt = require("./cbrt");

/**
 * Calculates the size of cells for fitting all colors inside a 300x300 box.
 *
 * @param  {Object[]} colors Objects with backgroundStyle field.
 * @return {Object[]} Objects with hexColor, size, decls and scale fields.
 */
module.exports = function(colors) {
    // calculate the size of one cell inside 300x300 box
    var sideWidth = 300;
    var cellsInRow = Math.ceil(Math.sqrt(colors.length));
    var size = sideWidth / cellsInRow;

    // Find out how many times the most used color is used
    var maxDeclCount = _(colors).map(declarationCount).max();
    var maxDeclCountCbrt = cbrt(maxDeclCount);

    return colors.map(function(color){
        var decls = declarations(color);
        var declCount = decls.length;

        return {
            hexColor: color.backgroundStyle,
            size: size,
            decls: decls,
            // Assign a relative weight, describing how many times the
            // color is used compared to the most used color.
            // We will display these sizes as spheres,
            // so compare the cube roots to calculate the relative diameters.
            scale: cbrt(declCount) / maxDeclCountCbrt
        };
    });
};

function declarationCount(color) {
    return declarations(color).length;
}

function declarations(color) {
    return _(color.variants).map("decls").flatten().value();
}
