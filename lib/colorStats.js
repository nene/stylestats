var _ = require("lodash");
var vendor = require('postcss/lib/vendor');
var tinycolor = require("tinycolor2");
var toSortableColorNumber = require("./toSortableColorNumber");

module.exports = function(iterator) {
    var propGroups = {
        "color": "color",
        "background": "background", // gradients and colors
        "background-color": "background",
        "background-image": "background", // gradients
        "border": "border",
        "border-color": "border",
        "border-top": "border",
        "border-right": "border",
        "border-bottom": "border",
        "border-left": "border",
        "border-top-color": "border",
        "border-right-color": "border",
        "border-bottom-color": "border",
        "border-left-color": "border",
        "outline": "outline",
        "outline-color": "outline",
        "box-shadow": "boxShadow",
        "text-shadow": "textShadow",
        "column-rule": "columnRule",
        "column-rule-color": "columnRule",
        "fill": "fill",
        "stroke": "stroke",
    };
    var colorsByProp = {
        all: []
    };

    iterator.eachColor(function(color, decl) {
        colorsByProp.all.push({value: color, decl: decl});

        var prop = vendor.unprefixed(decl.prop);

        var group = propGroups[prop];
        if (!colorsByProp[group]) {
            colorsByProp[group] = [];
        }
        colorsByProp[group].push({value: color, decl: decl});
    });

    function groupAndSortColors(colors) {
        return _(colors).groupBy(function(color) {
            return tinycolor(color.value).toHexString();
        }).mapValues(function(sameColors){
            return _(sameColors).groupBy("value").map(function(colors, value){
                return {
                    value: value,
                    decls: _.map(colors, "decl")
                };
            }).sortBy("value").value();
        }).map(function(variants, hexColor){
            return {
                backgroundStyle: hexColor,
                variants: variants,
                count: _(variants).map(function(group) {
                    return group.decls.length;
                }).reduce(function(a,b){
                    return a + b;
                }, 0)
            };
        }).sortBy(function(obj){
            return toSortableColorNumber(obj.backgroundStyle);
        }).value();
    }

    return [
        {
            title: "unique colors",
            styles: groupAndSortColors(colorsByProp.all)
        },
        {
            title: "unique text colors",
            styles: groupAndSortColors(colorsByProp.color)
        },
        {
            title: "unique background colors",
            styles: groupAndSortColors(colorsByProp.background)
        },
        {
            title: "unique border colors",
            styles: groupAndSortColors(colorsByProp.border)
        },
        {
            title: "unique outline colors",
            styles: groupAndSortColors(colorsByProp.outline)
        },
        {
            title: "unique box-shadow colors",
            styles: groupAndSortColors(colorsByProp.boxShadow)
        },
        {
            title: "unique text-shadow colors",
            styles: groupAndSortColors(colorsByProp.textShadow)
        },
        {
            title: "unique column-rule colors",
            styles: groupAndSortColors(colorsByProp.columnRule)
        },
        {
            title: "unique SVG fill colors",
            styles: groupAndSortColors(colorsByProp.fill)
        },
        {
            title: "unique SVG stroke colors",
            styles: groupAndSortColors(colorsByProp.stroke)
        },
    ];
};
