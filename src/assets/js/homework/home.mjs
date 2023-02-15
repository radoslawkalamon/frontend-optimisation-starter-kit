import './vendor/jquery.min.js'
import './vendor/magnific.min.js'
import './vendor/TweenMax.min.js'
import './vendor/bxslider.min.js'

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
    /* init anim items and set initial properties */
    TweenMax.set('#platform', { top: '-10%' });
    TweenMax.set('#platform, #card-base, #card-chip, #email-icon', { top: '-10%' });

    TweenMax.set('#chart-base', { top: '5%' });
    TweenMax.set('#chart-1', { scaleY: 0.1, top: '50.2%' });
    TweenMax.set('#chart-2', { scaleY: 0.1, top: '53.8%' });
    TweenMax.set('#chart-3', { scaleY: 0.1, top: '63.4%' });

    TweenMax.set('#cloud', { left: '20%', top: '8%' });
    TweenMax.set('#social', { left: '-10%', top: '-4%' });
    TweenMax.set('#mobile', { top: '20%' });
    TweenMax.set('#pc', { left: '10%', top: '-2%' });

    TweenMax.set('#rainbow', { opacity: 0, left: '-5%' });

    // Animation start
    TweenLite.to('.home-banner__anim', 1, { opacity: 1, delay: 0.5 });
    TweenLite.to('#platform, #pc', 1, { top: '0', ease: Back.easeOut, delay: 0.5 });

    TweenLite.to('#card-base', 1.1, { top: '-2%', ease: Back.easeOut, delay: 0.5 });
    TweenLite.to('#card-chip', 1.2, { top: '-3%', delay: 0.5 });

    TweenLite.to('#email-icon', 1.2, { top: '-2%', ease: Back.easeOut, delay: 0.5 });

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
    this.slider_features();
    this.setObserverForInfoBoxAnimation();
    this.setObserverForBackgroundImages();
    this.magnific();
    this.arrowDownButtonEvent();
  }
};

// Init Home
home.init();
