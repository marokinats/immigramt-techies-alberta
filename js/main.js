(function ($) {
  'use strict';

  /*PRELOADER JS
	$(window).on('load', function() { 
		$('.loader').fadeOut();
		$('.preloader').delay(350).fadeOut('slow'); 
	}); 
END PRELOADER JS*/

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('menu-shrink');
    } else {
      $('#header').removeClass('menu-shrink');
    }
  });

  const links = document.querySelectorAll('.header__link');
  for (const link of links) {
    link.addEventListener('click', clickHandler);
  }
  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop - 100;
    scroll({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });

  // Active  WOW
  new WOW().init();
})(jQuery);
