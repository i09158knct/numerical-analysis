// create interpolation module
;(function() {
  'use strict';
  var root = this,
      interpolations = root.interpolations = {};

  interpolations.newton = function(dataPoints) {
    function calcDifferences(array) {
      var length = array.length,
          differences = [],
          i;
      if (length <= 1) throw "error: array length is too few";
      for (i = 1; i < length; i++) {
        differences.push(array[i] - array[i - 1]);
      }
      return differences;
    }

    function buildDifferenceTable(yData) {
      var currentArray = yData,
          differenceTable = [];

      differenceTable.push(currentArray);
      while (currentArray.length > 1) {
        currentArray = calcDifferences(currentArray);
        differenceTable.push(currentArray);
      }
      return differenceTable;
    }

    var dataLength = dataPoints.length,
        h,
        yData,
        differenceTable;

    h = (dataPoints[dataLength - 1].x - dataPoints[0].x) / (dataLength - 1);

    yData = dataPoints.map(function(point) {
      return point.y;
    });

    differenceTable = buildDifferenceTable(yData);

    return function(x) {
      var results;
      results = differenceTable.reduce(function(acc, differences, i) {
        return [
          acc[0] + acc[1] * differences[0] / (acc[2] * Math.pow(h, i)),
          acc[1] * (x - dataPoints[i].x),
          acc[2] * (i + 1)
        ];
      }, [0, 1, 1]); // [sum, aaa, factorial]
      return results[0];
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

  section = [0.5, 1.5, 2.5, 3.5];

  targetFunction = function(x) {
    return (
      -2 * Math.pow(x, 4) +
      13 * Math.pow(x, 3) -
      22 * Math.pow(x, 2) +
      14 * Math.pow(x, 1) -
      10
    );
  };

  dataPoints = [];
  for (i = 0; i <= 3; i++) {
    dataPoints.push({
      x: i,
      y: targetFunction(i)
    });
  }

  interpolationFunction = interpolations.newton(dataPoints);

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