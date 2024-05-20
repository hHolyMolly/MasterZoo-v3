(() => {
  const slidersArr = document.querySelectorAll('.swiper');
  const arrowPrev = document.querySelectorAll('.testimonials .swiper-button-prev');
  const arrowNext = document.querySelectorAll('.testimonials .swiper-button-next');

  slidersArr.forEach((slider, index) => {
    new Swiper(slider, {
      grabCursor: true,
      speed: 500,
      spaceBetween: 10,
      slidesPerView: 1,

      navigation: {
        nextEl: arrowNext[index],
        prevEl: arrowPrev[index],
      },

      breakpoints: {
        991.98: {
          spaceBetween: 35,
          slidesPerView: 3,
        },

        767.98: {
          spaceBetween: 25,
          slidesPerView: 2,
        },
      },
    });
  });
})();
