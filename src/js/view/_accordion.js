if($('.js-accordionTitle').length){
	$('.js-accordionTitle').on('click', function(){
		$(this).next().slideToggle();
		$(this).toggleClass('is-open');
	});
}
