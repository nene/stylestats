/**
 * Calculates the size of cells for fitting all colors inside a 300x300 box.
 *
 * @param  {Object[]} colors Objects with hexColor field.
 * @return {Object[]} Objects with hexColor and size fields.
 */
module.exports = function(colors) {
    // calculate the size of one cell inside 300x300 box
    var sideWidth = 300;
    var cellsInRow = Math.ceil(Math.sqrt(colors.length));
    var size = sideWidth / cellsInRow;

    return colors.map(function(color){
        return {
            hexColor: color.hexColor,
            size: size
        };
    });
};
