$(document).ready(function() {
  // Remove loading page when page loads
  $("#loading").remove();
  // Materialize initializations
  $('.sidenav').sidenav();
  $('.materialboxed').materialbox();

  function runClouds() {
    // Populate and ease in clouds
    $(`<div class='left-cloud'></div>`).appendTo("#scene.day");
    $(`<div class='right-cloud'></div>`).appendTo("#scene.day");
    $(`<div class='sun-cloud'></div>`).appendTo("#scene.day");

    $(`<div class='left-cloud'></div>`).appendTo("#say-hi");
    $(`<div class='right-cloud'></div>`).appendTo("#say-hi");
    $(`<div class='sun-cloud'></div>`).appendTo("#say-hi");

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
  };

  function runStars() {
    // Star population in scene
    var width = $("#scene").width();
    var sceneHeight = $("#scene").height();
    var rightBound = width * 0.37  // right boundary for left star population
    var leftBound = width * 0.63 // left boundary for right star population
    var footerHeight = $("#say-hi").height();
    var stars = ['white-star-image', 'gold-star-image', 'teal-star-image'];

    stars.forEach(populateLeftStars);
    stars.forEach(populateMiddleStars);
    stars.forEach(populateRightStars);
    stars.forEach(populateFooterStars);

    function populateLeftStars(value) {
      for (var i = 0; i < (width/100); i++) {
        // Pad the left by 10px
        var left = Math.floor(Math.random() * (rightBound - 10)) + 10;
        var top = Math.floor(Math.random() * ((sceneHeight) - (sceneHeight * 0.3))) + (sceneHeight * 0.15);
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
        var top = Math.floor(Math.random() * (sceneHeight - (sceneHeight * 0.59))) + (sceneHeight * 0.5);
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
        var top = Math.floor(Math.random() * (sceneHeight - (sceneHeight * 0.3))) + (sceneHeight * 0.15);
        $(`<div class='${value}'></div>`).appendTo("#scene.night").css({
          left: left,
          top: top
        });
      }
    };
    function populateFooterStars(value) {
      for (var i = 0; i < (width/100); i++) {
        // Pad the left and right by 10px
        var left = Math.floor(Math.random() * (width - 25)) + 10;
        var top = Math.floor(Math.random() * (footerHeight - 25)) + 25;
        $(`<div class='${value}'></div>`).appendTo("#say-hi").css({
          left: left,
          top: top
        });
      }
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
  };

  runStars();
  localStorage.setItem('mode', 'night')

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

    // Ease in greeting text, scene and nav
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
      targets: [greetingMountain, '.nav-wrapper', '.sidenav-trigger'],
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

    // Ease in footer stars
    var footer = document.querySelector("#say-hi");
    var starImages = footer.querySelectorAll('div[class*="-star-"]')
    anime({
      targets: starImages,
      opacity: '100%',
      easing: 'easeInSine',
      duration: 1000
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

  // Toggle day/night
  $('.time-toggle').on('click',function(){
		if ($(this).find('i').text() === 'brightness_2') {
      $(this).find('i').text('wb_sunny');
      localStorage.setItem('mode', 'day')
    } else {
      $(this).find('i').text('brightness_2');
      localStorage.setItem('mode', 'night')
    };

    if (localStorage.getItem('mode') === 'day') {
      var el = document.querySelectorAll('.day')
      el.forEach(function(value) {value.classList.add('night')})
      el.forEach(function(value) {value.classList.remove('day')})
      $('div[class*="-cloud"]').remove();
      runStars();
    } else {
      var el = document.querySelectorAll('.night')
      el.forEach(function(value) {value.classList.add('day')})
      el.forEach(function(value) {value.classList.remove('night')})
      $('div[class*="-star-"]').remove();
      runClouds();
    };
	});
});
