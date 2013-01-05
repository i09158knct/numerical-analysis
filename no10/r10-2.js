;(function _integrations() {
  "use strict";
  var
    root = this,
    integrations = root.integrations = {};

  integrations.simpsonsRule = function(func, start, end) {
    var
      sum = 0,
      h = (end - start) / 2;

    return (h / 3) * (func(start) + 4 * func((start + end) / 2) + func(end));
  };

  integrations.compositeSimpsonsRule = function(func, start, end, numOfDivs) {
    if (numOfDivs % 2 === 1) {
      throw new Error("Number of Divisions should be even.");
    }

    var
      sumOfEvens = 0,
      sumOfOdds = 0,
      h = (end - start) / numOfDivs,
      i,
      x;

    for (i = 1; i <= numOfDivs - 1; i += 2) {
      x = start + i * h;
      sumOfOdds += func(x);
    }
    for (i = 2; i <= numOfDivs - 2; i += 2) {
      x = start + i * h;
      sumOfEvens += func(x);
    }

    return (h / 3) * (
      func(start) +
      4 * sumOfOdds +
      2 * sumOfEvens +
      func(end)
    );
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
    divsList = [10, 20];

  console.log([
    "n",
    "近似値",
    "真値",
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
      results.compositeSimpsonsRule,
      inputs.trueValue,
      results.compositeSimpsonsRule - inputs.trueValue
    ].join("\t"));
  });

}).call(this);