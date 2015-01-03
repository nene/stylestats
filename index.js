require("angular");
var $ = require("jquery");
var _ = require("lodash");
var mustache = require("mustache");
var stats = require("./lib/stats");
var renderCharts = require("./lib/renderCharts");
var LoadMask = require("./lib/LoadMask");

angular.module("stylestats", [])
.directive("mainView", function() {
    return {
        scope: {},
        templateUrl: "template.html",
        controller: function($scope, $http, $timeout) {
            // Display loadmask
            var loadMask = new LoadMask($(".load-mask"));
            loadMask.show();
            // Fetch stylesheet
            $http.get(getCssFilename()).success(function(cssSource) {
                // Calculate and render stats
                $scope.cssSource = cssSource;
                _($scope).assign(stats(cssSource));
                // After dom finishes rendering
                $timeout(function(){
                    renderCharts();
                    loadMask.hide();
                });
            });
        }
    };
});

function getCssFilename() {
    var matches = window.location.hash.match(/#!file=(.*)/);
    return matches[1] || "samples/xrebel.css";
}
