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

  interpolations.linear = function(dataPoints) {
    function linear2(p1, p2) {
      var x1 = p1.x,
          y1 = p1.y,
          x2 = p2.x,
          y2 = p2.y;

      return function(x) {
        return (y1 * (x - x2) - y2 * (x - x1)) / (x1 - x2);
      };
    }

    var length = dataPoints.length,
        table,
        tableLength;

    table = (function() {
      var table = [],
          previousPoint,
          currentPoint,
          i;
      for (i = 1; i < length; i++) {
        previousPoint = dataPoints[i - 1];
        currentPoint = dataPoints[i];

        table.push({
          endX: currentPoint.x,
          func: linear2(previousPoint, currentPoint)
        });
      }
      return table;
    })();

    tableLength = table.length;
    return function(x) {
      var i;
      for (i in table) {
        if (x <= table[i].endX) return table[i].func(x);
      }
      return table[tableLength - 1].func(x);
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

  for (i = 0; i <= 1; i++) {
    dataPoints[i] = {
      x: i,
      y: targetFunction(i)
    };
  }

  interpolationFunction = interpolations.linear(dataPoints);

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