$(document).ready(function() {
  // Materialize initializations
  $('.sidenav').sidenav();
  // Load appropriate scene
  pathcheck: if (localStorage.getItem('mode') === 'night') {
    $('#dn').prop('checked', true);
    populateStars();
    if (window.location.pathname === "/") { greetingAnimation(); break pathcheck; };
    easeInStars(); rotateStars();
  } else {
    $('#dn').prop('checked', false);
    populateClouds();
    if (window.location.pathname === "/") { greetingAnimation(); break pathcheck; };
    easeInClouds(); raiseClouds();
  };

  // Toggle day/night on switch
  $('#dn').on('change',function(){
		$(this).is(':checked') ? localStorage.setItem('mode', 'night') : localStorage.setItem('mode', 'day');
    if (localStorage.getItem('mode') === 'night') {
       swapToNight(); populateStars(); easeInStars(); rotateStars();
     } else {
       swapToDay(); populateClouds(); easeInClouds(); raiseClouds();
     };
	});

  function greetingAnimation() {
    var tl = gsap.timeline();
    var lCloud = $('.left-cloud');
    var sunClouds = $('.sun-cloud');
    tl.from('#greeting-scene .greeting-text', { opacity: 0, ease: 'power2.in', duration: 1, delay: 2 })
      .from(['#greeting-scene .mountain-image', '.nav-wrapper'], { opacity: 0, ease: 'none', duration: 1 })
      .addLabel('runScene', "-=1");

    if (localStorage.getItem('mode') === "night") {
      tl.from(['.white-star-image', '.gold-star-image', '.teal-star-image'], { opacity: 0, ease: 'power3.in', duration: 1 }, 'runScene')
        .from('.gold-star-image', { repeat: -1, rotation: -360, duration: 5, ease: 'none' }, 'runScene')
        .from('.teal-star-image', { repeat: -1, rotation: -360, duration: 10, ease: 'none' }, 'runScene');
    } else {
      tl.from(['#greeting-scene .left-cloud', '#greeting-scene .right-cloud', '#greeting-scene .sun-cloud'], { opacity: 0, ease: 'power3.in', duration: 1 }, 'runScene')
        .from(['#greeting-scene .left-cloud', '#greeting-scene .right-cloud'], { y: (lCloud.height() * 1.5), ease: 'power2.out', duration: 2 }, 'runScene')
        .from('#greeting-scene .sun-cloud', { y: (sunClouds.height() * 1.5), ease: 'power2.out', duration: 2 }, 'runScene');
      gsap.from(['#say-hi .left-cloud', '#say-hi .right-cloud', '#say-hi .sun-cloud'], { opacity: 0, ease: 'power3.in', duration: 1 });
      gsap.from(['#say-hi .left-cloud', '#say-hi .right-cloud'], { y: (lCloud.height() * 1.5), ease: 'power2.out', duration: 2 });
      gsap.from('#say-hi .sun-cloud', { y: (sunClouds.height() * 1.5), ease: 'power2.out', duration: 2 });
    };
  };

  function swapToNight() {
    var el = document.querySelectorAll('.day')
    el.forEach(function(value) {value.classList.add('night')})
    el.forEach(function(value) {value.classList.remove('day')})
    $('div[class*="-cloud"]').remove();
  };

  function swapToDay() {
    var el = document.querySelectorAll('.night')
    el.forEach(function(value) {value.classList.add('day')})
    el.forEach(function(value) {value.classList.remove('night')})
    $('div[class*="-star"]').remove();
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

  function easeInClouds() { gsap.from(['.left-cloud', '.right-cloud', '.sun-cloud'], { opacity: 0, ease: 'power3.in', duration: 1, delay: .2 }) };

  function raiseClouds() {
    var lCloud = $('.left-cloud');
    var sunClouds = $('.sun-cloud');
    gsap.from(['.left-cloud', '.right-cloud'], { y: (lCloud.height() * 1.5), ease: 'power2.out', duration: 2, delay: .2 });
    gsap.from(sunClouds, { y: (sunClouds.height() * 1.5), ease: 'power2.out', duration: 2, delay: .2 });
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
        $(`<div class='${value}'></div>`).appendTo("#scene.night").css({ left: left, top: top });
      }
    };
    function populateMiddleStars(value) {
      for (var i = 0; i < (width/100); i++) {
        // Pad the left and right by 10px
        var left = Math.floor(Math.random() * (width - 25)) + 10;
        var top = Math.floor(Math.random() * (sceneHeight - (sceneHeight * 0.59))) + (sceneHeight * 0.5);
        $(`<div class='${value}'></div>`).appendTo("#scene.night").css({ left: left, top: top });
      }
    };
    function populateRightStars(value) {
      for (var i = 0; i < (width/100); i++) {
        // Pad the right by 10px
        var left = Math.floor(Math.random() * (width - leftBound - 25)) + leftBound - 25;
        var top = Math.floor(Math.random() * (sceneHeight - (sceneHeight * 0.3))) + (sceneHeight * 0.15);
        $(`<div class='${value}'></div>`).appendTo("#scene.night").css({ left: left, top: top });
      }
    };
    function populateFooterStars(value) {
      for (var i = 0; i < (width/100); i++) {
        // Pad the left and right by 10px
        var left = Math.floor(Math.random() * (width - 25)) + 10;
        var top = Math.floor(Math.random() * (footerHeight - 25)) + 25;
        $(`<div class='${value}'></div>`).appendTo("#say-hi").css({ left: left, top: top });
      }
    };
  };

  function easeInStars() { gsap.from(['.white-star-image', '.gold-star-image', '.teal-star-image'], { opacity: 0, ease: 'power3.in', duration: 1, delay: .2 }) };

  function rotateStars() {
    gsap.from('.gold-star-image', { repeat: -1, rotation: -360, duration: 5, ease: 'none', delay: .2 });
    gsap.from('.teal-star-image', { repeat: -1, rotation: -360, duration: 10, ease: 'none', delay: .2 });
  };
});
