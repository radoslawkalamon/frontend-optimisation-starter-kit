import './vendor/jquery.min.js'
import helpers from './_helpers.js'

const FADE_TOGGLE_TIME = 200

const global = {
  scrollToID: (id) => {
    const targetElement = $(id);
    if (targetElement.length > 0) {
      var offset = 65;
      var targetOffset = targetElement.offset().top - offset;
      $('html, body').animate({ scrollTop: targetOffset }, 500);
    }
  },
  initializeMegaMenu: () => {  
    $('.navbar-menu .navbar-menu__dropdown a').on('click', function () {
      const layerID = $(this).attr('id');
      const layerElement = $('#megamenu-' + layerID);

      $('.overlay').fadeIn(FADE_TOGGLE_TIME);
  
      if (!($(this).hasClass('active'))) {
        $('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
        $(this).addClass('active');
  
        if (!($('.l-megamenu').hasClass('active'))) {
          $('.l-megamenu').fadeToggle(FADE_TOGGLE_TIME).addClass('active');
        }
      } else {
        global.closeMegaMenu();
      }

      $('.l-megamenu__layer').hide();
      if ($('.l-megamenu').hasClass('active')) {
        layerElement.fadeIn(FADE_TOGGLE_TIME);
      } else {
        layerElement.show();
      }
  
      return false;
    });
  
    $('.overlay').on('click', () => global.closeMegaMenu());
    $('.js-close-megamenu').on('click', () => global.closeMegaMenu());
  
    // if anchor links
    $('.l-megamenu__links a[href*="#"]').on('click', function () {
      var url = $(this).attr('href').split('#');
  
      if (url[0] === window.location.pathname) {
        global.closeMegaMenu();
        setTimeout(() => global.scrollToID('#' + url[1]), FADE_TOGGLE_TIME);
        return false;
      }
    });
  
    $(document).on('keyup', (e) => {
      if (e.key === 'Escape' && $('.navbar-menu .navbar-menu__dropdown a.active').length) {
        global.closeMegaMenu();
      }
    })
  },
  closeMegaMenu: () => {
    $('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
    $('.l-megamenu').removeClass('active').fadeToggle(FADE_TOGGLE_TIME);
    $('.overlay').fadeOut(FADE_TOGGLE_TIME);
  },
  initializeSearchBar: () => {
    $('.js-open-searchbar').on('click', () => {
      $('.search').fadeIn(FADE_TOGGLE_TIME);
      $('.search .layout3').fadeIn(FADE_TOGGLE_TIME);
      $('html').addClass('no-scrollbar');
      $('.search input').focus();
  
      return false;
    });
  
    $('.search .btn-close').on('click', () => global.closeSearchBar())
    $(document).on('keyup', (e) => e.key === 'Escape' && global.closeSearchBar())
  },
  closeSearchBar: () => {
    $('.search .layout3').fadeOut(FADE_TOGGLE_TIME);
    $('.search').fadeOut(FADE_TOGGLE_TIME);
    $('html').removeClass('no-scrollbar');
  },
  initializeBurgerMenu: () => {
    $('.l-navbar__burger').on('click', () => {
      $('.navbar-menu').toggleClass('active')
    });
  },
  scrollToHashURL: () => {
    document.addEventListener("DOMContentLoaded", () => {
      window.location.hash && global.scrollToID(window.location.hash)
    })
  },
  addTargetBlankToExternalLinks: () => {
    $('a[rel="external"]').attr('target', '_blank')
  },
  initTawk: () => {
    const fakeTawkButton = document.querySelector('[data-hook="fake-tawk"]')
    fakeTawkButton.addEventListener(
      'click',
      () => {
        fakeTawkButton.classList.add('fake-tawk--loading');

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.onLoad = () => window.Tawk_API.maximize();
        window.Tawk_API.onChatMaximized = () => fakeTawkButton.remove();

        helpers.appendScript('https://embed.tawk.to/5fc2ba00920fc91564cb9b3c/default')
      },
      { once: true }
    )
  },
  init: () => {
    global.initializeMegaMenu()
    global.initializeSearchBar()
    global.initializeBurgerMenu()
    global.scrollToHashURL()
    global.addTargetBlankToExternalLinks()
    global.initTawk()
  }
}

global.init()
