$(document).ready(function() {
  // Materialize initializations
  $('.sidenav').sidenav();
  $('.parallax').parallax();

  // Title drawing animation
  var svgPath = document.querySelectorAll('.path');
  anime({
    targets: svgPath,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInSine',
    duration: 800,
    delay: (el, i) => { return i * 400 }
  });

  // Scramble text
  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 100)
        const end = start + Math.floor(Math.random() * 100)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  const phrases = [
    'developer',
    'climber',
    'learner'
  ]

  const el = document.querySelector('.scramble')
  const fx = new TextScramble(el)

  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 4000)
    })
    counter = (counter + 1) % phrases.length
  }

  next()

  // Star population
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

  // document.querySelectorAll('div[class*="white-star-image"]').forEach(move);
  //
  // function move(value) {
  //   anime({
  //     targets: value,
  //     easing: 'linear',
  //     loop: true,
  //     duration: 10000,
  //     translateX: function(el) {
  //       return width - ($(el).position().left);
  //     },
  //     translateY: function(el) {
  //       return height - ($(el).position().top);
  //     }
  //   });
  // }

  anime({
    targets: '.white-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 5000,
    }
  });

  anime({
    targets: '.gold-star-image',
    easing: 'linear',
    loop: true,
    rotate: {
      value: 360,
      duration: 6000,
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
