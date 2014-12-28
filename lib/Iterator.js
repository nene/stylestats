var valueParser = require("css-value-parser");
var isColorValue = require("./isColorValue");

function Iterator(ast) {
    this.ast = ast;
}
Iterator.prototype = {
    /**
     * Iterates over each color value inside all property values.
     * @param {Function} fn Called with:
     * - color string
     * - property name
     * - parent function object the value is in (optional)
     */
    eachColor: function(fn) {
        this.eachValue(function(val, prop, parentValue) {
            if (isColorValue(val)) {
                fn(valueParser.format(val), prop, parentValue);
            }
        }.bind(this));
    },

    /**
     * Loops over each value inside all property values.
     * @param {Function} fn Called with:
     * - value object
     * - property name
     * - parent function object the value is in (optional)
     */
    eachValue: function(fn) {
        this.eachDecl(function(prop, values, important) {
            values.forEach(function(v) {
                this.iterateValue(v, prop, undefined, fn);
            }.bind(this));
        }.bind(this));
    },

    /**
     * Loops over each declaration.
     * @param {Function} fn Called with:
     * - property name
     * - value objects array
     * - important?
     */
    eachDecl: function(fn) {
        this.ast.eachDecl(function(decl) {
            var values = valueParser.parse(decl.value);
            fn(decl.prop, values, decl.important);
        }.bind(this));
    },

    iterateValue: function(value, prop, parentValue, fn) {
        fn(value, prop, parentValue);

        if (value.type === "function") {
            value.params.forEach(function(v){
                this.iterateValue(v, prop, value, fn);
            }.bind(this));
        }
    },

    /**
     * Loops over each selector.
     * @param  {Function} fn Called with parsed selector AST node and Rule node.
     */
    eachSelector: function(fn) {
        this.ast.eachRule(function(rule) {
            rule.selectors.forEach(function(sel) {
                if (!this.isPercentageSelector(sel) && sel.length > 0) {
                    fn(sel, rule);
                }
            }.bind(this));
        }.bind(this));
    },

    isPercentageSelector: function(selector) {
        return /^([0-9]+|[0-9]*.[0-9]+)%$/.test(selector);
    },
};

module.exports = Iterator;
