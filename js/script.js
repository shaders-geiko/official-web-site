function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setHeight();
  window.addEventListener("resize", setHeight);

  const verticalSlider = new Swiper(".vertical-slider", {
    direction: "vertical",
    slidesPerView: 1,
    speed: 600,
    effect: "fade",
    mousewheel: true,
    pagination: {
      el: ".vertical-slider__pagination",
      type: "bullets",
      clickable: true,
    },
  });
  
$(function () {
  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

})