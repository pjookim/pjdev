new fullpage('#fullpage', {
  verticalCentered: false,
  onLeave: function (origin, destination, direction) {
    var leavingSection = this;

    $('.section-title').css('opacity', '0');

    if (destination.index == 0) {
      // $('.section-title').css('display', 'block');
      $('.section-title').text('Comment');
      $('.section-title').css('opacity', '0');
      $('#bottom').css('display', 'block')
    }

    if ($(document).width() > 500) {
      $('.top').css('top', '-16px');
      $('.right').css('right', '-16px');
      $('.bottom').css('bottom', '-16px');
      $('.left').css('left', '-16px');
    } else {
      $('.top').css('top', '-8px');
      $('.right').css('right', '-8px');
      $('.bottom').css('bottom', '-8px');
      $('.left').css('left', '-8px');
    }
  },
  afterLoad: function (origin, destination, direction) {
    var loadedSection = this;
    if ($(document).width() > 500) {
      $('.top').css('top', '48px');
      $('.right').css('right', '48px');
      $('.bottom').css('bottom', '48px');
      $('.left').css('left', '48px');
    } else {
      $('.top').css('top', '24px');
      $('.right').css('right', '24px');
      $('.bottom').css('bottom', '24px');
      $('.left').css('left', '24px');
    }
    console.log(destination);

    if (destination.index == 1) {
      // $('.section-title').css('display', 'block');
      $('.section-title').text('Comment');
      $('.section-title').css('opacity', '1');
      $('#bottom').css('display', 'none')
    } else {
      // $('.section-title').css('display', 'none');
      $('.section-title').css('opacity', '0');
    }
  },
  scrollOverflow: true,
  normalScrollElements: '.comment, .list',
  scrollOverflowOptions: {
    scrollbars: true,
    mouseWheel: true,
    hideScrollbars: false,
    fadeScrollbars: false,
    disableMouse: true
  }
});

$(window).load(function () {
  $(".col-3 input").val("");

  $(".input-effect input").focusout(function () {
      if ($(this).val() != "") {
          $(this).addClass("has-content");
      } else {
          $(this).removeClass("has-content");
      }
  })
});

$(document).ready(function () {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(".content").mCustomScrollbar({
      theme: "dark",
      scrollButtons: {
        scrollType: "stepped"
      },
      live: "on",
      autoHideScrollbar: true
    });
  }
  //open popup
	// $('.cd-popup-trigger').on('click', function(event){
	// 	event.preventDefault();
	// 	$('.cd-popup').addClass('is-visible');
	// });
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('#negative > a')) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
    //------- Filter  js --------//  

    $('.filters ul li').click(function(){
      $('.filters ul li').removeClass('active');
      $(this).addClass('active');
      
      var data = $(this).attr('data-filter');
      $grid.isotope({
        filter: data
      })
    });


    if(document.getElementById("portfolio")){
          var $grid = $(".grid").isotope({
            itemSelector: ".all",
            percentPosition: true,
            masonry: {
              columnWidth: ".all"
            }
          })
    };
});

particlesJS.load('particles-js', '../assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});

class Plus {
  constructor() {
    this.icon = {
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      scale: 1
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.setTransform(
      this.icon.scale,
      0,
      0,
      this.icon.scale,
      this.icon.left + this.icon.x,
      this.icon.top + this.icon.y
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#eeeeee";
    ctx.moveTo(0, -this.icon.height / 2);
    ctx.lineTo(0, this.icon.height / 2);

    ctx.moveTo(-this.icon.width / 2, 0);
    ctx.lineTo(this.icon.width / 2, 0);

    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

const c = document.querySelector("#c");
const ctx = c.getContext("2d");

const signs = [];
const mouse = {
  x: 0,
  y: 0
};
const gridLength = 9;

let mouseMoved = false;
let mouseOver = false;

const init = () => {
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  for (let i = 0; i < gridLength; i++) {
    signs[i] = [];
    for (let j = 0; j < gridLength; j++) {
      const sign = new Plus();
      const min = Math.min(c.width, c.height);
      sign.icon.left = c.width / (gridLength + 1) * (i + 1);
      sign.icon.top = c.height / (gridLength + 1) * (j + 1);

      sign.icon.width = min / 50;
      sign.icon.height = min / 50;

      signs[i][j] = sign;
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, c.width, c.height);

  if (mouseMoved && mouseOver) {
    calculateIconPosition();

    mouseMoved = false;
  }

  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < gridLength; j++) {
      const sign = signs[i][j];
      sign.draw(ctx);
    }
  }
};

const calculateIconPosition = () => {
  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < gridLength; j++) {
      const sign = signs[i][j];
      let radius = Math.min(c.width, c.height) / (gridLength + 1) / 2;
      const dx = mouse.x - sign.icon.left;
      const dy = mouse.y - sign.icon.top;

      //console.log(dx)
      const dist = Math.hypot(dx, dy) || Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      const angle = Math.atan2(dy, dx);

      dist < radius + sign.icon.width ?
        ((radius = dist),
          TweenMax.to(sign.icon, 0.3, {
            scale: 2
          })) :
        TweenMax.to(sign.icon, 0.3, {
          scale: 1
        });

      TweenMax.to(sign.icon, 0.3, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    }
  }
};

const mouseMove = e => {
  const rect = c.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  mouseMoved = true;
};

const mouseLeave = e => {
  mouseOver = false;
  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < gridLength; j++) {
      const sign = signs[i][j];

      if (!mouseOver) {
        TweenMax.to(sign.icon, 0.3, {
          x: 0,
          y: 0,
          scale: 1
        });
      }
    }
  }
};

const mouseEnter = e => {
  mouseOver = true;
};


init();
window.addEventListener("resize", init);
TweenLite.ticker.addEventListener("tick", animate);
c.addEventListener("mouseenter", mouseEnter);
c.addEventListener("mouseleave", mouseLeave);
c.addEventListener("mousemove", e => mouseMove(e));