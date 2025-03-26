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

// function定義
$(function () {
	const _dcard_cp = "0001";
	const _eximo_cp = "0002";
	const _lemino_cp = "0003";

	const _steelboard_cp = 'steelboard';
	const _talkshow_cp = '0004';

	const _steelboard_period = '0005';
	const _steelboard_daily = '0006';

	// サービスIDを取得
	const serviceId = $("#service").attr("service");
	console.log("serviceId", serviceId);

	// SSWクライアントを取得
	const sswClient = new SswAdvancedApi.default(serviceId);

	const getUrl = (endpoint) => sswClient.getUrl(endpoint);
	const LOGIN_URL = getUrl("API_LOGIN");
	const LOGOUT_URL = getUrl("API_LOGOUT");
	//console.log("LOGIN_URL", LOGIN_URL);
	//console.log("LOGOUT_URL", LOGOUT_URL);

	// sid取得
	const curt_sid = getCookie("sid");

	// cookieの取得
	function getCookie(name) {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? match[2] : null;
	}

	// post及びリダイレクト
	function postAndRedirect(cp_category, path, result_sid, method = "post") {
		// フィールド作成の関数
		function appendHiddenField(name, value) {
			const hiddenField = document.createElement("input");
			hiddenField.type = "hidden";
			hiddenField.name = name;
			hiddenField.value = value;
			form.appendChild(hiddenField);
		}

		// 固定値の定義
		const params_eximo = {
			slcd: "VN878",
			acpt_no: "9142066091565586",
		};
		const params_dcard = {
			slcd: "VN692",
			acpt_no: "6703754687257885",
		};
		const params_lemino = {
			slcd: "VN982",
			acpt_no: "7185330127784782",
		};
		const params_steelboard_daily = {
			slcd: "VO189",
			acpt_no: "6635884137201050",
		};
		const params_steelboard_period = {
			slcd: "VO190",
			acpt_no: "7563546410424896",
		};
		const params_talkshow = {
			slcd: "VO191",
			acpt_no: "8377725215303761",
		};
		let params = {};
		// cp_categoryによってパラメータを変更
		if (cp_category == _dcard_cp) {
			params = params_dcard;
		} else if (cp_category == _eximo_cp) {
			params = params_eximo;
		} else if (cp_category == _lemino_cp) {
			params = params_lemino;
		} else if (cp_category == _steelboard_period) {
			params = params_steelboard_period;
		} else if (cp_category == _steelboard_daily) {
			params = params_steelboard_daily;
		} else if (cp_category == _talkshow_cp) {
			params = params_talkshow;
		}

		// フォーム要素を作成
		const form = document.createElement("form");
		form.method = method;
		form.action = path;

		// 固定パラメータを追加
		for (const key in params) {
			appendHiddenField(key, params[key]);
		}

		// sidを追加
		appendHiddenField("member_id", result_sid);

		document.body.appendChild(form);
		form.submit();
	}

	// エントリー実行
	function entryExec(elementId, ssw_entry_id, cp_category, path) {
		console.log("entryExec called with arguments:", {	elementId,ssw_entry_id,	cp_category,path,curt_sid,});

		//console.log("button clicked");
		// エントリー参照API実行
		sswClient.accountEntryGet(ssw_entry_id).then(function (res) {
			// DBに格納するsidの値
			let result_sid = null;
			//console.log("Entry lookup success", res);

			if (res.result == "OK") {
				//console.log("Entry lookup success");
				// エントリー済みの場合は既存の値をsidを結合する
				let sid = res.data.sid;
				result_sid = (sid !== undefined ? sid : "") + curt_sid;
				result_sid = result_sid.slice(0, 32);

				// bodyの内容生成
				const jsonString = `{
                      "entry_flg": 0,
                      "sid":"${result_sid}",
                      "cp_category":"${cp_category}"
                      }`;
				const data = $.parseJSON(jsonString);

				// エントリー登録API実行
				sswClient.accountEntryPut(data, ssw_entry_id).then(function (res) {
					if (res.result == "OK") {
						// エントリー成功の場合はPOST＆リダイレクト
						postAndRedirect(cp_category, path, result_sid);
					} else {
						// console.log("Entry registration failed");
						// エントリー登録失敗の場合はリダイレクト
						// const destUrl = window.location.href;
						const _destUrl = "/favpark/girlsbandcry-exhibition/error.html";
						window.location.replace(_destUrl);
					}
				});
			} else {
				console.log("Entry lookup failed");
				// エントリー参照失敗の場合はリダイレクト
				// const destUrl = window.location.href;
				const _destUrl = "/favpark/girlsbandcry-exhibition/error.html";
				window.location.replace(_destUrl);
			}
		});
	}

	function daccountLogin(btn_id) {
		$("#" + btn_id).click(function () {
			// 戻り先を設定 ここではログイン後同じ画面に設定しているが
			// 必要あれば任意の画面に遷移可能
			const destUrl = window.location.href;
			login(serviceId, destUrl, LOGIN_URL);
		});
	}

	function daccountLogout(btn_id) {
		// ログアウトボタン押下時の処理
		$("#" + btn_id).click(function () {
			// 戻り先を設定 ここではログアウト後同じ画面に設定しているが
			// 必要あれば任意の画面に遷移可能
			const destUrl = window.location.href;
			logout(serviceId, destUrl, LOGOUT_URL);
		});
	}

	function exchangeButtonStatus(curt_sid) {
		//console.log("get sid");
		//console.log(curt_sid);

		const loginButton = $("#js-account-login");
		const logoutButton = $("#js-account-logout");
		// sidがnullまたは空文字列である場合はボタンを無効化し、それ以外は有効化
		if (curt_sid == null) {
			//console.log("curt_sid is Null!!");
			//console.log(curt_sid);
			// button.disabled = true;
			loginButton.show();
			logoutButton.hide();
			//#test-textが存在する場合
			// if ($("#test-text").length) {
			// 	$("#test-text").text("未ログイン");
			// }
		} else {
			//console.log("curt_sid is not Null!!");
			//console.log(curt_sid);
			// button.disabled = false;
			loginButton.hide();
			logoutButton.show();
			// if ($("#test-text").length) {
			// 	$("#test-text").text("ログイン済み");
			// }
		}
	}
	window.addEventListener("load", function () {
		//console.log("load");
		exchangeButtonStatus(curt_sid);
		//.js-entry-submit-buttonが存在する場合
		// if ($(".js-entry-submit-button").length) {
			//console.log("entry-submit-button");
			// URLパラメータを取得する関数
			// function getQueryParam(param) {
			// 	const urlParams = new URLSearchParams(window.location.search);
			// 	return urlParams.get(param);
			// }
			// cp_categoryの値を取得
			// const cpCategory = getQueryParam("cp_category");
			//console.log(cpCategory);
			//js-entry-submit-buttonのパラメータdata-categoryを変更
			// $(".js-entry-submit-button").attr("data-category", cpCategory);
		// }
	});
	/**
	 * 引数：
	 * elementId (str): CPエントリー実行ロジックを紐づけるbuttonのid
	 * ssw_entry_id (str): sid、アカ識を保持する内部DBの識別子(※FP006で固定)
	 * cp_category (str): CPの識別子(※0001→dカードゴールド、 0002→eximoと定義)
	 * path (str): POST先のURL
	 **/
	document
		.querySelectorAll(".js-entry-submit-button")
		.forEach(function (button) {
			//js-entry-submit-buttonクリック時の処理
			button.addEventListener("click", function () {
				//data-category属性の値を取得
				const _id = this.id;
				const _category = this.getAttribute("data-category");
				let _destUrl = "";
				const _destUrl_eximo =
					"https://va.pia.jp/laposta25poikatsu/entrance.jsp";
				const _destUrl_dcard = "https://va.pia.jp/laposta25d/entrance.jsp";
				const _destUrl_lemino = "https://va.pia.jp/laposta25lemino/entrance.jsp";
				const _destUrl_steelboard_period = "https://va.pia.jp/gbc25dsl-os2/entrance.jsp";
				const _destUrl_steelboard_daily = "https://va.pia.jp/gbc25dsl-os1/entrance.jsp";
				const _destUrl_talkshow = "https://va.pia.jp/gbc25dsl-ts/entrance.jsp";
				//console.log(_id);
				//console.log(_category);
				//カテゴリによってURL変更
				if (_category == _dcard_cp) {
					_destUrl = _destUrl_dcard;
				} else if (_category == _eximo_cp) {
					_destUrl = _destUrl_eximo;
				} else if (_category == _lemino_cp) {
					_destUrl = _destUrl_lemino;
				} else if (_category == _steelboard_period) {
					_destUrl = _destUrl_steelboard_period;
				} else if (_category == _steelboard_daily) {
					_destUrl = _destUrl_steelboard_daily;
				} else if (_category == _talkshow_cp) {
					_destUrl = _destUrl_talkshow;
				}

				entryExec(_id, "FP006", _category, _destUrl);
			});
		});

	//js-request-buttonクリック時の処理
	document.querySelectorAll(".js-request-button").forEach(function (button) {
		//js-request-buttonクリック時の処理
		button.addEventListener("click", function () {
			//data-category属性の値を取得
			const _id = this.id;
			const _category = this.getAttribute("data-category");
			//console.log(_id);
			//console.log(_category);
			//console.log("_category", _category);
			// let _destUrl = "/favpark/laposta2025/request_lemino.html";

			// 待機室へ遷移するためのURL設定
			if (_category == _dcard_cp) {
				// カテゴリによってURL変更
				_destUrl = "/favpark/laposta2025/request_dcard.html";
			} else if (_category == _steelboard_cp) {
				_destUrl = '/favpark/girlsbandcry-exhibition/request-steel_board.html';
			} else if (_category == _talkshow_cp) {
				_destUrl = '/favpark/girlsbandcry-exhibition/request-talk_show.html';
			}

			// _destUrlに_categoryを追加
			const _destUrlObj = new URL(_destUrl, window.location.href);
			// _destUrlObj.searchParams.set("cp_category", _category);
			// console.log("_destUrlObj", _destUrlObj);
			// sidがnullまたは空文字列である場合はボタンを無効化し、それ以外は有効化
			if (curt_sid == null) {
				// 未ログインの場合、ログイン画面へ遷移　TODO：待機室が有効な場合コメントアウト
				// login(serviceId, _url, LOGIN_URL);

				//待機室URLに遷移
				//このファイルのURLから取得
				const subdomain = extractSubdomain(window.location.href);
				let _waitingUrl = "";
				// サブドメインによって遷移先を変更
				// console.log(subdomain);

				if (subdomain.includes("dev")) {
					_waitingUrl =
						"https://vwr.ssw-dev.web.docomo.ne.jp/waiting-room/favpark/ssw_waiting_room.html";
				} else if (subdomain.includes("stg")) {
					_waitingUrl =
						"https://vwr.ssw.web.docomo.ne.jp/waiting-room/favpark/ssw_waiting_room.html";
				} else {
					_waitingUrl =
						"https://vwr.ssw.web.docomo.ne.jp/waiting-room/favpark/ssw_waiting_room.html";
				}
				if (_category == _talkshow_cp) {
					// カテゴリとサブドメインによってURL変更
					_waitingUrl = _waitingUrl.replace(
						"/waiting-room/",
						"/waiting-room2/"
					);
				}
				_waitingUrl +=
					"?service_id=" +
					serviceId +
					"&dest=" +
					encodeURIComponent(_destUrlObj);
				//console.log("_waitingUrl", _waitingUrl);
				window.location.href = _waitingUrl;
			} else {
				// ログイン済み、または_dcard_cpではない場合、申込画面へ遷移
				window.location.href = _destUrlObj;
			}
		});
	});

	//js-account-login-buttonクリック時の処理
	daccountLogin("js-account-login-button");
	//js-account-logout-buttonクリック時の処理
	daccountLogout("js-account-logout-button");
});
