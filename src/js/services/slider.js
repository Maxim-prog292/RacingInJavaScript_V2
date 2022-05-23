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

  let sliderIndex = 0;

  export default function onShowChangeCar(changeCarWindow) {
    changeCarWindow.classList.remove('hide');
    swiper.on('slideChange',  () => {
        sliderIndex = swiper.realIndex;
        console.log(sliderIndex);
    });

    return sliderIndex;
}