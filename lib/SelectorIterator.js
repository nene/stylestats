var CssSelectorParser = require('css-selector-parser').CssSelectorParser;

selectorParser = new CssSelectorParser();
selectorParser.registerNestingOperators('>', '+', '~');
selectorParser.registerAttrEqualityMods('^', '$', '*', '~', '|');
selectorParser.registerSelectorPseudos('not');

function Iterator(selectorsString) {
    this.selectors = this.parseSelectors(selectorsString);
}
Iterator.prototype = {
    /**
     * Calls the function on each selector part.
     * @param  {Function} fn Called with parsed selector part object.
     */
    eachSelectorPart: function(fn) {
        this.eachSelector(function(sel) {
            this.iterateRuleSet(sel, fn);
        }.bind(this));
    },

    iterateRuleSet: function(sel, fn) {
        this.iterateRule(sel.rule, fn);
    },

    iterateRule: function(sel, fn) {
        if (sel.tagName === '*') {
            fn({type: "universal"});
        }
        else if (sel.tagName) {
            fn({type: "element", value: sel.tagName});
        }

        if (sel.id) {
            fn({type: "id", value: sel.id});
        }

        if (sel.classNames) {
            sel.classNames.forEach(function(className) {
                fn({type: "class", value: className});
            });
        }

        if (sel.attrs) {
            sel.attrs.forEach(function(attr){
                fn({
                    type: "attribute",
                    name: attr.name,
                    operator: attr.operator,
                    value: attr.value
                });
            });
        }

        if (sel.pseudos) {
            sel.pseudos.forEach(function(pseudo){
                fn({
                    type: "pseudo",
                    name: pseudo.name,
                    value: pseudo.value
                });

                if (pseudo.valueType === "selector") {
                    this.iterateRuleSet(pseudo.value, fn);
                }
            }.bind(this));
        }

        if (sel.rule) {
            var combinator = sel.rule.nestingOperator || " ";
            fn({type: "combinator", operator: combinator});

            this.iterateRule(sel.rule, fn);
        }
    },

    /**
     * Loops over each selector.
     * @param  {Function} fn Called with parsed selector AST node.
     */
    eachSelector: function(fn) {
        this.selectors.forEach(function(selector) {
            fn(selector);
        }.bind(this));
    },

    parseSelectors: function(selector) {
        try {
            var result = selectorParser.parse(selector);
            if (result.type === "selectors") {
                return result.selectors;
            }
            else if (result.type === "ruleSet") {
                return [result];
            }
            else {
                return [];
            }
        }
        catch (e) {
            return [];
        }
    }
};

module.exports = Iterator;
