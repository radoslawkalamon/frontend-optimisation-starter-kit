import './vendor/lottie.min.js'

const startAnimation = () => {
  document.querySelectorAll('.animation').forEach((animation) => {		
    lottie.loadAnimation({
      wrapper: animation,
      animType: 'svg',
      loop: true,
      path: animation.dataset.animationFile
    });
  });
}

// Init Partners
startAnimation();
