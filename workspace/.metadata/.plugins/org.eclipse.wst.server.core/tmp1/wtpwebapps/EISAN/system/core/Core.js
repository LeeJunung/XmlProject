var WE = {
	// constant
	C : {},
	// variable
	V : {},
	// function
	F : {},
	// service
	S : {}
};

$(function() {
	// ------------------------------------------------------------
	// CONSTANT
	// ------------------------------------------------------------
	// for service
	WE.C["SERVICE_TP"];
	WE.C["SERVICE_ID"];
	WE.C["URL_CALL"] = "/api/";
	WE.C["URL_HELLO"] = "/api/cloud/helloCall";
	WE.C["URL_SESSSION"] = "/We/setSessionId";
	WE.C["SESS_ID"] = "";

	// event flag
	WE.C["EF_CHK"] = "check";
	WE.C["EF_RUN"] = "run";

	// file flag
	WE.C["FF_NONE"] = "0";
	WE.C["FF_UPLOAD"] = "1";
	WE.C["FF_DOWNLOAD"] = "2";

	// component storage
	WE.C["COMP_STORAGE"] = {};
	// component option keys
	WE.C['CO_KEYS'] = {
		type : '',
		left : '',
		right : '',
		top : '',
		bottom : '',
		width : '',
		height : '',
		background : '',
		color : '',
		fontWeight : '',
		fontSize : '',
		imgWidth : '',
		imgHeight : '',

		marginLeft : '',
		marginRight : '',
		marginTop : '',
		marginBottom : '',

		paddingLeft : '',
		paddingRight : '',
		paddingTop : '',
		paddingBottom : '',

		horizontalAlign : '',
		border : '',
		src : '',

		id : '',
		auth : '',
		value : '',
		ime : '',
		allow : '',

		keyField : '',
		dataField : '',
		nullable : '',
		list : 'json',

		rowCnt : '',
		head : 'json',
		body : 'json',
		foot : 'json',

		maxLength : '',
		tabIndex : '',
		select : '',
		orien : '',
		multi : '',
		maxDate : '',
		title : '',

		dev : '',
	};

	// component authorization
	WE.C["CA_ENABLE"] = "enable";
	WE.C["CA_DISABLE"] = "disable";
	WE.C["CA_READONLY"] = "readonly";
	WE.C["CA_HIDDEN"] = "hidden";
	WE.C["CA_NONE"] = "none";
	// component develop status
	WE.C["CD_ENABLE"] = "enable";
	WE.C["CD_ACTIVE"] = "active";

	// component input method editor
	WE.C["CI_PASSWORD"] = "password";
	WE.C["CI_ALPHA"] = "alpha";
	WE.C["CI_NUMERIC"] = "numeric";
	WE.C["CI_ALPHANUMERIC"] = "alphanumeric";
	WE.C["CI_CURRENCY"] = "currency";// 1,234
	WE.C["CI_CURRENCY2"] = "currency2";// 1,234.00
	WE.C["CI_DATE"] = "date";
    WE.C["CI_TODATE"] = "toDate";
    WE.C["CI_TODATETIME"] = "toDatetime";

	// alert object
	WE.C["ALERT"] = null;
	WE.C["ALERT_TITLE"] = "ALERT";
	// alert button values
	WE.C["AB_OK"] = "OK";
	WE.C["AB_YES"] = "YES";
	WE.C["AB_NO"] = "NO";
	WE.C["AB_CANCEL"] = "CANCEL";
	WE.C["AB_CLOSE"] = "CLOSE";

	// message type
	WE.C["MT_INFO"] = "info";
	WE.C["MT_WARN"] = "warn";
	WE.C["MT_ERROR"] = "error";

	// these function must be extends(set by index.js)
	WE.F["IMPL_OPEN_VIEW"] = null;
	WE.F["IMPL_REFRESH_VIEW"] = null;
	WE.F["IMPL_CLOSE_VIEW"] = null;
	WE.F["IMPL_OPEN_POPUP"] = null;
	WE.F["IMPL_REFRESH_POPUP"] = null;
	WE.F["IMPL_CLOSE_POPUP"] = null;

	// ------------------------------------------------------------
	// FUNCTION
	// ------------------------------------------------------------
	WE.F["init"] = function($target) {

		// w-typeが存在する場合
		if (!$target || WE.F.existType($target)) {

			// 部品が存在する場合
			if (WE.F.rightType($target)) {

				// HTMLで宣言された属性取得
				var initOptions = WE.F.getInitOptions($target);

				// 部品初期化
				$target[WE.F.getType($target)](initOptions);
			}

			// 部品が存在しない場合
			else {

				// アラート表示
				var msg = WE.F.getMsgString([ {
					id : 'JS-00001',
					type : WE.C.MT_ERROR,
					msg : "該当部品を見つけられませんでした。",
					desc : WE.F.getType($target)
				} ], WE.C.MT_ERROR);
				WE.F.alert(msg);
			}
		}
	};

	WE.F["initEvent"] = function($target) {

		// w-eventが存在する場合
		if (!$target || !$target.attr('w-event')) {
			return;
		}

		var tabId = $target.attr('w-tabId');
		var viewId = $target.attr('w-viewId');
		var id = $target.attr('w-id');
		var realId = $target.attr('id');

		var eStr = $target.attr('w-event');

		// String化されているイベントをJSON化
		// (例)w-event="{click:{process:run,compsType:all,compsDetail:[],datasDetail:[]}}"
		var eMap = WE.F.JSONparse(eStr);

		// 各イベントループ
		for ( var event in eMap) {

			var eItem = eMap[event];

			// プロセス実行状態
			var process = eItem['process'];

			var dbuse = eItem['dbuse'] || WE.C.DBUSE_USE;

			// 画面部品取得形態
			var compsType = eItem['compsType'];

			// compsTypeがcustomの場合、直接部品指定時
			var compsDetail = eItem['compsDetail'];

			// データタイプ
			var datasType = eItem['datasType'];

			// データ詳細(★TODO 今後必要かもしれないので定義)
			var datasDetail = eItem['datasDetail'];

			// ★イベント付与
			$target.off('w-' + event).on('w-' + event,
				function(evt) {

					var prm = {};
					prm.task = viewId + '.' + id + '_' + evt.type.split('-',2)[1];
					prm.tabId = tabId;
					prm.viewId = viewId;
					prm.process = process;
					prm.dbuse = dbuse;

					// 画面部品取得形態別設定
					switch (compsType) {

						// 部品をもっていく必要ない場合
						case 'none':
							prm.comps = {};
							break;

						// イベントを持っている部品のみ
						case 'this':
							prm.comps = WE.F.get($target);
							break;

						// 画面全体部品
						case 'all':
							prm.comps = WE.F.getAll($('div[id="BASE_'
								+ tabId + '_' + viewId + '"]'));
							break;

						// テーブル部品で選択されている行
						case 'row':
							var rowTarget = $(evt.target);
							prm.comps = WE.F.getRow(rowTarget);
							break;

						// 部品直接指定
						case 'custom':
							prm.comps = {};
							// var compArr = compsDetail.split(',');
							var compArr = compsDetail;
							for (var i = 0, iLen = compArr.length; i < iLen; i++) {
								var compId = compArr[i];

								switch (compId) {
									case 'this':
										prm.comps = Object.assign(prm.comps, WE.F.get($target));
										break;

									case 'all':
										prm.comps = Object.assign(prm.comps, WE.F.getAll($('div[id="BASE_' + tabId + '_' + viewId + '"]')));
										break;

									case 'row':
										var rowTarget = $(evt.target);
										prm.comps = Object.assign(prm.comps, WE.F.getRow(rowTarget));
										break;

									default:
										if (!compId.startsWith("wi-")){
											compId = tabId + '_' + viewId + '_' + compId;
										}
										var compObj = WE.F.get($('#' + compId));
										prm.comps[compId] = compObj[compId];

										break;
								}

							}
							break;
					}

					// データタイプ別設定
					switch (datasType) {

						// データタイプ指定をしない場合
						case 'none':
							prm.datas = {};
							break;

						// テーブル部品で選択されている行(1行をオブジェクトとしてもっていく)
						case 'row':
							var rowTarget = $(evt.target);
							var rowIdx = rowTarget.attr('w-rowIdx');
							var listIdx = rowTarget.attr('w-listIdx');
							prm.datas = {};
							prm.datas.target = rowTarget
								.attr('w-column');
							prm.datas.rowIdx = rowIdx;
							//prm.datas.targetRealId = evt.target.id;
							prm.datas.rowData = JSON
								.stringify(WE.F.getOption($target,
									'list')[listIdx]);
							break;

						// ★TODO 今後必要時に定義
						case 'custom':

							break;
					}


					// サービスコール
					WE.S.call(prm);
				});
		}

	};

	WE.F["initAll"] = function($target) {

		// $targetがなければ、body全体初期化
		if (!$target) {
			$target = $("body");
		}

		// w-type初期化
		var comps = $target.find("div[w-type]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			WE.F.init($(comps[i]));
		}

		// w-event初期化
		var comps = $target.find("div[w-event]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			WE.F.initEvent($(comps[i]));
		}
	};

	WE.F["destroy"] = function($target) {
		if (!$target) {
			return;
		}
		if ($target.attr("id")) {
			// delete WE.C.COMP_STORAGE[$target.attr("id")];
		}
		if (WE.F.existType($target)) {
			$target[WE.F.getType($target)]("destroy");
		}
	};

	WE.F["destroy"] = function($target) {
		if (!$target) {
			return;
		}
		if (WE.F.existType($target)) {
			$target[WE.F.getType($target)]("destroy");
		}
	};

	WE.F["destroyEvent"] = function($target) {
		if (!$target) {
			return;
		}

		var tabId = $target.attr('w-tabId');
		var viewId = $target.attr('w-viewId');

		var targetId = $target.attr('w-target');
		var event = $target.attr('w-event');
		var id = tabId + '_' + viewId + '_' + targetId;

		var target = $('#' + id);
		if (target) {
			target.off('w-' + event);
		}
	};

	WE.F["destroyAll"] = function($target) {
		if (!$target) {
			$target = $("body");
		}
		var comps = $target.find("div[w-type]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			WE.F.destroy($(comps[i]));
		}

		var comps = $target.find("div[w-event]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			WE.F.destroyEvent($(comps[i]));
		}
	};

	WE.F["get"] = function($target) {
		var rtn = {};
		if ($target && $target.attr("w-id") != '') {
			rtn[$target.attr("id")] = WE.F.getOptions($target);
		}
		return rtn;
	};

	WE.F["getAll"] = function($target) {
		var rtn = {};
		if (!$target) {
			$target = $("body");
		}
		var comps = $target.find("div[w-type]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			var $comp = $(comps[i]);
			// ★TODO CHECK idx ci テーブル部品確認
			if ($comp && $comp.attr("w-id") && !$comp.attr("w-idx")
				&& !$comp.attr("w-ci")) {
				//id は　キー　：　値はオブジェクト
				rtn[$comp.attr("id")] = WE.F.getOptions($comp);
			}
		}
		return rtn;
	};

	WE.F["getRow"] = function($target) {
		var rtn = {};
		var comps = $target.closest("tr").find("div[w-type]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			var $comp = $(comps[i]);
			if ($comp && $comp.attr("id")) {
				rtn[$comp.attr("id")] = WE.F.getOptions($comp);
			}
		}
		return rtn;
	};

	WE.F["setAll"] = function(object) {

		for ( var key in object) {
			var $target = $("#" + key);
			WE.F.setOptions($target, object[key]);
		}
	};

	WE.F["existType"] = function($target) {
		return $target.attr("w-type") ? true : false;
	};

	WE.F["rightType"] = function($target) {
		return typeof ($.we[WE.F.getType($target)]) != 'undefined' ? true : false;
	};

	WE.F["getType"] = function($target) {
		return 'we' + $target.attr("w-type");
	};

	WE.F["getOption"] = function($target, key) {
		if ($target && WE.F.existType($target)) {
			return $target[WE.F.getType($target)]("getOption", key);
		}
		return null;
	};

	WE.F["getOptions"] = function($target) {
		if ($target && WE.F.existType($target)) {
			return $target[WE.F.getType($target)]("getOptions");
		}
		return null;
	};

	WE.F["setOption"] = function($target, key, value) {
		if ($target && WE.F.existType($target)) {
			$target[WE.F.getType($target)]("setOption", key, value);
			return true;
		}
		return false;
	};

	WE.F["setOptionAll"] = function($target, key, value) {
		if (!$target) {
			$target = $("body");
		}

		var comps = $target.find("div[w-type]");
		for (var i = 0, iLen = comps.length; i < iLen; i++) {
			WE.F.setOption($(comps[i]), key, value);
		}
		return false;
	};
	WE.F["setOptions"] = function($target, options) {
		if ($target && WE.F.existType($target)) {
			$target[WE.F.getType($target)]("setOptions", options);
			return true;
		}
		return false;
	};

	WE.F["getInitOptions"] = function($target) {
		var rtn = {};
		if (!$target) {
			return rtn;
		}

		for ( var key in WE.C.CO_KEYS) {
			if ($target.attr('w-' + key)) {
				switch (WE.C.CO_KEYS[key]) {
				case '':
					rtn[key] = $target.attr('w-' + key);
					break;
				case 'json':
					rtn[key] = WE.F.JSONparse($target.attr('w-' + key));
					break;
				}
			}
		}
		return rtn;
	};

	WE.F["setInitOptions"] = function($target, options) {
		for ( var key in options) {
			if (WE.C.CO_KEYS.hasOwnProperty(key)) {
				switch (WE.C.CO_KEYS[key]) {
				case '':
					$target.attr('w-' + key, options[key]);
					break;
				case 'json':
					$target.attr('w-' + key, WE.F.JSONstringify(options[key]));
					break;
				}
			}
		}
	};

	WE.F["getUsableEvents"] = function($target) {
		if ($target && WE.F.existType($target)) {
			return $target[WE.F.getType($target)]("getUsableEvents");
		}
		return null;
	};

	WE.F["getUsableAttrs"] = function($target) {
		if ($target && WE.F.existType($target)) {
			return $target[WE.F.getType($target)]("getUsableAttrs");
		}
		return null;
	};

	WE.F["getHtml"] = function($target) {
		if ($target && WE.F.existType($target)) {
			return $target[WE.F.getType($target)]("getHtml");
		}
		return null;
	};

	WE.F["setImeAlpha"] = function(value) {
		value = value || "";
		value = value.replace(/[Ａ-Ｚａ-ｚ]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		return value.replace(/[^A-Za-z]/g, "");
	};

	WE.F["setImeNumeric"] = function(value) {
		value = value || "";
		value = value.replace(/[０-９]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		return value.replace(/[^0-9]+/g, "");
	};

	WE.F["setImeAlphanumeric"] = function(value) {
		value = value || "";
		value = value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		return value.replace(/[^A-Za-z0-9]+/g, "");
	};

    WE.F["getImeToDatetime"] = function(value) {
        value = value || "";
        return value.replace("<br>", " ");
    };

    WE.F["setImeToDate"] = function(value) {
        value = value || "";
        value += "";

        if (value.length == 0 ) {
            return value;
        }

        var d = Date.parse(value);
        var date = new Date(d);

        return date.getFullYear().toString() + "/" +  ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "<br>" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
    };

    WE.F["setImeToDatetime"] = function(value) {
        value = value || "";
        value += "";

        if (value.length == 0 ) {
            return value;
        }

        var d = Date.parse(value);
        var date = new Date(d);

        return date.getFullYear().toString() + "/" +  ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
    };

	WE.F["setImeCurrency"] = function(value) {
		value = value || "";
		value += "";
		var s = "";
		if (value.length != 0 && value.indexOf("-") === 0) {
			s = "-";
			if (value.length === 1) {
				return s;
			}
		}
		value = value.replace(/[０-９]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		var n = null;
		n = Number(value.replace(/[^0-9\.]+/g, ""));
		var c = 0;
		var d = ".";
		var t = ",";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
		var j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	WE.F["setImeCurrency2"] = function(value) {
		value = value || "";
		value += "";
		var s = "";
		if (value.length != 0 && value.indexOf("-") === 0) {
			s = "-";
			if (value.length === 1) {
				return s;
			}
		}
		value = value.replace(/[０-９]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		var n = null;
		n = Number(value.replace(/[^0-9\.]+/g, ""));
		var c = 2;
		var d = ".";
		var t = ",";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
		var j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	WE.F["getImeCurrency"] = function(value) {
		return value.replace(/[^0-9\.]+/g, "");
	};

	WE.F["setImeDate"] = function(value) {
		value = value || "";
		value = value.replace(/[０-９]/g, function(s) {// full2half
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
		});
		// 数字以外削除
		value = value.replace(/[^0-9]/g, "");
		if (value.length == 8) {
			var match = value.match("([0-9]{4})([0-9]{2})([0-9]{2})");
			value = match[1] + "/" + match[2] + "/" + match[3];
			if (new Date(value) == "Invalid Date") {
				// 値が不明(0000/00/00)
				value = "";
			}
		} else {
			// 形式不一致(YYYY/MM/DD)
			value = "";
		}
		return value;
	};

	WE.F["setValueByIme"] = function(value, ime) {
		switch (ime) {
		case WE.C.CI_ALPHA:
			return WE.F.setImeAlpha(value);
			break;
		case WE.C.CI_NUMERIC:
			return WE.F.setImeNumeric(value);
			break;
		case WE.C.CI_ALPHANUMERIC:
			return WE.F.setImeAlphanumeric(value);
			break;
		case WE.C.CI_CURRENCY:
			return WE.F.setImeCurrency(value);
			break;
		case WE.C.CI_CURRENCY2:
			return WE.F.setImeCurrency2(value);
			break;
		case WE.C.CI_DATE:
			return WE.F.setImeDate(value);
			break;
        case WE.C.CI_TODATE:
            return WE.F.setImeToDate(value);
            break;
         case WE.C.CI_TODATETIME:
            return WE.F.setImeToDatetime(value);
            break;
        }

		return value;
	};

	WE.F["getValueByIme"] = function(value, ime) {
		switch (ime) {
		case WE.C.CI_CURRENCY:
		case WE.C.CI_CURRENCY2:
			return WE.F.getImeCurrency(value);
			break;
        case WE.C.CI_TODATE:
        case WE.C.CI_TODATETIME:
            return WE.F.getImeToDatetime(value);
            break;
        }
		return value;
	};

	WE.F["JSONparse"] = function(JSONstr, returnValue) {
		if (JSONstr && JSONstr !== '') {
			return $.parseJSON(JSONstr.replace(/[^\[|\]|{|}|:|,]+/g, function(s) {
				return "\"" + s + "\"";
			}));
		} else {
			return returnValue || [];
		}
	};

	WE.F["JSONstringify"] = function(JSONObj) {
		if (JSONObj) {
			return JSON.stringify(JSONObj).replace(/\"/g, "");
		} else {
			return '';
		}
	};

	// RETURN numeric string datetime
	WE.F["getDbDataType"] = function(dataType) {
		switch (dataType) {
		case "bigint": // MySQL SQLServer
		case "bit": // MySQL SQLServer
		case "decimal":// MySQL SQLServer
		case "double":// MySQL
		case "float":// MySQL SQLServer
		case "int":// MySQL SQLServer
		case "mediumint":// MySQL
		case "money": // SQLServer
		case "numeric":// SQLServer
		case "real":// SQLServer
		case "smallint":// MySQL SQLServer
		case "smallmoney": // SQLServer
		case "tinyint":// MySQL SQLServer
			return "numeric";
		case "binary":// MySQL SQLServer
		case "blob":// MySQL
		case "cahr": // MySQL SQLServer
		case "enum":// MySQL
		case "longblob":// MySQL
		case "longtext":// MySQL
		case "mediumblob": // MySQL
		case "mediumtext":// MySQL
		case "nchar":// SQLServer
		case "ntext":// SQLServer
		case "nvarchar":// SQLServer
		case "set":// MySQL
		case "text":// MySQL SQLServer
		case "tinyblob":// MySQL
		case "tinytext": // MySQL
		case "varbinary":// MySQL SQLServer
		case "varchar": // MySQL SQLServer
			return "string";
		case "date":// MySQL SQLServer
		case "datetime":// MySQL SQLServer
		case "datetime2":// SQLServer
		case "datetimeoffset":// SQLServer
		case "smalldatetime":// SQLServer
		case "time":// MySQL SQLServer
		case "timestamp":// MySQL
		case "year":// MySQL
			return "datetime"
		default:
			return null;
		}
	}

	WE.F["getAuthStatus"] = function() {
		var rtnAuthStatus = false;
		WE.C.SESS_ID = sessionStorage.getItem('SESS_ID');
		if (WE.C.SESS_ID === null || WE.C.SESS_ID === undefined || WE.C.SESS_ID === "") {
			rtnAuthStatus = false;
		} else {
			rtnAuthStatus = true;
		}
		return rtnAuthStatus;
	};

	WE.F["getUrlPathName"] = function() {
		var pathName = window.location.pathname;
		return pathName;
	};

	WE.F["getUrlParameter"] = function(sParam) {
		var parameterValue = null;
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				parameterValue = sParameterName[1];
				break;
			}
		}
		return parameterValue;
	};

	WE.F["getServiceId"] = function() {
		var sId = WE.F.getUrlPathName();
		sId = sId.substring(1);
		sId = sId.substring(0, sId.indexOf("/"));
		return sId;
	};

	WE.F["getBrowserSize"] = function() {
		var browserSize = {
			width : 0,
			height : 0
		};
		if (self.innerWidth) {
			browserSize.width = self.innerWidth;
			browserSize.height = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			browserSize.width = document.documentElement.clientWidth;
			browserSize.height = document.documentElement.clientHeight;
		} else if (document.body) {
			browserSize.width = document.body.clientWidth;
			browserSize.height = document.body.clientHeight;
		}
		return browserSize;
	};

	WE.F["getAlert"] = function() {
		return $("body").append("<div id='w-alert'></div>").children("#w-alert");
	};

	// text:String, title:String, btns:Array<String>, parent:TODO,
	// closeHandler:Function
	WE.F["alert"] = function(text, title, btns, parent, closeHandler) {
		var html = "<table><tr><td><div class='alert'><div class='title'></div><div class='body'></div><div class='btns'></div></div></td></tr></table>";
		var $html = $(html);

		WE.C.ALERT.append($html);

		$html.find("div.alert").draggable({
			cursor : "move",
			containment : WE.C.ALERT
		});

		$html.find("div.body").html(text.replace(/\\r\\n/g, "<br/>").replace(/\\r/g, "<br/>").replace(/\\n/g, "<br/>"));

		$html.find("div.title").html((title || WE.C.ALERT_TITLE) + "<button class='close'></button>");

		$html.find("div.title > button.close").click(function(event) {
			$html.remove();

			if (WE.C.ALERT.children("table").length == 0) {
				WE.C.ALERT.css("display", "none");
			}

			if (closeHandler) {
				event.detail = WE.C.AB_CLOSE;
				closeHandler(event);
			}
		});

		if (!btns) {
			btns = [ WE.C.AB_OK ];
		}

		for (var i = 0, iLen = btns.length; i < iLen; i++) {
			$html.find("div.btns").append("<button>" + btns[i] + "</button>");
		}

		$html.find("div.btns").children("button").click(function(event) {
			$html.remove();

			if (WE.C.ALERT.children("table").length == 0) {
				WE.C.ALERT.css("display", "none");
			}

			if (closeHandler) {
				event.detail = event.target.innerText;
				closeHandler(event);
			}
		});

		WE.C.ALERT.css("display", "block");

		$html.find("div.btns").children("button:first-child").focus();
	};

	WE.F["getMsgString"] = function(msgList, msgType) {
		var msgStr = "";
		var iLen = msgList.length;
		if (iLen !== 0) {
			msgStr = msgStr + "<div class='" + msgType + "'>";
		}
		for (var i = 0; i < iLen; i++) {
			if (i !== 0) {
				msgStr = msgStr + "<br>";
			}

			msgStr += "<div class='id'>" + msgList[i]["id"] + "</div>"
			msgStr += "<div class='msg'>" + msgList[i]["msg"].replace(/\r\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\n/g, "<br/>") + "</div>";
			if (msgList[i]["desc"]) {
				msgStr += "<div class='desc'>" + msgList[i]["desc"].replace(/\r\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\n/g, "<br/>") + "</div>";
			}
			// var msgContent = msgList[i]["cont"];

			// var test = msgContent.match(/([{]+[@])\w+([@]+[}])/g);
			// msgContent = msgContent.replace(/([{]+[@])\w+([@]+[}])/g, "");
			// if (test != null) {
			// test = test[0].substring(2, test[0].length - 2);
			// var value = WE.F.getOption($("#" + test), "value");
			// msgStr = msgStr + "<div class='content'>" + value + msgContent +
			// "</div>";
			// } else {
			// msgStr = msgStr + "<div class='content'>" + msgList[i]["cont"] +
			// "</div>"; // NBWF
			// }

		}
		if (iLen !== 0) {
			msgStr = msgStr + "</div>";
		}
		return msgStr;
	};

	// ------------------------------------------------------------
	// SERVICE
	// ------------------------------------------------------------
	WE.S["call"] = function(prm, callback) {
		prm.servId = WE.C.SERVICE_ID;
		prm.process = prm.process || WE.C.EF_RUN;
		prm.fileFlg = prm.fileFlg || WE.C.FF_NONE;
		// prm["comps"] = prm["comps"] || {};
		// prm["datas"] = prm["datas"] || {};

		console.log("[prm]");
		console.log(prm);
		$("#w-load").show();

		$.ajax({
			url : WE.C.URL_CALL,
			data : JSON.stringify({
				prm : prm
			})
		}).done(function(data, textStatus, xhr) {
			$("#w-load").hide();

			var rtn = data.d || data;
			console.log("[rtn]");
			console.log(rtn);
			$("body").trigger('w-debug', [ prm, rtn ]);
			WE.S.callRslt(prm, rtn, callback);
		}).fail(function(xhr, textStatus, errorThrown) {

			WE.F.alert("connecting server failed.");
			console.log(errorThrown);
		});
	};


	WE.S["call_noload"] = function(prm, callback) {
		prm.servId = WE.C.SERVICE_ID;
		prm.process = prm.process || WE.C.EF_RUN;
		prm.fileFlg = prm.fileFlg || WE.C.FF_NONE;
		// prm["comps"] = prm["comps"] || {};
		// prm["datas"] = prm["datas"] || {};

		console.log("[prm]");
		console.log(prm);
		//$("#w-load").show();

		$.ajax({
			url : WE.C.URL_CALL,
			data : JSON.stringify({
				prm : prm
			})
		}).done(function(data, textStatus, xhr) {
			//$("#w-load").hide();

			var rtn = data.d || data;
			console.log("[rtn]");
			console.log(rtn);
			$("body").trigger('w-debug', [ prm, rtn ]);
			WE.S.callRslt(prm, rtn, callback);
		}).fail(function(xhr, textStatus, errorThrown) {

			WE.F.alert("connecting server failed.");
			console.log(errorThrown);
		});
	};

	WE.S["callRslt"] = function(prm, rtn, callback) {
		// session id
		WE.C.SESS_ID = rtn["sessId"];
		WE.S.callRslt01(prm, rtn, callback);
	};

	WE.S["callRslt01"] = function(prm, rtn, callback) {
		// upload file
		if (rtn["fileFlg"] && rtn["fileFlg"] === WE.C.FF_UPLOAD) {
			WE.S.upload(prm, rtn, callback);
		} else {
			WE.S.callRslt02(prm, rtn, callback);
		}
	};

	WE.S["callRslt02"] = function(prm, rtn, callback) {
		var infoList = rtn.infos || [];
		var warnList = rtn.warns || [];
		var errorList = rtn.errors || [];

		var msg = "";

		msg = msg + WE.F.getMsgString(infoList, WE.C.MT_INFO);
		msg = msg + WE.F.getMsgString(errorList, WE.C.MT_ERROR);
		msg = msg + WE.F.getMsgString(warnList, WE.C.MT_WARN);

		if (rtn["process"] === WE.C.EF_CHK) {
			if (errorList.length !== 0) {
				msg = "<div class='special'>" + "エラー事項が存在します。下記の内容を確認してください。" + "</div>" + msg;
				WE.F.alert(msg, null, null, null, function(event) {
					WE.S.callRslt03(prm, rtn, callback);
				});
				return;
			}

			if (warnList.length !== 0) {
				prm["process"] = WE.C.EF_RUN;
				msg = "<div class='special'>" + "警告事項が存在します。続行してもよろしいでしょうか。" + "</div>" + msg;
				WE.F.alert(msg, null, [ WE.C.AB_OK, WE.C.AB_CANCEL ], null, function(event) {
					if (event.detail === WE.C.AB_OK) {
						WE.S.call(prm, callback);
					} else {
						WE.S.callRslt03(prm, rtn, callback);
					}
				});
				return;
			}

			prm["process"] = WE.C.EF_RUN;
			msg = "<div class='special'>" + "続行してもよろしいでしょうか。" + "</div>" + msg;
			WE.F.alert(msg, null, [ WE.C.AB_OK, WE.C.AB_CANCEL ], null, function(event) {
				if (event.detail === WE.C.AB_OK) {
					WE.S.call(prm, callback);
				} else {
					WE.S.callRslt03(prm, rtn, callback);
				}
			});
			return;
		} else {// must be WE.C.EF_RUN
			if (msg !== "") {
				WE.F.alert(msg, null, null, null, function() {
					WE.S.callRslt03(prm, rtn, callback);
				});
			} else {
				WE.S.callRslt03(prm, rtn, callback);
			}
		}
	};

	WE.S["callRslt03"] = function(prm, rtn, callback) {
		var trans = rtn.trans;

		for (var i = 0, iLen = trans.length; i < iLen; i++) {
			var tran = trans[i];

			var viewId = tran.viewId;
			var type = tran.type;
			var meth = tran.meth;
			var content = tran.content;
			tran.datas = rtn["datas"];

			switch (type) {
			case "VIEW":
				switch (meth) {
				case "OPEN":
					WE.F.IMPL_OPEN_VIEW(viewId, tran);
					break;
				case "REFRESH":
					WE.F.IMPL_REFRESH_VIEW(viewId, tran);
					break;
				case "CLOSE":
					WE.F.IMPL_CLOSE_VIEW(viewId, tran);
					break;
				}
				break;
			case "POPUP":
				switch (meth) {
				case "OPEN":
					WE.F.IMPL_OPEN_POPUP(viewId, tran);
					break;
				// case "REFRESH":
				// WE.F.IMPL_REFRESH_POPUP(viewId, tran);
				// break;
				case "CLOSE":
					WE.F.IMPL_CLOSE_POPUP(viewId, tran);
					break;
				}
				break;
			}
		}

		// download file
		if (rtn["fileDowns"] && rtn["fileDowns"].length >= 1) {
			WE.S.download(prm, rtn, callback);
		}

		if (rtn["comps"]) {
			WE.F.setAll(rtn["comps"]);
		}

		if (callback) {
			callback(prm, rtn);
		}
	};

	// WE.S["callLocal"] = function(prm) {
	// for ( var key in prm["comps"]) {
	// if (prm["comps"][key]) {
	// for ( var id in prm["sets"]) {
	// if (prm["comps"][key]["list"].length != 0) {
	// WE.F.setOption($("#" + prm.tabId + "_" + prm.viewId + "_" +
	// prm["sets"][id]), "value",
	// prm["comps"][key]["list"][0][prm["sets"][id]]);
	// }
	// }
	// }
	// }
	// };

	// WE.S["hello"] = function(prm, callback) {
	// if (WE.V.session !== "") {
	// $.ajax({
	// url : WE.C.URL_SESSSION,
	// data : JSON.stringify({
	// "session" : WE.V.session
	// })
	// }).done(function() {
	// WE.S.hello1(prm, callback);
	// }).fail(function(xhr, textStatus, errorThrown) {
	// WE.F.alert("connecting server failed");
	// });
	// } else {
	// WE.S.hello1(prm, callback);
	// }
	// };

	// WE.S["hello1"] = function(prm, callback) {
	// $.ajax({
	// async : true,
	// url : WE.C.URL_HELLO,
	// data : JSON.stringify({
	// prm : prm
	// })
	// }).done(function(data, textStatus, xhr) {
	// var rtn = data.d || data;
	// if (rtn["time"]) {
	// WE.H["time"].text(rtn["time"]);
	// }
	// WE.F.setAll(rtn);
	// if (callback) {
	// callback(prm, rtn);
	// }
	// setTimeout(function() {
	// WE.S.hello(prm, callback);
	// }, 60000);
	// }).fail(function(xhr, textStatus, errorThrown) {
	// WE.F.alert("connecting server failed");
	// });
	// };

	// ファイルアップロード
	WE.S["upload"] = function(prm, rtn, callback) {
		// TODO
		// $fileUploaderForm = $("#" + WE.getId(prm.tabId, prm.scrId,
		// "fileUploaderForm"));
		// var formData = new FormData($fileUploaderForm[0]);
		// var rtnFiles = rtn["files"];
		// for (var i = 0, iLen = rtnFiles.length; i < iLen; i++) {
		// var file = rtnFiles[i];
		// formData.append(i, file.filePath);
		// }
		// $.ajax({
		// url: "/We.asmx/upload",
		// type: 'POST',
		// data: formData,
		// contentType: false,
		// processData: false,
		// success: function (data, textStatus, jqXHR) {
		// prm.fileFlg = "NONE";
		// WE.S.call(prm);
		// },
		// error: function (jqXHR, textStatus, errorThrown) {
		// WE.F.alert("<div
		// class='E'>【SYSTEM】<br>ファイルのアップロードに失敗しました。</div><br>");
		// }
		// });
	};

	WE.S["download"] = function(prm, rtn, callback) {
		var rtnFiles = rtn["fileDowns"];
		for (var i = 0, iLen = rtnFiles.length; i < iLen; i++) {
			var filePath = rtnFiles[i];
			$.fileDownload('/download/', {
				httpMethod : "POST",
				data : {
					filePath : filePath
				},
				successCallback : function(url) {
				},
				failCallback : function(html, url) {
					WE.F.alert("<div		 class='E'>【SYSTEM】<br>ファイルのダウンロードに失敗しました。</div><br>");
				}
			});
		}
	};

	// TODO ********************************************************************
	// screenshot
	WE.F["screenshot"] = function(fileNm) {
		function ArraytoBlob(_mime, _array) {
			// ArrayBufferやUint8Arrayなら入れなおす工数がなくなります
			var arr = new Uint8Array(_array.length);
			for (var i = 0; i < _array.length; i++) {
				arr[i] = _array[i];
			}

			var blob = new Blob([ arr ], {
				type : _mime
			});
			return blob;
		}

		function saveBlob(_blob, _file) {
			if ( /* @cc_on ! @ */false) { // IEの場合
				window.navigator.msSaveBlob(_blob, _file);
			} else {
				var url = (window.URL || window.webkitURL);
				var data = url.createObjectURL(_blob);
				var e = document.createEvent("MouseEvents");
				e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
				a.href = data;
				a.download = _file;
				a.dispatchEvent(e);
			}
		}

		function Base64toBlob(_base64) {
			var i;
			var tmp = _base64.split(',');
			var data = atob(tmp[1]);
			var mime = tmp[0].split(':')[1].split(';')[0];

			// var buff = new ArrayBuffer(data.length);
			// var arr = new Uint8Array(buff);
			var arr = new Uint8Array(data.length);
			for (i = 0; i < data.length; i++) {
				arr[i] = data.charCodeAt(i);
			}
			var blob = new Blob([ arr ], {
				type : mime
			});
			return blob;
		}

		html2canvas(document.body, {
			onrendered : function(canvas) {
				// aタグのhrefにキャプチャ画像のURLを設定
				var base64 = canvas.toDataURL("image/png"); // firfoxならtoblobで直接blobにして保存できます。
				var blob = Base64toBlob(base64);
				saveBlob(blob, fileNm + ".png");
			}
		});
	}

	// ------------------------------------------------------------
	// START
	// ------------------------------------------------------------
	// ie8-9
	if (typeof window.console === "undefined") {
		window.console = {};
	}
	if (typeof window.console.log !== "function") {
		window.console.log = function() {
		};
	}

	// ajax setup
	$.ajaxSetup({
		accepts : {
			json : "application/json",
			js : "text/javascript",
			html : "text/html"
		},
		async : true,
		cache : false,
		contentType : "application/json; charset=utf-8",
		datatype : "json",
		type : "post"
	});

	if (WE.F.getUrlParameter("debug") !== "true") {
		// block context menu event and trigger right click event
		document.oncontextmenu = function() {
			return false;
		};

		// block f12 (development tools)
		$(document).keydown(function(event) {
			if (event.keyCode === 123) {// F12
				event.preventDefault();
			}
		});

		window.console.log = function() {
		};
	}

	WE.C.ALERT = WE.F.getAlert();

	WE.C.SERVICE_ID = WE.F.getServiceId();

	WE.S.call({
		task : "_Core.open",
		tabId : null,
		viewId : null,
		comps : null,
		datas : null
	}, function(prm, rtn) {
		if (rtn.datas.loadedHtml) {
			$("#w-main").html(rtn.datas.loadedHtml.trim());
		}
	});

});