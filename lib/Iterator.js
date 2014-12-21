var valueParser = require("css-property-value-parser");

function Iterator(ast) {
    this.ast = ast;
}
Iterator.prototype = {
    colorFunctions: {rgb: true, rgba: true, hsl: true, hsla: true},

    /**
     * Iterates over each color value inside all property values.
     * @param {Function} fn Called with:
     * - color string
     * - property name
     */
    eachColor: function(fn) {
        this.eachValue(function(val, prop) {
            if (val.type === "color") {
                fn(val.value, prop);
            }
            else if (val.type === "function" && this.isColorFunction(val.name)) {
                fn(valueParser.format(val), prop);
            }
        }.bind(this));
    },

    isColorFunction: function(name) {
        return !!this.colorFunctions[name];
    },

    /**
     * Loops over each value inside all property values.
     * @param {Function} fn Called with:
     * - value object,
     * - property name
     */
    eachValue: function(fn) {
        this.eachDecl(function(prop, values, important) {
            values.forEach(function(v) {
                this.iterateValue(v, prop, fn);
            }.bind(this));
        }.bind(this));
    },

    /**
     * Loops over each declaration.
     * @param {Function} fn Called with:
     * - property name,
     * - value object,
     * - important?
     */
    eachDecl: function(fn) {
        this.ast.eachDecl(function(decl) {
            var values = valueParser.parse(decl.value);
            fn(decl.prop, values, decl.important);
        }.bind(this));
    },

    iterateValue: function(value, prop, fn) {
        fn(value, prop);

        if (value.type === "function") {
            value.params.forEach(function(v){
                this.iterateValue(v, prop, fn);
            }.bind(this));
        }
    },

    /**
     * Loops over each selector.
     * @param  {Function} fn Called with parsed selector AST node.
     */
    eachSelector: function(fn) {
        this.ast.eachRule(function(rule) {
            rule.selectors.forEach(function(sel) {
                if (!this.isPercentageSelector(sel)) {
                    fn(sel);
                }
            }.bind(this));
        }.bind(this));
    },

    isPercentageSelector: function(selector) {
        return /^([0-9]+|[0-9]*.[0-9]+)%$/.test(selector);
    },
};

module.exports = Iterator;
