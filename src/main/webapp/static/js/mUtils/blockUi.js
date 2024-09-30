'use strict';

(function(global) {
	const BlockUi = (function() {
		let DEFAULT_OPTION = {
			blockId : "blockDiv"
			, msgInfo : {
				msgId : "msgDiv"
				, imgUrl : "/images/egovframework/cmmn/spinner.gif"
				, imgHeight : "140px"
				, msgTexts : ["데이터를 처리중입니다.", "잠시만 기다려 주세요."]
			} 
		};
		let _option = null;
		let _init = function(option) {
			_option = mUtils.object.merge(DEFAULT_OPTION, option);
		};
		
		let _setStyle = function(blockObj) {
			if( blockObj.id == _option.blockId ) {
				blockObj.style.zIndex = "9000";
				blockObj.style.border = "none";
	    		blockObj.style.margin = "0px";
	    		blockObj.style.padding = "0px";
	    		blockObj.style.width = "100%";
	    		blockObj.style.height = "100%";
	    		blockObj.style.top = "0px";
	    		blockObj.style.left = "0px";
	    		blockObj.style.backgroundColor = "rgb(0, 0, 0)";
	    		blockObj.style.opacity  = "0.0381966";
	    		blockObj.style.cursor  = "wait";
	    		blockObj.style.position  = "fixed";	
			}
			else if( blockObj.id == _option.msgInfo.msgId ) {
				blockObj.style.zindex = "9011";
				blockObj.style.position = "fixed";
				blockObj.style.padding = "0px";
				blockObj.style.margin = "0px";
				blockObj.style.width = "30%";
				blockObj.style.top = "40%";
				blockObj.style.left = "35%";
				blockObj.style.textAlign = "center";
				blockObj.style.color = "rgb(0, 0, 0)";
				blockObj.style.cursor = "wait";
			}
		}
		
		let _onBlockUi = function() {
			if( !_option ) {
				_option = mUtils.object.merge(DEFAULT_OPTION, {});
			}
			console.log("_onBlockUi : " + _option);
			let doc = document;
			let blockDivObj = doc.querySelector(`#${_option.blockId}`);
			let msgDivObj = doc.querySelector(`#${_option.msgInfo.msgId}`);
			/* block div 생성 */
			if( blockDivObj == null ) {
				blockDivObj = doc.createElement("div");
				blockDivObj.id = _option.blockId;
				_setStyle(blockDivObj);
				doc.body.appendChild(blockDivObj);
			}
			else {
				blockDivObj.style.display = "block";
			}
			
			/* message div 생성 */
			if( msgDivObj == null ) {
				msgDivObj = doc.createElement("div");
				msgDivObj.id = _option.msgInfo.msgId;			
				_setStyle(msgDivObj);
				let img = doc.createElement("img");
				img.setAttribute("src", _option.msgInfo.imgUrl);
				img.setAttribute("height", _option.msgInfo.imgHeight);
				msgDivObj.appendChild(img);
				let textDiv = doc.createElement("div");
				if( _option.msgInfo.msgTexts && Array.isArray(_option.msgInfo.msgTexts) && _option.msgInfo.msgTexts.length > 0 ) {
					for( let text of _option.msgInfo.msgTexts ) {
						if( textDiv.innerHTML ) {
							textDiv.append(doc.createElement("br"));
						}
						textDiv.append(doc.createTextNode(text));
					}
				}
				msgDivObj.appendChild(textDiv);
				doc.body.appendChild(msgDivObj);
			}
			else {
				msgDivObj.style.display = "block";
			}
			
		};
		
		let _offBlockUi = function() {
			if( !_option ) {
				_option = mUtils.object.merge(DEFAULT_OPTION, {});
			}
			let doc = document;
			let blockDivObj = doc.querySelector(`#${_option.blockId}`);
			let msgDivObj = doc.querySelector(`#${_option.msgInfo.msgId}`);
			if( blockDivObj && blockDivObj.style.display !== "none" ) {
				blockDivObj.style.display = "none";	
			}
			
			if( msgDivObj && msgDivObj.style.display !== "none" ) {
				msgDivObj.style.display = "none";	
			}	
		};
		
		return {
			init : function(option) {
				_init(option);	
			}
			, onBlockUi : function() {
				_onBlockUi();
			}
			, offBlockUi : function() {
				_offBlockUi();
			}	
		};
	});	
	global.mUtils = Object.assign({}, global.mUtils, {
		blockUi : new BlockUi()
	});
	
}(this));
	