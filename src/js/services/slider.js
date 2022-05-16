const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  export default function onShowChangeCar(changeCarWindow) {
    changeCarWindow.classList.remove('hide');
    let sliderIndex = 0;
    swiper.on('slideChange',  () => {
        sliderIndex = swiper.realIndex ;
    });

    return sliderIndex;
}