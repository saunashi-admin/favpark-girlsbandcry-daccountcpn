document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('js-menu-btn');
	const menuInner = document.getElementById('js-menu-inner');
	const menuBg = document.getElementById('js-menu-bg');
	const menuImg = menuBtn.querySelector('img');
	const menuInnerParent = menuInner.parentElement;
	const menuLinks = menuInner.querySelectorAll('a'); // メニュー内のリンク要素を取得

	function toggleMenu(isShow) {
			const action = isShow ? 'add' : 'remove';
			menuInner.classList[action]('is-show');
			menuInnerParent.classList[action]('is-show');
			menuBg.classList[action]('is-show');
			menuImg.src = isShow ? './assets/img/icon/icon_menu_close.svg' : './assets/img/icon/icon_menu_open.svg';
	}

	if (menuBtn) {
			menuBtn.addEventListener('click', function () {
					const isShow = !menuInner.classList.contains('is-show');
					toggleMenu(isShow);
			});
	}

	if (menuBg) {
			menuBg.addEventListener('click', function () {
					toggleMenu(false);
			});
	}

	// 各リンクにクリックイベントリスナーを追加
	menuLinks.forEach(function (link) {
			link.addEventListener('click', function () {
					toggleMenu(false);
			});
	});
});
