require(['./main'], function (main) {
	require(['jquery', 'magnific', 'tweenmax', 'bxslider', 'global'], function ($, magnific, tweenmax, bxslider, global) {
		var h = {
			banner_anim: function () {
				/* init anim items and set initial properties */
				TweenMax.set('#platform', { top: '-10%' });
				TweenMax.set('#platform, #card-base, #card-chip, #email', { top: '-10%' });

				TweenMax.set('#chart-base', { top: '5%' });
				TweenMax.set('#chart-1', { scaleY: 0.1, top: '50.2%' });
				TweenMax.set('#chart-2', { scaleY: 0.1, top: '53.8%' });
				TweenMax.set('#chart-3', { scaleY: 0.1, top: '63.4%' });

				TweenMax.set('#cloud', { left: '20%', top: '8%' });
				TweenMax.set('#social', { left: '-10%', top: '-4%' });
				TweenMax.set('#mobile', { top: '20%' });
				TweenMax.set('#pc', { left: '10%', top: '-2%' });

				TweenMax.set('#rainbow', { opacity: 0, left: '-5%' });

				TweenLite.to('.home-banner__content p', 2, { opacity: 1, delay: 1.6 });
				TweenLite.to('.l-home-banner__3-cols > div', 1, { opacity: 1, delay: 1.7 });
				TweenLite.to('.home-banner__content .headline-1', 2, { opacity: 1, delay: 1.1 });
				TweenLite.to('.home-banner__anim img', 1, { opacity: 1 });
				TweenLite.to('.home-banner__content p .btn', 2, { opacity: 1, delay: 0 });
				TweenLite.to('.l-home-banner .btn--arrow-down', 2, { opacity: 1, delay: 2 });

				// Animation start
				TweenLite.to('.home-banner__anim', 1, { opacity: 1, delay: 0.5 });
				TweenLite.to('#platform, #pc', 1, { top: '0', ease: Back.easeOut, delay: 0.5 });

				TweenLite.to('#card-base', 1.1, { top: '-2%', ease: Back.easeOut, delay: 0.5 });
				TweenLite.to('#card-chip', 1.2, { top: '-3%', delay: 0.5 });

				TweenLite.to('#email', 1.2, { top: '-2%', ease: Back.easeOut, delay: 0.5 });

				TweenLite.to('#pc', 1.2, { top: '-1%', ease: Back.easeOut, delay: 0.5 });

				TweenLite.to('#chart-base', 1, { top: '0', ease: Back.easeOut, delay: 0.5 });
				TweenLite.to('#chart-1', 1, { scaleY: 1, top: '34.2%', ease: Expo.easeOut, delay: 0.5 });
				TweenLite.to('#chart-2', 1, { scaleY: 1, top: '41.7%', ease: Expo.easeOut, delay: 0.5 });
				TweenLite.to('#chart-3', 1, { scaleY: 1, top: '55.7%', ease: Expo.easeOut, delay: 0.5 });

				TweenLite.to('#cloud', 1.3, { top: 0, left: 0, ease: Expo.easeOut });
				TweenLite.to('#social', 1.2, { top: 0, left: 0, ease: Expo.easeOut });
				TweenLite.to('#mobile', 1.1, { top: 0, ease: Expo.easeOut });
				TweenLite.to('#pc', 1.3, { top: 0, left: 0, ease: Expo.easeOut });

				TweenLite.to('#rainbow', 1.1, { opacity: 1, delay: 0.5, left: 0 });
			},

			// banner height adjustment
			adjust_banner_height: function () {
				var do_it = 0;

				function change_banner_size() {
					if ($(window).width() > 1150 && $(window).height() > 700) {
						var viewport_h = $(window).height(),
							navbar_h = $('.l-navbar').height()

						var banner_height = viewport_h - navbar_h;

						$('.l-home-banner').css({ 'height': banner_height });
					} else {
						$('.l-home-banner').css({ 'height': 'auto' });
					}

					if ($(window).width() > 1150 && $(window).height() > 1000) {
						$('.l-home-banner').css({ 'height': '800px' });
					}
				}

				change_banner_size();
				this.banner_anim();

				$(window).resize(function () {
					clearTimeout(do_it);
					do_it = setTimeout(function () { change_banner_size(); }, 100);
				});
			},

			slider_features: function () {
				$('#slider-features').bxSlider({
					nextSelector: '.btn-arrow--right',
					prevSelector: '.btn-arrow--left',
					nextText: '',
					prevText: '',
					pagerCustom: '#slider-features-pager',
					touchEnabled: false
				});
			},

			info_box_anim: function () {
				const infoBox = document.querySelector('.info-box__product-tour');
				const infoBoxObserver = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							TweenMax.to('.info-box__product-tour img', 1.5, { right: '-85%', ease: Expo.easeOut });
							TweenMax.to('.info-box__product-tour .btn', 2, { opacity: 1, delay: 0.5, ease: Expo.easeOut });
							observer.disconnect();
						}
					});
				});
				infoBoxObserver.observe(infoBox);
			},

			paymentForms: function () {
				var form = document.getElementById('payment-form');	
				var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	
				// Create an instance of Elements.
				var elements = stripe.elements();
	
				// Custom styling can be passed to options when creating an Element.
				// (Note that this demo uses a wider set of styles than the guide below.)
				var style = {
					base: {
						color: '#32325d',
						fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
						fontSmoothing: 'antialiased',
						fontSize: '16px',
						'::placeholder': {
							color: '#aab7c4'
						},
						':-webkit-autofill': {
							color: '#32325d',
						},
					},
					invalid: {
						color: '#fa755a',
						iconColor: '#fa755a',
						':-webkit-autofill': {
							color: '#fa755a',
						},
					}
				};
	
				// Create an instance of the iban Element.
				var iban = elements.create('iban', {
					style: style,
					supportedCountries: ['SEPA'],
				});
	
				// Add an instance of the iban Element into the `iban-element` <div>.
				iban.mount('#iban-element');
	
				var errorMessage = document.getElementById('error-message');
				var bankName = document.getElementById('bank-name');
	
				iban.on('change', function (event) {
					// Handle real-time validation errors from the iban Element.
					if (event.error) {
						errorMessage.textContent = event.error.message;
						errorMessage.classList.add('visible');
					} else {
						errorMessage.classList.remove('visible');
					}
	
					// Display bank name corresponding to IBAN, if available.
					if (event.bankName) {
						bankName.textContent = event.bankName;
						bankName.classList.add('visible');
					} else {
						bankName.classList.remove('visible');
					}
				});
	
				// Handle form submission.
	
				form.addEventListener('submit', function (event) {
					event.preventDefault();
					showLoading();
	
					var sourceData = {
						type: 'sepa_debit',
						currency: 'eur',
						owner: {
							name: document.querySelector('input[name="name"]').value,
							email: document.querySelector('input[name="email"]').value,
						},
						mandate: {
							// Automatically send a mandate notification email to your customer
							// once the source is charged.
							notification_method: 'email',
						}
					};
	
					// Call `stripe.createSource` with the iban Element and additional options.
					stripe.createSource(iban, sourceData).then(function (result) {
						if (result.error) {
							// Inform the customer that there was an error.
							errorMessage.textContent = result.error.message;
							errorMessage.classList.add('visible');
							stopLoading();
						} else {
							// Send the Source to your server to create a charge.
							errorMessage.classList.remove('visible');
							stripeSourceHandler(result.source);
						}
					});
				});
			},

			magnific: function () {
				$('a.popup, .js-popup').on('click', function () {
					var href = $(this).attr('href');
					var isInlinePopup = $(this).attr('data-inline-popup') || false;
	
					$.magnificPopup.open({
						items: {
							src: href
						},
						type: isInlinePopup ? 'inline' : 'iframe',
						titleSrc: 'title',
					});
	
					return false;
				});
			},

			arrowDownButtonEvent() {
				/* slide to main section (button under main banner) */
				$('.btn--arrow-down').on('click', function () {
					var offset = 65;
					var targetOffset = $('#main').offset().top - offset;
					$('html, body').animate({ scrollTop: targetOffset }, 500);
					return false;
				});
			},

			init: function () {
				this.adjust_banner_height();
				this.slider_features();
				this.info_box_anim();
				this.paymentForms();
				this.magnific();
				this.arrowDownButtonEvent();
			}
		};

		h.init();
		global.init();
	});
});