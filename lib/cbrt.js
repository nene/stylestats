// Polyfill for Cube root function (missing in PhantomJS)
if (Math.cbrt) {
    module.exports = Math.cbrt;
}
else {
    module.exports = function cbrt(x) {
        var y = Math.pow(Math.abs(x), 1 / 3);

        return x < 0 ? -y : y;
    };
}
