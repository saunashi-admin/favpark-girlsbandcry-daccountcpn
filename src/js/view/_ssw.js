/**
 * ログイン処理
 * dアカウントのログイン画面へ遷移する
 *
 * serviceId：ログイン対象のサービスID
 * destUrl：ログイン後に遷移するURL
 * _url：ログインURL
 **/
var login = function (serviceId, destUrl, _url) {
	var encodeUrl = encodeURIComponent(destUrl);
	var loginUrl = _url + "?service_id=" + serviceId + "&dest=" + encodeUrl;
	//console.log("loginUrl", loginUrl);
	window.location.href = loginUrl;
};

/**
 * ログアウト処理
 * dアカウントのログアウト画面へ遷移する
 *
 * serviceId：ログアウト対象のサービスID
 * destUrl：ログアウト後に遷移するURL
 * _url：ログアウトURL
 **/
var logout = function (serviceId, destUrl, _url) {
	var encodeUrl = encodeURIComponent(destUrl);
	var loginUrl = _url + "?service_id=" + serviceId + "&dest=" + encodeUrl;
	window.location.href = loginUrl;
};

/**
 * URLからサブドメインを切り出す関数
 * @param {string} url - 対象のURL
 * @returns {string|null} - サブドメイン
 */
function extractSubdomain(url) {
	const match = url.match(/^https?:\/\/([^\.]+)\./);
	return match ? match[1] : null;
}

if($('#js-dl').length){
	const curt_sid = getCookie("sid");
	// const curt_sid = '12345678901234567890123456789012';
	// cookieの取得
	function getCookie(name) {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? match[2] : null;
	}

	if (curt_sid) {
		setTimeout(() => $('#js-dlLoading').addClass('is-hidden'), 1000);
		setTimeout(() => {
			const images = [
				{
					imgSrc: './assets/img/dl/n6JHtGVN.png',
					imgName: "仁菜"
				},
				{
					imgSrc: './assets/img/dl/Gh6QauYe.png',
					imgName: "桃香"
				},
				{
					imgSrc: './assets/img/dl/Hk6j5SqW.png',
					imgName: "すばる"
				},
				{
					imgSrc: './assets/img/dl/V2iJAqub.png',
					imgName: "智"
				},
				{
					imgSrc: './assets/img/dl/i2BtnVqZ.png',
					imgName: "ルパ"
				},
			];
			const setImageAttributes = (imgSrc, imgName) => {
				$('#js-dlImg').attr({ src: imgSrc, alt: imgName });
				$('#js-dlTitle').text(imgName);
			};
			const storedImgSrc = localStorage.getItem('imgSrc');
			const storedImgName = localStorage.getItem('imgName');
			if (storedImgSrc && storedImgName) {
				setImageAttributes(storedImgSrc, storedImgName);
			} else {
				const randomImage = images[Math.floor(Math.random() * images.length)];
				localStorage.setItem('imgSrc', randomImage.imgSrc);
				localStorage.setItem('imgName', randomImage.imgName);
				setImageAttributes(randomImage.imgSrc, randomImage.imgName);
			}
		}, 1500);
	} else {
		// console.log('未ログイン');
		window.location.href = '/favpark/girlsbandcry-exhibition/error.html';
	}

}
