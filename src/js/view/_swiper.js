// Initialize Swiper
//swiper-containerがある場合のみ実行
if (document.querySelector('.swiper-container')) {

var _playTime = 3000;
const swiper = new Swiper(".swiper-container.sp-none", {
	direction: "horizontal",
	loop: true,
	speed: 500,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		type: "bullets",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		delay: _playTime,
		disableOnInteraction: false,
	},
	// autoplay:false,
	spaceBetween: 15,
	scrollbar: {
		el: ".swiper-scrollbar",
	},
	slidesPerView: 1.2, //左右のスライドチラ見せ
	centeredSlides: true, //左右のスライドチラ見せ
	breakpoints: {
		768: {
			//768px以上なら次を適用
			spaceBetween: 90,
			slidesPerView: 1.25,
		},
	},
});

//一時停止・再生
document
	.querySelector(".swiper-play-pause2")
	.addEventListener("click", function () {
		console.log("click");
		//.paused があるとき
		if (this.classList.contains("paused")) {
			swiper.autoplay.start(); //再生
			this.classList.remove("paused"); //.paused 削除
		} else {
			//.paused が無いとき
			swiper.autoplay.stop(); //一時停止
			this.classList.add("paused"); //.paused 付与
		}
	});

const swiper2 = new Swiper(".swiper-container.pc-none", {
	direction: "horizontal",
	loop: true,
	// loopAdditionalSlides: 3,
	speed: 500,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		type: "bullets",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		delay: _playTime,
		disableOnInteraction: false,
	},
	// autoplay:false,
	spaceBetween: 15,
	scrollbar: {
		el: ".swiper-scrollbar",
	},
	slidesPerView: 1.2, //左右のスライドチラ見せ
	centeredSlides: true, //左右のスライドチラ見せ
	breakpoints: {
		768: {
			//768px以上なら次を適用
			spaceBetween: 90,
			slidesPerView: 1.25,
		},
	},
});

//一時停止・再生
document
	.querySelector(".swiper-play-pause")
	.addEventListener("click", function () {
		//.paused があるとき
		if (this.classList.contains("paused")) {
			swiper2.autoplay.start(); //再生
			this.classList.remove("paused"); //.paused 削除
		} else {
			//.paused が無いとき
			swiper2.autoplay.stop(); //一時停止
			this.classList.add("paused"); //.paused 付与
		}
	});
}
