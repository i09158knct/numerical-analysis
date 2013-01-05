;(function _integrations() {
  "use strict";
  var
    root = this,
    integrations = root.integrations = {};

  integrations.topLeftCornerRule = function(func, start, end, numOfDivs) {
    var
      sum = 0,
      h = (end - start) / numOfDivs,
      i,
      x;

    for (i = 0; i < numOfDivs; i++) {
      x = start + i * h;
      sum += func(x);
    }

    return sum * h;
  };

  integrations.midpointRule = function(func, start, end, numOfDivs) {
    var
      sum = 0,
      h = (end - start) / numOfDivs,
      i,
      x;

    for (i = 0; i < numOfDivs; i++) {
      x = start + i * h + h / 2;
      sum += func(x);
    }

    return sum * h;
  };

  integrations.topRightCornerRule = function(func, start, end, numOfDivs) {
    var
      sum = 0,
      h = (end - start) / numOfDivs,
      i,
      x;

    for (i = 0; i < numOfDivs; i++) {
      x = start + i * h + h;
      sum += func(x);
    }

    return sum * h;
  };

  integrations.trapezoidalRule = function(func, start, end, numOfDivs) {
    var
      sum = 0,
      h = (end - start) / numOfDivs,
      i,
      x;

    for (i = 1; i < numOfDivs; i++) {
      x = start + i * h;
      sum += func(x);
    }

    return (h / 2) * (func(start) + 2 * sum + func(end));
  };

}).call(this);

(function _main() {
  var
    root = this,
    integrations = root.integrations,
    inputs = {
      func: function(x) { return 1 / (x * x); },
      start: 1,
      end: 2,
      trueValue: 0.5
    },
    divsList = [5, 10, 15, 20];

  console.log([
    "n",
    "区分1",
    "誤差",
    "区分2",
    "誤差",
    "台形",
    "誤差"
  ].join("\t"));

  divsList.forEach(function(numOfDivs) {
    var
      results = {},
      rule;
    for (rule in integrations) {
      results[rule] = integrations[rule](
        inputs.func,
        inputs.start,
        inputs.end,
        numOfDivs
      );
    }

    console.log([
      numOfDivs,
      results.topLeftCornerRule,
      results.topLeftCornerRule - inputs.trueValue,
      results.topRightCornerRule,
      results.topRightCornerRule - inputs.trueValue,
      results.trapezoidalRule,
      results.trapezoidalRule - inputs.trueValue
    ].join("\t"));
  });

}).call(this);