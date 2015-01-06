var valueParser = require("css-value-parser");
var isColorValue = require("./isColorValue");

module.exports = class Iterator {
    constructor(ast) {
        this.ast = ast;
    }

    /**
     * Iterates over each color value inside all property values.
     * @param {Function} fn Called with:
     * - color string
     * - declaration object
     * - parent function object the value is in (optional)
     */
    eachColor(fn) {
        this.eachValue(function(val, decl, parentValue) {
            if (isColorValue(val)) {
                fn(valueParser.format(val), decl, parentValue);
            }
        }.bind(this));
    }

    /**
     * Loops over each value inside all property values.
     * @param {Function} fn Called with:
     * - value object
     * - declaration object
     * - parent function object the value is in (optional)
     */
    eachValue(fn) {
        this.eachDecl(function(decl) {
            decl.values.forEach(function(v) {
                this.iterateValue(v, decl, undefined, fn);
            }.bind(this));
        }.bind(this));
    }

    /**
     * Loops over each declaration.
     * @param {Function} fn Called with declaration object containg fields:
     * - prop
     * - value
     * - values (array of parsed values)
     * - important (boolean)
     */
    eachDecl(fn) {
        this.ast.eachDecl(function(decl) {
            fn(decl);
        }.bind(this));
    }

    iterateValue(value, decl, parentValue, fn) {
        fn(value, decl, parentValue);

        if (value.type === "function") {
            value.params.forEach(function(v){
                this.iterateValue(v, decl, value, fn);
            }.bind(this));
        }
    }

    /**
     * Loops over each selector.
     * @param  {Function} fn Called with parsed selector AST node and Rule node.
     */
    eachSelector(fn) {
        this.ast.eachRule(function(rule) {
            rule.selectors.forEach(function(sel) {
                if (!this.isPercentageSelector(sel) && sel.length > 0) {
                    fn(sel, rule);
                }
            }.bind(this));
        }.bind(this));
    }

    isPercentageSelector(selector) {
        return /^([0-9]+|[0-9]*.[0-9]+)%$/.test(selector);
    }
};
