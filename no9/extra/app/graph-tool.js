define([
  "d3",
  "../vendor/nv.d3/js/nv.d3",
  "interpolations"
], function(d3, nv, interpolations) {
  "use strict";

  var colorTable = {
    "target": "#000000",
    "linear": "#ee4444",
    "lagrange": "#44ee44",
    "newton": "#4444ee"
  };

  function buildGraphData(dataPoints, targetFunction) {
    var
      numOfPlotPoints = 200,
      // startX = d3.min(dataPoints, function(p) { return p.x; },
      // endX = d3.max(dataPoints, function(p) { return p.x; },
      startX = dataPoints[0].x,
      endX = dataPoints[dataPoints.length - 1].x,
      h = (endX - startX) / (numOfPlotPoints - 1),
      xs = [],
      iFunctions = [],
      data,
      iName,
      i;

    for (iName in interpolations) {
      iFunctions.push({
        name: iName,
        func: interpolations[iName](dataPoints)
      });
    }
    if (targetFunction) {
      iFunctions.push({
        name: "target",
        func: targetFunction
      });
    }

    for (i = 0; i < numOfPlotPoints; i++) {
      xs[i] = startX + i * h;
    }

    return iFunctions.map(function(funcData){
      return {
        key: funcData.name,
        color: colorTable[funcData.name],
        values: xs.map(function(x) {
          return {
            x: x,
            y: funcData.func(x)
          };
        })
      };
    });

  }

  var
    graphTool = {};

  graphTool.draw = function(wrapper, dataPoints, targetFunction) {
    var data = buildGraphData(dataPoints, targetFunction);

    var
      chart = nv.models.lineChart(),
      width = 960,
      height = 512,
      zoom = 1;

    chart.xAxis
        .tickFormat(d3.format(',r'));

    chart.yAxis
        .tickFormat(d3.format(',.2f'));
    d3.select("svg")
        .attr('perserveAspectRatio', 'xMinYMid')
        .datum(data);

    function setChartViewBox() {
      var
        w = width * zoom,
        h = height * zoom;

      chart
          .width(w)
          .height(h);

      d3.select('svg')
          .attr('viewBox', '0 0 ' + w + ' ' + h)
        .transition().duration(200)
          .call(chart);
    }
    setChartViewBox();

window.a=data;

  };

  return graphTool;
});