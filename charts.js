google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var options = {
        width: 1152,
        height: 320,
        chartArea: {width: 1152, height: 250},
        bar: { groupWidth: '100%' },
        hAxis: {textPosition: 'none'},
        vAxis: {textPosition: 'none', viewWindowMode: 'maximized'},
        legend: {position: 'bottom'},
        isStacked: true,
        colors: ['#3366CC', '#109618', '#FF9900', '#DC3912']
    };

    var chartEl = document.getElementById('specificity-chart');

    var series = [['Year', 'Element', 'Class', 'ID']];
    JSON.parse(chartEl.getAttribute("data-series")).forEach(function(item) {
        series.push(['', item[2], item[1], item[0]]);
    });
    var data =  google.visualization.arrayToDataTable(series);

    var chart = new google.visualization.ColumnChart(chartEl);

    chart.draw(data, options);
}
