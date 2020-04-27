$(document).ready(function() {
  // Remove blank page when page loads
  $("#loading").remove();

  // Materialize initializations
  $('.sidenav').sidenav();
  $('.materialboxed').materialbox();

  // Star population
  var width = $("#scene").width();
  var height = $("#scene").height();
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
      var top = Math.floor(Math.random() * ((height) - (height * 0.3))) + (height * 0.15);
      $(`<div class='${value}'></div>`).appendTo("#scene.night").css({
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
      $(`<div class='${value}'></div>`).appendTo("#scene.night").css({
        left: left,
        top: top
      });
    }
  };

  function populateRightStars(value) {
    for (var i = 0; i < (width/100); i++) {
      // Pad the right by 10px
      var left = Math.floor(Math.random() * (width - leftBound - 25)) + leftBound - 25;
      var top = Math.floor(Math.random() * (height - (height * 0.3))) + (height * 0.15);
      $(`<div class='${value}'></div>`).appendTo("#scene.night").css({
        left: left,
        top: top
      });
    }
  };

  // Populate and ease in clouds
  $(`<div class='left-cloud'></div>`).appendTo("#scene.day");
  $(`<div class='right-cloud'></div>`).appendTo("#scene.day");
  $(`<div class='bottom-cloud'></div>`).appendTo("#scene.day");

  var cloudImages = document.querySelectorAll('div[class*="-cloud"]')
  anime({
    targets: cloudImages,
    translateY: ['100%', '0%'],
    easing: 'easeOutSine',
    duration: 1500
  });
  anime({
    targets: cloudImages,
    opacity: '100%',
    easing: 'easeInQuad',
    duration: 1000
  });

  if (window.location.pathname === "/") {
    // Title drawing animation
    var svgPath = document.querySelectorAll('.path');
    anime({
      targets: svgPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInSine',
      duration: 600,
      delay: (el, i) => { return i * 400 }
    });

    // Ease in greeting text and scene
    var greetingScene = document.querySelector("#greeting-scene");
    var greetingText = greetingScene.querySelector('.greeting-text');
    var greetingMountain = greetingScene.querySelector('.mountain-image');
    var greetingStars = greetingScene.querySelectorAll('div[class*="-star-"]');
    anime({
      targets: greetingText,
      opacity: '100%',
      easing: 'easeInSine',
      delay: 2000
    });

    anime({
      targets: [greetingMountain, 'nav'],
      opacity: '100%',
      easing: 'easeInSine',
      delay: 3000
    });

    anime({
      targets: greetingStars,
      opacity: '100%',
      easing: 'easeInSine',
      delay: 3500
    });

  } else {

    // Star rotation and easing outside greeting scene
    var starImages = document.querySelectorAll('div[class*="-star-"]')
    anime({
      targets: starImages,
      opacity: '100%',
      easing: 'easeInSine',
      duration: 1000
    });
  };

  anime({
    targets: '.gold-star-image',
    loop: true,
    rotate: 360,
    duration: 4000,
    easing: 'linear'
  });

  anime({
    targets: '.teal-star-image',
    loop: true,
    rotate: 360,
    duration: 9000,
    easing: 'linear'
  });
});

// localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark');
// localStorage.getItem('mode') === 'dark' ? document.querySelector('body').classList.add('dark') : document.querySelector('body').classList.remove('dark')
