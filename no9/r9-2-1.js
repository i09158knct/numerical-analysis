// create mathtool module
;(function() {
  'use strict';
  var root = this,
      mathtool = root.mathtool = {};

  mathtool.toRadian = function(degrees) {
    return degrees * Math.PI / 180;
  };

  mathtool.toDegrees = function(radian) {
    return radian * 180 / Math.PI;
  };

}).call(this);


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

      // function lFunction(i, x) {
      //   var currentX = dataPoints[i].x;
      //   return dataPoints.reduce(function(acc, dataPoint, index) {
      //     if (index === i) return acc;
      //     return acc * (x - dataPoints[index].x) / (currentX - dataPoints[index].x);
      //   }, 1);
      // }

      return dataPoints.reduce(function(sum, dataPoint, index) {
        return sum + (dataPoint.y * lFunction(index, x));
      }, 0);
    };
  };

}).call(this);


// main
;(function() {
  var root = this,
      mathtool = root.mathtool,
      interpolations = root.interpolations,
      section,
      dataPoints,
      targetFunction,
      interpolationFunction,
      trueValues,
      i;

  section = [0.2, 0.4, 0.6, 0.8];

  targetFunction = function(x) { return Math.sin(mathtool.toRadian(x)); };

  dataPoints = [];
  for (i = 0; i <= 2; i++) {
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