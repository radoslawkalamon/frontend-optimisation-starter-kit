require(['./main'], function (main) {
	require(['jquery', 'global'], function ($, global) {
		const newsListing = {
			ctaAds: function () {
				var ad = document.getElementById('js-cta-ad');
	
				if (!ad) {
					return;
				}
	
				$.ajax({
					url: '/cta-ad.html',
					type: 'GET'
				})
					.then(function (response) {
						ad.innerHTML = response;
					});
			}
		}

		newsListing.ctaAds();
		global.init();
	});
});
