$(function() {

	// ------------------------------------------------------------
	// COMPONENT
	// ------------------------------------------------------------
	/***************************************************************************
	 * WE部品の共通ベース定義
	 **************************************************************************/
	$.widget('we.base', {

		// 属性定義
		options : {
			type : null,
			left : null,
			right : null,
			top : null,
			bottom : null,
			width : null,
			height : null,
			background : null,
			color : null,
			fontWeight : null,
			fontSize : null,
			border : null,
			rowCnt : null,
			head : null,
			body : null,
			foot : null,


			id : null,
			auth : null,
			value : null,
			ime : null,
			allow : null,
			mode : null,
			title : null,
		},

		// イベント設定(画面開発ツール)
		events : {

		},

		// 画面開発で利用可能な属性定義(画面開発ツール)
		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height', 'background', 'color', 'fontWeight', 'fontSize']

			//, [ 'marginLeft', 'marginRight', 'marginTop', 'marginBottom' ]

			, [ 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ]

			, [ 'horizontalAlign', 'border' ]

			, [ 'id', 'auth', 'value', 'ime', 'mode', 'title' ]

			, [ 'event' ] ],

		/***********************************************************************
		 * _create(部品生成(HTMLロード時一回のみ))
		 **********************************************************************/
		_create : function() {

			var that = this;

			// HTMLラップ
			var html = '';
			html += '<div w-pos="frame">';
			html += '    <div w-pos="bot"></div>'; // 実際部品が配置されるタグ
			html += '    <div w-pos="top">';
			html += '        <div w-pos="del"></div>'; // 部品削除ボタン(画面開発ツール)
			html += '    </div>';
			html += '</div>';

			// 位置初期化
			if (!this.options.left && !this.options.right) {
				this.options.left = 0;
			}
			if (!this.options.top && !this.options.bottom) {
				this.options.top = 0;
			}

			// 基本サイズ設定
			this.options.width = this.options.width || 96; // ★TODO
			// 別途コンスタント化
			this.options.height = this.options.height || 26;// ★TODO
			// 別途コンスタント化

			this.element.html(html).css({
				// CSS設定
				'left' : this.options.left + (isNaN(this.options.left) === true ? '' : 'px'),
				'right' : this.options.right + (isNaN(this.options.right) === true ? '' : 'px'),
				'top' : this.options.top + (isNaN(this.options.top) === true ? '' : 'px'),
				'bottom' : this.options.bottom + (isNaN(this.options.bottom) === true ? '' : 'px'),
				'width' : this.options.width + (isNaN(this.options.width) === true ? '' : 'px'),
				'height' : this.options.height + (isNaN(this.options.height) === true ? '' : 'px'),
				'background' : this.options.background,
				'color' : this.options.color,
				'fontWeight' : this.options.fontWeight,
				'fontSize' : this.options.fontSize + (isNaN(this.options.fontSize) === true ? '' : 'px'),
				'marginLeft' : this.options.marginLeft + (isNaN(this.options.marginLeft) === true ? '' : 'px'),
				'marginRight' : this.options.marginRight + (isNaN(this.options.marginRight) === true ? '' : 'px'),
				'marginTop' : this.options.marginTop + (isNaN(this.options.marginTop) === true ? '' : 'px'),
				'marginBottom' : this.options.marginBottom + (isNaN(this.options.marginBottom) === true ? '' : 'px'),
				'paddingLeft' : this.options.paddingLeft + (isNaN(this.options.paddingLeft) === true ? '' : 'px'),
				'paddingRight' : this.options.paddingRight + (isNaN(this.options.paddingRight) === true ? '' : 'px'),
				'paddingTop' : this.options.paddingTop + (isNaN(this.options.paddingTop) === true ? '' : 'px'),
				'paddingBottom' : this.options.paddingBottom + (isNaN(this.options.paddingBottom) === true ? '' : 'px'),
				'textAlign' : this.options.horizontalAlign,
				'border' : this.options.border,
			}).attr({
				// タグ属性設定
				'w-left' : this.options.left,
				'w-right' : this.options.right,
				'w-top' : this.options.top,
				'w-bottom' : this.options.bottom,
				'w-width' : this.options.width,
				'w-height' : this.options.height,
				'w-background' : this.options.background,
				'w-color' : this.options.color,
				'w-fontWeight' : this.options.fontWeight,
				'w-fontSize' : this.options.fontSize,
				'w-marginLeft' : this.options.marginLeft,
				'w-marginRight' : this.options.marginRight,
				'w-marginTop' : this.options.marginTop,
				'w-marginBottom' : this.options.marginBottom,
				'w-paddingLeft' : this.options.paddingLeft,
				'w-paddingRight' : this.options.paddingRight,
				'w-paddingTop' : this.options.paddingTop,
				'w-paddingBottom' : this.options.paddingBottom,
				'w-horizontalAlign' : this.options.horizontalAlign,
				'w-border' : this.options.border,
			});

			// DIV接近のための変数化
			this.frame = this.element.children('[w-pos=frame]');
			this.bot = this.frame.children('[w-pos=bot]');
			this.top = this.frame.children('[w-pos=top]');
			this.del = this.top.children('[w-pos=del]');

			// w-topのみマウスドラッグ可能(画面開発ツール)
			if (this.element.attr('w-devIdx')) {
				this.element.draggable({
					cancel : '[w-pos=bot], [w-pos=del]',
					start : function(event, ui) {
					},
					// マウスドラッグ終了時
					stop : function(event, ui) {
						var comp = $(this);

						// 位置設定
						comp.css({
							left : Math.round(comp.position().left / 10) * 10 + 'px', // ★TODO
							// 別途コンスタント化
							top : Math.round(comp.position().top / 10) * 10 + 'px' // ★TODO
							// 別途コンスタント化
						})

						// 部品属性更新(w-devMovedコール)
						that.element.trigger('w-devMoved');
					}
				});
			}

			// w-topクリック時(画面開発ツール)
			this.top.on('click', function(event) {
				// this.topのみイベント対応
				event.preventDefault();
				event.stopPropagation();
				// 部品選択状態に更新(w-devSelectコール)
				that.element.trigger('w-devSelect');
			}).on('mouseover', function(event) {
				// this.topのみイベント対応
				event.preventDefault();
				event.stopPropagation();
			});

			// Xクリック時(画面開発ツール)
			this.del.on('click', function(event) {
				// this.delのみイベント対応
				event.preventDefault();
				event.stopPropagation();

				WE.F.alert("本当に削除してもよろしいでしょうか。", null, [ WE.C.AB_YES, WE.C.AB_NO ], null, function(
					event) {
					if (event.detail === WE.C.AB_YES) {
						// 部品削除(w-devDeleteコール)
						that.element.trigger('w-devDelete');
					}
				});
			});
		},

		/***********************************************************************
		 * _init(部品初期化)
		 **********************************************************************/
		_init : function() {

			// 権限設定
			this._setAuth();
			this._setIme();

			// 値設定
			this._setValue();
			this._setTitle();
		},

		/***********************************************************************
		 * _setOption(this.optionsに値設定)
		 **********************************************************************/
		_setOption : function(key, value) {
			this.options[key] = value;

			var funcNm = '_set' + (key && key[0].toUpperCase() + key.slice(1));

			if (this[funcNm]) {
				this[funcNm](value);
			}
		},

		/***********************************************************************
		 * _getOption(this.optionsから値取得)
		 **********************************************************************/
		_getOption : function(key) {
			var funcNm = '_get' + (key && key[0].toUpperCase() + key.slice(1));

			if (this[funcNm]) {
				return this[funcNm]();
			}

			if (this.options[key]) {
				return this.options[key];
			}

			return null;
		},

		/***********************************************************************
		 * _setDev(w-devをHTMLに追加し、開発部品として表示)
		 **********************************************************************/
		_setDev : function() {
			if (this.options.dev === '') {
				this.element.removeAttr('w-dev');
			} else {
				this.element.attr('w-dev', this.options.dev);
			}
		},

		/***********************************************************************
		 * _setLeft
		 **********************************************************************/
		_setLeft : function() {
			this.element.css('left', this.options.left + (isNaN(this.options.left) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setRight
		 **********************************************************************/
		_setRight : function() {
			this.element.css('right', this.options.right + (isNaN(this.options.right) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setTop
		 **********************************************************************/
		_setTop : function() {
			this.element.css('top', this.options.top + (isNaN(this.options.top) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setBottom
		 **********************************************************************/
		_setBottom : function() {
			this.element.css('bottom', this.options.bottom + (isNaN(this.options.bottom) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setWidth
		 **********************************************************************/
		_setWidth : function() {
			this.element.css('width', this.options.width + (isNaN(this.options.width) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setHeight
		 **********************************************************************/
		_setHeight : function() {
			this.element.css('height', this.options.height + (isNaN(this.options.height) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setBackground
		 **********************************************************************/
		_setBackground : function() {
			this.element.css('background', this.options.background);
		},

		/***********************************************************************
		 * _setColor
		 **********************************************************************/
		_setColor : function() {
			this.element.css('color', this.options.color);
		},

		/***********************************************************************
		 * _setFontWeight
		 **********************************************************************/
		_setFontWeight : function() {
			this.element.css('fontWeight', this.options.fontWeight);
		},

		/***********************************************************************
		 * _setFontSize
		 **********************************************************************/
		_setFontSize : function() {
			this.element.css('fontSize', this.options.fontSize + (isNaN(this.options.fontSize) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setTitle
		 **********************************************************************/
		_setTitle : function() {
			this.element.attr('title', this.options.value);
		},

		/***********************************************************************
		 * _setHorizontalAlign
		 **********************************************************************/
		_setHorizontalAlign : function() {
			this.element.css('textAlign', this.options.horizontalAlign);
		},

		/***********************************************************************
		 * _setBorder
		 **********************************************************************/
		_setBorder : function() {
			this.element.css('border', this.options.border + (isNaN(this.options.border) === true ? ' solid #777777' : 'px solid #777777'));
		},

		/***********************************************************************
		 * _setPaddingLeft
		 **********************************************************************/
		_setPaddingLeft : function() {
			this.element.css('paddingLeft', this.options.paddingLeft + (isNaN(this.options.paddingLeft) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setPaddingRight
		 **********************************************************************/
		_setPaddingRight : function() {
			this.element.css('paddingRight', this.options.paddingRight + (isNaN(this.options.paddingRight) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setPaddingTop
		 **********************************************************************/
		_setPaddingTop : function() {
			this.element.css('paddingTop', this.options.paddingTop + (isNaN(this.options.paddingTop) === true ? '' : 'px'));
		},

		/***********************************************************************
		 * _setPaddingBottom
		 **********************************************************************/
		_setPaddingBottom : function() {
			this.element.css('paddingBottom', this.options.paddingBottom + (isNaN(this.options.paddingBottom) === true ? '' : 'px'));
		},


		/***********************************************************************
		 * _setId(ID設定)
		 **********************************************************************/
		_setId : function() {
			if (this.options.id !== '') {
				this.element.attr('w-id', this.options.id);
				var tabId = this.element.attr('w-tabId');
				var viewId = this.element.attr('w-viewId');
				if (tabId !== '' && viewId !== '') {
					// ★idをtabId+viewId+HTML IDを付与
					this.element.attr('id', tabId + '_' + viewId + '_' + this.options.id);
				}
			}
		},

		/***********************************************************************
		 * _setIme(ime設定)
		 **********************************************************************/
		_setIme : function() {
			this._setValue();
		},

		/***********************************************************************
		 * _setAuth(権限設定 / 基本CSSで制限(ATTRがIE10で制限できないため))
		 **********************************************************************/
		_setAuth : function() {
			this.element.attr('w-auth', this.options.auth);
			switch (this.options.auth) {
				// 部品利用可能
				case WE.C.CA_ENABLE:
					this.element.removeAttr('tabIndex');
					break;
				// 部品利用不可
				case WE.C.CA_DISABLE:
				// 部品参照のみ
				case WE.C.CA_READONLY:
				// 部品非表示
				case WE.C.CA_HIDDEN:
					// TAB操作不可
					this.element.attr('tabIndex', '-1');
					this.element.attr('disabled', 'disabled');
					break;
			}
		},

		/***********************************************************************
		 * _setValue
		 **********************************************************************/
		_setValue : function() {

		},

		/***********************************************************************
		 * _setTrigger(イベントコール)
		 **********************************************************************/
		_setTrigger : function(value) {
			this.element.trigger('w-' + value);
		},

		/***********************************************************************
		 * setOption(public)
		 **********************************************************************/
		setOption : function(key, value) {
			this._setOption(key, value);
		},

		/***********************************************************************
		 * setOptions(public)
		 **********************************************************************/
		setOptions : function(options) {
			for ( var key in options) {
				this.setOption(key, options[key]);
			}
		},

		/***********************************************************************
		 * getOption(public)
		 **********************************************************************/
		getOption : function(key) {
			return this._getOption(key);
		},

		/***********************************************************************
		 * getOptions(public)
		 **********************************************************************/
		getOptions : function() {
			return {
				type : this.getOption('type'),
				id : this.getOption('id'),
				auth : this.getOption('auth'),
				value : this.getOption('value'),

				realId : this.element.attr('id')
			};
		},

		/***********************************************************************
		 * getUsableEvents(public / 画面開発ツール用)
		 **********************************************************************/
		getUsableEvents : function() {
			return this.events;
		},

		/*******************************************************
		 ******************************************************/
		getUsableAttrs : function() {
			var map = {};
			for (var i = 0, iLen = this._htmlStep.length; i < iLen; i++) {
				var childStep = this._htmlStep[i];
				for (var j = 0, jLen = childStep.length; j < jLen; j++) {
					map[childStep[j]] = '';
				}
			}
			return map;
		},

		/***********************************************************************
		 * getUsableEvents(public / 画面開発ツール用)
		 **********************************************************************/
		// HTML取得
		getHtml : function() {
			// HTML作成
			var html = '';
			var step = this._htmlStep;

			html += '\t\t\t<div\r\n';
			for (var i = 0, iLen = step.length; i < iLen; i++) {
				var root = step[i];
				html += '\t\t\t';
				for (var j = 0, jLen = root.length; j < jLen; j++) {
					var attrKey = 'w-' + root[j];
					html += attrKey + '="' + (this.element.attr(attrKey) || '') + '" ';
				}
				html += '\r\n';
			}
			html += '\t\t\t></div>'

			return html;
		}

	});

	$.widget('we.weData', $.we.base, {});

	$.widget('we.weText', $.we.base, {

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<span></span>');
			this.span = this.bot.find('span');

			this.bot.css('line-height', this.element.outerHeight() + 'px');

			this.bot.on('mouseover', function(event) {
				if (that.element.width() - 4 < that.span.width()) {
					if (!that.element.attr('title') != that.span.html()) {
						that.element.attr('title', that.span.html());
					}
				} else {
					that.element.removeAttr('title');
				}
			});
			
			this.bot.on('click', function(event) {
				that.element.trigger("w-click");
			});
		},

		_setValue : function() {
			this.span.html(WE.F.setValueByIme(this.options.value, this.options.ime));
		},

		_getValue : function() {
			this.options.value = WE.F.getValueByIme(this.span.html(), this.options.ime);
			return this.options.value;
		},
	});

	$.widget('we.weLabel', $.we.weText, {});

	$.widget('we.weBadge', $.we.base, {

		_create : function() {
			var that = this;
			this._super();
		},

		_setValue : function() {
			this.element.html(WE.F.setValueByIme(this.options.value, this.options.ime));
		},

		_getValue : function() {
			this.options.value = WE.F.getValueByIme(this.element.html(), this.options.ime);
			return this.options.value;
		},


	});

	$.widget('we.weButton', $.we.base, {

		events : {
			click : ''
		},

		options : {
			src : null,
		},

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<button><img style="display:none;"/><span></span></button>');
			this.btn = this.bot.children('button');
			this.txt = this.btn.children('span');
			this.icon = this.btn.children('img');

			this.btn.on('click', function(event) {
				if (that.options.auth === WE.C.CA_ENABLE) {
					that.element.trigger('w-click');
				}
			});

			this.btn.on('keypress', function(event) {
				if (event.keycode === 13 && that.options.auth === WE.C.CA_ENABLE) {
					that.element.trigger('w-click');
				}
			});
		},

		_init : function() {
			this._setIcon();
			this._super();
		},

		_setOption : function(key, value) {
			this._super(key, value);
			switch (key) {
			case 'icon':
				this._setIcon();
				break;
			}
			return true;
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
			case WE.C.CA_ENABLE:
				this.btn.removeAttr('tabIndex');
				break;
			case WE.C.CA_DISABLE:
			case WE.C.CA_READONLY:
			case WE.C.CA_HIDDEN:
				this.btn.attr('tabIndex', '-1');
				break;
			}
		},

		_setValue : function() {
			this.txt.html(this.options.value);
		},

		_setIcon : function() {
			if (!this.options.src)
				return;
			this.icon.attr('src', this.options.src).css('display', '');
		},
	});

	$.widget('we.weTextField', $.we.base, {

		options : {
			tabIndex : null
		},

		events : {
			change : ''
		},

		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height', 'background', 'color', 'fontWeight', 'fontSize' ]
			, [ 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ]
			, [ 'horizontalAlign', 'tabIndex' ]
			, [ 'id', 'auth', 'value', 'ime', 'mode', 'allow']
			, [ 'maxLength' ]
			, [ 'event' ] ],

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<input/>');
			this.input = this.bot.children('input');

			// focusout or Enterキー時、IME変換
			this.input.on('focusin', function(event) {
				that.input.addClass('w-focus');
			}).on('focusout', function(event) {
				that.input.removeClass('w-focus');
				that.setOption('value', that.input.val());
				that.element.trigger('w-change');
			}).on('keydown', function(event) {
				if (event.keyCode == $.ui.keyCode.ENTER) {
					that.setOption('value', that.input.val());
					that.element.trigger('w-enter');
					return;
				}
			});
		},

		_init : function() {
			this._setMaxLength();
			this._setTabIndex();
			this._super();
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
			case WE.C.CA_ENABLE:
				this.input.removeAttr('readonly tabIndex disabled');
				break;
			case WE.C.CA_DISABLE:
			case WE.C.CA_READONLY:
			case WE.C.CA_HIDDEN:
				this.input.attr({
					'disabled' : 'disabled',
					'tabIndex' : '-1'
				});
				break;
			}
		},

		_setIme : function() {
			// passwordの場合、******
			if (this.options.ime === 'password') {
				this.input.attr('type', 'password');
			} else {
				this.input.removeAttr('type');
			}
			// reset
			this._super();
		},

		_setValue : function() {
			this.input.val(WE.F.setValueByIme(this.options.value, this.options.ime,
				this.options.allow));
		},

		_getValue : function() {
			this.options.value = WE.F.getValueByIme(this.input.val(), this.options.ime,
				this.options.allow);
			return this.options.value;
		},

		_setMaxLength : function() {
			if (this.options.maxLength) {
				this.input.attr('maxlength', this.options.maxLength);
			} else {
				this.input.removeAttr('maxlength');
			}
		},

		_setTabIndex : function() {
			if (this.options.tabIndex) {
				this.input.attr('tabIndex', this.options.tabIndex);
			} else {
				this.input.removeAttr('tabIndex');
			}
		}

	});

	$.widget('we.weSearchField', $.we.weTextField, {

		options : {
			multi : null,
			tabIndex : null
		},

		events : {
			change : '',
			iconClick : ''
		},

		_create : function() {
			var that = this;
			this._super();

			this.inputIcon = $(document.createElement('img'));
			this.input.after(this.inputIcon);

			this.inputIcon.on('click', function(event) {
				if (that.options.auth === WE.C.CA_ENABLE) {
					that.element.trigger('w-iconClick');
				}
			});
		},

		_setList : function() {
			if (this.options.multi == 'true') {
				this._setValue();
			}
		},

		_setValue : function() {
			if (this.options.multi == 'true') {
				if (!this.options.list)
					return;
				var value = '';
				for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
					var item = this.options.list[i];
					value += WE.F.setValueByIme(item['KEY'], this.options.ime, this.options.allow)
						+ ',';
				}
				this.input.val(value.substring(0, value.lastIndexOf(',')));
			} else {
				this.input.val(WE.F.setValueByIme(this.options.value, this.options.ime,
					this.options.allow));
			}
		},

		_getValue : function() {
			if (this.options.multi == 'true') {
				return '';
			} else {
				this.options.value = WE.F.getValueByIme(this.input.val(), this.options.ime,
					this.options.allow);
				return this.options.value;
			}
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
				case WE.C.CA_ENABLE:
					this.input.removeAttr('readonly disabled');
					break;
				case WE.C.CA_DISABLE:
				case WE.C.CA_READONLY:
				case WE.C.CA_HIDDEN:
					this.input.attr({
						'disabled' : 'disabled',
						'tabIndex' : '-1'
					});
					break;
			}
		},

	});

	$.widget('we.weDateField', $.we.weTextField, {

		options : {
			ime : WE.C.CI_DATE,
			maxDate : '9999/12/31',
			tabIndex : null
		},

		events : {
			change : ''
		},

		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height', 'background', 'color', 'fontWeight' ]
			, [ 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ]
			, [ 'horizontalAlign', 'tabIndex' ]
			, [ 'id', 'auth', 'list', 'value']
			, [ 'maxDate' ]
			, [ 'event' ] ],

		_create : function() {
			var that = this;
			this._super();

			this.input.attr('maxlength', '10');

			this.inputIcon = this.input.datepicker({
				showOn : 'button',
				buttonImageOnly : true,
				prevText : '先月',
				nextText : '来月',
				monthNames : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
				monthNamesShort : [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
				dayNames : [ '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日' ],
				dayNamesShort : [ '日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜' ],
				dayNamesMin : [ '日', '月', '火', '水', '木', '金', '土' ],
				weekHeader : '',
				dateFormat : 'yy/mm/dd',
				firstDay : 1,
				showMonthAfterYear : true,
				yearSuffix : '年',
				onSelect : function() {
					that.setOption('value', that.input.val());
					that.element.trigger('w-change');
				}
			}).next('.ui-datepicker-trigger').addClass('w-icon right');

			this._setMaxDate(this.options.maxDate);
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
				case WE.C.CA_ENABLE:
					this.input.datepicker('enable');
					this.input.removeAttr('readonly disabled');
					break;
				case WE.C.CA_DISABLE:
				case WE.C.CA_READONLY:
				case WE.C.CA_HIDDEN:
					this.input.datepicker('disable');
					this.input.attr({
						'disabled' : 'disabled',
						'tabIndex' : '-1'
					});
					break;
			}
		},

		_setOption : function(key, value) {
			this._super(key, value);
			switch (key) {
			case 'maxDate':
				this._setMaxDate(value);
				break;
			}
			return true;
		},

		_setMaxDate : function(date) {
			if (WE.F.setValueByIme(date, this.options.ime) != '') {
				var splitDate = WE.F.setValueByIme(date, this.options.ime).split('/');
				this.input.datepicker('option', 'maxDate', new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2])));
			}
		},

		_setValue : function() {
			var value = WE.F.setValueByIme(this.options.value, this.options.ime);
			if (value != '') {
				var maxDate = this.input.datepicker('option', 'maxDate');
				if (new Date(value) > maxDate) {
					value = '';
				}
			}
			this.input.val(value);
		},

	});

	$.widget('we.weComboBox', $.we.base, {

		options : {
			rowCnt : '5',
			nullable : 'true'
		},

		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height', 'color', 'fontSize']
			, [ 'id', 'auth', 'value', 'mode' ]
			, [ 'keyField', 'dataField', 'nullable' ]
			, [ 'list' ]
			, [ 'event' ] ],

		events : {
			change : ''
		},

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<select>');
			this.select = this.bot.find('select');

			this.select.on('mousedown', function(event) {
				that.select.addClass('w-focus');
			}).on('change', function(event) {
				that.element.trigger('w-change');
			}).on('focusout', function(event) {
				that.select.removeClass('w-focus');
			})

			return true;
		},

		_init : function() {
			this._setList();
			this._super();
		},

		_destroy : function() {
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
			case WE.C.CA_ENABLE:
				this.select.removeAttr('disabled tabIndex');
				break;
			case WE.C.CA_DISABLE:
			case WE.C.CA_READONLY:
			case WE.C.CA_HIDDEN:
				this.select.attr({
					'disabled' : 'disabled',
					'tabIndex' : '-1'
				});
				break;
			}
		},

		_setList : function() {
			if (!this.options.list)
				return;

			var option = '';
			if (this.options.nullable === 'true') {
				option += '<option value=""></option>';
			}

			for (var i = 0, iLength = this.options.list.length; i < iLength; i++) {
				option += '<option value="' + this.options.list[i][this.options.keyField] + '">' + this.options.list[i][this.options.dataField] + '</option>';
			}

			this.select.html(option);

			this._setValue();

			return true;
		},

		_getValue : function() {
			this.options.value = this.select.val();

			return this.options.value;
		},

		_setValue : function() {
			this.select.val(this.options.value);

			return true;
		}

	});

	$.widget('we.weTextArea', $.we.weTextField, {

		events : {
			change : ''
		},

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<textArea></textArea>');
			this.input = this.bot.children('textArea');
		}

	});

	$.widget('we.weCheckButton', $.we.base, {

		_create : function() {
			var that = this;
			this._super();

			this.bot.html('<div><input readonly/></div>');
			this.wrp = this.bot.children('div');
			this.btn = this.wrp.children('input');
			var that = this;

			if (this.options.value !== '1')
				this.options.value = '0';

			this.wrp.click(function(event) {
				if (that.options.auth != WE.C.CA_ENABLE || event.target.tagName != 'INPUT') {
					return;
				}

				that.setOption('value', that.options.value === '0' ? '1' : '0');
				that.element.trigger('w-change');
			});

			this.wrp.keydown(function(event) {
				if (event.keyCode === $.ui.keyCode.SPACE) {
					event.preventDefault();
					that.setOption('value', that.options.value === '0' ? '1' : '0');
					that.element.trigger('w-change');
				}
			});
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
			case WE.C.CA_ENABLE:
				this.btn.removeAttr('tabIndex');
				break;
			case WE.C.CA_DISABLE:
			case WE.C.CA_READONLY:
			case WE.C.CA_HIDDEN:
				this.btn.attr('tabIndex', '-1');
				break;
			}
		},

		_setValue : function() {
			if (!this.options.value)
				this.options.value = '0';

			if (this.options.value === '1') {
				this.btn.addClass('checked');
			} else {
				this.btn.removeClass('checked');
			}
			return true;
		}

	});

	$.widget('we.weRadioButton', $.we.weCheckButton, {});

	$.widget('we.weCheckGroup', $.we.base, {

		_create : function() {
			var that = this;
			this._super();
			this.bot.html('<ul></ul>');
			this.wrapper = this.bot.children('ul');

			var that = this;
			this.wrapper.on('click', 'li', function(event) {
				if (that.options.auth != WE.C.CA_ENABLE) {
					return;
				}
				var li = $(this);
				var input = li.children('input');

				var span = input.next().children();
				if (input.is(':checked')) {
					span.addClass('checked');
				} else {
					span.removeClass('checked');
				}

				if (span)
					that.element.trigger('w-change');
			});

		},

		_init : function() {
			this._setList();
			this._super();
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
				case WE.C.CA_ENABLE:
					this.wrapper.find('input').removeAttr('tabIndex disabled');
					break;
			}
		},

		_setValue : function() {
			if (!this.options.value || !this.options.list)
				return;

			var valueArray = (this.options.value + '').split(',');
			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {

				this.wrapper.find('input:eq(' + i + ')').prop('checked', false);
				this.wrapper.find('span:eq(' + i + ')').removeClass('checked');
				for (var j = 0, jLen = valueArray.length; j < jLen; j++) {
					if (this.options.list[i][this.options.keyField] == valueArray[j]) {
						this.wrapper.find('input:eq(' + i + ')').prop('checked', true);
						this.wrapper.find('span:eq(' + i + ')').addClass('checked');
						valueArray.splice(j, 1);
						break;
					}
				}
			}
		},

		_getValue : function() {
			var tempValue = '';
			this.wrapper.find('input').each(function(index, element) {
				var input = $(element);
				if (input.is(':checked')) {
					tempValue += ',' + input.val();
				}
			});
			this.options.value = tempValue.substring(1);
			return this.options.value;
		},

		_setList : function() {
			if (!this.options.list)
				return;

			this.wrapper.html('');

			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
				var li = '<li><input disabled type="checkbox" name="' + this.element.attr('id')
					+ '" value="' + this.options.list[i][this.options.keyField]
					+ '" /><label><span></span>' + this.options.list[i][this.options.dataField]
					+ '</label></li>';
				this.wrapper.append(li);
			}

			if (this.options.orien === 'vertical') {
				this.wrapper.children('li').css({
					'display' : 'block',
					'width' : '100%'
				});
			}

			this._setValue();
			this._setAuth();
		},

		_setOrien : function() {
			if (!this.options.orien || !this.options.list)
				return;

			if (this.options.orien === 'vertical')
				this.wrapper.children('li').css('float', 'none');
		}

	});

	// $.widget('we.weRadioGroup', $.we.weCheckGroup, {});
	$.widget('we.weRadioGroup', $.we.base, {

		events : {
			change : ''
		},

		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height', 'background', 'color', 'fontWeight', 'fontSize']
			, [ 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ]
			, [ 'id', 'auth', 'value' ]
			, [ 'keyField', 'dataField', 'list' ]
			, [ 'event' ] ],

		_create : function() {

			var that = this;
			this._super();

			this.bot.html('<ul></ul>');
			this.wrapper = this.bot.children('ul');
			var that = this;

			this.wrapper.on('click', 'li', function(event) {
				if (that.options.auth != WE.C.CA_ENABLE) {
					return;
				}
				var ul = $(this).parent('ul');
				ul.children('li').children('input').next().children().removeClass('checked');

				var li = $(this);
				var input = li.children('input');

				var span = input.next().children();
				// if (input.is(':checked')) {
				// span.addClass('checked');
				// } else {
				// span.addClass('checked');
				// }
				span.addClass('checked');

				if (span)
					that.element.trigger('w-change');
			});

		},

		_init : function() {
			this._setList();
			this._super();
		},

		_setAuth : function() {
			this._super();
			switch (this.options.auth) {
				case WE.C.CA_ENABLE:
					this.wrapper.find('input').removeAttr('tabIndex disabled');
					break;
			}
		},

		_setValue : function() {
			if (!this.options.value || !this.options.list)
				return;
			// TODO if value type integer
			var valueArray = (this.options.value + '').split(',');
			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
				// TODO confirm
				this.wrapper.find('input:eq(' + i + ')').prop('checked', false);
				this.wrapper.find('span:eq(' + i + ')').removeClass('checked');
				for (var j = 0, jLen = valueArray.length; j < jLen; j++) {
					if (this.options.list[i][this.options.keyField] == valueArray[j]) {
						this.wrapper.find('input:eq(' + i + ')').prop('checked', true);
						this.wrapper.find('span:eq(' + i + ')').addClass('checked');
						valueArray.splice(j, 1);
						break;
					}
				}
			}
		},

		_getValue : function() {
			var tempValue = '';
			this.wrapper.find('input').each(function(index, element) {
				var input = $(element);
				if (input.next().children().is('.checked')) {
					tempValue = input.val();
				}
			});
			this.options.value = tempValue;
			return this.options.value;
		},

		_setList : function() {
			if (!this.options.list)
				return;

			this.wrapper.html('');

			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
				var li = '<li><input disabled type="checkbox" name="' + this.element.attr('id')
					+ '" value="' + this.options.list[i][this.options.keyField]
					+ '" /><label><span></span>' + this.options.list[i][this.options.dataField]
					+ '</label></li>';
				this.wrapper.append(li);
			}

			if (this.options.orien === 'vertical') {
				this.wrapper.children('li').css({
					'display' : 'block',
					'width' : '100%'
				});
			}

			this._setValue();
			this._setAuth();
		},

	});


	$.widget('we.weImage', $.we.base, {

		_create : function() {
			this.element.html('<img/>');
			this.img = this.element.find('img');
		},

		_setValue : function() {
			if (!this.options.value)
				return;
			this.img.attr('src', this.options.value);
			return true;
		}

	});

	$.widget('we.weLegend', $.we.base, {

		_create : function() {
			this.element.html('<div class="base"><div class="left_legend"/><div class="center_legend"><label/></div><div class="right_legend"/></div>');
			this.wrapper = this.element.children('div');
			this.label = this.wrapper.find('label');
			this.centerLegend = this.wrapper.children('.center_legend');
			this.rightLegend = this.wrapper.children('.right_legend');

			return true;
		},

		_setValue : function() {
			if (!this.options.value)
				return;
			this.label.html(this.options.value);

			this.centerLegend.css({
				'width' : (this.label.width() + 12) + 'px'
			});
			this.rightLegend.css({
				'width' : (parseInt(this.wrapper.css('width').replace('px', '')) - parseInt(this.centerLegend.css('width').replace('px', '')) - 14) + 'px'
			});

			return true;
		}

	});

	$.widget('we.weTabs', $.we.base, {

		_create : function() {
			var that = this;
			this.bodyComp = {};
			this.compLinkSet = {};
			var tabsLi = this.element.find('> ul > li');
			for (var i = 0, iLength = tabsLi.length; i < iLength; i++) {
				$li = $(tabsLi[i]);
				this.bodyComp[i] = $li;
				this.compLinkSet[i] = $li.find('a');
			}

			this.element.tabs();
			this.element.tabs({
				'activate' : function(event, ui) {
					that.element.trigger('change');
				}
			});

			// this.element.css('border', 'none');

			return true;
		},

		_setValue : function() {
			if (this.options.value === '')
				this.options.value = '0';

			if (this.compLinkSet[this.options.value]) {
				this.compLinkSet[this.options.value].trigger('click');
			}

			return true;
		},

		_getValue : function() {
			for (var i = 0, iLength = this.bodyComp.length; i < iLength; i++) {
				if (this.bodyComp[i].attr('tabindex') === '0') {
					this.options.value = i;
				}
			}
		}
	});

	$.widget('we.weTable', $.we.base, {

		options : {
			select : null
			, list : null
		},

		events : {
			"click" : ""
		},

		_htmlStep : [ [ 'type', 'left', 'right', 'top', 'bottom', 'width', 'height']
			, [ 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom' ]
			, [ 'id', 'auth', 'title']
			, [ 'event' ]
			, [ 'rowCnt' ]
			, [ 'head' ], [ 'body' ], [ 'foot' ] ],

		_create : function() {
			var that = this;
			this._super();

			this.bodyWrpAbs = $(document.createElement('div')).attr('w-part', 'bodyWrpAbs');
			this.bodyWrpRel = $(document.createElement('div')).attr('w-part', 'bodyWrpRel');
			this.bodyTable = $(document.createElement('table')).attr('w-part', 'bodyTable');
			this.body = $(document.createElement('tbody')).attr('w-part', 'body');

			this.headWrpAbs = $(document.createElement('div')).attr('w-part', 'headWrpAbs');
			this.headWrpRel = $(document.createElement('div')).attr('w-part', 'headWrpRel');
			this.headTable = $(document.createElement('table')).attr('w-part', 'headTable');
			this.head = $(document.createElement('thead')).attr('w-part', 'head');

			this.footWrpAbs = $(document.createElement('div')).attr('w-part', 'footWrpAbs');
			this.footWrpRel = $(document.createElement('div')).attr('w-part', 'footWrpRel');
			this.footTable = $(document.createElement('table')).attr('w-part', 'footTable');
			this.foot = $(document.createElement('tfoot')).attr('w-part', 'foot');

			this.titleWrpAbs = $(document.createElement('div')).attr('w-part', 'titleWrpAbs');
			this.titleWrpRel = $(document.createElement('div')).attr('w-part', 'titleWrpRel');
			this.title = $(document.createElement('div')).attr('w-part', 'title');

			this.pageWrpAbs = $(document.createElement('div')).attr('w-part', 'pageWrpAbs');
			this.pageWrpRel = $(document.createElement('div')).attr('w-part', 'pageWrpRel');
			this.page = $(document.createElement('div')).attr('w-part', 'page');

			// tbody
			if (this.options.body && $.isArray(this.options.body)) {
				var tr = $(document.createElement('tr')).attr('w-part', 'tr');
				for (var i = 0, iLen = this.options.body.length; i < iLen; i++) {
					var td = $(document.createElement('td')).attr('w-part', 'td');
					var div = $(document.createElement('div')).attr('w-part', 'div');
					var item = this.options.body[i];
					div.attr({
						'w-type' : 'Text',
						'w-width' : 100,
						'w-height' : 25
					});
					for ( var key in item) {
						var prop = item[key]
						if (Array.isArray(prop)){
							prop = JSON.stringify(prop).replace(/\"/g, "");
						}

						div.attr('w-' + key, prop);
					}

					td.append(div);
					tr.append(td);
				}

				this.body.append(tr);
				this.bodyTable.append(this.body);
				this.bodyWrpRel.append(this.bodyTable);
				this.bodyWrpAbs.append(this.bodyWrpRel);
				this.bot.append(this.bodyWrpAbs);
			}

			// thead
			if (this.options.head && $.isArray(this.options.head)) {
				var tr = $(document.createElement('tr')).attr('w-part', 'tr');
				for (var i = 0, iLen = this.options.head.length; i < iLen; i++) {
					var td = $(document.createElement('td')).attr('w-part', 'td');
					var div = $(document.createElement('div')).attr('w-part', 'div');
					var item = this.options.head[i];
					div.attr({
						'w-type' : 'Text',
						'w-width' : 100,
						'w-height' : 25
					});
					for ( var key in item) {
						div.attr('w-' + key, item[key]);
					}
					WE.F.init(div);
					td.append(div);
					tr.append(td);
				}

				// スクロール作成
				var td = $(document.createElement('td')).attr('w-part', 'td');
				var div = $(document.createElement('div')).attr('w-part', 'div');
				div.attr({
					'w-type' : 'Text',
					'w-width' : 20,
					'w-height' : 25
				});
				WE.F.init(div);
				td.append(div);
				tr.append(td);

				this.head.append(tr);
				this.headTable.append(this.head);
				this.headWrpRel.append(this.headTable);
				this.headWrpAbs.append(this.headWrpRel);
				this.bot.append(this.headWrpAbs);

				// ヘッダークリック（★ソート）
				this.head.on('click', '[w-type]', function(event) {
					// リストのサイズ
					if (that.options.list && that.options.list.length !== 0) {
						var $target = $(event.currentTarget);
						var cellIndex = $target.parent()[0].cellIndex;
						var columnName = that.body.find(
							'tr:nth(1) td:nth(' + cellIndex + ') > div[w-type]').attr(
							'w-column');
						var columnType = that.body.find(
							'tr:nth(1) td:nth(' + cellIndex + ') > div[w-type]').attr(
							'w-type');
						var order = (($target.attr('w-order') || 'desc') === 'asc') ? -1 : 1;
						if(columnName == 'ROW_ID' || columnType != 'Text'){
							return;
						}else{
							that.options.list.sort(function(a, b) {
								if(a[columnName] != null){
									a = a[columnName].toLowerCase();
								}
								if(b[columnName] != null){
									b = b[columnName].toLowerCase();
								}
								var upA = '' + (a || '');
								var upB = '' + (b || '');
								var rtn = order * (upA > upB ? 1 : (upA === upB ? 0 : -1));
								return rtn;
							});
							that._setList();
							$target.attr('w-order', (order === 1) ? 'asc' : 'desc');
						}
					}
				});
			} else {
				this.bodyWrpAbs.css('padding-top', '0px');
			}

			// tfoot
			if (this.options.foot && $.isArray(this.options.foot)) {
				var tr = $(document.createElement('tr')).attr('w-part', 'tr');
				for (var i = 0, iLen = this.options.foot.length; i < iLen; i++) {
					var td = $(document.createElement('td')).attr('w-part', 'td');
					var div = $(document.createElement('div')).attr('w-part', 'div');

					var item = this.options.foot[i];
					div.attr({
						'w-type' : 'Text',
						'w-width' : 100,
						'w-height' : 25
					});
					for ( var key in item) {
						div.attr('w-' + key, item[key]);
					}
					WE.F.init(div);
					td.append(div);
					tr.append(td);
				}

				// スクロール作成
				var td = $(document.createElement('td')).attr('w-part', 'td');
				var div = $(document.createElement('div')).attr('w-part', 'div');
				div.attr({
					'w-type' : 'Text',
					'w-width' : 20,
					'w-height' : 25
				});
				WE.F.init(div);
				td.append(div);
				tr.append(td);

				this.foot.append(tr);
				this.footTable.append(this.foot);
				this.footWrpRel.append(this.footTable);
				this.footWrpAbs.append(this.footWrpRel);
				this.bot.append(this.footWrpAbs);
			} else {
				this.bodyWrpAbs.css('padding-bottom', '30px');
			}

			// title
			this.title.text(this.options.value || '');
			this.titleWrpRel.append(this.title);
			this.titleWrpAbs.append(this.titleWrpRel);
			this.bot.append(this.titleWrpAbs);

			// page
			this.rowCnt = parseInt(this.options.rowCnt);// １ページに表示される行数
			this.currPageNo = 0;// 現在のページ番号
			this.totalPageNo = 0;// 全体ページ数

			var pageLeft = this.pageLeft = $(document.createElement("div"));
			pageLeft.css({
				top : -6 + "px",
				width : 22 + "px",
				height : 22 + "px"
			});
			pageLeft.button({
				icons : {
					primary : "ui-icon-triangle-1-w"
				},
				text : false
			});
			pageLeft.off("click").on("click", function() {
				if (that.totalPageNo !== 0 && that.currPageNo > 0) {
					WE.F.setOption(that.pageCombo, 'value', that.currPageNo - 1);
					that.pageCombo.trigger('w-change');
				}
			});

			var pageRight = this.pageRight = $(document.createElement("div"));
			pageRight.css({
				top : -6 + "px",
				width : 22 + "px",
				height : 22 + "px"
			});
			pageRight.button({
				icons : {
					primary : "ui-icon-triangle-1-e"
				},
				text : false
			});
			pageRight.off('click').on('click', function() {
				if (that.totalPageNo !== 0 && that.currPageNo < that.totalPageNo) {
					WE.F.setOption(that.pageCombo, 'value', that.currPageNo + 1);
					that.pageCombo.trigger('w-change');
				}
			});

			var pageCombo = this.pageCombo = $(document.createElement('div'));
			pageCombo.attr({
				'w-type' : 'ComboBox',
				'w-right' : '0',
				'w-top' : '1',
				'w-width' : '70',
				'w-height' : '22',
				'w-auth' : 'enable',
				'w-value' : '0',
				'w-keyField' : 'k',
				'w-dataField' : 'd',
				'w-nullable' : 'false',
				'w-list' : '[{k:0,d:1}]'
			}).css({
				'text-align' : 'right'
			});

			pageCombo.off('w-change').on('w-change', function() {
				var selectedPageNo = parseInt(WE.F.getOption(pageCombo, 'value'));
				if (selectedPageNo === that.currPageNo) {
					return;
				}
				that._tableToList();
				that.currPageNo = selectedPageNo;
				that._listToTable();
				that.bodyWrpRel.scrollTop(0);
			}).css({
				'text-align' : 'right',
				'position' : 'relative'
			});
			var pageSlash = this.pageSlash = $(document.createElement('div'));
			pageSlash.attr({
				'w-type' : 'Text',
				'w-top' : '1',
				'w-width' : '20',
				'w-height' : '22',
				'w-value' : '/',
				'w-auth' : 'enable',
			}).css({
				'text-align' : 'center',
				'position' : 'relative'
			});
			var pageTotal = this.pageTotal = $(document.createElement('div'));
			pageTotal.attr({
				'w-type' : 'Text',
				'w-top' : '1',
				'w-width' : '50',
				'w-height' : '22',
				'w-value' : '1',
				'w-auth' : 'enable',
			}).css({
				'text-align' : 'right',
				'position' : 'relative'
			});

			this.page.append(pageLeft);
			this.page.append(pageRight);
			this.page.append(pageCombo);
			this.page.append(pageSlash);
			this.page.append(pageTotal);

			// ページ部品初期化
			WE.F.initAll(this.page);

			this.pageWrpRel.append(this.page);
			this.pageWrpAbs.append(this.pageWrpRel);
			this.bot.append(this.pageWrpAbs);
			// ページ設定終了

			this.headCompMap = {};
			this.bodyCompMap = {}; // body部品
			this.bodyColIdxMap = {}; // body値
			this.footCompMap = {}; // foot部品
			this.checkValueList = {}; // checkボタンカラム

			// スクロールイベント設定
			this.bodyWrpRel.on('scroll', function(event) {
				if (that.headWrpRel) {
					that.headWrpRel.scrollLeft(that.bodyWrpRel.scrollLeft());
				}
				if (that.footWrpRel) {
					that.footWrpRel.scrollLeft(that.bodyWrpRel.scrollLeft());
				}
			});

			// 選択イベント設定(色)
			this.body.on('click', '[w-type][w-auth=enable]', function(event) {
				that.body.children('tr.selected').removeClass('selected').children('td.selected')
					.removeClass('selected');
				$(this).parent().addClass('selected').parent().addClass('selected');
			});

			// チェックボックスカラム別保存
			var compCheckSet = this.compCheckSet = {};
			var theadChildren = this.head.find("[w-part=div]");
			for (var i = 0, iLen = theadChildren.length; i < iLen; i++) {
				var comp = $(theadChildren[i]);
				comp.attr({
					'id' : this.options.id + '_HEAD_' + (comp.attr('w-column') || i),
					'w-idx' : i
				});
				WE.F.init(comp);
				this.headCompMap[i] = comp;

				if (comp.attr('w-check_column') || comp.attr('w-change_column')) {
					if (comp.attr('w-change_column')) {
						this.checkValueList[comp.attr('w-change_column')] = {};
					}
					this._setCheck(comp);
				}
			}

			// 合計の情報保存
			var compSumSet = this.compSumSet = {};
			var tfootChildren = this.foot.find("[w-part=div]");
			for (var i = 0, iLen = tfootChildren.length; i < iLen; i++) {
				var comp = $(tfootChildren[i]);
				comp.attr({
					'id' : this.options.id + '_FOOT_' + (comp.attr('w-column') || i),
					'w-idx' : i
				});
				WE.F.init(comp);
				this.footCompMap[i] = comp;
			}

			this.row = this.body.children('tr').clone();

			// body部品生成
			this.body.html('');
			this._createComp();
		},

		// 初期化
		_init : function() {
			this._setList();
			this._setAuth();
		},

		_setRowCnt : function() {
			this._create();
		},

		_setHead : function() {
			this._create();
		},

		_setBody : function() {
			this._create();
		},

		_setFoot : function() {
			this._create();
		},

		_setList : function() {

			// リスト初期化（リストがない場合）
			this.options.list = this.options.list || [];
			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
				this.options.list[i]['ROW_ID'] = (i + 1);
			}

			this.head.find('[w-order]').removeAttr('w-order');
			this.body.children('tr.selected').removeClass('selected').children('td.selected')
				.removeClass('selected');

			// ページ再計算
			this._initPage();

			// リスト値をテーブルに表示
			this._listToTable();

			// 合計表示
			this._setSum();

		},

		_initPage : function() {
			//this.currPageNo = 0;
			this.totalPageNo = this.options.list.length === 0 ? 0 : Math
				.floor((this.options.list.length - 1) / this.options.rowCnt);

			if (this.currPageNo > this.totalPageNo){
				this.currPageNo = this.totalPageNo;
			}

			var pageList = [];
			for (var i = 0; i <= this.totalPageNo; i++) {
				pageList.push({
					k : i,
					d : i + 1
				});
			}

			this.pageLeft.button(this.totalPageNo === 0 ? "disable" : "enable");
			this.pageRight.button(this.totalPageNo === 0 ? "disable" : "enable");

			WE.F.setOptions(this.pageCombo, {
				auth : this.totalPageNo === 0 ? WE.C.CA_DISABLE : WE.C.CA_ENABLE,
				list : pageList,
				value : this.currPageNo
			});

			WE.F.setOptions(this.pageCombo, {
				auth : this.totalPageNo === 0 ? WE.C.CA_DISABLE : WE.C.CA_ENABLE,
				list : pageList,
				value : this.currPageNo
			});

			WE.F.setOptions(this.pageSlash, {
				auth : this.totalPageNo === 0 ? WE.C.CA_DISABLE : WE.C.CA_ENABLE,
			});

			WE.F.setOptions(this.pageTotal, {
				auth : this.totalPageNo === 0 ? WE.C.CA_DISABLE : WE.C.CA_ENABLE,
				value : this.totalPageNo + 1
			});
		},

		_createComp : function() {

			var rowIdx = 0;
			var rowIdxEnd = this.rowCnt;
			for (; rowIdx < rowIdxEnd; rowIdx++) {
				var row = this.row.clone();
				row.attr({
					'w-rowIdx' : rowIdx,
					'w-listIdx' : ''
				});

				this.bodyCompMap[rowIdx] = {};

				var cols = row.children('td');
				var colIdx = 0;
				var colIdxEnd = cols.length;

				for (; colIdx < colIdxEnd; colIdx++) {
					var col = $(cols[colIdx]);
					var comp = col.children('[w-type]');

					col.attr({
						'w-colIdx' : colIdx,
						'w-itemIdx' : comp.attr('w-column')
					});

					comp.attr({
						'id' : this.element.attr('id') + '_R_' + rowIdx + '_C_'
						+ comp.attr('w-column'),
						'w-rowIdx' : rowIdx,
						'w-listIdx' : '',
						'w-colIdx' : colIdx,
						'w-itemIdx' : comp.attr('w-column'),
						'w-auth' : WE.C.CA_HIDDEN
					});

					// 部品生成
					WE.F.init(comp);

					this.bodyCompMap[rowIdx][colIdx] = comp;

					if (rowIdx === 0) {
						this.bodyColIdxMap[comp.attr('w-column')] = colIdx;
					}

				}
				this.body.append(row);
			}
		},

		// 以前ページ記録（ページ移動の時）
		_tableToList : function() {
			var dataIdx = this.currPageNo * this.rowCnt;
			var rowIdx = 0;
			var rowIdxEnd = this.rowCnt;
			for (; rowIdx < rowIdxEnd; rowIdx++) {
				this._tableToListDetail(dataIdx, rowIdx);
				dataIdx++;
			}
		},

		_tableToListDetail : function(dataIdx, rowIdx) {
			var item = this.options.list[dataIdx];
			if (item) {// datas exist
				for ( var key in this.bodyColIdxMap) {
					var colIdx = this.bodyColIdxMap[key];
					var comp = this.bodyCompMap[rowIdx][colIdx];
					item[key] = WE.F.getOption(comp, 'value');
				}
			}
		},

		// 部品値の設定
		_listToTable : function() {
			var listIdx = this.currPageNo * this.rowCnt;
			var rowIdxEnd = this.rowCnt;
			for (var rowIdx = 0; rowIdx < rowIdxEnd; rowIdx++) {
				this._listToTableDetail(listIdx, rowIdx);
				listIdx++;
			}
		},

		_listToTableDetail : function(listIdx, rowIdx) {
			var item = this.options.list[listIdx];

			if (item) {// datas exist
				this.body.find('tr[w-rowIdx=' + rowIdx + ']').attr('w-listIdx', listIdx)
				for ( var key in this.bodyColIdxMap) {
					var colIdx = this.bodyColIdxMap[key];
					var comp = this.bodyCompMap[rowIdx][colIdx];
					comp.attr('w-listIdx', listIdx);
					if (comp.attr('w-type') === 'Button') {
						WE.F.setOptions(comp, {
							'auth' : item[key + '_auth'] || WE.C.CA_ENABLE
						});
					}
					else if(comp.attr('w-type') === 'Text') {

						//タイトルの色表示
						var col = comp.attr('w-column');
						if (col === 'title') {

							// 未閲覧の場合、色表示
							if (item.opendttm == null) {
								WE.F.setOptions(comp, {
									'value': item[key] || '',
									'auth': item[key + '_auth'] || WE.C.CA_ENABLE,
									'color': '#E66F6F',
									'fontWeight': 'bold',
								});
							} else {
								// 閲覧済
								WE.F.setOptions(comp, {
									'value': item[key] || '',
									'auth': item[key + '_auth'] || WE.C.CA_ENABLE,
									'color': 'black',
									'fontWeight': 'normal',
								});
							}

						} else {
							WE.F.setOptions(comp, {
								'value': item[key] || '',
								'auth': item[key + '_auth'] || WE.C.CA_ENABLE
								, 'title': item[key]
								, 'color': item[key + '_color'] || 'black'
							});
						}
					}
					else {
						WE.F.setOptions(comp, {
							'value' : item[key] || '',
							'auth' : item[key + '_auth'] || WE.C.CA_ENABLE
						});
					}

					if (this.checkValueList[comp.attr('w-column')]) {
						this.checkValueList[comp.attr('w-column')][rowIdx] = item[key];
					}
				}
			} else {// datas not exist
				this.body.find('[w-rowIdx=rowIdx]').attr('w-listIdx', '')
				for ( var itemIdx in this.bodyColIdxMap) {
					var colIdx = this.bodyColIdxMap[itemIdx];
					var comp = this.bodyCompMap[rowIdx][colIdx];
					comp.attr('w-listIdx', '');
					if (comp.attr('w-type') === 'Button') {
						WE.F.setOptions(comp, {
							'auth' : WE.C.CA_HIDDEN
						});
					} else {
						WE.F.setOptions(comp, {
							'value' : '',
							'auth' : WE.C.CA_HIDDEN
						});
					}

				}
			}
		},

		// 合計の計算
		_setCheck : function(comp) {
			var that = this;
			comp.off('change').on('change', function(event) {
				var comp = $(this);
				var value = WE.F.getOption(comp, 'value');
				var checkField = comp.attr('w-check_column') || comp.attr('w-change_column');

				// set all list check value
				for (var i = 0, iLen = that.options.list.length; i < iLen; i++) {
					var item = that.options.list[i];
					item[checkField] = value;
				}

				var dataIdx = that.paging ? that.currPageNo * that.rowCnt : 0;
				var rowIdx = 0;
				var rowIdxEnd = that.paging ? that.rowCnt : (that.currPageNo + 1) * that.rowCnt;
				for (; rowIdx < rowIdxEnd; rowIdx++) {
					var item = that.options.list[dataIdx];
					if (item) {// datas exist
						var colIdx = that.bodyColIdxMap[checkField];
						var comp = that.bodyCompMap[rowIdx][colIdx];
						WE.F.setOption(comp, 'value', value);
					}
					dataIdx++;
				}
			});
		},

		// 合計の計算
		_setSum : function() {
			// 合計値(value)初期化
			for ( var key in this.footCompMap) {
				var comp = this.footCompMap[key];
				if (!comp.attr('w-column')) {
					continue;
				}
				var sumField = comp.attr('w-column');
				var sum = 0;
				for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
					var item = this.options.list[i];
					var val = item[sumField] || '';
					if(isFinite(val)){
						if(isNaN(val)){
							val = val.replace(/,/g, '');
						}
						sum += parseFloat(val !== '' ? val : 0);
					}else{
						sum = '';
					}
				}
				WE.F.setOption(comp, 'value', isNaN(sum) ? '－' : sum);
			}
		},


		_addRow : function(list) {
			var rowIdxStart = this.options.list.length % this.rowCnt;
			var dataIdx = this.currPageNo * this.rowCnt;
			var rowIdx = 0;
			var rowIdxEnd = rowIdx + this.rowCnt;
			var itemIdx = 0;
			for (; rowIdxStart < rowIdxEnd; rowIdxStart++) {
				var item = list[itemIdx];
				this._listToTableDetail(item, rowIdxStart);
				itemIdx++;

				this.options.list[this.options.list.length] = item;
			}
		},

		_getList : function(mode) {
			this._tableToList();

			if (this.options.list.length == 0) {
				return this.options.list;
			}

			switch (mode) {
			case 'select':
				var list = [];
				list[0] = this.options.list[this.seletedRow.attr('w-ri')];
				return list;
				break;
			case 'change':
				var list = [];
				var checkName = this.head.find('[w-change_column]').attr('w-change_column');
				for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
					var item = this.options.list[i];
					if (item[checkName] != this.checkValueList[checkName][i]) {
						list.push(item);
					}
				}
				return list;
				break;
			case 'check':
				var list = [];
				var checkName = this.head.find('[w-check_column]').attr('w-check_column');
				for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
					var item = this.options.list[i];
					if (item[checkName] == '1') {
						list.push(item);
					}
				}
				return list;
				break;
			default:
				return this.options.list;
			}
		},

		getOptions: function () {
			this._tableToList();
			return {
				value: this.options.value,
				list: $.merge([], this.options.list)
			};
		}


	// setSum : function() {
	// this._setSum();
	// },

	// _select : function(value) {
	// var that = this;
	// if (value !== 'false' && this.options.list != null &&
	// this.options.list.length != 0) {
	// this.body.off('click').on('click', function(event) {
	// var target = event.target;
	// for (var i = 0; i < 10; i++) {
	// if (target.tagName == 'TR') {
	// that.body.children('tr.selected').removeClass('selected');
	// $(target).addClass('selected');
	// that.seletedRow = $(target);
	// break;
	// }
	// target = target.parentElement;
	// }
	// });
	// } else {
	// this.body.off('click');
	// }
	// },

	// _setRow : function(list) {
	// for (var i = 0; i < list.length; i++) {
	// var item = list[i];
	// if (item) {// datas exist
	//
	// switch (item['statusFlg']) {
	// case 'U':
	// this.seletedRow.addClass('changed');
	// break;
	// case 'D':
	// this.seletedRow.addClass('removed');
	// break;
	// case 'N':
	// this.seletedRow.removeClass('removed changed');
	// break;
	// }
	// var rowIdx = parseInt(item['ROW_ID']) - 1;
	// this._listToTableDetail(item, rowIdx);
	// }
	// }
	// },

	});

});