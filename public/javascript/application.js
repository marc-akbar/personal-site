$(document).ready(function() {
  $('.sidenav').sidenav();
  $('.parallax').parallax();

  // get the width and height of the window
  var width = $("h1.title").width();
  var height = $("h1.title").height();
  // add 100 divs to the page
  for (var i = 0; i < 30; i++) {
    // the left position of the div should be at most the width of the
    // window minus the width of the div, so the div doesn't spill out
    // of the right side of the window.
    var left = Math.floor(Math.random() * (width-10));
    // the top position of the div should be at most the height of the
    // window minus the width of the div, so the div doesn't spill out
    // of the bottom of the window.
    var top = Math.floor(Math.random() * (height-10));
    // create a new div, append it to the body and set the top and
    // left positions in the CSS
    $("<div class='star-image'></div>").appendTo("h1.title").css({
      left: left,
      top: top
    });
  }
});
