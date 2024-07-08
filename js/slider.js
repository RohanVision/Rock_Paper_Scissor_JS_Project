$(document).ready(function(){
    $('#slider>li:gt(0)').hide();
     setInterval(function() {
        $('#slider > li:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slider');
      }, 2000);

   });