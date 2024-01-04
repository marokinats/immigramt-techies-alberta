(function ($) {
  'use strict';

  function menuShrink() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('menu-shrink');
    } else {
      $('#header').removeClass('menu-shrink');
    }
  }

  $(window).on('load', menuShrink);
  $(window).on('scroll', menuShrink);

  const links = document.querySelectorAll('.header__link');
  for (const link of links) {
    link.addEventListener('click', clickHandler);
  }

  async function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop - 85;
    await scroll({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  $(document).on('click', '.navbar-collapse.show', function (e) {
    if ($(e.target).is('a')) {
      $(this).collapse('hide');
    }
  });

  // Active  WOW
  new WOW().init();

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    // pagination
    pagination: {
      el: '.swiper-pagination'
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
})(jQuery);
