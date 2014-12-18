/**
 * Parses CSS font property value.
 * @param  {Object} val
 * @return {Object}
 */
module.exports = function(values) {
    var result = {
        "font-family": []
    };
    var previousVal = {};

    values.forEach(function(val, i){
        if (isFontStyleValue(val) && !result["font-size"] && !result["font-style"]) {
            result["font-style"] = val;
        }
        else if (isFontWeightValue(val) && !result["font-size"] && !result["font-weight"]) {
            result["font-weight"] = val;
        }
        else if (isFontVariantValue(val) && !result["font-size"] && !result["font-variant"]) {
            result["font-variant"] = val;
        }
        else if (isFontSizeValue(val) && !result["font-size"]) {
            result["font-size"] = val;
        }
        else if (isLineHeightValue(val) && isSlash(previousVal)) {
            result["line-height"] = val;
        }
        else if (isFontFamilyValue(val) && result["font-size"]) {
            result["font-family"].push(val);
        }
        previousVal = val;
    });

    return result;
};

function isSlash(val) {
    return val.type === "operator" && val.value === "/";
}

function isComma(val) {
    return val.type === "operator" && val.value === ",";
}

function isFontStyleValue(val) {
    return val.type === "identifier" && styleIdentifiers[val.value];
}

var styleIdentifiers = {
    "normal": true,
    "italic": true,
    "oblique": true,
};

function isFontVariantValue(val) {
    return val.type === "identifier" && variantIdentifiers[val.value];
}

var variantIdentifiers = {
    "normal": true,
    "small-caps": true,
};

function isFontWeightValue(val) {
    return val.type === "identifier" && weightIdentifiers[val.value] ||
           val.type === "number" && weightValues[val.value];
}

var weightIdentifiers = {
    "normal": true,
    "bold": true,
    "bolder": true,
    "lighter": true,
};
var weightValues = {
    100: true,
    200: true,
    300: true,
    400: true,
    500: true,
    600: true,
    700: true,
    800: true,
    900: true,
};

function isFontSizeValue(val) {
    return val.type === "dimension" || val.type === "percentage" || isFontSizeIdentifier(val.value);
}

function isFontSizeIdentifier(val) {
    return val.type === "identifier" && sizeIdentifiers[val.value];
}

var sizeIdentifiers = {
    "xx-small": true,
    "x-small": true,
    "small": true,
    "medium": true,
    "large": true,
    "x-large": true,
    "xx-large": true,
    "smaller": true,
    "larger": true,
};

function isLineHeightValue(val) {
    return val.type === "dimension" || val.type === "percentage" || val.type === "number" || isLineHeightIdentifier(val);
}

function isLineHeightIdentifier(val) {
    return val.type === "identifier" && val.value === "normal";
}

function isFontFamilyValue(val) {
    return val.type === "string" || val.type === "identifier";
}
