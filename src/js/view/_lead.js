function lead() {
	$('.js-justify').each(function(){
		var fontSize = parseInt($(this).css('font-size'));
		var maxCharsPerLine = Math.floor($(this).innerWidth() / fontSize);
		var html = $(this).html();
		var lines = html.replace(/\s+/g, ' ').trim().split(/(<[^>]+>)/g);
		var newLines = '';
		var currentLine = '';
		var charCount = 0;

		if ($(window).width() <= 1023) {
			lines.forEach(function(part) {
				if (part.match(/<[^>]+>/)) {
					currentLine += part;
				} else {
					for (var i = 0; i < part.length; i++) {
						var char = part[i];
						if (char.match(/[0-9]/)) {
							charCount += 0.5;
						} else {
							charCount += 1;
						}
						if (charCount > maxCharsPerLine) {
							if (currentLine.trim().length > 0) {
								newLines += '<span>' + currentLine.trim() + '</span>';
							}
							currentLine = '';
							charCount = char.match(/[0-9]/) ? 0.5 : 1;
						}
						currentLine += char;
					}
				}
			});
			if (currentLine.trim().length > 0) {
				newLines += '<span>' + currentLine.trim() + '</span>';
			}
		} else {
			lines.forEach(function(part) {
				if (part.match(/<[^>]+>/)) {
					currentLine += part;
				} else {
					var parts = part.split(/(br\.c-br\.-pc)/g);
					parts.forEach(function(subPart) {
						if (subPart === 'br.c-br.-pc') {
							if (currentLine.trim().length > 0) {
								newLines += '<span>' + currentLine.trim() + '</span>';
							}
							currentLine = '';
						} else {
							currentLine += subPart;
						}
					});
				}
			});

			if (currentLine.trim().length > 0) {
				newLines += '<span>' + currentLine.trim() + '</span>';
			}
		}

		$(this).html(newLines);
	});
}

$(window).on('load', lead);
var resizeTimer;
$(window).on('resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		$('.js-justify').each(function() {
			$(this).find('span').contents().unwrap();
		});
		lead();
	}, 500);
});
