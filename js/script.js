function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setHeight();
  window.addEventListener("resize", setHeight);
  $.ajax({
		url: "https://script.google.com/macros/s/AKfycbzRJd7yi1dSgJJwS_4k8B_Z7gO8-KF_G7vsmDPMELeVZKJNipMZ19_p6nbYAU_o1NkX/exec"
	}).done(function(data){ 
    for (let key in data){
      console.log(key)
      title=data[key]['title'];
      date=data[key]['date'];
      img_path=data[key]['img-path'];
      text=data[key]['text'];
      console.log(img_path)
      $('.news-wrapper').append("<div class='swiper-slide news-slide'><div class='card'><img src='img/campus0.png'/><div class='card-body'><h5 class='card-title'>"+title+"</h5><p class='card-text'>"+text+"</p></div></div></div>")
    }
  })
$(function () {
  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

})