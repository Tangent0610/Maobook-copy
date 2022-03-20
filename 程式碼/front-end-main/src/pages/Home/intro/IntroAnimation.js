// 動態特效 Parallax Mouse Move | GSAP
import TweenMax from 'gsap'
import $ from 'jquery'

var timeout
$('.home-intro-page').mousemove(function (e) {
  if (timeout) clearTimeout(timeout)
  setTimeout(callParallax.bind(null, e), 200)
})

function callParallax(e) {
  parallaxIt(e, '.home-info-txt', -30)
  parallaxIt(e, '.home-dialog', -50)
  parallaxIt(e, '.home-main-pic', -20)
  parallaxIt(e, '.home-intro-title', -30)
  parallaxIt(e, '.home-bg-paw', 10)
}

function parallaxIt(e, target, movement) {
  var $this = $('.home-intro-page')
  var relX = e.pageX - $this.offset().left
  var relY = e.pageY - $this.offset().top

  TweenMax.to(target, 1, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement,
  })
}
