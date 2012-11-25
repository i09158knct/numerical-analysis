;(function() {
  function interpolate(targetFunction, dataPointXList) {
    var results = {},
        dataPoints,
        name;

    dataPoints = dataPointXList.map(function(x) {
      return {
        x: x,
        y: targetFunction(x)
      };
    });

    for(name in interpolations) {
      results[name] = interpolations[name](dataPoints);
    }

    return results;
  }

  function putResult(xList, interpolationFunction, targetFunction) {
    var logLines = [];
    logLines.push("x\t補間値\t真値\t絶対値誤差");

    xList.forEach(function(x, index) {
      var interpolatedValue = interpolationFunction(x),
          trueValue = targetFunction(x),
          absoluteError = Math.abs(interpolatedValue - trueValue);
      logLines.push([
        x,
        interpolatedValue,
        trueValue,
        absoluteError
      ].join("\t"));
    });

    return logLines.join("\n");
  }

  var root = this,
      interpolations = root.interpolations,
      main = root.main = {},
      results = main.results = {};

  main.interpolate = interpolate;



  results["r9-1"] = (function() {
    function toRadian(degrees) {
        return degrees * Math.PI / 180;
    }
    var result = {},
        targetFunction,
        dataPointXList,
        xList;

    targetFunction = function(x) {
      return Math.sin(toRadian(x));
    };

    dataPointXList = [0, 1];
    xList = [0.2, 0.4, 0.6, 0.8];

    result.interpolations = interpolate(targetFunction, dataPointXList);
    result.log = putResult(
      xList,
      result.interpolations["linear"],
      targetFunction
    );

    result.targetFunction = targetFunction;
    result.dataPointXList = dataPointXList;
    result.xList = xList;
    return result;
  })();



  results["r9-2-1"] = (function() {
    function toRadian(degrees) {
        return degrees * Math.PI / 180;
    }
    var result = {},
        targetFunction,
        dataPointXList,
        xList;

    targetFunction = function(x) {
      return Math.sin(toRadian(x));
    };

    dataPointXList = [0, 1, 2];
    xList = [0.2, 0.4, 0.6, 0.8];

    result.interpolations = interpolate(targetFunction, dataPointXList);
    result.log = putResult(
      xList,
      result.interpolations["lagrange"],
      targetFunction
    );

    result.targetFunction = targetFunction;
    result.dataPointXList = dataPointXList;
    result.xList = xList;
    return result;
  })();



  results["r9-2-2"] = (function() {
    var result = {},
        targetFunction,
        dataPointXList,
        xList;

    targetFunction = function(x) {
      return 1 / (1 + 2 * Math.pow(x, 4));
    };

    dataPointXList = [0, 1, 2, 3, 4, 5];
    xList = [0.5, 1.5, 2.5, 3.5, 4.5];

    result.interpolations = interpolate(targetFunction, dataPointXList);
    result.log = putResult(
      xList,
      result.interpolations["lagrange"],
      targetFunction
    );

    result.targetFunction = targetFunction;
    result.dataPointXList = dataPointXList;
    result.xList = xList;
    return result;
  })();



  results["r9-2-3"] = (function() {
    var result = {},
        targetFunction,
        dataPointXList,
        xList;

    targetFunction = function(x) {
      return 1 / (1 + 2 * Math.pow(x, 4));
    };

    dataPointXList = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    xList = [0.5, 1.5, 2.5, 3.5, 4.5];

    result.interpolations = interpolate(targetFunction, dataPointXList);
    result.log = putResult(
      xList,
      result.interpolations["lagrange"],
      targetFunction
    );

    result.targetFunction = targetFunction;
    result.dataPointXList = dataPointXList;
    result.xList = xList;
    return result;
  })();



  results["r9-3"] = (function() {
    var result = {},
        targetFunction,
        dataPointXList,
        xList;

    targetFunction = function(x) {
      return (
        -2 * Math.pow(x, 4) +
        13 * Math.pow(x, 3) -
        22 * Math.pow(x, 2) +
        14 * Math.pow(x, 1) -
        10
      );
    };

    dataPointXList = [0, 1, 2, 3];
    xList = [0.5, 1.5, 2.5, 3.5];

    result.interpolations = interpolate(targetFunction, dataPointXList);
    result.log = putResult(
      xList,
      result.interpolations["newton"],
      targetFunction
    );

    result.targetFunction = targetFunction;
    result.dataPointXList = dataPointXList;
    result.xList = xList;
    return result;
  })();



}).call(this);
