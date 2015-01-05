var Spinner = require("spin");

/**
 * Spinning load-mask shown over given element.
 * @param {jQuery} el
 */
module.exports = class LoadMask {
    constructor(el) {
        this.el = el;
        this.spinner = new Spinner().spin(this.el[0]);
    }
    show() {
        this.el.show();
    }
    hide() {
        this.el.hide();
    }
};
