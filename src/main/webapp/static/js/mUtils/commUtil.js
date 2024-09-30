'use strict';

(function(global) {
	
	const ObjectUtil = (function() {
		"use strict";
		let _merge = function(target, source) {
			for (let key of Object.keys(source)) {
	    		if (source[key] instanceof Object) Object.assign(source[key], _merge(target[key], source[key]))
	  		}
	
	  		// Join `target` and modified `source`
	  		Object.assign(target || {}, source)
	  		return target;	
		};
		return {
			merge : function(target={}, source={}) {
				return _merge(target, source);	
			}
		};
	});	
	/*
	class ObjectUtil {
		#test = "111";
		merge(target, source) {
			for (let key of Object.keys(source)) {
	    		if (source[key] instanceof Object) Object.assign(source[key], ObjectUtil.merge(target[key], source[key]))
	  		}
	
	  		// Join `target` and modified `source`
	  		Object.assign(target || {}, source)
	  		return target;	
		};
	};
	*/
	
	
	class FormUtil {
		constructor() {
		}
		debugger;
		serializeObject() {
			debugger;
			return this.serializeObject();
		};
	};
	/* end - FormUtil */
	
	Element.prototype.serializeObject = function() {
		debugger;
		let nodeList = this.querySelectorAll("input,select");
		if( nodeList ) {
			nodeList.forEach(function(node) {
	    		console.log(node.disabled);
				if( node.disabled ) {
					node.disabled = false;
					node.setAttribute("isDisabled", true);
				}
			});
		}
		
		
		let formData = new FormData(this);
		nodeList.forEach(function(node) {
			console.log(node.disabled);
			if( node.getAttribute("isDisabled") ) {
				node.disabled = true;
				node.removeAttribute("isDisabled");
			}
		});
		return Array.from(formData.entries()).reduce((memo, [key, value]) => ({...memo, [key]:value,}), {});
	};
	
	class StringUtil {
		constructor() {
			this.LF = "\n";
		}
		
	    /**
	     * Checks if a CharSequence is empty ("") or null.
	     *
	     * NC.String.isEmpty(null)      = true
	     * NC.String.isEmpty("")        = true
	     * NC.String.isEmpty(" ")       = false
	     * NC.String.isEmpty("bob")     = false
	     * NC.String.isEmpty("  bob  ") = false
	     */
		isEmpty = function(cs) {
			return cs == null || cs.length == 0;
		};
		
		/**
	     * Checks if a CharSequence is empty (""), null or whitespace only.
	     *
	     * NC.String.isBlank(null)      = true
	     * NC.String.isBlank("")        = true
	     * NC.String.isBlank(" ")       = true
	     * NC.String.isBlank("bob")     = false
	     * NC.String.isBlank("  bob  ") = false
	     */
		isBlank = function(cs) {
			return cs == null || cs.length == 0 || cs.trim().length == 0;
		};
		
		/**
	     * If "cs" is null then return "replaceCs".
	     */
		nvl = function(cs, replaceCs) {
			var csType = typeof cs;     
        
	        if( cs == null ) return replaceCs;
	        else if( csType === 'string' && this.isBlank(cs) ) return replaceCs; 
	        else if( csType === 'number' && cs === 0 ) return replaceCs;
	        else if( csType === 'boolean' && cs === false) return replaceCs;
	        
	        return cs;
		};
		
		lengthb = function(str) {
			if( str == null ) {
				return 0;
			}
			
			str = String(str);
				        
	        var b, i, c;            
	        //c>>11 : charCode가 2047보다 큰 경우 3bytes
	        //c>>7  : charCode가 2047이하, 0~127(ASCII Code)은 1bytes, 아니면 2bytes
	        //c>>16 : 4bytes 체크가 필요할 때
	        //for ( b = i = 0; c = str.charCodeAt(i++); b += c>>16 ? 4 : c>>11 ? 3 : c>>7 ? 2 : 1 );  //4바이트 체크
	        //for ( b = i = 0; c = str.charCodeAt(i++); b += c>>11 ? 3 : c>>7 ? 2 : 1 );            //한글 3bytes처리
	        for( b = i = 0; c = str.charCodeAt(i++); b += c>>7 ? 2 : 1 );                        //현재 DB 캐릭터셋 기준으로 ASCII 이외에 2bytes로 간주
	        
	        return b;
	    };

	    /**
	     * Left pad a String with spaces (' ').
		 *
	     * NC.String.leftPad(null, *)   = null
	     * NC.String.leftPad("", 3)     = "   "
	     * NC.String.leftPad("bat", 3)  = "bat"
	     * NC.String.leftPad("bat", 5)  = "  bat"
	     * NC.String.leftPad("bat", 1)  = "bat"
	     * NC.String.leftPad("bat", -1) = "bat"
	     */
	    leftPad = function(str, size, padChar) {
			if(str == null) {
				return null;
			}
			
			if(padChar == null) {
				padChar = ' ';
			}
			
	        const pads = size - String(str).length;
	        if(pads <= 0) {
	            return String(str);
	        }
	        
	        return padChar.repeat(pads).concat(String(str));
	    };

	    /**
	     * Right pad a String with spaces (' ').
	     *
	     * NC.String.rightPad(null, *)   = null
	     * NC.String.rightPad("", 3)     = "   "
	     * NC.String.rightPad("bat", 3)  = "bat"
	     * NC.String.rightPad("bat", 5)  = "bat  "
	     * NC.String.rightPad("bat", 1)  = "bat"
	     * NC.String.rightPad("bat", -1) = "bat"
	     */
	    rightPad = function(str, size, padChar) {
			if(str == null) {
				return null;
			}
			
			if(padChar == null) {
				padChar = ' ';
			}
			
	        const pads = size - String(str).length;
	        if(pads <= 0) {
	            return String(str);
	        }
	        
	        return String(str).concat(padChar.repeat(pads));
	    };

	    /**
	     * Checks if the String contains only numeric.
	     * 
	     * NC.String.isNumeric(null)   = false
	     * NC.String.isNumeric("")     = false
	     * NC.String.isNumeric("  ")   = false
	     * NC.String.isNumeric("123")  = true
	     * NC.String.isNumeric("12 3") = false
	     * NC.String.isNumeric("ab2c") = false
	     * NC.String.isNumeric("12-3") = false
	     * NC.String.isNumeric("12.3") = true
	     * NC.String.isNumeric("-123") = true
	     * NC.String.isNumeric("+123") = true
	     */
		isNumeric = function(cs) {
			if(typeof cs === 'string' && this.isBlank(cs)) {
				return false;
			}
			
			return !isNaN(cs);
		};
		
		isInteger = function(cs) {
			if(!this.isNumeric(cs)) { return false; }
			
			return parseInt(cs, 10) === parseFloat(cs, 10);
		};
		
		// 소수점 n자리까지 표현
		toDecimalPoint = function(cs, fixed) {
			if(this.isNumeric(cs)) {
				if(!this.isInteger(fixed)) {
					fixed = 0;
				}
				
				return (Math.round((Number(cs) * 100).toPrecision(15)) / 100).toFixed(fixed)
			} else {
				return cs;
			}
		};
		
		// 소수점 n자리까지 표현(구분 추가, 버림, 올림, 반올림)
		toDecimalPoint2 = function(cs, type, fixed) {
			if(NC.String.isNumeric(cs)) {
				if(!NC.String.isInteger(fixed)) {
					fixed = 0;
				}
				let setNum = Math.pow(10, fixed);
				
				if(type == 1){
					return (Math.floor((Number(cs) * setNum).toPrecision(15) ) / setNum).toFixed(fixed);
				}else if(type == 2){
					return (Math.ceil((Number(cs) * setNum).toPrecision(15) ) / setNum).toFixed(fixed);
				}else{
					return (Math.round((Number(cs) * setNum).toPrecision(15) ) / setNum).toFixed(fixed);
				}
			} else {
				return cs;
			}
		}
		
		to3comma = function(cs) {
			if(typeof cs === 'number') { cs = String(cs); }
			if(this.isBlank(cs)) { return cs; }
			if(!this.isNumeric(cs)) { return cs; }
			
			return Number(cs).toLocaleString(navigator.language);
		};
		
		/**
		 * 종성이 존재하는지 여부를 검사한다.
		 */
		isFinalConsonant = function(str) {
		    var code = str.charCodeAt(str.length - 1);
		    if ((code < 44032) || (code > 55197)) {
		        return false;
		    }
		    if((code -16)%28 == 0) {
		        return false;
		    }
		    return true;
		};
		
		toCamelCase = function(str) {
			return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
		};
		
		/**
		 * NC.String.startsWith(null, null)      = true
		 * NC.String.startsWith(null, "abc")     = false
		 * NC.String.startsWith("abcdef", null)  = false
		 * NC.String.startsWith("abcdef", "abc") = true
		 * NC.String.startsWith("ABCDEF", "abc") = false 
		 */
		startsWith = function(str, prefix) {
			if(str == null || prefix == null) {
				return str == prefix;
			}
			if (prefix.length > str.length) {
				return false;
			}
			
			var regexp = new RegExp('^' + prefix, 'gi');
			
			return regexp.test(str);
		};
		
		/**
		 * NC.String.endsWith(null, null)      = true
		 * NC.String.endsWith(null, "def")     = false
		 * NC.String.endsWith("abcdef", null)  = false
		 * NC.String.endsWith("abcdef", "def") = true
		 * NC.String.endsWith("ABCDEF", "def") = false
		 * NC.String.endsWith("ABCDEF", "cde") = false
		 * NC.String.endsWith("ABCDEF", "")    = true 
		 */
		endsWith = function(str, suffix) {
			if(str == null || suffix == null) {
				return str == suffix;
			}
			if (suffix.length > str.length) {
				return false;
			}
			
			var regexp = new RegExp(suffix + '$', 'gi');
			
			return regexp.test(str);
		};
		
		getRandom = function(){
			return (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0]/2**32;
		};
	};
	
	const BlockUiUtil = (function() {
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
		
feature		return {
			init : function(option={}) {
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
		object : new ObjectUtil()
		, string : new StringUtil()
		, form : new FormUtil()
		, blockUi : new BlockUiUtil ()
	});
	
}(this));

	