$(document).ready(function() {
  $('.sidenav').sidenav();
  $('.parallax').parallax();

  var width = $(".scene").width();
  var height = $(".scene").height();
  var stars = ['white-star-image', 'gold-star-image', 'teal-star-image'];
  stars.forEach(populateStars);

  function populateStars(value) {
    for (var i = 0; i < 25; i++) {
      // Pad the left and right by 30px
      // 30 + (rand * (width of div - 60 - px of largest star))
      var left = Math.floor(30 + (Math.random() * (width-70)));
      // Pad the top by 90px and bottom by 42px
      var top = Math.floor(90 + (Math.random() * (height-150)));
      // Populate stars
      $(`<div class='${value}'></div>`).appendTo(".scene").css({
        left: left,
        top: top
      });
    }
  };

  anime({
    targets: '.white-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 3000,
    }
  });

  anime({
    targets: '.gold-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 5000,
    }
  });

  anime({
    targets: '.teal-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 7000,
    }
  });
});
