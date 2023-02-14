import './vendor/jquery.min.js'

const scrollToID = (id) => {
  const targetElement = $(id);
  if (targetElement.length > 0) {
    var offset = 65;
    var targetOffset = targetElement.offset().top - offset;
    $('html, body').animate({ scrollTop: targetOffset }, 500);
  }
}

const initializeMegaMenu = () => {
  const closeMegaMenu = () => {
    $('.navbar-menu .navbar-menu__dropdown a.active').removeClass('active');
    $('.l-megamenu').removeClass('active').slideToggle();
  }

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
    closeMegaMenu();
    $(this).fadeOut();
  });

  $('.js-close-megamenu').on('click', () => {
    $('.overlay').fadeOut();
    closeMegaMenu();

    return false;
  });

  // if anchor links
  $('.l-megamenu__links a[href*="#"]').on('click', function () {
    var url = $(this).attr('href').split('#');

    if (url[0] === window.location.pathname) {
      $('.overlay').fadeOut();
      closeMegaMenu();

      setTimeout(() => {
        scrollToID('#' + url[1]);
      }, 400);

      return false;
    }
  });

  // close mega menu via clicking ESC
  $(document).keyup((e) => {
    if (e.keyCode == 27 && $('.navbar-menu .navbar-menu__dropdown a.active').length) {
      close_megamenu();
      $('.overlay').fadeOut();
    }
  });
}

const initializeSearchBar = () => {
  function closeSearchBar() {
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
    closeSearchBar();
  });

  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      closeSearchBar();
    }
  });
}

const initializeBurgerMenu = () => {
  $('.l-navbar__burger').on('click', function () {
    $('.navbar-menu').toggleClass('active');
  });
}

const scrollToHashURL = () => {
  $(document).ready(function() {
    if (window.location.hash) {
      scrollToID(window.location.hash);
    }
  });
}

const addTargetBlankToExternalLinks = () => {
  $('a[rel="external"]').attr('target', '_blank');
}

// Init Global
initializeMegaMenu();
initializeSearchBar();
initializeBurgerMenu();
scrollToHashURL();
addTargetBlankToExternalLinks();
