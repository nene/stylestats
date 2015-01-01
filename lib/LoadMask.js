var Spinner = require("spin");

/**
 * Spinning load-mask shown over given element.
 * @param {jQuery} el
 */
function LoadMask(el) {
    this.el = el;
    this.spinner = new Spinner().spin(this.el[0]);
}
LoadMask.prototype = {
    show: function() {
        this.el.show();
    },
    hide: function() {
        this.el.hide();
    }
};

module.exports = LoadMask;
