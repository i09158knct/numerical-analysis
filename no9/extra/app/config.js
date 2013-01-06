require.config({

  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    lodash: "../vendor/jam/lodash/lodash.underscore",

    plugins: "../vendor/js/plugins",
    vendor: "../vendor"
  },

  map: {
    "*": { "underscore": "lodash" }

  },

  shim: {
    "../vendor/bootstrap/js/bootstrap.min": ["jquery"],
    "../vendor/nv.d3/js/nv.d3": {
      deps: ["d3"],
      exports: "nv"
    },
    "interpolations": {
      exports: "interpolations"
    }
  }

});
