require(['./main'], function (main) {
	require(['jquery', 'lottie', 'global'], function ($, lottie, global) {
		const partners = {
			startAnimation() {
				document.querySelectorAll('.animation').forEach((animation) => {		
					lottie.loadAnimation({
						wrapper: animation,
						animType: 'svg',
						loop: true,
						path: animation.dataset.animationFile
					});
				});
			}
		}

		partners.startAnimation();
		global.init();
	});
});
