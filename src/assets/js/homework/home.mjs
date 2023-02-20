import './vendor/jquery.min.js'
import './vendor/magnific.min.js'
import helpers from './_helpers.js'

const home = {
  startBannerAnimation: function () {
    document.querySelector('.home-banner__anim').classList.add('home-banner__anim--visible')
  },
  setObserverForInfoBoxAnimation: () => {
    helpers.initIsVisibleObserver({
      callback: ({ element, isVisible }) => isVisible && element.classList.add('info-box__product-tour--visible'),
      elements: [document.querySelector('.info-box__product-tour')]
    })
  },

  setObserverForBackgroundImages: () => {
    helpers.initIsVisibleObserver({
      callback: ({ element, isVisible }) => isVisible && element.removeAttribute('data-background-lazy-load'),
      elements: document.querySelectorAll('[data-background-lazy-load]'),
      threshold: 500
    })
  },
  setupMagnific: () => {
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

  addEventToArrowDownButton: () => {
    $('.btn--arrow-down').on('click', function () {
      var offset = 65;
      var targetOffset = $('#main').offset().top - offset;
      $('html, body').animate({ scrollTop: targetOffset }, 500);
      return false;
    });
  },

  init: () => {
    home.startBannerAnimation();
    home.setObserverForInfoBoxAnimation();
    home.setObserverForBackgroundImages();
    home.setupMagnific();
    home.addEventToArrowDownButton();
  }
};

home.init();
