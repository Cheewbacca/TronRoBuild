"use strict";

var heroes = {
  supernew: {
    name: 'Суперновичок',
    price: '250',
    income: '1',
    background: 'linear-gradient(90deg, rgba(255,140,139,1) 0%, rgba(255,185,184,1) 100%)',
    cells: 50,
    img: 'hero1.png',
    prev: null,
    next: 'gunsmith'
  },
  gunsmith: {
    name: 'Оружейник',
    price: '1000',
    income: '1,05',
    background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
    cells: 25,
    img: 'hero2.png',
    prev: 'supernew',
    next: 'comandor'
  },
  comandor: {
    name: 'Командор',
    price: '5000',
    income: '1,1',
    background: 'linear-gradient(90deg, rgba(223,132,132,1) 0%, rgba(255,181,181,1) 100%)',
    cells: 12,
    img: 'hero3.png',
    prev: 'gunsmith',
    next: 'paladin'
  },
  paladin: {
    name: 'Паладин',
    price: '20000',
    income: '1,15',
    background: 'linear-gradient(90deg, rgba(104,119,194,1) 0%, rgba(191,202,255,1) 100%)',
    cells: 6,
    img: 'hero4.png',
    prev: 'comandor',
    next: 'archimag'
  },
  archimag: {
    name: 'Архимаг',
    price: '50000',
    income: '1,2',
    background: 'linear-gradient(90deg, rgba(245,183,111,1) 0%, rgba(255,225,190,1) 100%)',
    cells: 6,
    img: 'hero5.png',
    prev: 'paladin',
    next: 'professor'
  },
  professor: {
    name: 'Профессор',
    price: '75000',
    income: '1,25',
    background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
    cells: 5,
    img: 'hero6.png',
    prev: 'archimag',
    next: 'mistic'
  },
  mistic: {
    name: 'Мистик',
    price: '1000000',
    income: '1,3',
    background: 'linear-gradient(90deg, rgba(221,118,82,1) 0%, rgba(255,197,177,1) 100%)',
    cells: 5,
    img: 'hero7.png',
    prev: 'professor',
    next: null
  }
};
$('.ranks__content').children().each(function () {
  if ($(this).data('hero')) {
    if ($(this).hasClass('disabled')) {
      heroes[$(this).data('hero')].disabled = true;
    } else {
      heroes[$(this).data('hero')].disabled = false;
    }
  }
});
var modal_ranks = $('#modal_ranks');
$('#cross').on('click', function (e) {
  e.preventDefault();
  modal_ranks.fadeOut();
});
var lockSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"37.097\" height=\"48.265\" viewBox=\"0 0 37.097 48.265\">\n<g id=\"locked-padlock\" transform=\"translate(-56.313)\">\n  <path id=\"Path_44\" data-name=\"Path 44\" d=\"M90.778,19.491h-.94v-4.4A15.005,15.005,0,0,0,75.3,0c-.221,0-.662,0-.882,0A15.005,15.005,0,0,0,59.885,15.09v4.4h-.941c-1.449,0-2.632,1.5-2.632,3.343V44.91c0,1.845,1.182,3.355,2.632,3.355H90.778c1.449,0,2.632-1.51,2.632-3.355V22.834C93.41,20.987,92.227,19.491,90.778,19.491ZM77.844,33.85V40.52a1.424,1.424,0,0,1-1.4,1.41H73.283a1.424,1.424,0,0,1-1.4-1.41V33.85a4.039,4.039,0,0,1,2.541-6.873c.22-.009.662-.009.882,0a4.039,4.039,0,0,1,2.541,6.873Zm5.8-14.358H66.084v-4.4a8.778,8.778,0,1,1,17.555,0v4.4Z\" fill=\"var(--lock-color)\"/>\n</g>\n</svg>";

