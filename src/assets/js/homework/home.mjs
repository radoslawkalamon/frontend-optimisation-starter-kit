import './vendor/jquery.min.js'
import './vendor/magnific.min.js'

const helpers = {
  initIsVisibleObserver: ({ callback, elements, shallUnobserve = true, threshold = 0 }) => {
    let unobservedCount = 0

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          callback({ element: entry.target, isVisible: entry.isIntersecting })
          shallUnobserve && entry.isIntersecting && observer.unobserve(entry.target) && unobservedCount++
          elements.length === unobservedCount && observer.disconnect()
        })
      },
      {
        rootMargin: `${threshold}px 0px`
      }
    )
    elements.forEach(el => observer.observe(el))
  }
}

const home = {
  banner_anim: function () {
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
    $('.btn--arrow-down').on('click', function () {
      var offset = 65;
      var targetOffset = $('#main').offset().top - offset;
      $('html, body').animate({ scrollTop: targetOffset }, 500);
      return false;
    });
  },

  init: function () {
    this.banner_anim();
    this.setObserverForInfoBoxAnimation();
    this.setObserverForBackgroundImages();
    this.magnific();
    this.arrowDownButtonEvent();
  }
};

// Init Home
home.init();
