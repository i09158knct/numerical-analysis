;(function _main() {
  function firstDerivative(x, y) {
    return y;
  }

  function targetFunction(x) {
    return Math.exp(x);
  }

  var
    x0,
    y0,
    number,
    xWidth,
    domain,
    trueValues,
    approximations;


  x0 = 0;
  y0 = targetFunction(x0);
  number = 5;
  xWidth = 0.1;

  domain = (function _buildDomain(initX, number, width) {
    var
      domain = [],
      i;
    for (i = 0; i < number; i++) {
      domain[i] = initX + width * i;
    }
    return domain;
  })(x0 + 0.1, number, xWidth);

  trueValues = domain.map(function(x) {
    return targetFunction(x);
  });

  approximations = domain.map(function(x, index) {
    return domain.slice(0, index + 1).reduce(function(acc, x) {
      var
        k1 = xWidth * firstDerivative(x, acc),
        k2 = xWidth * firstDerivative(x + xWidth, acc + k1);
      return acc + (k1 + k2) / 2;
    }, y0);
  });

  (function _output() {
    var i;

    console.log([
      "x",
      "近似値",
      "真値",
      "誤差"
    ].join("\t"));

    for (i = 0; i < number; i++) {
      console.log([
        domain[i],
        approximations[i],
        trueValues[i],
        Math.abs(approximations[i] - trueValues[i])
      ].join("\t"));
    }
  })();

})();
