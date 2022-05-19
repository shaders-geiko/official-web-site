$(function () {
  var navHeight = $(".header").outerHeight();
  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    console.log(position);
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });
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
      $('.news-wrapper').append("<div class='swiper-slide news-slide'><div class='card'><img src='"+img_path+"'/><div class='card-body'><h5 class='card-title'>"+title+"</h5><p class='card-text'>"+text+"</p></div></div></div>")
    }
  })
  $(".readmore").on("click", function() {
    $(this).toggleClass("on-click");
    $(".hide-text").slideToggle(1000);
});
  $(window).on('scroll',function(){

    $(".title").each(function(){
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight +140){
        $(this).addClass('isActive');
      }
    });
    
  });

})