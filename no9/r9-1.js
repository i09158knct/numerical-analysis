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

  interpolations.linear = function(p1, p2) {
    var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y;

    return function(x) {
      return (y1 * (x - x2) - y2 * (x - x1)) / (x1 - x2);
    };
  };

}).call(this);


// main
;(function() {
  var root = this,
      mathtool = root.mathtool,
      interpolations = root.interpolations,
      section,
      targetFunction,
      p1,
      p2,
      interpolationFunction,
      trueValues;

  section = [0.2, 0.4, 0.6, 0.8];

  targetFunction = function(x) { return Math.sin(mathtool.toRadian(x)); };

  p1 = {
    x: 0,
    y: targetFunction(0)
  };
  p2 = {
    x: 1,
    y: targetFunction(1)
  };

  interpolationFunction = interpolations.linear(p1, p2);

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