require([
  "jquery",
  "graph-tool",
  "backbone",
  "../vendor/bootstrap/js/bootstrap.min"
], function($, graphTool, Backbone){
  $(function() {
    var MainView = Backbone.View.extend({
      el: "#main",

      events: {
        "click #with-function .draw": "drawWithFunction",
        "change #with-function input": "onChange",
        "click #with-data-points .draw": "drawWithDataPoints"
      },

      initialize: function(options) {
        this.$func = this.$el.find("#func");
        this.$start = this.$el.find("#start");
        this.$end = this.$el.find("#end");
        this.$numOfDataPoints = this.$el.find("#number-of-data-points");
        this.$autoRedraw = this.$el.find("#auto-redraw");

        this.$dataPoints = this.$el.find("#data-points");

        this.graphWrapper = this.$el.find("#graph-wrapper")[0];
      },

      buildDataPoints: function(func, start, end, numOfDataPoints) {
        var
          dataPoints = [],
          h = (end - start) / (numOfDataPoints - 1),
          i,
          x;
        for (i = 0; i < numOfDataPoints; i++) {
          x = start + h * i;
          dataPoints.push({
            x: x,
            y: func(x)
          });
        }
        return dataPoints;
      },

      drawWithFunction: function(event) {
        if (event) event.preventDefault();
        var
          func,
          start,
          end,
          numOfDataPoints,
          dataPoints;
        try {
          func = eval("(" + this.$func.val() + ")");
          start = +this.$start.val();
          end = +this.$end.val();
          numOfDataPoints = +this.$numOfDataPoints.val();
          dataPoints = this.buildDataPoints(func, start, end, numOfDataPoints);
        } catch (e) {
          window.console.log(e);
          window.alert(e);
          return;
        }
        graphTool.draw(this.graphWrapper, dataPoints, func);
      },

      onChange: function(event) {
        if (this.$autoRedraw.prop("checked")) {
          this.drawWithFunction();
        }
      },

      drawWithDataPoints: function() {
        event.preventDefault();
        var
          dataPoints;
        try {
          dataPoints = eval("(" + this.$dataPoints.val() + ")");
        } catch (e) {
          window.console.log(e);
          window.alert(e);
          return;
        }
        graphTool.draw(this.graphWrapper, dataPoints);
      }

    });

    new MainView();

    $("#func").val([
      "function(x) {",
      "  return 0.1 * x * x + Math.sin(x);",
      "}"
    ].join("\n"));

    $("#data-points").val([
      "[",
      "  {x: 1, y: 2},",
      "  {x: 3, y: 19},",
      "  {x: 5, y: 15},",
      "  {x: 7, y: -4},",
      "  {x: 9, y: 25}",
      "]"
    ].join("\n"));

  });

});
