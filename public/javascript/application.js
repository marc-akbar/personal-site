$(document).ready(function() {
  $('.sidenav').sidenav();
  $('.parallax').parallax();

  var width = $(".scene").width();
  var height = $(".scene").height();
  var stars = ['white-star-image', 'gold-star-image', 'teal-star-image']
  stars.forEach(populateStars);

  function populateStars(value) {
    for (var i = 0; i < 15; i++) {
      // Pad the left and right by 30px
      var left = Math.floor(30 + (Math.random() * (width-60)));
      // Pad the top by 90px and bottom by 60px
      var top = Math.floor(90 + (Math.random() * (height-150)));
      $(`<div class='${value}'></div>`).appendTo(".scene").css({
        left: left,
        top: top
      });
    }
  }

  anime({
    targets: '.white-star-image',
    easing: 'linear',
    rotate: {
      value: 360,
      duration: 3000,
      loop: true,
    },
    translateX: {
      value: 1000,
      duration: 100000
    },
    translatey: {
      value: -1000,
      duration: 100000
    }
  });

  anime({
    targets: '.gold-star-image',
    easing: 'linear',
    rotate: {
      value: 360,
      duration: 4000,
      loop: true,
    },
    translateX: {
      value: 1000,
      duration: 100000
    },
    translatey: {
      value: -1000,
      duration: 100000
    }
  });

  anime({
    targets: '.teal-star-image',
    easing: 'linear',
    rotate: {
      value: 360,
      duration: 5000,
      loop: true,
    },
    translateX: {
      value: 1000,
      duration: 100000
    },
    translatey: {
      value: -1000,
      duration: 100000
    }
  });
});
