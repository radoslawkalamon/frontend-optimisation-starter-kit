define(['jquery'], function ($) {
	const global = {
		megamenu: function () {
			$('.navbar-menu .navbar-menu__dropdown a').on('click', function () {
				var megamenu_layer_id = $(this).attr('id');

				$('.l-megamenu__layer').css({ 'display': 'none' });
				$('#megamenu-' + megamenu_layer_id).fadeIn();
				$('.overlay').fadeIn();

				if (!($(this).hasClass('active'))) {
					$('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
					$(this).addClass('active');

					if (!($('.l-megamenu').hasClass('active'))) {
						$('.l-megamenu').slideToggle().addClass('active');
					}
				} else {
					$(this).removeClass('active');
					$('.l-megamenu').removeClass('active').slideToggle();
					$('.overlay').fadeOut();
				}

				return false;
			});

			function close_megamenu() {
				$('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
				$('.l-megamenu').removeClass('active').slideToggle();
			}

			$('.overlay').on('click', function () {
				close_megamenu();
				$(this).fadeOut();
			});

			$('.js-close-megamenu').on('click', function () {
				$('.overlay').fadeOut();
				close_megamenu();

				return false;
			});

			// if anchor links
			$('.l-megamenu__links a[href*="#"]').on('click', function () {
				var url = $(this).attr('href').split('#');

				if (url[0] === window.location.pathname) {
					$('.overlay').fadeOut();
					close_megamenu();

					setTimeout(() => {
						global.scrollToID('#' + url[1]);
					}, 400);

					return false;
				}
			});

			// close mega menu via clicking ESC
			$(document).keyup(function (e) {
				if (e.keyCode == 27 && $('.navbar-menu .navbar-menu__dropdown a.active').length) {
					close_megamenu();
					$('.overlay').fadeOut();
				}
			});
		},

		searchbar: function () {
			function close_searchbar() {
				$('.search .layout3').fadeOut(0);
				$('.search').fadeOut(0);
				$('html').removeClass('no-scrollbar');
			}

			$('.js-open-searchbar').on('click', function () {
				$('.search').fadeIn(0);
				$('.search .layout3').fadeIn();
				$('html').addClass('no-scrollbar');
				$('.search input').focus();

				return false;
			});

			$('.search .btn-close').on('click', function () {
				close_searchbar();
			});

			$(document).keyup(function (e) {
				if (e.keyCode == 27) {
					close_searchbar();
				}
			});
		},

		burger_menu: function () {
			$('.l-navbar__burger').on('click', function () {
				$('.navbar-menu').toggleClass('active');
			});
		},

		scrollToID: function (id) {
			const targetElement = $(id);
			if (targetElement.length > 0) {
				var offset = 65;
				var targetOffset = targetElement.offset().top - offset;
				$('html, body').animate({ scrollTop: targetOffset }, 500);
			}
		},

		hash_urls: function () {
			$(document).ready(function() {
				if (window.location.hash) {
					global.scrollToID(window.location.hash);
				}
			});
		},
		addTargetBlankToExternalLinks() {
			$('a[rel="external"]').attr('target', '_blank');
		},
		wrapButtonsInner() {
			$('.btn').wrapInner('<span />');
		}
	};

	return {
		init: function () {
			global.megamenu();
			global.searchbar();
			global.burger_menu();
			global.hash_urls();
			global.addTargetBlankToExternalLinks();
			global.wrapButtonsInner();
		}
	};
});