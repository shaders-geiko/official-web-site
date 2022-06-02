var d;
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
    d=data;
    for (let key in data){
      console.log(data)
      title=data[key]['title'];
      date=data[key]['date'].split('.')[0].split('T')[0];
      img_path=data[key]['img-path'];
      text=data[key]['abstract'];
      $('.news-wrapper').append("<div class='swiper-slide news-slide'><div class='card' id='"+key+"'><img src='"+img_path+"'/><div class='card-body'><p class='card-date'>"+date+"</p><h5 class='card-title'>"+title+"</h5><p class='card-text'>"+text+"</p></div></div></div>")
    }
  })
  $(".hide-text").hide();
  $(".readmore").on("click", function() {
    $(this).toggleClass("on-click");
    $(".hide-text").slideToggle(500);
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
  $(".swiper-wrapper").on("click",'.card',function(){
    console.log(this)
    var id=$(this).attr('id')
    console.log(id)
    $(".modal__content").children('img').attr('src',d[id]['img-path'])
    $('.modal-date').text(d[id]['date'].split('.')[0].split('T')[0])
    $('.modal-title').children('p').text(d[id]['title'])
    $('.modal-text').children('p').text(d[id]['main'])
    if (d[id]['link-f']){
      $('.detail-button').parents('a').attr('href',d[id]['link-path'])
      $('.detail-button').show()
    }else{
      $('.detail-button').hide()
    }
    
    $('.js-modal').fadeIn()
});
$('.js-modal-close').on('click',function(){
    $('.js-modal').fadeOut();
    return false;
});

})