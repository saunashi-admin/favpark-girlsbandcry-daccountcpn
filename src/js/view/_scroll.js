if($('[data-scroll]').length){
	let _EffectH = 100;
	$(window).on('scroll load', function() {
		let _scTop = $(this).scrollTop();
		let _scBottom = _scTop + $(this).height();
		let _effectPos = _scBottom - _EffectH;
		$('[data-scroll]').each( function() {
			let _thisPos = $(this).offset().top;
			if ( _thisPos < _effectPos ) {
				$.when(
					$(this).addClass('is-show')
				).done(function() {
					$(this).delay(500).queue(function(){
						$(this).addClass('is-done')
					})
				});
			}
		});
	});
}

