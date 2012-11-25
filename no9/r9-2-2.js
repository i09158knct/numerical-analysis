// create interpolation module
;(function() {
  'use strict';
  var root = this,
      interpolations = root.interpolations = {};

  interpolations.lagrange = function(dataPoints) {
    var length = dataPoints.length,
        yData;

    yData = dataPoints.map(function(point) {
      return point.y;
    });

    return function(x) {

      function lFunction(i, x) {
        var currentX = dataPoints[i].x,
            numeratorAndDenominator;
        numeratorAndDenominator = dataPoints.reduce(function(acc, dataPoint, index) {
          if (index === i) return acc;
          return [
            acc[0] * (x - dataPoints[index].x),
            acc[1] * (currentX - dataPoints[index].x)
          ];
        }, [1, 1]);
        return numeratorAndDenominator[0] / numeratorAndDenominator[1];
      }

      return dataPoints.reduce(function(sum, dataPoint, index) {
        return sum + (dataPoint.y * lFunction(index, x));
      }, 0);
    };
  };

}).call(this);


// main
;(function() {
  var root = this,
      interpolations = root.interpolations,
      section,
      dataPoints,
      targetFunction,
      interpolationFunction,
      trueValues,
      i;

  section = [0.5, 1.5, 2.5, 3.5, 4.5];

  targetFunction = function(x) { return 1 / (1 + 2 * Math.pow(x, 4)); };

  dataPoints = [];
  for (i = 0; i <= 5; i++) {
    dataPoints[i] = {
      x: i,
      y: targetFunction(i)
    };
  }

  interpolationFunction = interpolations.lagrange(dataPoints);

  trueValues = section.map(function(x) {
    return targetFunction(x);
  });

  // print result
  (function() {
    console.log("x\t補間値\t真値\t絶対値誤差");

    section.forEach(function(x, index) {
      var interpolatedValue = interpolationFunction(x),
          trueValue = trueValues[index],
          absoluteError = Math.abs(interpolatedValue - trueValue);
      console.log([
        x,
        interpolatedValue,
        trueValue,
        absoluteError
      ].join("\t"));
    });
  })();

}).call(this);