$(function() {
	/** ************************************************ */
	/* S: DExp */
	$.widget('we.weDExp', $.we.base, {

		_create : function() {
			var that = this;

			var html = '';
			html += '<div w-part="contW">';
			html += '  <div class="w-rel">';
			html += '    <ul w-part="cont"></ul>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="srchW">';
			html += '  <div class="w-rel">';
			html += '      <input w-part="srchKey"></input>';
			html += '      <button w-part="srchBtn"><span>検索</span></button>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="titleW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="title"></div>';
			html += '  </div>';
			html += '</div>';

			this.element.html(html);
			this.element.attr('w-base', 'DevBase01');

			this.title = that.element.find('[w-part=title]');
			this.cont = that.element.find('[w-part=cont]');

			this.cont.on("click", "li", function(event) {
				var fileNm = $(this).attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			});

			return true;
		},

		_init : function() {
			this._super();
			this._setTitle();

			return true;
		},

		_setList : function() {
			if (!this.options.list) {
				return false;
			}

			var html = "";
			for (var i = 0, iLen = this.options.list.length; i < iLen; i++) {
				var item = this.options.list[i];
				html += "<li w-key='" + item.id + "'>" + item.nm + "</li>";
			}

			this.cont.html(html);

			return true;
		},

		_setTitle : function() {
			if (!this.options.title) {
				return false;
			}

			this.title.html(this.options.title);

			return true;
		},

		_setNewFile : function(data) {
			this._setOpenFile(data);

			return true;
		},

		_setRenameFile : function(data) {
			var fileNm = data.fileNm;
			var fileNmOri = data.fileNmOri;

			var active = this.cont.children('li[w-key="' + fileNmOri + '"]');
			active.attr('w-key', fileNm);
			active.text(fileNm);

			return true;
		},

		_setDeleteFile : function(data) {
			var fileNm = data.fileNm;

			var active = this.cont.children('li[w-key="' + fileNm + '"]');
			active.remove();

			return true;
		},

		_setOpenFile : function(data) {
			var fileNm = data.fileNm;

			this.cont.children('li.w-active').removeClass('w-active');
			this.cont.children('li[w-key="' + fileNm + '"]').addClass('w-active');

			return true;
		},
	});
	/* E: DExp */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DBase02 */
	$.widget('we.weDBase02', $.we.base, {

		_create : function() {
			var that = this;

			var html = '';

			html += '<div w-part="contW">';
			html += '  <div class="w-rel">';
			html += '    <ul w-part="cont"></ul>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="srchW">';
			html += '  <div class="w-rel">';
			html += '      <input w-part="srchKey"></input>';
			html += '      <button w-part="srchBtn"><span>Search</span></button>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="titleW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="title"></div>';
			html += '  </div>';
			html += '</div>';

			this.element.html(html);
			this.element.attr('w-base', 'DBase02');

			this.title = that.element.find('[w-part=title]');
			this.cont = that.element.find('[w-part=cont]');

			return true;
		},

		_init : function() {
			this._super();
			this._setTitle();

			return true;
		},

		_setTitle : function() {
			this.title.html(this.options.title);

			return true;
		},

		_setNewFile : function(data) {
			this._setOpenFile(data);

			return true;
		},

		_setRenameFile : function(data) {
			var fileNm = data.fileNm;
			var fileNmOri = data.fileNmOri;

			this.cont.children('li[w-key="' + fileNmOri + '"]').attr('w-key', fileNm);

			return true;
		},

		_setDeleteFile : function(data) {
			var fileNm = data.fileNm;

			this.cont.children('li[w-key="' + fileNm + '"]').remove();

			return true;
		},

		_setOpenFile : function(data) {
			var fileNm = data.fileNm;

			this.cont.children('li.w-active').removeClass('w-active');
			if (this.cont.children('li[w-key="' + fileNm + '"]').length !== 1) {
				this._setOpenFileDetail(data);
			}
			this.cont.children('li[w-key="' + fileNm + '"]').addClass('w-active')

			return true;
		},

		_setOpenFileDetail : function(data) {

			return true;
		}
	});
	/* E: DBase02 */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DComp */
	$.widget('we.weDComp', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			this.cont.on("click", "li.w-active ul li", function(event) {
				that.cont.children('li.w-active').find('ul li.w-active').removeClass('w-active');
				var compType = $(this).addClass('w-active').attr('w-key');
				that.element.trigger('w-newComp', compType);
			});

			return true;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;

			var html = '';
			html += '<li w-key="' + fileNm + '">';
			html += '  <ul w-part="list">';
			html += '    <li w-key="Text">Text</li>';
			html += '    <li w-key="Label">Label</li>';
			html += '    <li w-key="Button">Button</li>';
			html += '    <li w-key="TextField">TextField</li>';
			html += '    <li w-key="SearchField">SearchField</li>';
			html += '    <li w-key="DateField">DateField</li>';
			html += '    <li w-key="ComboBox">ComboBox</li>';
			html += '    <li w-key="TextArea">TextArea</li>';
			// html += ' <li w-key="CheckButton">CheckButton</li>';
			// html += ' <li w-key="RadioButton">RadioButton</li>';
			// html += ' <li w-key="CheckGroup">CheckGroup</li>';
			// html += ' <li w-key="RadioGroup">RadioGroup</li>';
			html += ' <li w-key="Table">Table[under construction]</li>';
			html += '  </ul>';
			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setActiveComp : function(data) {
			this.cont.children('li.w-active').find('ul li.w-active').removeClass('w-active');

			return true;
		},
	});
	/* E: DComp */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DAttr */
	$.widget('we.weDAttr', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			this.cont.on("keyup", "li.w-active input", function(event) {
				if (event.keyCode == $.ui.keyCode.ENTER) {
					var $attr = $(this);
					var devIdx = $attr.attr('w-devIdx');
					var attrKey = $attr.attr('w-key');
					var attrValue = $attr.val();
					that.element.trigger('w-attrChanged', [ devIdx, attrKey, $attr.attr('w-keyType') === 'JSON' ? WE.F.JSONparse(attrValue) : attrValue ]);
				}
			}).on("focusout", "li.w-active input", function(event) {
				var $attr = $(this);
				var devIdx = $attr.attr('w-devIdx');
				var attrKey = $attr.attr('w-key');
				var attrValue = $attr.val();
				that.element.trigger('w-attrChanged', [ devIdx, attrKey, $attr.attr('w-keyType') === 'JSON' ? WE.F.JSONparse(attrValue) : attrValue ]);
			});

			return true;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;

			var html = '';
			html += '<li w-key="' + fileNm + '">';
			html += '    <table w-part="table">';
			html += '      <tr><td colspan="2" style="font-weight:bold;">TYPE</td></tr>';
			html += '      <tr style="display:none;"><td>type</td>              <td><input w-key="type"               w-keyType="String"  w-viewId="' + fileNm + '" readonly w-only=""/></td></tr>';
			html += '      <tr><td colspan="2" style="font-weight:bold;">STYLE</td></tr>';
			html += '      <tr style="display:none;"><td>left</td>             <td><input w-key="left"            w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>right</td>            <td><input w-key="right"           w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>top</td>              <td><input w-key="top"             w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>bottom</td>           <td><input w-key="bottom"          w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>width</td>            <td><input w-key="width"           w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>height</td>           <td><input w-key="height"          w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>marginLeft</td>       <td><input w-key="marginLeft"      w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>marginRight</td>      <td><input w-key="marginRight"     w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>marginTop</td>        <td><input w-key="marginTop"       w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>marginBottom</td>     <td><input w-key="marginBottom"    w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>paddingLeft</td>      <td><input w-key="paddingLeft"     w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>paddingRight</td>     <td><input w-key="paddingRight"    w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>paddingTop</td>       <td><input w-key="paddingTop"      w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>paddingBottom</td>    <td><input w-key="paddingBottom"   w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>horizontalAlign</td>  <td><input w-key="horizontalAlign" w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>verticalAlign</td>    <td><input w-key="verticalAlign"   w-keyType="Number" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr><td colspan="2" style="font-weight:bold;">PROPERTY</td></tr>';
			html += '      <tr style="display:none;"><td>id</td>               <td><input w-key="id"              w-keyType="String" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>auth</td>             <td><input w-key="auth"            w-keyType="String" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>value</td>            <td><input w-key="value"           w-keyType="String" w-viewId="' + fileNm + '" w-only=""/></td></tr>';
			html += '      <tr style="display:none;"><td>ime</td>              <td><input w-key="ime"             w-keyType="String" w-viewId="' + fileNm
					+ '" w-only="_Text__TextField__SearchField_"/></td></tr>';
			html += '      <tr style="display:none;"><td>keyField</td>         <td><input w-key="keyField"        w-keyType="String" w-viewId="' + fileNm
					+ '" w-only="_ComboBox__CheckGroup__RadioGroup_"/></td></tr>';
			html += '      <tr style="display:none;"><td>dataField</td>        <td><input w-key="dataField"       w-keyType="String" w-viewId="' + fileNm
					+ '" w-only="_ComboBox__CheckGroup__RadioGroup_"/></td></tr>';
			html += '      <tr style="display:none;"><td>list</td>             <td><input w-key="list"            w-keyType="JSON"   w-viewId="' + fileNm
					+ '" w-only="_ComboBox__CheckGroup__RadioGroup__Table_"/></td></tr>';
			html += '      <tr style="display:none;"><td>rowCnt</td>           <td><input w-key="rowCnt"          w-keyType="Number" w-viewId="' + fileNm + '" w-only="_Table_"/></td></tr>';
			html += '      <tr style="display:none;"><td>head</td>             <td><input w-key="head"            w-keyType="JSON"   w-viewId="' + fileNm + '" w-only="_Table_"/></td></tr>';
			html += '      <tr style="display:none;"><td>body</td>             <td><input w-key="body"            w-keyType="JSON"   w-viewId="' + fileNm + '" w-only="_Table_"/></td></tr>';
			html += '      <tr style="display:none;"><td>foot</td>             <td><input w-key="foot"            w-keyType="JSON"   w-viewId="' + fileNm + '" w-only="_Table_"/></td></tr>';
			html += '    </table>';
			html += '</li>';
			this.cont.prepend(html);
		},

		_setActiveComp : function(data) {
			var comp = data.comp;
			var options = WE.F.getInitOptions(comp);

			for ( var key in WE.C.CO_KEYS) {
				var $attr = this.cont.children('li.w-active').find('[w-key=' + key + ']');
				if ($attr.length === 1) {
					var type = options.type;

					if ($attr.attr('w-only') === '' || $attr.attr('w-only').indexOf('_' + type + '_') !== -1) {
						$attr.parent().parent().show();
					} else {
						$attr.parent().parent().hide();
					}

					if ($attr.attr('w-keyType') === 'JSON') {
						$attr.attr('w-devIdx', comp.attr('w-devIdx')).val(WE.F.JSONstringify(options[key]));
					} else {
						$attr.attr('w-devIdx', comp.attr('w-devIdx')).val(options[key] || '');
					}
				}
			}

			return true;
		},

		_setInactiveComp : function(data) {
			this.cont.children('li.w-active').find('[w-key]').val('').parent().parent().hide();

			return true;
		},

		_setRemoveComp : function(data) {
			this._setInactiveComp(data);

			return true;
		},

	});
	/* E: DAttr */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DEvt */
	$.widget('we.weDEvt', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			this.cont.on("click", "[w-part=list] button", function(event) {
				var btn = $(this);
				var btnNm = btn.text();
				var viewId = that.cont.find('li.w-active').attr('w-key').replace('.html', '');
				var targetId = btn.attr('w-target');
				var eventNm = btn.attr('w-event');
				var item = that.cont.find('li.w-active > [w-part=list] > li[w-event=' + eventNm + ']');
				var process = item.find('[w-part=process]').val();
				var compsType = item.find('[w-part=compsType]').val();

				var args = {
					evtViewId : viewId,
					evtCompId : targetId,
					evtEventNm : eventNm,
					evtProcess : process,
					evtCompsType : compsType
				};

				switch (btnNm) {
				case 'Add':
					that.element.trigger('w-newEvent', args);
					break;
				case 'Edit':
					that.element.trigger('w-editEvent', args);
					break;
				case 'Del':
					that.element.trigger('w-deleteEvent', args);
					break;
				case 'Link':
					that.element.trigger('w-linkEvent', args);
					break;
				}
			});

			return true;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;

			var html = '';
			html += '<li w-key="' + fileNm + '">';
			html += '  <ul w-part="list"></ul>';
			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setActiveComp : function(data) {
			var comp = data.comp;

			var list = this.cont.find('li.w-active > [w-part=list]');

			var html = '';

			var tabId = comp.attr('w-tabId');
			var viewId = comp.attr('w-viewId');
			var id = comp.attr('w-id');
			var realId = comp.attr('id');

			var devIdx = comp.attr('w-devIdx');

			var enableEvents = WE.F.getUsableEvents(comp);
			for ( var event in enableEvents) {
				html += '<li w-event="' + event + '">';

				html += '  <div w-part="event">' + event;
				html += ' 	 <button w-devIdx="' + devIdx + '" w-target="' + id + '" w-event="' + event + '">Add</button>';
				html += '  </div>';

				html += '</li>';
			}
			list.html(html);

			var eStr = comp.attr('w-event');
			var eMap = WE.F.JSONparse(eStr);

			for ( var event in eMap) {
				var eItem = eMap[event];

				var process = eItem['process'] || 'run';
				var compsType = eItem['compsType'] || 'all';
				var compsDetail = eItem['compsDetail'] || '';
				var datasType = eItem['datasType'];
				var datasDetail = eItem['datasDetail'] || '';// TODO

				var html = '';
				html += '  <div w-part="event">' + event;
				html += ' 	 <button w-target="' + id + '" w-event="' + event + '">Del</button>';
				html += ' 	 <button w-target="' + id + '" w-event="' + event + '">Edit</button>';
				html += '  </div>';

				html += '  <div w-part="detail">'
				html += '    <table w-part="table">';
				html += '      <tr>';
				html += '        <td>logic</td>';
				html += '      	 <td><button w-target="' + id + '" w-event="' + event + '">Link</button></td>';
				html += '      </tr>';
				html += '      <tr>';
				html += '        <td>process</td>';
				html += '      	 <td>';
				html += '          <select w-part="process">';
				html += '            <option value="run" ' + (process == 'run' ? 'selected="selected"' : '') + '>run</option>';
				html += '            <option value="check" ' + (process == 'check' ? 'selected="selected"' : '') + '>check</option>';
				html += '          </select>';
				html += '      	 </td>';
				html += '      </tr>';
				html += '      <tr>';
				html += '        <td>compsType</td>';
				html += '      	 <td>';
				html += '          <select w-part="compsType">';
				html += '            <option value="none"   ' + (compsType == 'none' ? 'selected="selected"' : '') + '>none</option>';
				html += '            <option value="this"   ' + (compsType == 'this' ? 'selected="selected"' : '') + '>this</option>';
				html += '            <option value="all"    ' + (compsType == 'all' ? 'selected="selected"' : '') + '>all</option>';
				html += '            <option value="custom" ' + (compsType == 'custom' ? 'selected="selected"' : '') + '>custom</option>';
				html += '          </select>';
				html += '      	 </td>';
				html += '      </tr>';
				html += '      <tr>';
				html += '        <td>compsDetail</td>';
				html += '      	 <td>';
				html += '          ' + compsDetail;
				html += '      	 </td>';
				html += '      </tr>';
				html += '      <tr>';
				html += '        <td>datasDetail</td>';
				html += '          ' + datasDetail;
				html += '      </tr>';
				html += '    </table>';
				html += '  </div>'

				list.find('[w-event=' + event + ']').html(html);
			}

			return true;
		},

		_setActiveNaviDetail : function(eItem) {
			var eventTarget = event.attr('w-target');
			var eventNm = event.attr('w-event');

			return html;
		},

		_setInactiveComp : function(data) {
			this.cont.children('li.w-active').children('[w-part=list]').html('');

			return true;
		},

		_setRemoveComp : function(data) {
			this._setInactiveComp(data);

			return true;
		},
	});
	/* E: DEvt */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DNavi */
	$.widget('we.weDNavi', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			this.cont.on("click", "li.w-active li", function(event) {
				var devIdx = $(this).attr('w-devIdx');
				that.element.trigger('w-activeComp', devIdx);
			});

			return true;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;

			var html = '';
			html += '<li w-key="' + fileNm + '">';
			html += '<ul w-part="list">';
			var comps = $(fileCont).find('div[w-type]');
			for (var i = 0, iLen = comps.length; i < iLen; i++) {
				var comp = $(comps[i]);
				html += "<li w-devIdx='" + i + "'>" + (comp.attr('w-id') || '') + ' | ' + comp.attr('w-type') + "</li>";
			}
			html += '</ul>';
			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setActiveComp : function(data) {
			var devIdx = data.devIdx;
			var comp = data.comp;

			var list = this.cont.children('li.w-active').find('[w-part=list]');
			list.children('li.w-active').removeClass('w-active');
			if (list.children('li[w-devIdx="' + devIdx + '"]').length != 1) {
				var html = "<li w-devIdx='" + devIdx + "'>" + (comp.attr('w-id') || '') + ' | ' + comp.attr('w-type') + "</li>";
				list.append(html);
			}

			list.children('li[w-devIdx="' + devIdx + '"]').addClass('w-active');
			this.cont.scrollTop(devIdx * 30);

			return true;
		},

		_setInactiveComp : function(data) {
			this.cont.children('li.w-active').find('li.w-active').removeClass('w-active');

			return true;
		},

		_setRemoveComp : function(data) {
			var devIdx = data.devIdx;

			this.cont.children('li.w-active').find('li[w-devIdx="' + devIdx + '"]').remove();

			return true;
		},

	});
	/* E: DNavi */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DViewRslt */
	$.widget('we.weDViewRslt', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			return true;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;

			var html = '';
			html += '<li w-key="' + fileNm + '">';
			html += '    <div w-part="pinW">';
			html += '        <textarea w-part="pin"></textarea>';
			html += '    </div>';
			html += '    <div w-part="pinTitle">INPUT</div>';
			html += '    <div w-part="potW">';
			html += '        <textarea w-part="pot"></textarea>';
			html += '    </div>';
			html += '    <div w-part="potTitle">OUTPUT</div>';
			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setDebug : function(data) {
			var pin = data.pin;
			var pot = data.pot;

			var pinComps = pin.comps;
			var potComps = pot.comps;

			var pinCompsTxt = '';
			for ( var key in pinComps) {
				pinCompsTxt += key + '\r\n';
				pinCompsTxt += '\t' + JSON.stringify(pinComps[key]) + '\r\n';
			}

			var potCompsTxt = '';
			for ( var key in potComps) {
				potCompsTxt += key + '\r\n';
				potCompsTxt += '\t' + JSON.stringify(potComps[key]) + '\r\n';
			}

			this.cont.children('li.w-active').find('[w-part=pin]').text(pinCompsTxt);
			this.cont.children('li.w-active').find('[w-part=pot]').text(potCompsTxt);
		}
	});
	/* E: DViewRslt */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DevSearchList */
	$.widget('we.weDevSearchList', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			return true;
		},

	});
	/* E: DevSearchList */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DApi */
	$.widget('we.weDApi', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			return true;
		},

		_apiList : [ {
			rtn : 'String',
			pkg : 'private.system.config',
			clas : 'Config',
			func : 'getPath',
			prms : 'path:String',
			desc : '相対パス取得',
			exam : 'cfg.getPath("config/Config.js")'
		}, {
			rtn : 'String',
			pkg : 'private.system.config',
			clas : 'Config',
			func : 'getPathAbs',
			prms : 'path:String',
			desc : '絶対パス取得',
			exam : 'cfg.getPathAbs("config/Config.js")'
		}, {
			rtn : 'Object',
			pkg : 'private.system.database',
			clas : 'Database',
			func : 'execute',
			prms : 'sqlFile:String, sqlPrm:Object',
			desc : 'ファイルを読み込んだSQL実行結果取得',
			exam : 'db.execute(cfg.getPathAbs("sql/Test.getUserId"),{prm01:01})'
		}, {
			rtn : 'Object',
			pkg : 'private.system.database',
			clas : 'Database',
			func : 'executeDirect',
			prms : 'sql:String',
			desc : 'SQL実行結果取得',
			exam : 'db.executeDirect("select a from b")'
		}, {
			rtn : 'void',
			pkg : 'private.system.database',
			clas : 'Database',
			func : 'commit',
			prms : '',
			desc : 'コミット',
			exam : 'db.commit()'
		}, {
			rtn : 'void',
			pkg : 'private.system.database',
			clas : 'Database',
			func : 'rollback',
			prms : '',
			desc : 'ロールバック',
			exam : 'db.rollback('
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'mkDir',
			stat : true,
			prms : 'targetDirPath:String',
			desc : 'フォルダー作成',
			exam : 'File.mkDir("test")'
		}, {
			rtn : 'Array',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'readDir',
			stat : true,
			prms : 'targetDirPath:String',
			desc : 'フォルダー読込',
			exam : 'File.readDir("test")'
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'copyDir',
			stat : true,
			prms : 'sourceDirPath:String, targetDirPath:String',
			desc : 'フォルダーコピ',
			exam : 'File.copyDir("test1", "test2")'
		}, {
			rtn : 'boolean',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'exists',
			stat : true,
			prms : 'targetFilePath:String',
			desc : 'ファイルの存在有無',
			exam : 'File.exists("test.txt")'
		}, {
			rtn : 'Sring',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'readFile',
			stat : true,
			prms : 'targetFilePath:String',
			desc : 'ファイル読込',
			exam : 'File.readFile("test.txt")'
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'writeFile',
			stat : true,
			prms : 'targetFilePath:String, data:String',
			desc : 'ファイル書込',
			exam : 'File.writeFile("test.txt", "This is test sentence.")'
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'copyFile',
			stat : true,
			prms : 'sourceFilePath:String, targetFilePath:String',
			desc : 'ファイルコピ',
			exam : 'File.copyFile("test1.txt", "test2.txt")'
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'renameFile',
			stat : true,
			prms : 'sourceFilePath:String, targetFilePath:String',
			desc : 'ファイル修正',
			exam : 'File.renameFile("test1.txt", "test2.txt")'
		}, {
			rtn : 'void',
			pkg : 'private.system.file',
			clas : 'File',
			func : 'deleteFile',
			stat : true,
			prms : 'targetFilePath:String',
			desc : 'ファイル削除',
			exam : 'File.deleteFile("test.txt")'
		}, {
			rtn : 'Object',
			pkg : 'private.system.message',
			clas : 'Message',
			func : 'get',
			prms : 'id:String, args:Object, err:Object',
			desc : 'メッセージ取得',
			exam : 'msg.get("SYSTEM.00001",{viewId:"TEST"})'
		}, {
			rtn : 'Transition',
			pkg : 'private.system.transition',
			clas : 'Transition',
			func : 'Transition[Constructor]',
			prms : 'viewId:String, meth:String',
			desc : '画面遷移客体生成',
			exam : 'tran = new Transition("TEST", Transition.METH_OPEN)'
		}, {
			rtn : 'Object',
			pkg : 'private.system.vo',
			clas : 'Pin',
			func : 'getComp',
			prms : 'id:String',
			desc : '部品情報取得（value,list...）',
			exam : 'pin.getComp("compId")'
		}, {
			rtn : 'Object',
			pkg : 'private.system.vo',
			clas : 'Pin',
			func : 'getData',
			prms : 'id:String',
			desc : 'データ情報取得',
			exam : 'pin.getData("dataKey")'
		}, {
			rtn : 'void',
			pkg : 'private.system.vo',
			clas : 'Pot',
			func : 'setComp',
			prms : 'id:String, comp:Object',
			desc : '部品情報設定',
			exam : 'pot.setComp("compId", {value:"123", list:[]})'
		}, {
			rtn : 'void',
			pkg : 'private.system.vo',
			clas : 'Pot',
			func : 'setCompDirect',
			prms : 'id:String, comp:Object',
			desc : '部品情報設定(tabId,viewIdが自動設定されない)',
			exam : 'pot.setComp("tabId_viewId_compId", {value:"123", list:[]})'
		}, {
			rtn : 'void',
			pkg : 'private.system.vo',
			clas : 'Pot',
			func : 'setData',
			prms : 'id:String, data:Object',
			desc : 'データ情報設定',
			exam : 'pot.setData("dataKey",{data01:"01", data02:"02"})'
		}, {
			rtn : 'void',
			pkg : 'private.system.vo',
			clas : 'Pot',
			func : 'setTran',
			prms : 'tran:Transition',
			desc : '画面遷移情報設定',
			exam : 'pot.setTran(new Transition(...))'
		}, {
			rtn : 'void',
			pkg : 'private.system.vo',
			clas : 'Pot',
			func : 'setMessage',
			prms : 'obj:Message',
			desc : 'メッセージ情報設定',
			exam : 'pot.setMessage(msg.get(...))'
		} ],

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;

			var html = '';
			html += '<li w-key="' + fileNm + '">';

			html += '<ul w-part="apiList">';
			var apiList = this._apiList;
			for (var i = 0, iLen = apiList.length; i < iLen; i++) {
				var apiItem = apiList[i];
				html += '<li w-part="apiItem">'
				html += '  <div w-part="func">';
				html += '    <div w-part="rtn">';
				html += '    ' + apiItem.rtn;
				html += '    </div>';
				if (apiItem.stat) {
					html += '    <div w-part="stat">';
					html += '      static';
					html += '    </div>';
				}
				html += '    <div w-part="full">';
				html += '    ' + apiItem.pkg + '.' + apiItem.clas + '.' + apiItem.func;
				html += '    </div>';
				html += '    <div w-part="prms">';
				html += '      ' + '( ' + apiItem.prms + ' )';
				html += '    </div>';
				html += '  </div>';
				html += '  <div w-part="desc">';
				html += '    ' + apiItem.desc + ' ';
				html += '  </div>';
				html += '  <div w-part="exam">';
				html += '    ' + apiItem.exam + ' ';
				html += '  </div>';
				html += '</li>';
			}
			html += '</ul>';

			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

	});
	/* E: DApi */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DSqlRslt */
	$.widget('we.weDSqlRslt', $.we.weDBase02, {

		_create : function() {
			var that = this;
			this._super();

			var html = '';
			html += '<div class="w-content w-abs">';
			html += '  <div class="w-rel">';
			html += '    <div class="w-cnsl w-abs">';
			html += '      <div class="w-rel">';
			html += '        <ul style="height:100%;"></ul>';
			html += '      </div>';
			html += '    </div>';
			html += '    <div class="w-btns w-abs">';
			html += '      <div class="w-rel">';
			html += '          <button class="w-executeBtn"><span>Execute</span></button>';
			html += '          <button class="w-clearBtn"><span>Clear</span></button>';
			html += '      </div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';
			html += '<div class="w-title w-abs">';
			html += '  <div class="w-rel">';
			html += '    <div></div>';
			html += '  </div>';
			html += '</div>';
			this.element.html(html);

			this.title = that.element.find('div.w-title > div > div');
			this.executeBtn = that.element.find('div.w-btns > div > button.w-executeBtn');
			this.clearBtn = that.element.find('div.w-btns > div > button.w-clearBtn');
			this.cnsl = that.element.find('div.w-cnsl > div > ul');

			this.executeBtn.on('click', function(event) {
				that.element.trigger('w-executeFile');
			});
			this.clearBtn.on('click', function(event) {
				that.cnsl.children('li.w-active').html('');
			});
			return true;
		},

		_setRenameFile : function(data) {
			var fileNmOri = data.fileNmOri;
			var fileNm = data.fileNm;

			var active = this.cnsl.children('li[w-key="' + fileNmOri + '"]');
			if (active.length === 1) {
				active.attr('w-key', fileNm);
			}

			return true;
		},

		_setDeleteFile : function(data) {
			this._setCloseFile(data);

			return true;
		},

		_setSaveFile : function(data) {

			return true;
		},

		_setOpenFile : function(data) {
			var fileNm = data.fileNm;

			this.cnsl.children('li.w-active').removeClass('w-active');

			if (this.cnsl.children('li[w-key="' + fileNm + '"]').length !== 1) {
				var html = '';
				html += '<li w-key="' + fileNm + '">';
				html += '</li>';
				this.cnsl.append(html);
			}

			this.cnsl.children('li[w-key="' + fileNm + '"]').addClass('w-active');

			return true;
		},

		_setCloseFile : function(data) {
			var fileNm = data.fileNm;

			this.cnsl.children('li[w-key="' + fileNm + '"]').remove();

			return true;
		},

		_setWriteLog : function() {
			var fileNm = this.options.writeLog.fileNm;
			var execRslt = this.options.writeLog.executeResult;

			this.cnsl.children('li[w-key="' + fileNm + '"]').append(this._createRsltHtml(execRslt));

			return true;
		},

		_createRsltHtml : function(executeResult) {
			var msg = executeResult.message;
			var list = executeResult.list;
			var html = '';
			html += '<div>';
			html += '<div class="w-time">';
			html += new Date();
			html += '</div>';
			html += '<div class="w-rslt">';
			html += msg + '<br/>';
			if (list) {
				if (list[0]) {
					html += '<table>';
					var item = list[0];
					var itemKeys = Object.keys(item);

					html += '<thead>';
					html += '<tr>';
					for (var i = 0, iLen = itemKeys.length; i < iLen; i++) {
						var itemKey = itemKeys[i];
						html += '<th>' + itemKey + '</th>';

					}
					html += '</tr>';
					html += '</thead>';

					html += '<tbody>';
					for (var i = 0, iLen = list.length; i < iLen; i++) {
						html += '<tr>';
						var item = list[i];
						for ( var key in item) {
							html += '<td>' + item[key] + '</td>';
						}
						html += '</tr>';
					}
					html += '</tbody>';

					html += '</table>';
				}
			}
			html += '</div>';
			html += '</div>';

			return html;
		}

	});
	/* E: DSqlRslt */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DBase03 */
	$.widget('we.weDBase03', $.we.base, {

		_create : function() {
			var that = this;
			this._super();

			var html = '';

			html += '<div w-part="contW">';
			html += '  <div class="w-rel">';
			html += '    <ul w-part="cont"></ul>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="ddlW">';
			html += '  <div class="w-rel">';
			html += '    <ul w-part="ddl"></ul>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="tabW">';
			html += '  <div class="w-rel">';
			html += '    <ul w-part="tab"></ul>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="btnW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="btn"></div>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="titleW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="title"></div>';
			html += '  </div>';
			html += '</div>';

			this.element.html(html);
			this.element.attr('w-base', 'DBase03');

			this.title = this.element.find('[w-part=title]');
			this.btn = this.element.find('[w-part=btn]');
			this.tab = this.element.find('[w-part=tab]');
			this.ddlW = this.element.find('[w-part=ddlW]');
			this.ddl = this.element.find('[w-part=ddl]');
			// this.contBg = this.element.find('[w-part=contBg]');
			this.cont = this.element.find('[w-part=cont]');

			return true;
		},

		_init : function() {
			this._super();
			this._setTitle();

			return true;
		},

		_setTitle : function() {
			if (!this.options.title) {
				return false;
			}

			this.title.html(this.options.title);

			return true;
		},

		_setNewFile : function(data) {
			this._setOpenFile(data);

			return true;
		},

		_setRenameFile : function(data) {
			var fileNm = data.fileNm;
			var menuNm = data.menuNm;

			this.tab.children('li[w-key="' + fileNm + '"]').attr('w-key', fileNm).children('div.w-name').text(menuNm);

			this.ddl.children('li[w-key="' + fileNm + '"]').attr('w-key', fileNm).text(menuNm);
			this.ddlW.css('display', 'none');

			this.cont.children('li[w-key="' + fileNm + '"]').attr('w-key', fileNm);

			return true;
		},

		_setDeleteFile : function(data) {
			this._setCloseFile(data);

			return true;
		},

		_setSaveFile : function(data) {
			var fileNm = data.fileNm;

			this.tab.children('li[w-key="' + fileNm + '"]').removeClass('w-changed');

			this.ddlW.css('display', 'none');

			return true;
		},

		_setOpenFile : function(data) {
			var fileNm = data.fileNm;
			var menuNm = data.menuNm || fileNm;
			var fileCont = data.fileCont;
			var html;
			var goFirst = false;

			this.tab.children('li.w-active').removeClass('w-active');
			if (this.tab.find('li[w-key="' + fileNm + '"]').length !== 1) {
				html = '';
				html += '<li w-key="' + fileNm + '">';
				html += '  <div class="w-name">' + menuNm + '</div>';
				html += '  <div class="w-close"></div>';
				html += '</li>';
				this.tab.prepend(html);
			} else {
				goFirst = (this.tab.find('li[w-key="' + fileNm + '"]').position().top !== 0);
			}
			if (goFirst) {
				this.tab.children("li:first-child").before(this.tab.children('li[w-key="' + fileNm + '"]'));
			}
			this.tab.children('li[w-key="' + fileNm + '"]').addClass('w-active');

			this.ddl.children('li.w-active').removeClass('w-active');
			if (this.ddl.find('li[w-key="' + fileNm + '"]').length !== 1) {
				html = '';
				html += '<li w-key="' + fileNm + '">' + menuNm + '</li>';
				this.ddl.prepend(html);
			}
			if (goFirst) {
				this.ddl.children("li:first-child").before(this.ddl.children('li[w-key="' + fileNm + '"]'));
			}
			this.ddl.children('li[w-key="' + fileNm + '"]').addClass('w-active');
			this.ddlW.css('display', 'none');

			this.cont.children('li.w-active').removeClass('w-active');
			if (this.cont.children('li[w-key="' + fileNm + '"]').length !== 1) {
				this._setOpenFileDetail(data);
			}
			if (goFirst) {
				this.cont.children("li:first-child").before(this.cont.children('li[w-key="' + fileNm + '"]'));
			}
			this.cont.children('li[w-key="' + fileNm + '"]').addClass('w-active')

			this._setOpenFileEnd(data);

			return true;
		},

		_setOpenFileDetail : function(data) {
			return true;
		},

		_setOpenFileEnd : function(data) {
			return true;
		},

		_setCloseFile : function(data) {
			var fileNm = data.fileNm;

			this.tab.children('li[w-key="' + fileNm + '"]').remove();

			this.ddl.children('li[w-key="' + fileNm + '"]').remove();
			this.ddlW.css('display', 'none');

			this.cont.children('li[w-key="' + fileNm + '"]').remove();

			return true;
		},

		_getFileNm : function() {
			var act = this.cont.find('li.w-active');
			return act.length === 1 ? act.attr('w-key') : '';
		},

	});
	/* E: DBase03 */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DView */
	$.widget('we.weDView', $.we.weDBase03, {

		_create : function() {
			var that = this;
			this._super();

			var html = '';
			html += '<div w-part="viewTypeW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="viewTypeTitle">view type:</div>';
			html += '    <select w-part="viewType">';
			html += '      <option value="w-view">view</option>';
			html += '      <option value="w-popup">popup</option>';
			html += '    </select>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="gridW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="gridTitle">grid size:</div>';
			html += '    <select w-part="grid">';
			for (var i = 10; i <= 100; i += 10) {
				html += '  <option value="' + i + '">' + i + '</option>';
			}
			html += '    </select>';
			html += '  </div>';
			html += '</div>';

			html += '<div w-part="layoutW">';
			html += '  <div class="w-rel">';
			html += '    <div w-part="layoutWidthTitle">width:</div>';
			html += '    <input w-part="layoutWidth" value="1024"></input>';
			html += '    <div w-part="layoutHeightTitle">height:</div>';
			html += '    <input w-part="layoutHeight" value="768"></input>';
			html += '  </div>';
			html += '</div>';

			html += '<div class="w-dev w-abs">';
			html += '  <div class="w-rel">';
			html += '    <div class="w-on">Develop Mode</div>';
			html += '    <div class="w-off">Running Mode</div>';
			html += '  </div>';
			html += '</div>';
			this.element.append(html);

			this.viewType = this.element.find('[w-part=viewType]');
			this.grid = this.element.find('[w-part=grid]');
			this.layoutWidth = this.element.find('[w-part=layoutWidth]');
			this.layoutHeight = this.element.find('[w-part=layoutHeight]');
			this.devOn = this.element.find('div.w-dev > div > .w-on');
			this.devOff = this.element.find('div.w-dev > div > .w-off');

			this._bind();

			return true;
		},

		_bind : function() {
			var that = this;

			this.viewType.on('change', function(event) {
				// that.contBg.attr('w-grid', $(this).val());
				that.cont.find('li.w-active .w-view, li.w-active .w-popup').removeClass().addClass($(this).val());
			});

			this.grid.on('change', function(event) {
				// that.contBg.attr('w-grid', $(this).val());
				that.cont.find('li.w-active').attr('w-grid', $(this).val());
			});
			// this.contBg.attr('w-grid', 10);

			this.layoutWidth.on('keyup', function(event) {
				that.cont.find('li.w-active .w-view, li.w-active .w-popup').css('width', that.layoutWidth.val() + 'px');
			});

			this.layoutHeight.on('keyup', function(event) {
				that.cont.find('li.w-active .w-view, li.w-active .w-popup').css('height', that.layoutHeight.val() + 'px');
			});
			// that.contBg.css({
			// width : '1024px',
			// height : '768px'
			// });
			this.devOn.on('click', function(event) {
				that.devOn.hide();
				that.devOff.show();
				that.cont.find('li.w-active').attr('w-grid', '');
				WE.F.setOptionAll(that.cont.children('li'), 'dev', '');
				that.element.trigger('w-changeRunningMode');
			});
			this.devOff.on('click', function(event) {
				that.devOff.hide();
				that.devOn.show();
				that.grid.trigger('change');
				WE.F.setOptionAll(that.cont.children('li'), 'dev', WE.C.CD_ENABLE);
				that.element.trigger('w-changeDevelopMode');
			});

			this.btn.on('click', function(event) {
				if (that.tab.children('li').length === 0) {
					that.ddlW.css('display', 'none');
				} else {
					that.ddlW.css('display', that.ddlW.css('display') === 'none' ? 'block' : 'none');
				}
			})

			this.tab.on('click', 'div.w-name', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			}).on('click', 'div.w-close', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-closeFile', {
					fileNm : fileNm
				});
			});

			this.ddlW.on('click', function(event) {
				$(this).css('display', 'none');
			});
			this.ddl.on('click', 'li', function(event) {
				var fileNm = $(this).attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			});

			this.cont.on('focus', 'li *', function(event) {
			}).on('keyup', 'li *', function(event) {
			}).on('focusout', 'li *', function(event) {
			}).on('click', '.w-view, .w-popup', function(event) {
				var comp = $(event.target);
				if (!comp.hasClass('w-view') && !comp.hasClass('w-popup')) {
					return;
				}
				if (that.newCompType) {
					var actView = that.cont.children('li.w-active').find('.w-view, .w-popup');
					var tabId = actView.attr('w-tabId');
					var viewId = actView.attr('w-viewId');
					var maxNaviIdx = parseInt(that.cont.children('li.w-active').find('.w-new [w-devIdx]:last').attr('w-devIdx') || -1) + 1;
					var html = ''
					html += '<div w-type="' + that.newCompType + '" w-left="' + event.offsetX + '" w-top="' + event.offsetY + '"'
					html += 'w-id="" w-auth="enable" w-value=""';
					html += 'w-tabId="' + tabId + '"';
					html += 'w-viewId="' + viewId + '"';
					html += 'id="' + tabId + '_' + viewId + '_' + '' + '"';
					html += 'w-devIdx="' + maxNaviIdx + '"></div>';
					WE.F.init($(html).appendTo(that.cont.children('li.w-active').find('.w-view, .w-popup')));
					that.newCompType = null;
					that.element.trigger('w-activeComp', maxNaviIdx);
					return;
				}
				that.element.trigger('w-inactiveComp');
			}).on('w-devSelect', function(event) {
				var comp = $(event.target);
				var devIdx = comp.attr('w-devIdx');
				that.element.trigger('w-activeComp', devIdx);
			}).on('w-devDelete', function(event) {
				var comp = $(event.target);
				var devIdx = comp.attr('w-devIdx');
				that.element.trigger('w-removeComp', devIdx);
			}).on('w-devMoved', function(event) {
				var comp = $(event.target);
				var devIdx = comp.attr('w-devIdx');
				that.element.trigger('w-compMoved', devIdx);
			})

			return true;
		},

		_getGridHtml : function(value) {
			var html = '';
			return html;
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;
			var html;

			html = '';
			html += '<li w-key="' + fileNm + '" w-grid="10">';
			// TODO w-old
			html += ' <div class="w-new w-abs">' + fileCont.trim() + '</div>';
			html += '</li>';
			this.cont.prepend(html);

			var tabId = 'D';
			var viewId = fileNm;
			var $view = this.cont.children('li[w-key="' + fileNm + '"]').find('.w-view, .w-popup');

			$view.attr({
				"w-tabId" : tabId,
				"w-viewId" : viewId,
				"id" : 'BASE_' + tabId + "_" + viewId
			});
			$view.find("div[w-type]").each(function(index, element) {
				$(element).attr({
					"w-tabId" : tabId,
					"w-viewId" : viewId,
					"id" : tabId + "_" + viewId + "_" + $(element).attr("w-id")
				});
			});
			WE.F.initAll($view);
			this.element.trigger(viewId, [ tabId, viewId ]);

			return true;
		},

		_setOpenFileEnd : function(data) {
			var fileNm = data.fileNm;

			var $li = this.cont.children('li[w-key="' + fileNm + '"]');
			this.grid.val($li.attr('w-grid'));

			var $view = $li.find('.w-view ,.w-popup');
			this.viewType.val($view.hasClass('w-view') ? 'w-view' : 'w-popup');

			this.layoutWidth.val($view.css('width').replace('px', ''));
			this.layoutHeight.val($view.css('height').replace('px', ''));

			var comps = $view.find('div[w-type]');
			for (var i = 0, iLen = comps.length; i < iLen; i++) {
				var comp = $(comps[i]);

				if (this.devOn.is(":visible")) {
					comp.attr({
						'w-devIdx' : i,
						'w-dev' : 'enable'
					});
				} else {
					comp.attr({
						'w-devIdx' : i,
					});
				}
			}

			return true;
		},

		_setActiveComp : function(data) {
			var devIdx = data.devIdx;

			this._setInactiveComp(data);
			WE.F.setOption(this.cont.children('li.w-active').find('div[w-devIdx=' + devIdx + ']'), 'dev', WE.C.CD_ACTIVE);

			return true;
		},

		_setInactiveComp : function(data) {
			WE.F.setOption(this.cont.children('li.w-active').find('div[w-type][w-dev=active]'), 'dev', WE.C.CD_ENABLE);

			return true;
		},

		_setRemoveComp : function(data) {
			var devIdx = data.devIdx;

			this.cont.children('li.w-active').find('div[w-devIdx=' + devIdx + ']').remove();

			return true;
		},

		_setCompMoved : function(data) {
			var devIdx = data.devIdx;

			var comp = this.cont.children('li.w-active').find('div[w-devIdx=' + devIdx + ']');

			comp.attr({
				'w-left' : comp.position().left,
				'w-top' : comp.position().top
			});

			return true;
		},

		_setNewComp : function(data) {
			this.newCompType = data.compType;
		},

		_setAddEvent : function(data) {
			var id = data.evtCompId;
			var event = data.evtEventNm;
			var process = data.evtProcess || 'run';
			var compsType = data.evtCompsType || 'all';
			var compsDetail = data.evtCompsDetail || '';
			var datasType = data.evtDatasType || '';
			var datasDetail = data.evtDatasDetail || '';

			var active = this.cont.find('li.w-active');
			var view = active.find('.w-view, .w-popup');

			var comp = view.find('[w-id=' + id + ']');
			var eStr = comp.attr('w-event');
			var eMap = WE.F.JSONparse(eStr, {});

			eMap[event] = {};
			if (process !== '') {
				eMap[event].process = process;
			}
			if (compsType !== '') {
				eMap[event].compsType = compsType;
			}
			if (compsDetail !== '') {
				eMap[event].compsDetail = compsDetail;
			}
			if (datasType !== '') {
				eMap[event].datasType = datasType;
			}
			if (datasDetail !== '') {
				eMap[event].datasDetail = datasDetail;
			}

			eStr = WE.F.JSONstringify(eMap);
			comp.attr('w-event', eStr);

			WE.F.initEvent(comp);

			var devIdx = comp.attr('w-devIdx');
			this.element.trigger('w-activeComp', devIdx);

			return true;
		},

		_setEditEvent : function(data) {
			var id = data.evtCompId;
			var event = data.evtEventNm;
			var process = data.evtProcess || 'run';
			var compsType = data.evtCompsType || 'all';
			var compsDetail = data.evtCompsDetail || '';
			var datasType = data.evtDatasType || '';
			var datasDetail = data.evtDatasDetail || '';

			var active = this.cont.find('li.w-active');
			var view = active.find('.w-view, .w-popup');

			var comp = view.find('[w-id=' + id + ']');
			var eStr = comp.attr('w-event');
			var eMap = WE.F.JSONparse(eStr, {});

			eMap[event] = {};
			if (process !== '') {
				eMap[event].process = process;
			}
			if (compsType !== '') {
				eMap[event].compsType = compsType;
			}
			if (compsDetail !== '') {
				eMap[event].compsDetail = compsDetail;
			}
			if (datasType !== '') {
				eMap[event].datasType = datasType;
			}
			if (datasDetail !== '') {
				eMap[event].datasDetail = datasDetail;
			}

			eStr = WE.F.JSONstringify(eMap);
			comp.attr('w-event', eStr);

			WE.F.initEvent(comp);

			var devIdx = comp.attr('w-devIdx');
			this.element.trigger('w-activeComp', devIdx);

			return true;
		},

		_setDeleteEvent : function(data) {
			var id = data.evtCompId;
			var event = data.evtEventNm;
			var process = data.evtProcess;
			var compsType = data.evtCompsType;
			var compsDetail = data.evtCompsDetail;
			var datasType = data.evtDatasType;
			var datasDetail = data.evtDatasDetail;

			var active = this.cont.find('li.w-active');
			var view = active.find('.w-view, .w-popup');

			var comp = view.find('[w-id=' + id + ']');
			var eStr = comp.attr('w-event');
			var eMap = WE.F.JSONparse(eStr, {});

			delete eMap[event];

			eStr = WE.F.JSONstringify(eMap);
			comp.attr('w-event', eStr);
			comp.off('w-' + event);

			var devIdx = comp.attr('w-devIdx');
			this.element.trigger('w-activeComp', devIdx);

			return true;
		},

		_getFileCont : function() {
			var cont = '';
			cont += '<!DOCTYPE html>\r\n';
			cont += '<html xmlns="http://www.w3.org/1999/xhtml">\r\n';
			cont += '\t<head>\r\n';
			cont += '\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n';
			cont += '\t\t<title></title>\r\n';
			cont += '\t</head>\r\n';
			cont += '\t<body>\r\n\r\n';

			var $view = this.cont.find('li.w-active').find('.w-view, .w-popup');

			cont += '\t\t<div'
			cont += ' class="' + ($view.hasClass('w-view') ? 'w-view' : 'w-popup') + '"';
			cont += ' style="width:' + this.layoutWidth.val() + 'px; height:' + this.layoutHeight.val() + 'px;"';
			cont += '>\r\n\r\n';

			var comps = $view.children('[w-type]');

			for (var i = 0, iLen = comps.length; i < iLen; i++) {
				var comp = $(comps[i]);
				cont += WE.F.getHtml(comp) + '\r\n\r\n';
			}

			// var events = $view.children('[w-event]');
			//
			// for (var i = 0, iLen = events.length; i < iLen; i++) {
			// var event = $(events[i]);
			// cont += this._getEventHtml(event) + '\r\n\r\n';
			// }

			cont += '\t\t</div>\r\n\r\n';
			cont += '\t</body>\r\n';
			cont += '</html>';

			return cont;
		},

		_htmlStep : [ [ 'event' ], [ 'target', 'process' ], [ 'compsType', 'compsDetail', 'datasDetail' ] ],

		_getEventHtml : function(event) {
			var html = '';

			var step = this._htmlStep;

			html += '<div\r\n'
			for (var i = 0, iLen = step.length; i < iLen; i++) {
				var root = step[i];
				for (var j = 0, jLen = root.length; j < jLen; j++) {
					var attrKey = 'w-' + root[j];
					html += attrKey + '="' + (event.attr(attrKey) || '') + '" ';
				}
				html += '\r\n';
			}
			html += '></div>'

			return html;
		}

	});
	/* E: DView */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DCtrl */
	$.widget('we.weDCtrl', $.we.weDBase03, {

		options : {
			mode : 'javascript'
		},

		_create : function() {
			var that = this;
			this._super();

			this.storage = {};

			this._bind();
		},

		_bind : function() {
			var that = this;

			this.btn.on('click', function(event) {
				if (that.tab.children('li').length === 0) {
					that.ddlW.css('display', 'none');
				} else {
					that.ddlW.css('display', that.ddlW.css('display') === 'none' ? 'block' : 'none');
				}
			})

			this.tab.on('click', 'div.w-name', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			}).on('click', 'div.w-close', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-closeFile', {
					fileNm : fileNm
				});
			});

			this.ddlW.on('click', function(event) {
				$(this).css('display', 'none');
			});
			this.ddl.on('click', 'li', function(event) {
				var fileNm = $(this).attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			});
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;
			var html;

			html = '';
			html += '<li w-key="' + fileNm + '">';
			html += ' <div w-part="new"></div>';
			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setSaveFile : function(data) {
			this._super(data);

			var fileNm = data.fileNm;
			var myCM = this.storage[fileNm];

			myCM.clearHistory();

			return true;
		},

		_setOpenFileEnd : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;
			var that = this;

			if (!this.storage[fileNm]) {
				var myCM = this.storage[fileNm] = CodeMirror(this.cont.find('li.w-active [w-part="new"]')[0], {
					mode : this.options.mode,
					lineNumbers : true,
					indentUnit : 4,
					indentWithTabs : true,
					matchBrackets : true,
					autofocus : true,
					value : fileCont.trim()
				});
				myCM.on('change', function(instance, changes) {
					if (myCM.historySize().undo === 0) {
						that.tab.children('li.w-active').removeClass('w-changed');
					} else {
						that.tab.children('li.w-active').addClass('w-changed');
					}
				});
			}

			return true;
		},

		_setCloseFile : function(data) {
			this._super(data);

			var fileNm = data.fileNm;

			delete this.storage[fileNm];

			return true;
		},

		_getFileCont : function() {
			var fileNm = this.cont.find('li.w-active').attr('w-key');
			var myCM = this.storage[fileNm];
			myCM.execCommand('selectAll');
			myCM.execCommand('indentAuto');

			return myCM.getValue();
		},

	});
	/* E: DCtrl */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DSql */
	$.widget('we.weDSql', $.we.weDCtrl, {
		options : {
			mode : 'text/x-mysql'
		},
	});
	/* E: DSql */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DRep */
	$.widget('we.weDRep', $.we.weDBase03, {

		_create : function() {
			var that = this;
			this._super();
			this._bind();

			this.storage = {};
			this.tblMap = {};
		},

		_bind : function() {
			var that = this;

			this.tab.on('click', 'div.w-name', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			}).on('click', 'div.w-close', function(event) {
				var fileNm = $(this).parent().attr('w-key');
				that.element.trigger('w-closeFile', {
					fileNm : fileNm
				});
			});

			this.ddlW.on('click', function(event) {
				$(this).css('display', 'none');
			});
			this.ddl.on('click', 'li', function(event) {
				var fileNm = $(this).attr('w-key');
				that.element.trigger('w-openFile', {
					fileNm : fileNm
				});
			});

			this.tcTblChange = function($this) {
				var tblNm = $this.attr('w-tblNm');
				var checked = $this.prop('checked');

				that.cont.find('li.w-active [w-part=tcCol] > li > div > input[w-tblNm=' + tblNm + ']').prop('disabled', !checked);
				var tblMap = that.tblMap[that.cont.find('li.w-active').attr('w-key')];
				if (tblMap && tblMap[tblNm]) {

					tblMap[tblNm]._selected = checked;

					var $fm = that.cont.find('li.w-active [w-part=fm] thead');
					$.each($fm.find('[w-part=fmTbl]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();

						var html = '';
						html += that._htmlTable();
						$this.html(html);
						$this.val(val);
						// $this.trigger('change');
					});

					var $fr = that.cont.find('li.w-active [w-part=fr] tbody');
					$.each($fr.find('[w-part=frTbl]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();

						var html = '';
						html += that._htmlTable();
						$this.html(html);
						$this.val(val);
						// $this.trigger('change');
					});
				}
			};

			this.tcColChange = function($this) {
				var tblNm = $this.attr('w-tblNm');
				var colNm = $this.attr('w-colNm');
				var checked = $this.prop('checked');

				var tblMap = that.tblMap[that.cont.find('li.w-active').attr('w-key')];
				if (tblMap && tblMap[tblNm] && tblMap[tblNm].colMap) {
					tblMap[tblNm].colMap[colNm]._selected = checked;

					var $se = that.cont.find('li.w-active [w-part=se] tbody');
					$.each($se.find('[w-part=seCol]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();

						var html = '';
						html += that._htmlColumn();
						$this.html(html);
						$this.val(val);
					});

					var $fr = that.cont.find('li.w-active [w-part=fr] tbody');
					$.each($fr.find('[w-part=frColL], [w-part=frColR]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();
						var tblNm = $this.find(':checked').attr('w-tblNm');

						var html = '';
						html += that._htmlColumn();
						$this.html(html);
						$this.val(val);
					});

					var $wh = that.cont.find('li.w-active [w-part=wh] tbody');
					$.each($wh.find('[w-part=whColL], [w-part=whColR]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();

						var html = '';
						html += that._htmlColumn();
						$this.html(html);
						$this.val(val);
					});

					var $or = that.cont.find('li.w-active [w-part=or] tbody');
					$.each($or.find('[w-part=orCol]'), function(index, value) {
						var $this = $(this);
						var val = $this.val();

						var html = '';
						html += that._htmlColumn();
						$this.html(html);
						$this.val(val);
						$this.trigger('change');
					});
				}
			}

			this.cont.off('click change');

			this.cont.on('click', 'li.w-active [w-part=tcTbl] > li > div > span', function(event) {
				var $this = $(this);
				var tblNm = $this.attr('w-tblNm');

				var $cols = that.cont.find('li.w-active [w-part=tcCol][w-tblNm=' + tblNm + ']');
				if ($cols.is(':visible')) {
					$cols.hide();
					$this.text('+');
				} else {
					$cols.show();
					$this.text('-');
				}
			}).on('change', 'li.w-active [w-part=tcTbl] > li > div > input', function(event) {
				var $this = $(this);
				that.tcTblChange($this);
			}).on('change', 'li.w-active [w-part=tcCol] > li > div > input', function(event) {
				var $this = $(this);
				that.tcColChange($this);
			});

			this.cont.on('click', 'li.w-active [w-part=deAdd]', function(event) {
				that._deAdd_click($(this));
			}).on('click', 'li.w-active [w-part=deDel]', function(event) {
				that._deDel_click($(this));
			}).on('click', 'li.w-active [w-part=deUp]', function(event) {
				that._deUp_click($(this));
			}).on('click', 'li.w-active [w-part=deDown]', function(event) {
				that._deDown_click($(this));
			}).on('change', 'li.w-active [w-part=deValTp]', function(event) {
				that._deValTp_change($(this));
			});

			this.cont.on('click', 'li.w-active [w-part=seAdd]', function(event) {
				that._seAdd_click($(this));
			}).on('click', 'li.w-active [w-part=seDel]', function(event) {
				that._seDel_click($(this));
			}).on('click', 'li.w-active [w-part=seUp]', function(event) {
				that._seUp_click($(this));
			}).on('click', 'li.w-active [w-part=seDown]', function(event) {
				that._seDown_click($(this));
			}).on('change', 'li.w-active [w-part=seUseCus]', function(event) {
				that._seUseCus_change($(this));
			}).on('change', 'li.w-active [w-part=seCol]', function(event) {
				that._seCol_change($(this));
			});
			this.cont.on('click', 'li.w-active [w-part=frAdd]', function(event) {
				that._frAdd_click($(this));
			}).on('click', 'li.w-active [w-part=frDel]', function(event) {
				that._frDel_click($(this));
			}).on('click', 'li.w-active [w-part=frUp]', function(event) {
				that._frUp_click($(this));
			}).on('click', 'li.w-active [w-part=frDown]', function(event) {
				that._frDown_click($(this));
			});
			this.cont.on('click', 'li.w-active [w-part=whAdd]', function(event) {
				that._whAdd_click($(this));
			}).on('click', 'li.w-active [w-part=whDel]', function(event) {
				that._whDel_click($(this));
			}).on('click', 'li.w-active [w-part=whUp]', function(event) {
				that._whUp_click($(this));
			}).on('click', 'li.w-active [w-part=whDown]', function(event) {
				that._whDown_click($(this));
			}).on('change', 'li.w-active [w-part="whValTp"]', function(event) {
				that._whValTp_change($(this));
			});
			this.cont.on('click', 'li.w-active [w-part=orAdd]', function(event) {
				that._orAdd_click($(this));
			}).on('click', 'li.w-active [w-part=orDel]', function(event) {
				that._orDel_click($(this));
			}).on('click', 'li.w-active [w-part=orUp]', function(event) {
				that._orUp_click($(this));
			}).on('click', 'li.w-active [w-part=orDown]', function(event) {
				that._orDown_click($(this));
			});

			this.cont.on('click', 'li.w-active [w-part="cnslExecuteBtn"]', function(event) {
				that.element.trigger('w-executeSql', {
					fileNm : that._getFileNm(),
					fileCont : that._getFileCont()
				});
			});
			this.cont.on('click', 'li.w-active [w-part="cnslClearBtn"]', function(event) {
				that.cont.find('li.w-active [w-part="cnsl"]').html('');
			});
		},

		_setOpenFileDetail : function(data) {
			var fileNm = data.fileNm;
			var fileCont = data.fileCont;
			var tcList = data.tcList;

			var tblMap = this.tblMap[fileNm] = {};
			var prevTblNm = '';
			var colMap = {};
			for (var i = 0, iLen = tcList.length; i < iLen; i++) {
				var tcItem = tcList[i];
				var tblNm = tcItem['tblname'];
				var colNm = tcItem['colname'];
				var tblDi = tcItem['tbldispname'];
				var colDi = tcItem['coldispname'];
				if (prevTblNm !== tblNm) {
					tblMap[tblNm] = {
						_dispName : tblDi,
						_selected : false,
						colMap : {}
					};
					colMap = tblMap[tblNm].colMap;
					prevTblNm = tblNm;
				}
				colMap[colNm] = {
					_dispName : colDi,
					_selected : false,
					attrMap : tcItem
				};
			}

			var html;

			html = '';
			html += '<li w-key="' + fileNm + '">';

			html += '	<div w-part="sqlW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="sql"></div>';
			html += '	</div></div>';

			html += '	<div w-part="cndW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="cnd">';

			html += '			<div w-style="title">検索条件設定（画面入力）<a w-part="deTitle" class="w-question" href="/system/help/01.html" target="_blank"></a></div>';
			html += this._htmlDe();
			html += '			<div w-style="title">表示項目<a w-part="seTitle" class="w-question" href="/system/help/02.html" target="_blank"></a></div>';
			html += this._htmlSe();
			html += '			<div w-style="title">テーブル結合<a w-part="frTitle" class="w-question" href="/system/help/03.html" target="_blank"></a></div>';
			html += this._htmlFr();
			html += '			<div w-style="title">検索条件定義<a w-part="whTitle" class="w-question" href="/system/help/04.html" target="_blank"></a></div>';
			html += this._htmlWh();
			html += '			<div w-style="title">結果表示順<a w-part="orTitle" class="w-question" href="/system/help/05.html" target="_blank"></a></div>';
			html += this._htmlOr();

			html += '			<pre w-part="rDe" w-style="none"></pre>';
			html += '			<pre w-part="rSe" w-style="none"></pre>';
			html += '			<pre w-part="rFm" w-style="none"></pre>';
			html += '			<pre w-part="rFr" w-style="none"></pre>';
			html += '			<pre w-part="rWh" w-style="none"></pre>';
			html += '			<pre w-part="rOr" w-style="none"></pre>';
			html += '			<pre w-part="rAll"  w-style="none" style="position:absolute;top:0px;  right:0px;width:300px;height:200px;overflow:auto;background:white;" contentEditable="true"></pre>';
			html += '			<pre w-part="rSql"  w-style="none" style="position:absolute;top:200px;right:0px;width:300px;height:200px;overflow:auto;background:white;" contentEditable="true"></pre>';
			html += '			<pre w-part="rView" w-style="none" style="position:absolute;top:400px;right:0px;width:300px;height:200px;overflow:auto;background:white;" contentEditable="true"></pre>';

			html += '		</div>';
			html += '	</div></div>';

			html += '	<div w-part="cnslW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="cnsl"></div>';
			html += '		<div w-part="cnslBtns">';
			html += '		    <button w-part="cnslExecuteBtn">テスト実行</button>';
			html += '		    <button w-part="cnslClearBtn">クリア</button>';
			html += '	    </div>';
			html += '	</div></div>';

			html += '	<div w-part="cndTitleW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="cndTitle">帳票設定情報</div>';
			html += '	</div></div>';

			html += '	<div w-part="tcW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="tc">';
			html += '		<ul w-part="tcTbl">';
			for ( var tblNm in tblMap) {
				var tblDi = tblMap[tblNm]._dispName;
				html += '		<li w-tblNm="' + tblNm + '">';
				html += '			<div w-tblNm="' + tblNm + '">';
				html += '				<div w-tblNm="' + tblNm + '">' + tblDi + '</div>'
				html += '				<input w-tblNm="' + tblNm + '" type="checkbox"/>';
				html += '				<span w-tblNm="' + tblNm + '">＋</span>';
				html += '			</div>';
				var colMap = tblMap[tblNm].colMap;
				html += '			<ul w-part="tcCol" w-tblNm="' + tblNm + '" style="display:none;">';
				for ( var colNm in colMap) {
					var colDi = colMap[colNm]._dispName;
					html += '			<li w-tblNm="' + tblNm + '" w-colNm="' + colNm + '">';
					html += '				<div w-tblNm="' + tblNm + '" w-colNm="' + colNm + '">';
					html += '					<div w-tblNm="' + tblNm + '" w-colNm="' + colNm + '">' + colDi + '</div>'
					html += '					<input w-tblNm="' + tblNm + '" w-colNm="' + colNm + '" type="checkbox" disabled/>';
					html += '				</div>';
					html += '			</li>';
				}
				html += '			</ul>';
				html += '		</li>';
			}
			html += '		</ul>';
			html += '		</div>';
			html += '	</div></div>';

			html += '	<div w-part="tcTitleW" class="w-abs"><div class="w-rel">';
			html += '		<div w-part="tcTitle">利用可能テーブル項目</div>';
			html += '	</div></div>';

			html += '</li>';
			this.cont.prepend(html);

			return true;
		},

		_setOpenFileEnd : function(data) {
			var fileNm = data.fileNm;
			var fileCont = (data.fileCont || '').trim();
			var that = this;

			var repMap = {};
			if (fileCont !== '') {
				repMap = JSON.parse(fileCont);
			}

			for (kind in repMap) {
				if (kind === 'tblMap') {
					var tblMap = repMap[kind];
					for ( var tbl in tblMap) {
						if (tblMap[tbl]._selected === true) {
							var $this = this.cont.find('li.w-active [w-part=tcTbl] > li > div > input[w-tblNm=' + tbl + ']');
							$this.prop('checked', true);
							this.tcTblChange($this);
						}
						var colMap = tblMap[tbl].colMap;
						for ( var col in colMap) {
							if (colMap[col]._selected === true) {
								var $this = this.cont.find('li.w-active [w-part=tcCol] > li > div > input[w-tblNm=' + tbl + '][w-colNm=' + col + ']');
								$this.prop('checked', true);
								this.tcColChange($this);
							}
						}
					}
				} else {
					var comArr = repMap[kind];
					this.cont.find('li.w-active [w-part=' + kind + '] tbody tr').remove();
					for (var i = 0, iLen = comArr.length; i < iLen; i++) {
						var comMap = comArr[i];

						if (this['_' + kind + 'Add_click']) {
							this['_' + kind + 'Add_click'](this.cont.find('li.w-active [w-part=' + kind + '] [w-part=' + kind + 'Add]'));
						}

						var $row = this.cont.find('li.w-active [w-part=' + kind + '] tr:last-child');

						for (key in comMap) {
							var part = kind + key;
							var $part = $row.find('[w-part=' + part + ']');
							if ($part.attr('type') === 'checkbox') {
								$part.prop('checked', comMap[key]);
							} else {
								$part.val(comMap[key])
							}

							if (key !== 'Del') {
								var evtClick = '_' + part + '_click';
								if (this[evtClick]) {
									this[evtClick]($part);
								}

								var evtChange = '_' + part + '_change';
								if (this[evtChange]) {
									this[evtChange]($part);
								}
							}
						}
					}

				}
			}

			// this._rAll();

			return true;
		},

		_htmlDe : function() {
			var html = '';
			html += '<table w-style="table" w-part="de">';
			html += '	<thead>';
			html += '		<tr>';
			html += '		<td><div style="width:40px;"><button w-part="deAdd">+</button></div></td>';
			html += '		<td><div style="width:40px;">↑</div></td>';
			html += '		<td><div style="width:40px;">↓</div></td>';
			html += '		<td><div style="width:40px;">No.</div></td>';
			html += '		<td><div style="width:180px;">条件名称</div></td>';
			// html += ' <td><div style="width:180px;">ID</div></td>';
			html += '		<td><div style="width:180px;">条件入力形式</div></td>';
			html += '		<td><div style="width:80px;">表示位置</div></td>';
			html += '		<td><div style="width:120px;">種類</div></td>';
			html += '		<td><div style="width:180px;">初期値</div></td>';
			html += '		<td><div style="width:180px;">テスト値</div></td>';
			html += '		<td><div style="width:240px;">編集制限権限ID</div></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '	<tbody>';
			html += '	</tbody>';
			html += '</table>';
			return html;
		},
		_deAdd_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=de] tbody');
			var no = ($tbl.find('tr').length || 0) + 1;
			var html = '';
			html += '<tr>';
			html += '	<td w-part="deDelW"><button w-part="deDel">-</button></td>';
			html += '	<td w-part="deUpW"><button w-part="deUp">↑</button></td>';
			html += '	<td w-part="deDownW"><button w-part="deDown">↓</button></td>';
			html += '   <td><input w-part="deNo" value="' + no + '" readonly /></td>';
			html += '	<td><input w-part="deLabel"/></td>';
			html += '	<td style="display:none;"><input w-part="deKey"/></td>';
			html += '	<td><select w-part="deComp">' + this._htmlPart() + '</select></td>';
			html += '	<td><select w-part="dePos">' + this._htmlPos() + '</select></td>';
			html += '   <td><select w-part="deValTp">' + this._htmlKind1() + '</select></td>';
			html += '	<td><input w-part="deFix"/>'
			html += '		<select w-part="deDyna">' + this._htmlDyna() + '</select></td>';
			html += '	<td><input w-part="deTest"/></td>';
			html += '	<td><input w-part="deAuth"/></td>';
			html += '</tr>';
			$tbl.append(html);

			this._deReNo($tbl);
		},
		_deDel_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=de] tbody');
			$this.parent().parent().remove();

			this._deReNo($tbl);
		},
		_deUp_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=de] tbody');
			var $tr = $this.parent().parent();
			$tr.insertBefore($tr.prev());

			this._deReNo($tbl);
		},
		_deDown_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=de] tbody');
			var $tr = $this.parent().parent();
			$tr.insertAfter($tr.next());

			this._deReNo($tbl);
		},
		_deReNo : function($tbl) {
			$.each($tbl.find('[w-part=deNo]'), function(index, value) {
				$(this).val(index + 1);
			});
			$.each($tbl.find('[w-part=deKey]'), function(index, value) {
				$(this).val("key_" + (index + 1));
			});
			$tbl.find('[w-part=deUp], [w-part=deDown]').css('opacity', '1').removeAttr('disabled');
			$tbl.find('tr:first-child [w-part=deUp], tr:last-child [w-part=deDown]').css('opacity', '.5').attr('disabled', 'disabled');
		},
		_deValTp_change : function($this) {
			var val = $this.val();
			if (val === 'fix') {
				$this.parent().parent().find('[w-part=deFix]').show();
				$this.parent().parent().find('[w-part=deDyna]').hide();
			} else {
				$this.parent().parent().find('[w-part=deFix]').hide();
				$this.parent().parent().find('[w-part=deDyna]').show();
			}
		},

		_htmlSe : function() {
			var html = '';
			html += '<table w-style="table" w-part="se">';
			html += '<thead>';
			html += '	<tr>';
			html += '		<td rowspan="2"><div style="width:40px;"><button w-part="seAdd">+</button></div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↑</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↓</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">No.</div></td>';
			html += '		<td colspan="2"><div style="width:360px;">項目</div></td>';
			html += '		<td rowspan="2"><div style="width:180px;">表示タイトル</div></td>';
			html += '		<td rowspan="2"><div style="width:80px;">集計</div></td>';
			html += '		<td rowspan="2"><div style="width:100px;">形式</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">合計</div></td>';
			html += '		<td colspan="3"><div style="width:160px;">帳票画面</div></td>';
			html += '		<td colspan="3"><div style="width:160px;">EXCEL</div></td>';
			html += '		<td colspan="2"><div style="width:100px;">CSV</div></td>';
			html += '		</tr>';
			html += '		<tr>';
			html += '		<td><div style="width:120px;">種類</div></td>';
			html += '		<td><div style="width:240px;">内容</div></td>';
			html += '		<td><div style="width:40px;">表示</div></td>';
			html += '		<td><div style="width:60px;">秩序</div></td>';
			html += '		<td><div style="width:60px;">幅</div></td>';
			html += '		<td><div style="width:40px;">表示</div></td>';
			html += '		<td><div style="width:60px;">秩序</div></td>';
			html += '		<td><div style="width:60px;">幅</div></td>';
			html += '		<td><div style="width:40px;">表示</div></td>';
			html += '		<td><div style="width:60px;">秩序</div></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '	<tbody>';
			html += '	</tbody>';
			html += '</table>';
			return html;
		},
		_seAdd_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=se] tbody');
			var no = ($tbl.find('tr').length || 0) + 1;
			var html = '';
			html += '<tr>';
			html += '	<td w-part="seDelW"><button w-part="seDel">-</button></td>';
			html += '	<td w-part="seUpW"><button w-part="seUp">↑</button></td>';
			html += '	<td w-part="seDownW"><button w-part="seDown">↓</button></td>';
			html += '   <td><input w-part="seNo" value="' + no + '" readonly /></td>';
			html += '   <td><select w-part="seUseCus">' + this._htmlKind2() + '</select></td>';
			html += '	<td><input w-part="seCus"/>'
			html += '		<select w-part="seCol">' + this._htmlColumn() + '</select></td>';
			html += '	<td><input w-part="seAli"></input></td>';
			html += '	<td><select w-part="seAgg">' + this._htmlAggr() + '</select></td>';
			html += '	<td><input w-part="seType"/><select w-part="seCast"></select></td>';
			html += '	<td><input w-part="seSum" type="checkbox"/></td>';
			html += '	<td><input w-part="seVDis" type="checkbox" checked/></td>';
			html += '	<td><input w-part="seVOrd"></input></td>';
			html += '	<td><select w-part="seVWidth">' + this._htmlVWidth('100') + '</select></td>';
			html += '	<td><input w-part="seXDis" type="checkbox" checked/></td>';
			html += '	<td><input w-part="seXOrd"></input></td>';
			html += '	<td><select w-part="seXWidth">' + this._htmlVWidth('100') + '</select></td>'
			html += '	<td><input w-part="seCDis" type="checkbox" checked/></td>';
			html += '	<td><input w-part="seCOrd"></input></td>';
			html += '</tr>';
			$tbl.append(html);

			this._seReNo($tbl);
		},
		_seDel_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=se] tbody');
			$this.parent().parent().remove();

			this._seReNo($tbl);
		},
		_seUp_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=se] tbody');
			var $tr = $this.parent().parent();
			$tr.insertBefore($tr.prev());

			this._seReNo($tbl);
		},
		_seDown_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=se] tbody');
			var $tr = $this.parent().parent();
			$tr.insertAfter($tr.next());

			this._seReNo($tbl);
		},
		_seReNo : function($tbl) {
			$.each($tbl.find('[w-part=seNo]'), function(index, value) {
				$(this).val(index + 1);
			});
			$tbl.find('[w-part=seUp], [w-part=seDown]').css('opacity', '1').removeAttr('disabled');
			$tbl.find('tr:first-child [w-part=seUp], tr:last-child [w-part=seDown]').css('opacity', '.5').attr('disabled', 'disabled');
		},
		_seUseCus_change : function($this) {
			var val = $this.val();
			if (val === 'cus') {
				$this.parent().parent().find('[w-part=seCus]').show();
				$this.parent().parent().find('[w-part=seCol]').hide();
			} else {
				$this.parent().parent().find('[w-part=seCus]').hide();
				$this.parent().parent().find('[w-part=seCol]').show();
			}
		},
		_seCol_change : function($this) {
			var $row = $this.parent().parent();
			var $checked = $this.find(':checked');
			var colDi = $checked.attr('w-colDi');
			var dataTp = $checked.attr('w-dataTp');
			$row.find('[w-part=seAli]').val(colDi);
			$row.find('[w-part=seType]').val(dataTp);
			$row.find('[w-part=seCast]').html(this._htmlCast(null, dataTp));
			$row.find('[w-part=seAgg]').html(this._htmlAggr(null, dataTp));
		},

		_htmlFr : function() {
			var html = '';
			html += '<table w-style="table" w-part="fm">';
			html += '	<thead>';
			html += '		<tr>';
			html += '		<td><div style="width:180px;">主テーブル</div></td>';
			html += '   	<td style="background:white;color:gray;"><select w-part="fmTbl">' + this._htmlTable() + '</select></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '</table>';

			html += '<table w-style="table" w-part="fr" style="margin-top:4px;">';
			html += '	<thead>';
			html += '		<tr>';
			html += '		<td rowspan="2"><div style="width:40px;"><button w-part="frAdd">+</button></div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↑</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↓</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">No.</div></td>';
			html += '		<td rowspan="2"><div style="width:100px;">結合方法</div></td>';
			html += '		<td rowspan="2"><div style="width:180px;">副テーブル</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">(</div></td>';
			html += '		<td rowspan="2"><div style="width:80px;">及び・又は</div></td>';
			html += '		<td colspan="3"><div style="width:580px;">項目設定</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">)</div></td>';
			html += '		</tr>';
			html += '		<tr>';
			html += '		<td><div style="width:240px;">テーブル.項目</div></td>';
			html += '		<td><div style="width:100px;">比較方法</div></td>';
			html += '		<td><div style="width:240px;">テーブル.項目</div></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '	<tbody>';
			html += '	</tbody>';
			html += '</table>';
			return html;
		},
		_frAdd_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=fr] tbody');
			var no = ($tbl.find('tr').length || 0) + 1;
			var html = '';
			html += '<tr>';
			html += '	<td w-part="frDelW"><button w-part="frDel">-</button></td>';
			html += '	<td w-part="frUpW"><button w-part="frUp">↑</button></td>';
			html += '	<td w-part="frDownW"><button w-part="frDown">↓</button></td>';
			html += '   <td><input  w-part="frNo" value="' + no + '" readonly /></td>';
			html += '   <td><select w-part="frComb">' + this._htmlJoin() + '</select></td>';
			html += '   <td><select w-part="frTbl">' + this._htmlTable() + '</select></td>';
			html += '   <td><select w-part="frOpen">' + this._htmlOpen() + '</select></td>';
			html += '   <td><select w-part="frAndOr">' + this._htmlAndOr() + '</select></td>';
			html += '	<td><select w-part="frColL">' + this._htmlColumn() + '</select></td>';
			html += '	<td><select w-part="frComp">' + this._htmlOnComp() + '</select></td>';
			html += '	<td><select w-part="frColR">' + this._htmlColumn() + '</select></td>';
			html += '   <td><select w-part="frClose">' + this._htmlClose() + '</select></td>';
			html += '</tr>';
			$tbl.append(html);

			this._frReNo($tbl);
		},
		_frDel_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=fr] tbody');
			$this.parent().parent().remove();

			this._frReNo($tbl);
		},
		_frUp_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=fr] tbody');
			var $tr = $this.parent().parent();
			$tr.insertBefore($tr.prev());

			this._frReNo($tbl);
		},
		_frDown_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=fr] tbody');
			var $tr = $this.parent().parent();
			$tr.insertAfter($tr.next());

			this._frReNo($tbl);
		},
		_frReNo : function($tbl) {
			$.each($tbl.find('[w-part=frNo]'), function(index, value) {
				$(this).val(index + 1);
			});
			$tbl.find('[w-part=frUp], [w-part=frDown]').css('opacity', '1').removeAttr('disabled');
			$tbl.find('tr:first-child [w-part=frUp], tr:last-child [w-part=frDown]').css('opacity', '.5').attr('disabled', 'disabled');
		},

		_htmlWh : function() {
			var html = '';
			html += '<table w-style="table" w-part="wh">';
			html += '	<thead>';
			html += '		<tr>';
			html += '		<td rowspan="2"><div style="width:40px;"><button w-part="whAdd">+</button></div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↑</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↓</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">No.</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">(</div></td>';
			html += '		<td rowspan="2"><div style="width:80px;">及び・又は</div></td>';
			html += '		<td rowspan="2"><div style="width:240px;">検索対象項目</div></td>';
			html += '		<td rowspan="2"><div style="width:240px;">条件</div></td>';
			html += '		<td colspan="2"><div style="width:360px;">比較対象</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">)</div></td>';
			html += '		</tr>';
			html += '		<tr>';
			html += '		<td><div style="width:120px;">種類</div></td>';
			html += '		<td><div style="width:240px;">内容</div></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '	<tbody>';
			html += '	</tbody>';
			html += '</table>';
			return html;
		},
		_whAdd_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=wh] tbody');
			var no = ($tbl.find('tr').length || 0) + 1;
			var html = '';
			html += '<tr>';
			html += '	<td w-part="whDelW"><button w-part="whDel">-</button></td>';
			html += '	<td w-part="whUpW"><button w-part="whUp">↑</button></td>';
			html += '	<td w-part="whDownW"><button w-part="whDown">↓</button></td>';
			html += '   <td><input w-part="whNo" value="' + no + '" readonly /></td>';
			html += '   <td><select w-part="whOpen">' + this._htmlOpen() + '</select></td>';
			html += '   <td><select w-part="whAndOr">' + this._htmlAndOr() + '</select></td>';
			html += '	<td><select w-part="whColL">' + this._htmlColumn() + '</select></td>';
			html += '	<td><select w-part="whComp">' + this._htmlWhereComp() + '</select></td>';
			html += '   <td><select w-part="whValTp">' + this._htmlKind3() + '</select></td>';
			html += '	<td>';
			html += '		<select w-part="whColR">' + this._htmlColumn() + '</select>';
			html += '		<select w-part="whInR" style="display:none;">' + this._htmlDeclare() + '</select>';
			html += '		<select w-part="whDynaR" style="display:none;">' + this._htmlDyna() + '</select>';
			html += '		<input w-part="whFixR" style="display:none;"/>';
			html += '	</td>';
			html += '   <td><select w-part="whClose">' + this._htmlClose() + '</select></td>';
			html += '</tr>';
			$tbl.append(html);

			this._whReNo($tbl);
		},
		_whDel_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=wh] tbody');
			$this.parent().parent().remove();

			this._whReNo($tbl);
		},
		_whUp_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=wh] tbody');
			var $tr = $this.parent().parent();
			$tr.insertBefore($tr.prev());

			this._whReNo($tbl);
		},
		_whDown_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=wh] tbody');
			var $tr = $this.parent().parent();
			$tr.insertAfter($tr.next());

			this._whReNo($tbl);
		},
		_whReNo : function($tbl) {
			$.each($tbl.find('[w-part=whNo]'), function(index, value) {
				$(this).val(index + 1);
			});
			$tbl.find('[w-part=whUp], [w-part=whDown]').css('opacity', '1').removeAttr('disabled');
			$tbl.find('tr:first-child [w-part=whUp], tr:last-child [w-part=whDown]').css('opacity', '.5').attr('disabled', 'disabled');
		},
		_whValTp_change : function($this) {
			var val = $this.val();

			var $row = $this.parent().parent();
			if (val === 'tc') {
				$row.find('[w-part=whColR]').show();
				$row.find('[w-part=whInR]').hide();
				$row.find('[w-part=whDynaR]').hide();
				$row.find('[w-part=whFixR]').hide();
			} else if (val === 'input') {
				$row.find('[w-part=whColR]').hide();
				$row.find('[w-part=whInR]').show();
				$row.find('[w-part=whDynaR]').hide();
				$row.find('[w-part=whFixR]').hide();
			} else if (val === 'dyna') {
				$row.find('[w-part=whColR]').hide();
				$row.find('[w-part=whInR]').hide();
				$row.find('[w-part=whDynaR]').show();
				$row.find('[w-part=whFixR]').hide();
			} else if (val === 'fix') {
				$row.find('[w-part=whColR]').hide();
				$row.find('[w-part=whInR]').hide();
				$row.find('[w-part=whDynaR]').hide();
				$row.find('[w-part=whFixR]').show();
			}
		},

		_htmlOr : function() {
			var html = '';
			html += '<table w-style="table" w-part="or">';
			html += '	<thead>';
			html += '		<tr>';
			html += '		<td rowspan="2"><div style="width:40px;"><button w-part="orAdd">+</button></div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↑</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">↓</div></td>';
			html += '		<td rowspan="2"><div style="width:40px;">No.</div></td>';
			html += '		<td><div style="width:240px;">整列対象項目</div></td>';
			html += '		<td><div style="width:80px;">整列方向</div></td>';
			html += '		<td><div style="width:120px;">EXCEL小計基準</div></td>';
			html += '		</tr>';
			html += '	</thead>';
			html += '	<tbody>';
			html += '	</tbody>';
			html += '</table>';
			return html;
		},
		_orAdd_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=or] tbody');
			var no = ($tbl.find('tr').length || 0) + 1;
			var html = '';
			html += '<tr>';
			html += '	<td w-part="orDelW"><button w-part="orDel">-</button></td>';
			html += '	<td w-part="orUpW"><button w-part="orUp">↑</button></td>';
			html += '	<td w-part="orDownW"><button w-part="orDown">↓</button></td>';
			html += '   <td><input w-part="orNo" value="' + no + '" readonly /></td>';
			html += '	<td><select w-part="orCol">' + this._htmlColumn() + '</select></td>';
			html += '	<td><select w-part="orOrder">' + this._htmlOrder() + '</select></td>';
			html += '	<td style="background:gray;"><input w-part="orSubTotal" type="checkbox" style="opacity:0.5;" disabled></input></td>';
			html += '</tr>';
			$tbl.append(html);

			this._orReNo($tbl);
		},
		_orDel_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=or] tbody');
			$this.parent().parent().remove();

			this._orReNo($tbl);
		},
		_orUp_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=or] tbody');
			var $tr = $this.parent().parent();
			$tr.insertBefore($tr.prev());

			this._orReNo($tbl);
		},
		_orDown_click : function($this) {
			var $tbl = this.cont.find('li.w-active [w-part=or] tbody');
			var $tr = $this.parent().parent();
			$tr.insertAfter($tr.next());

			this._orReNo($tbl);
		},
		_orReNo : function($tbl) {
			$.each($tbl.find('[w-part=orNo]'), function(index, value) {
				$(this).val(index + 1);
			});
			$tbl.find('[w-part=orUp], [w-part=orDown]').css('opacity', '1').removeAttr('disabled');
			$tbl.find('tr:first-child [w-part=orUp], tr:last-child [w-part=orDown]').css('opacity', '.5').attr('disabled', 'disabled');
		},
		_htmlTable : function() {
			var html = '';
			html += '<option value="" w-tblNm=""></option>';
			var tblMap = this.tblMap[this.cont.find('li.w-active').attr('w-key')];
			for (tblNm in tblMap) {
				if (tblMap[tblNm]._selected === true) {
					var tblDi = tblMap[tblNm]._dispName;
					html += '<option value="' + tblNm + '" w-tblNm="' + tblNm + '" w-tblDi="' + tblDi + '">' + tblDi + '</option>';
				}
			}
			return html;
		},

		_htmlColumn : function() {
			var html = '';
			html += '<option value="" w-tblNm="" w-colNm="" w-dataTp=""></option>';
			var tblMap = this.tblMap[this.cont.find('li.w-active').attr('w-key')];
			for (tblNm in tblMap) {
				if (tblMap[tblNm]._selected === true) {
					var tblDi = tblMap[tblNm]._dispName;
					var colMap = tblMap[tblNm].colMap;
					for (colNm in colMap) {
						if (colMap[colNm]._selected === true) {
							var colDi = colMap[colNm]._dispName;
							html += '<option value="' + tblNm + '.' + colNm + '" '
							html += 'w-tblNm="' + tblNm + '" w-colNm="' + colNm + '" '
							html += 'w-tblDi="' + tblDi + '" w-colDi="' + colDi + '" '
							html += 'w-dataTp="' + colMap[colNm].attrMap.datatype + '">';
							html += tblDi + '.' + colDi + '</option>';
						}
					}
				}
			}
			return html;
		},

		_htmlDeclare : function() {
			var html = '';

			html += '<option value="" w-keyword=""></option>';
			var $de = this.cont.find('li.w-active [w-part=de] tbody');
			$.each($de.find('tr'), function(index, value) {
				var $row = $(this);
				var deLabel = $row.find('[w-part=deLabel]').val();
				var deKey = $row.find('[w-part=deKey]').val();
				var deComp = $row.find('[w-part=deComp]').val();

				if (deLabel !== '' && deKey !== '' && deComp !== '') {
					html += '<option value="' + deKey + '">' + deLabel + '</option>';
				}
			});
			return html;
		},

		_htmlPart : function() {
			return this._list2Html(DRepList.part);
		},
		_htmlAggr : function(def, type) {
			var dataType = WE.F.getDbDataType(type);
			switch (dataType) {
			case "numeric":
				return this._list2Html(DRepList.aggr);
			default:
				return [ {
					k : '',
					d : ''
				} ];
			}
		},
		_htmlJoin : function() {
			return this._list2Html(DRepList.join);
		},
		_htmlOnComp : function() {
			return this._list2Html(DRepList.on_comp);
		},
		_htmlWhereComp : function() {
			return this._list2Html(DRepList.where_comp);
		},
		_htmlPos : function() {
			return this._list2Html(DRepList.pos);
		},
		_htmlDyna : function() {
			return this._list2Html(DRepList.dyna);
		},
		_htmlKind1 : function() {
			return this._list2Html(DRepList.kind1);
		},
		_htmlKind2 : function() {
			return this._list2Html(DRepList.kind2);
		},
		_htmlKind3 : function() {
			return this._list2Html(DRepList.kind3);
		},
		_htmlOrder : function() {
			return this._list2Html(DRepList.order);
		},
		_htmlAndOr : function() {
			return this._list2Html(DRepList.andor);
		},
		_htmlOpen : function() {
			return this._list2Html(DRepList.open);
		},
		_htmlClose : function() {
			return this._list2Html(DRepList.close);
		},
		_htmlVWidth : function(def) {
			return this._list2Html(DRepList.vWidth, def);
		},
		_htmlCast : function(def, type) {
			var dataType = WE.F.getDbDataType(type);
			switch (dataType) {
			case "numeric":
				return this._list2Html(DRepList.cast_numeric);
			case "datetime":
				return this._list2Html(DRepList.cast_datetime);
			default:
				return [ {
					k : '',
					d : ''
				} ];
			}
		},
		_list2Html : function(list, def) {
			var html = '';
			if (list) {
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					html += '<option value="' + item.k + '"';
					if (item.k === def) {
						html += ' selected ';
					}
					html += '>' + item.d + '</option>';
				}
			}
			return html;
		},

		_getFileCont : function() {
			var $tbl;
			var all = {};
			var $act = this.cont.find('li.w-active');
			var fileNm = $act.attr('w-key');

			var tblMapCopy = {};

			var tblMap = this.tblMap[fileNm];
			for ( var tblNm in tblMap) {
				if (tblMap[tblNm]._selected) {
					tblMapCopy[tblNm] = {
						_selected : tblMap[tblNm]._selected,
						colMap : {}
					};
					var colMap = tblMap[tblNm].colMap;
					for ( var colNm in colMap) {
						if (colMap[colNm]._selected) {
							tblMapCopy[tblNm].colMap[colNm] = {
								_selected : colMap[colNm]._selected
							};
						}
					}
				}
			}

			all.tblMap = tblMapCopy;
			all.de = this._getFileContDetail($act.find('[w-part=de] tbody'));
			all.se = this._getFileContDetail($act.find('[w-part=se] tbody'));
			all.fm = this._getFileContDetail($act.find('[w-part=fm] thead'));
			all.fr = this._getFileContDetail($act.find('[w-part=fr] tbody'));
			all.wh = this._getFileContDetail($act.find('[w-part=wh] tbody'));
			all.or = this._getFileContDetail($act.find('[w-part=or] tbody'));

			return JSON.stringify(all, undefined, 4);
		},

		_getFileContDetail : function($tbl) {
			var comArr = [];

			$.each($tbl.find('tr'), function(index, value) {
				var $row = $(this);

				var comMap = {};
				$.each($row.find('[w-part]'), function(index2, value2) {
					var $part = $(this);
					var part = $part.attr('w-part');
					part = part.substring(2);
					var val = $part.val();
					if ($part.attr('type') === 'checkbox') {
						val = $part.prop('checked');
					}
					comMap[part] = val;
				});

				comArr.push(comMap);
			});

			return comArr;
		},

		_setWriteLog : function(value) {
			var fileNm = value.fileNm;
			var msg = value.message;
			var list = value.list;

			var html = '';
			html += '<div>';
			html += '<div class="w-time">';
			html += new Date();
			html += '</div>';
			html += '<div class="w-rslt">';
			html += msg + '<br/>';
			if (list) {
				if (list[0]) {
					html += '<table>';
					var item = list[0];
					var itemKeys = Object.keys(item);

					html += '<thead>';
					html += '<tr>';
					for (var i = 0, iLen = itemKeys.length; i < iLen; i++) {
						var itemKey = itemKeys[i];
						html += '<th>' + itemKey + '</th>';

					}
					html += '</tr>';
					html += '</thead>';

					html += '<tbody>';
					for (var i = 0, iLen = list.length; i < iLen; i++) {
						html += '<tr>';
						var item = list[i];
						for ( var key in item) {
							html += '<td>' + item[key] + '</td>';
						}
						html += '</tr>';
					}
					html += '</tbody>';

					html += '</table>';
				}
			}
			html += '</div>';
			html += '</div>';

			this.cont.find('li.w-active [w-part=cnsl]').append(html);

			return true;
		},

	});
	/* E: DRep */
	/** ************************************************ */

	/** ************************************************ */
	/* S: DRep */
	$.widget('we.weDRepEdit', $.we.base, {

		_create : function() {
			var that = this;
			this._super();

			var html = '';
			html += ' <div';
			html += ' class="w-abs" style="padding:1px; padding-top:30px; padding-left:160px;"';
			html += ' w-part="repOW">';
			html += '     <div';
			html += '     class="w-rel" style="border: 1px solid gray;"';
			html += '     w-part="repIW">';
			html += '         <div';
			html += '         w-type="DRep" w-left="0" w-top="0" w-width="100%" w-height="100%"';
			html += '         w-part="rep" w-title="帳票エディター">';
			html += '         </div>';
			html += '     </div>';
			html += ' </div>';

			html += ' <div';
			html += ' class="w-abs" style="padding:1px; padding-top:30px; width:160px;"';
			html += ' w-part="expOW">';
			html += '     <div';
			html += '     class="w-rel" style="border: 1px solid gray;"';
			html += '     w-part="expIW">';
			html += '         <div';
			html += '         w-type="DExp" w-left="0" w-top="0" w-width="100%" w-height="100%"';
			html += '         w-part="exp" w-title="帳票リスト">';
			html += '         </div>';
			html += '     </div>';
			html += ' </div>';

			html += ' <div';
			html += ' class="w-abs" style="left:158px; padding-top:30px; width:4px; cursor:pointer;"';
			html += ' w-part="sld01">';
			html += ' </div>';

			html += ' <div';
			html += ' class="w-abs" style="padding:2px; height:30px;"';
			html += ' w-part="btnOW">';
			html += '     <div';
			html += '     class="w-rel" style=""';
			html += '     w-part="btnIW">';
			html += '         <div';
			html += '         w-type="Button" w-left="0" w-top="0"';
			html += '         w-part="newFile" w-auth="enable" w-value="新規作成">';
			html += '         </div>';
			html += '         <div';
			html += '         w-type="Button" w-left="100" w-top="0"';
			html += '         w-part="copyFile" w-auth="enable" w-value="複写作成">';
			html += '         </div>';
			html += '         <div';
			html += '         w-type="Button" w-left="200" w-top="0"';
			html += '         w-part="renameFile" w-auth="enable" w-value="修正">';
			html += '         </div>';
			html += '         <div';
			html += '         w-type="Button" w-left="300" w-top="0"';
			html += '         w-part="deleteFile" w-auth="enable" w-value="削除">';
			html += '         </div>';
			html += '         <div';
			html += '         w-type="Button" w-right="100" w-top="0"';
			html += '         w-part="saveFile" w-auth="enable" w-value="保存">';
			html += '         </div>';
			html += '         <div';
			html += '         w-type="Button" w-right="0" w-top="0"';
			html += '         w-part="releaseFile" w-auth="enable" w-value="管理">';
			html += '         </div>';
			html += '     </div>';
			html += ' </div>';

			this.element.html(html);

			var repOW = this.repOW = this.element.children("[w-part=repOW]");
			var repIW = this.repIW = repOW.children("[w-part=repIW]");
			var rep = this.rep = repIW.children("[w-part=rep]");

			var expOW = this.expOW = this.element.children("[w-part=expOW]");
			var expIW = this.expIW = expOW.children("[w-part=expIW]");
			var exp = this.exp = expIW.children("[w-part=exp]");

			var sld01 = this.sld01 = this.element.children("[w-part=sld01]");

			var btnOW = this.btnOW = this.element.children("[w-part=btnOW]");
			var btnIW = this.btnIW = btnOW.children("[w-part=btnIW]");
			var newFile = this.btn = btnIW.children("[w-part=newFile]");
			var copyFile = this.btn = btnIW.children("[w-part=copyFile]");
			var renameFile = this.btn = btnIW.children("[w-part=renameFile]");
			var deleteFile = this.btn = btnIW.children("[w-part=deleteFile]");
			var saveFile = this.btn = btnIW.children("[w-part=saveFile]");
			var releaseFile = this.btn = btnIW.children("[w-part=releaseFile]");

			sld01.mousedown(function() {
				repOW.css('cursor', 'ew-resize');
				expOW.css('cursor', 'ew-resize');
				sld01.css('cursor', 'ew-resize');
			}).draggable({
				axis : "x",
				containment : "parent",
				start : function(event, ui) {
				},
				drag : function(event, ui) {
					var sldLeft = event.target.offsetLeft + 2;
					repOW.css("padding-left", sldLeft + "px");
					expOW.css("width", sldLeft + "px");
				},
				stop : function(event, ui) {
					var sldLeft = event.target.offsetLeft + 2;
					repOW.css("padding-left", sldLeft + "px");
					expOW.css("width", sldLeft + "px");
					repOW.css('cursor', 'default');
					expOW.css('cursor', 'default');
					sld01.css('cursor', 'pointer');
				}
			});

			newFile.on('w-click', function(event) {
				that.element.trigger('w-newFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
			copyFile.on('w-click', function(event) {
				that.element.trigger('w-copyFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
			renameFile.on('w-click', function(event) {
				that.element.trigger('w-renameFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
			deleteFile.on('w-click', function(event) {
				that.element.trigger('w-deleteFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
			saveFile.on('w-click', function(event) {
				that.element.trigger('w-saveFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
			releaseFile.on('w-click', function(event) {
				that.element.trigger('w-releaseFile', {
					id : that.element.attr('id'),
					fileNm : WE.F.getOption(rep, 'fileNm'),
					fileCont : WE.F.getOption(rep, 'fileCont'),
				});
			});
		},

		_init : function() {
			WE.F.initAll(this.element);
		},

		_setList : function() {
			WE.F.setOption(this.exp, 'list', this.options.list);
		},

		_setNewFile : function(data) {
			WE.F.setOption(this.exp, 'newFile', data);
			WE.F.setOption(this.rep, 'newFile', data);
		},

		_setCopyFile : function(data) {
			WE.F.setOption(this.exp, 'copyFile', data);
			WE.F.setOption(this.rep, 'copyFile', data);
		},

		_setRenameFile : function(data) {
			WE.F.setOption(this.exp, 'renameFile', data);
			WE.F.setOption(this.rep, 'renameFile', data);
		},

		_setDeleteFile : function(data) {
			WE.F.setOption(this.exp, 'deleteFile', data);
			WE.F.setOption(this.rep, 'deleteFile', data);
		},

		_setSaveFile : function(data) {
			WE.F.setOption(this.exp, 'saveFile', data);
			WE.F.setOption(this.rep, 'saveFile', data);
		},

		_setReleaseFile : function(data) {
			WE.F.setOption(this.exp, 'releaseFile', data);
			WE.F.setOption(this.rep, 'releaseFile', data);
		},

		_setOpenFile : function(data) {
			WE.F.setOption(this.exp, 'openFile', data);
			WE.F.setOption(this.rep, 'openFile', data);
		},

		_setCloseFile : function(data) {
			WE.F.setOption(this.exp, 'closeFile', data);
			WE.F.setOption(this.rep, 'closeFile', data);
		},

		_setWriteLog : function(data) {
			WE.F.setOption(this.rep, 'writeLog', data);
		},

	});
	/* E: DRep */
	/** ************************************************ */

	var DRepList = {};
	DRepList['part'] = [ {
		k : '',
		d : ''
	}, {
		k : 'TextField',
		d : '文字'
	// }, {
	// k : 'TextField',
	// d : '数字(※※準備中※※)'
	}, {
		k : 'DateField',
		d : '日付'
	// }, {
	// k : 'SearchField',
	// d : 'ガイドボックス(※※準備中※※)'
	// }, {
	// k : 'ComboBox',
	// d : 'コンポボックス(※※準備中※※)'
	} ];

	DRepList['aggr'] = [ {
		k : '',
		d : ''
	}, {
		k : 'sum([COLUMN_REPLACER])',
		d : '合計'
	}, {
		k : 'avg([COLUMN_REPLACER])',
		d : '平均'
	}, {
		k : 'min([COLUMN_REPLACER])',
		d : '最小'
	}, {
		k : 'max([COLUMN_REPLACER])',
		d : '最大'
	}, {
		k : 'count([COLUMN_REPLACER])',
		d : 'カウント'
	} ];

	DRepList['join'] = [ {
		k : '',
		d : ''
	}, {
		k : 'left join ',
		d : '主テーブル中心'
	}, {
		k : 'right join ',
		d : '副テーブル中心'
	}, {
		k : 'inner join ',
		d : '主副交集合'
	} ];

	DRepList['on_comp'] = [ {
		k : '',
		d : ''
	}, {
		k : '[COLUMN_REPLACER1] = [COLUMN_REPLACER2]',
		d : 'と等しい'
	}, {
		k : '[COLUMN_REPLACER1] != [COLUMN_REPLACER2]',
		d : 'と等しくない'
	}, {
		k : '[COLUMN_REPLACER1] > [COLUMN_REPLACER2]',
		d : 'より大きい'
	}, {
		k : '[COLUMN_REPLACER1] >= [COLUMN_REPLACER2]',
		d : '以上'
	}, {
		k : '[COLUMN_REPLACER1] < [COLUMN_REPLACER2]',
		d : 'より小さい'
	}, {
		k : '[COLUMN_REPLACER1] <= [COLUMN_REPLACER2]',
		d : '以下'
	} ];

	DRepList['where_comp'] = [ {
		k : '',
		d : ''
	}, {
		k : '[COLUMN_REPLACER1] like [COLUMN_REPLACER2]',
		d : 'と等しい'
	}, {
		k : 'W_FUNC::wCastString([COLUMN_REPLACER1]) like (CASE WHEN [COLUMN_REPLACER2] = \'\' THEN W_FUNC::wCastString([COLUMN_REPLACER1]) ELSE [COLUMN_REPLACER2] END)',
		d : 'と等しい(条件無し⇒全体検索)'
	}, {
		k : '[COLUMN_REPLACER1] != [COLUMN_REPLACER2]',
		d : 'と等しくない'
	}, {
		k : '[COLUMN_REPLACER1] > [COLUMN_REPLACER2]',
		d : 'より大きい'
	}, {
		k : '[COLUMN_REPLACER1] >= [COLUMN_REPLACER2]',
		d : '以上'
	}, {
		k : '[COLUMN_REPLACER1] < [COLUMN_REPLACER2]',
		d : 'より小さい'
	}, {
		k : '[COLUMN_REPLACER1] <= [COLUMN_REPLACER2]',
		d : '以下'
	} ];

	DRepList['pos'] = [ {
		k : '',
		d : ''
	}, {
		k : '10,10',
		d : '1行1列'
	}, {
		k : '410,10',
		d : '1行2列'
	}, {
		k : '10,40',
		d : '2行1列'
	}, {
		k : '410,40',
		d : '2行2列'
	}, {
		k : '10,70',
		d : '3行1列'
	}, {
		k : '410,70',
		d : '3行2列'
	} ];

	DRepList['dyna'] = [ {
		k : 'currUserId',
		d : 'ログインユーザーID'
	}, {
		k : 'currDiviCd',
		d : 'ログインユーザー事業部CD'
	}, {
		k : 'currShopCd',
		d : 'ログインユーザーショップCD'
	}, {
		k : 'currDatetime',
		d : '現在の時刻（日時）'
	}, {
		k : 'currDate',
		d : '現在の時刻（日にち）'
	}, {
		k : 'currTime',
		d : '現在の時刻（時間）'
	}, {
		k : 'currYear',
		d : '現在の時刻（年）'
	}, {
		k : 'currMonth',
		d : '現在の時刻（月）'
	}, {
		k : 'currDay',
		d : '現在の時刻（日）'
	} ];

	DRepList['kind1'] = [ {
		k : 'fix',
		d : '直接入力'
	}, {
		k : 'dyna',
		d : '動的入力'
	} ];

	DRepList['kind2'] = [ {
		k : 'tc',
		d : 'テーブル項目'
	}, {
		k : 'cus',
		d : '直接入力'
	} ];

	DRepList['kind3'] = [ {
		k : 'tc',
		d : 'テーブル.項目'
	}, {
		k : 'input',
		d : '画面入力値'
	}, {
		k : 'dyna',
		d : '動的入力'
	}, {
		k : 'fix',
		d : '直接入力'
	} ];

	DRepList['order'] = [ {
		k : '',
		d : ''
	}, {
		k : 'asc',
		d : '昇順'
	}, {
		k : 'desc',
		d : '降順'
	} ];

	DRepList['andor'] = [ {
		k : '',
		d : ''
	}, {
		k : 'and',
		d : '及び'
	}, {
		k : 'or',
		d : '又は'
	} ];

	DRepList['open'] = [ {
		k : '',
		d : ''
	}, {
		k : '(',
		d : '('
	}, {
		k : '((',
		d : '(('
	} ];
	DRepList['close'] = [ {
		k : '',
		d : ''
	}, {
		k : ')',
		d : ')'
	}, {
		k : '))',
		d : '))'
	} ];
	DRepList['vWidth'] = [ {
		k : '',
		d : ''
	}, {
		k : '60',
		d : '60'
	}, {
		k : '80',
		d : '80'
	}, {
		k : '100',
		d : '100'
	}, {
		k : '120',
		d : '120'
	}, {
		k : '140',
		d : '140'
	}, {
		k : '160',
		d : '160'
	}, {
		k : '180',
		d : '180'
	}, {
		k : '200',
		d : '200'
	} ];

	DRepList['cast_numeric'] = [ {
		k : '',
		d : ''
	}, {
		k : 'W_FUNC::wCastNumeric01([COLUMN_REPLACER])',
		d : '#,###.##'
	}, {
		k : 'W_FUNC::wCastNumeric02([COLUMN_REPLACER])',
		d : '#,###'
	} ];

	DRepList['cast_datetime'] = [ {
		k : '',
		d : ''
	}, {
		k : 'W_FUNC::wCastDatetime01([COLUMN_REPLACER])',
		d : 'YYYY-MM-DD HH:MM:SS'
	}, {
		k : 'W_FUNC::wCastDatetime02([COLUMN_REPLACER])',
		d : 'YYYY-MM-DD HH:MM'
	}, {
		k : 'W_FUNC::wCastDatetime03([COLUMN_REPLACER])',
		d : 'YYYY-MM-DD'
	}, {
		k : 'W_FUNC::wCastDatetime04([COLUMN_REPLACER])',
		d : 'YYYY-MM'
	} ];

});