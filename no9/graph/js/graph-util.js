(function() {
  'use strict';
  var root = this,
      graphUtil = root.graphUtil = {};

  graphUtil.generateData = function(func, option) {
    var values,
        startPoint,
        endPoint,
        step,
        i;

    if (!option) {
      option = {
        startPoint: 0,
        endPoint: 100,
        step: 1
      };
    }

    if (typeof option[0] === "number") {
      option.xList = option;
    }

    if (option.xList) {
      return option.xList.map(function(x) {
        return {
          x: x,
          y: func(x)
        };
      });
    }

    startPoint = option.startPoint;
    endPoint = option.endPoint;
    step = option.step;
    if (option.n) {
      step = (endPoint - startPoint) / (option.n - 1);
    }

    values = [];

    // because to Floating-point error,
    // `endPoint` data may not be included in `values`
    for (i = startPoint; i <= endPoint; i += step) {
      values.push({
        x: i,
        y: func(i)
      });
    }
    return values;
  };


  graphUtil.buildData = function(dataSkeletons) {
    return dataSkeletons.map(function(skeleton) {
      return {
        values: graphUtil.generateData(skeleton.func, skeleton.option),
        key: skeleton.key,
        color: skeleton.color
      };
    });
  };

}).call(this);
