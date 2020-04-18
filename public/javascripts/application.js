$(document).ready(function() {
  // Materialize initializations
  $('.sidenav').sidenav();
  $('.materialboxed').materialbox();

  // Title drawing animation
  var svgPath = document.querySelectorAll('.path');
  anime({
    targets: svgPath,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInSine',
    duration: 600,
    delay: (el, i) => { return i * 400 }
  });

  // Home page text animation
  anime({
    targets: '.home-text',
    opacity: '100%',
    easing: 'easeInSine',
    delay: 2000
  });

  anime({
    targets: ['.home-links', '.home-footer'],
    opacity: '100%',
    easing: 'easeInSine',
    delay: 2500
  });

  // Star population
  var width = $(".scene").width();
  var height = $(".scene").height();
  var rightBound = width * 0.37  // right boundary for left star population
  var leftBound = width * 0.63 // left boundary for right star population
  var stars = ['white-star-image', 'gold-star-image', 'teal-star-image'];

  stars.forEach(populateLeftStars);
  stars.forEach(populateMiddleStars);
  stars.forEach(populateRightStars);

  function populateLeftStars(value) {
    for (var i = 0; i < (width/100); i++) {
      // Pad the left by 10px
      var left = Math.floor(Math.random() * (rightBound - 10)) + 10;
      var top = Math.floor(Math.random() * ((height) - (height * 0.4))) + (height * 0.15);
      $(`<div class='${value}'></div>`).appendTo(".scene").css({
        left: left,
        top: top
      });
    }
  };

  function populateMiddleStars(value) {
    for (var i = 0; i < (width/100); i++) {
      // Pad the left and right by 10px
      var left = Math.floor(Math.random() * (width - 25)) + 10;
      var top = Math.floor(Math.random() * (height - (height * 0.59))) + (height * 0.5);
      $(`<div class='${value}'></div>`).appendTo(".scene").css({
        left: left,
        top: top
      });
    }
  };

  function populateRightStars(value) {
    for (var i = 0; i < (width/100); i++) {
      // Pad the right by 10px
      var left = Math.floor(Math.random() * (width - leftBound - 25)) + leftBound - 25;
      var top = Math.floor(Math.random() * (height - (height * 0.4))) + (height * 0.15);
      $(`<div class='${value}'></div>`).appendTo(".scene").css({
        left: left,
        top: top
      });
    }
  };

  anime({
    targets: '.gold-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 4000,
    }
  });

  anime({
    targets: '.teal-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 9000,
    }
  });
});