function changeSlide(hero) {
  var currentSlide = hero;
  $('#hero_image').css('opacity', 0);
  $('#hero_name').text(heroes[currentSlide].name);
  $('#price').text(heroes[currentSlide].price);
  $('#income').text(heroes[currentSlide].income);
  $('#modal_bg').css('background', heroes[currentSlide].background);
  $('#price_per_cell').text(parseInt(heroes[currentSlide].price * 0.3));
  $('#potentialCell').text(heroes[currentSlide].cells);
  $('.table').children().remove();

  for (var i = 0; i < heroes[currentSlide].cells; i++) {
    $('.table').append('<div class="table_item active"></div>');
  }

  for (var _i = 0; _i < 10; _i++) {
    if (!_i) {
      $('.table').append('<div class="table_item opened">' + lockSvg + '</div>');
    } else {
      $('.table').append('<div class="table_item">' + lockSvg + '</div>');
    }
  }

  $('#hero_image').prop('src', 'static/img/' + heroes[currentSlide].img);
  $('#hero_image').animate({
    opacity: 1
  }, 1000);
  checkButtons(hero);
  return;
}

function checkButtons(hero) {
  var newHero = hero;
  $('#prev').off('click');
  $('#next').off('click');

  if (heroes[newHero].prev && heroes[heroes[newHero].prev].disabled !== true) {
    $('#prev').show();
    $('#hero_image').css('opacity', 0);
    $('#prev').on('click', function () {
      changeSlide(heroes[newHero].prev);
    });
  } else {
    $('#prev').hide();
  }

  if (heroes[newHero].next && heroes[heroes[newHero].next].disabled !== true) {
    $('#next').show();
    $('#next').on('click', function () {
      $('#hero_image').css('opacity', 0);
      changeSlide(heroes[newHero].next);
    });
  } else {
    $('#next').hide();
  }
}

$('.ranks__content-item').not('.disabled').each(function () {
  $(this).on('click', function () {
    var hero = $(this).data('hero');
    changeSlide(hero);
    checkButtons(hero);
    modal_ranks.fadeIn();
  });
});
var counter = $('#counter');
$('#minus').on('click', function () {
  var counterValue = parseInt(counter.text());

  if (counterValue > 1) {
    counter.text(counterValue - 1);
  }
});
$('#plus').on('click', function () {
  var counterValue = parseInt(counter.text());
  counter.text(counterValue + 1);
});
$('#referal_link').on('click', function (e) {
  var _this = this;

  e.preventDefault();
  navigator.clipboard.writeText($(this).attr('href')).then(function () {
    $(_this).find('span').text('Copied !');
  }, function () {
    $(_this).find('span').text('Error, refresh page please');
  });
});
var heroes_avatars = [];

for (var i = 1; i < 8; i++) {
  heroes_avatars.push('static/img/hero' + i + '.png');
}

var heroAnimation = $('.heroes_animation img');
var thisId = 0;
var animationWidthHero = setInterval(function () {
  heroAnimation.attr('src', heroes_avatars[thisId]);
  thisId++;

  if (thisId == 7) {
    clearInterval(animationWidthHero);
  }
}, 500);
var heroes_content = $('.ranks .ranks__content');

if ($(window).width() > 768) {
  heroes_content.children().each(function () {
    $(this).css('opacity', 0);
  });
}

$(window).scroll(function (event) {
  var currentWidth = $(window).width();
  console.log(currentWidth);

  if ($(window).scrollTop() > $('.ranks').offset().top - $(window).height() / 2 && currentWidth > 768) {
    heroes_content.children().each(function () {
      $(this).animate({
        opacity: 1
      }, 1000);
    });
  }

  if ($(window).scrollTop() > $('.rules__content').offset().top - $(window).height() / 2 && currentWidth > 768) {
    $('.rules__content').addClass('animate__fadeInUpBig');
  }

  if ($(window).scrollTop() > $('.domestication').offset().top - $(window).height() / 2 && currentWidth > 768) {
    $('.domestication_info-text').addClass('animate__fadeInLeft');
    $('.domestication_info img').addClass('animate__fadeInRight');
  }

  if ($(window).scrollTop() > $('.statistic').offset().top - $(window).height() / 2 && currentWidth > 768) {
    $('.statistic__content').addClass('animate__fadeIn');
  }
});