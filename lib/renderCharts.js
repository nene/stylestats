module.exports = function() {
    var WIDTH = 556;
    var HEIGHT = 160;
    var AREA_HEIGHT = 125;

    drawSpecificityChart();
    drawComplexityChart();

    function drawSpecificityChart() {
        var options = {
            width: WIDTH,
            height: HEIGHT,
            chartArea: {width: WIDTH, height: AREA_HEIGHT},
            hAxis: {textPosition: 'none'},
            vAxis: {textPosition: 'none', viewWindowMode: 'maximized', minValue: 0},
            areaOpacity: 1,
            lineWidth: 0,
            legend: {position: 'bottom'},
            isStacked: true,
            colors: ['#3366CC', '#109618', '#FF9900', '#DC3912']
        };

        var chartEl = document.getElementById('specificity-chart');

        var series = [['Selector', 'Element', 'Class', 'ID', '!important']];
        JSON.parse(chartEl.getAttribute("data-series")).forEach(function(item) {
            series.push(item);
        });
        var data =  google.visualization.arrayToDataTable(series);

        var chart = new google.visualization.AreaChart(chartEl);

        chart.draw(data, options);
    }

    function drawComplexityChart() {
        var options = {
            width: WIDTH,
            height: HEIGHT,
            chartArea: {width: WIDTH, height: AREA_HEIGHT},
            hAxis: {textPosition: 'none'},
            vAxis: {textPosition: 'none', viewWindowMode: 'maximized', minValue: 0},
            legend: {position: 'none'},
            areaOpacity: 1,
            lineWidth: 0,
            colors: ['#3366CC']
        };

        var chartEl = document.getElementById('complexity-chart');

        var series = [['Selector', 'Complexity']];
        JSON.parse(chartEl.getAttribute("data-series")).forEach(function(data) {
            series.push(data);
        });
        var data =  google.visualization.arrayToDataTable(series);

        var chart = new google.visualization.AreaChart(chartEl);

        chart.draw(data, options);
    }
};
