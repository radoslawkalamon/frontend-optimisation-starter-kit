import './vendor/jquery.min.js'
import helpers from './_helpers.js'

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
  
    $('.overlay').on('click', function () {
      global.closeMegaMenu();
      $(this).fadeOut();
    });
  
    $('.js-close-megamenu').on('click', () => {
      $('.overlay').fadeOut();
      global.closeMegaMenu();
  
      return false;
    });
  
    // if anchor links
    $('.l-megamenu__links a[href*="#"]').on('click', function () {
      var url = $(this).attr('href').split('#');
  
      if (url[0] === window.location.pathname) {
        $('.overlay').fadeOut();
        closeMegaMenu();
  
        setTimeout(() => {
          global.scrollToID('#' + url[1])
        }, 400);
  
        return false;
      }
    });
  
    $(document).on('keyup', (e) => {
      if (e.key === 'Escape' && $('.navbar-menu .navbar-menu__dropdown a.active').length) {
        global.closeMegaMenu();
        $('.overlay').fadeOut();
      }
    })
  },
  closeMegaMenu: () => {
    $('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
    $('.l-megamenu').removeClass('active').slideToggle();
  },
  initializeSearchBar: () => {
    $('.js-open-searchbar').on('click', () => {
      $('.search').fadeIn(0);
      $('.search .layout3').fadeIn();
      $('html').addClass('no-scrollbar');
      $('.search input').focus();
  
      return false;
    });
  
    $('.search .btn-close').on('click', () => {
      global.closeSearchBar()
    })
    $(document).on('keyup', (e) => {
      e.key === 'Escape' && global.closeSearchBar()
    })
  },
  closeSearchBar: () => {
    $('.search .layout3').fadeOut(0);
    $('.search').fadeOut(0);
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
    fakeTawkButton.addEventListener('click', function () {
      fakeTawkButton.classList.add('fake-tawk--loading');

      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = () => window.Tawk_API.maximize();
      window.Tawk_API.onChatMaximized = () => fakeTawkButton.remove();

      helpers.appendScript('https://embed.tawk.to/5fc2ba00920fc91564cb9b3c/default')
    })
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
