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
      }, [0, 1, 1]);
      return results[0];
    };
  };

}).call(this);
