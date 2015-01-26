var stats = require("../lib/stats");

describe('stats', function() {
    it('generates various statistics', function() {
        var data = stats("foo { color: red }");

        expect(data.gridColors).toBeDefined();
        expect(data.specificityChart).toBeDefined();
        expect(data.complexityChart).toBeDefined();
        expect(data.gradientStats).toBeDefined();
        expect(data.sizeStats).toBeDefined();
        expect(data.selectorStats).toBeDefined();
    });
});
