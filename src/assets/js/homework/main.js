requirejs.config({
  paths: {
    "bxslider": "vendor/bxslider.min",
    "jquery": "vendor/jquery.min",
    "tweenmax": "vendor/TweenMax.min",
    "magnific": "vendor/magnific.min",
    "lottie": "vendor/lottie.min"
  },
  shim: {
    'bxslider': {
      deps: ['jquery']
    }
  }
});
