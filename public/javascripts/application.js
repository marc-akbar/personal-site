$(document).ready(function() {
  // Remove loading page when page loads
  $("#loading").remove();
  // Materialize initializations
  $('.sidenav').sidenav();
  // Set initial time to day
  localStorage.setItem('mode', localStorage.getItem('mode') || 'day')
  // Load appropriate scene
  if (localStorage.getItem('mode') === 'night') {
    $('#dn').prop('checked', true);
    swapToNight();
  } else {
    $('#dn').prop('checked', false);
    swapToDay();
  };

  if (window.location.pathname === "/") {
    titleAnimation();
    easeInGreeting();
  } else { easeInStars(); };

  // Toggle day/night on switch
  $('#dn').on('change',function(){
		$(this).is(':checked') ? localStorage.setItem('mode', 'night') : localStorage.setItem('mode', 'day');
    localStorage.getItem('mode') === 'night' ? swapToNight() : swapToDay();
	});

  function swapToNight() {
    var el = document.querySelectorAll('.day')
    el.forEach(function(value) {value.classList.add('night')})
    el.forEach(function(value) {value.classList.remove('day')})
    $('div[class*="-cloud"]').remove();
    populateStars();
    easeInStars();
  };

  function swapToDay() {
    var el = document.querySelectorAll('.night')
    el.forEach(function(value) {value.classList.add('day')})
    el.forEach(function(value) {value.classList.remove('night')})
    $('div[class*="-star"]').remove();
    populateClouds();
    easeInClouds();
  };

  function titleAnimation() {
    // Title drawing animation
    var svgPath = document.querySelectorAll('.path');
    anime({
      targets: svgPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInSine',
      duration: 600,
      delay: function(el, i) { return i * 400 }
    });
  };

  function easeInGreeting() {
    // Ease in greeting text, scene and nav
    var greetingScene = document.querySelector("#greeting-scene");
    var greetingText = greetingScene.querySelector('.greeting-text');
    var greetingMountain = greetingScene.querySelector('.mountain-image');

    if (greetingScene.querySelectorAll('div[class*="-cloud"]').length === 0) {
      var greetingGraphics = greetingScene.querySelectorAll('div[class*="-star"]');
    } else {
      var greetingGraphics = greetingScene.querySelectorAll('div[class*="-cloud"]');
      anime({
        targets: greetingGraphics,
        translateY: ['100%', '0%'],
        easing: 'easeOutSine',
        duration: 1500,
        delay: 3500
      });
    };

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
      targets: greetingGraphics,
      opacity: '100%',
      easing: 'easeInSine',
      delay: 3500
    });

    // Ease in footer stars
    var footer = document.querySelector("#say-hi");
    var starImages = footer.querySelectorAll('div[class*="-star"]')
    anime({
      targets: starImages,
      opacity: '100%',
      easing: 'easeInSine',
      duration: 1000
    });
  };

  function populateClouds() {
    // Populate and ease in clouds
    $("<div class='left-cloud'></div>").appendTo("#scene.day");
    $("<div class='right-cloud'></div>").appendTo("#scene.day");
    $("<div class='sun-cloud'></div>").appendTo("#scene.day");
    $("<div class='left-cloud'></div>").appendTo("#say-hi");
    $("<div class='right-cloud'></div>").appendTo("#say-hi");
    $("<div class='sun-cloud'></div>").appendTo("#say-hi");
  };

  function easeInClouds() {
    var cloudImages = document.querySelectorAll('div[class*="-cloud"]');
    anime({
      targets: cloudImages,
      opacity: '100%',
      easing: 'easeInQuad',
      duration: 1000
    });
    anime({
      targets: cloudImages,
      translateY: ['100%', '0%'],
      easing: 'easeOutSine',
      duration: 1500
    });
  };

  function populateStars() {
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

  function easeInStars() {
    var starImages = document.querySelectorAll('div[class*="-star"]');
    anime({
      targets: starImages,
      opacity: '100%',
      easing: 'easeInSine',
      duration: 1000
    });
  };
});
