const _menuBtn = $('#js-hamburger')
const _header = $('#js-header')
const _navigation = $('#js-navigation')
_menuBtn.click(function(){
	$('html').toggleClass('is-fixed')
	_header.toggleClass('is-open')
	_navigation.toggleClass('is-show')
})

$('.l-navigation__link').click(function(){
	$('html').toggleClass('is-fixed')
	_header.toggleClass('is-open')
	_navigation.toggleClass('is-show')
})

let _height = $(window).outerHeight(true);
let _about = $('#about').offset().top;
$(window).scroll(function(){
	if (window.matchMedia && window.matchMedia('(max-device-width: 768px)').matches) {
		if($(this).scrollTop() + _height > _about){
			$(_header).addClass('is-fixed');
		} else {
			$(_header).removeClass('is-fixed');
		}
	}
});
