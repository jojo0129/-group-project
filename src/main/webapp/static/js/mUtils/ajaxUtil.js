(function(global) {
	const ajaxUtil = (function() {
		"use strict";
		let DEFAULT_OPTION = {
			useBlockUi : true
			, type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			beforeSend: function(xhr, settings) {
				debugger;
				if ( this.useBlockUi ) mUtils.blockUi.onBlockUi();
				xhr.setRequestHeader('AJAX', true);
				if(typeof this.custBeforeSend === 'function') {
					this.custBeforeSend.call(this, xhr, settings);
				}
			},
			success: function(resp) {
				debugger;
				if(typeof this.custSuccess === 'function') {
					
					this.custSuccess.call(this, resp);
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				debugger;
				//공통 예외에 대해 alert
				if(xhr.responseJSON && xhr.responseJSON.message) {
					alert( xhr.responseJSON.message);
				} else {
					if(typeof Mutil.ajax.ignoreError === 'boolean' && !Mutil.ajax.ignoreError) {
						if(xhr.status == 504){
							console.log('통신이 일시적으로 끊어졌습니다.')
						}else if(xhr.status == 500){
							alert('알 수 없는 에러가 발생하였습니다.');
						}else{
							alert('알 수 없는 에러가 발생하였습니다.' + xhr.status);
						}
					}
				}
				if(typeof this.custEerror === 'function') {
					this.custEerror.call(this, xhr, textStatus, errorThrown);
				}
			},
			complete: function(xhr, textStatus) {
				debugger;
				if(typeof this.custComplete === 'function') {						
					this.custComplete.call(this, xhr, textStatus);
				}
				if ( this.useBlockUI ) Mutil.blockUI.unblockUI();
			}
			, custBeforeSend : null
			, custSuccess : null
			, custEerror : null
			, custComplete : null
		};
		let _option = null;
		let _init = function(option={}) {
			_option = mUtils.object.merge(DEFAULT_OPTION, option);
			_option.useBlockUi = typeof option.useBlockUi === 'boolean' ? option.useBlockUi : true;
			
			// 조사파라미터체크후 재생성
			let newUrl = _option.url;
			if( !newUrl ) {
				alert("URL 정보를 확인할 수 없습니다.");
				return false;
			}
			//옵션 필요시 여기에 추가
			let paramUrlSplit = _option.url.split('/');
			let sysIdByUrl = '';
			if(!mUtils.string.isEmpty(_option.url) && _option.url.length > 0) {
				sysIdByUrl = paramUrlSplit[1];
			}
			
			if(paramUrlSplit.length > 0) {
				newUrl = '';
				
				let chkCnt = 0;
				let tmpChkUrl = '';
				for(var x = 0; x < paramUrlSplit.length; x++) {
					if(mUtils.string.isBlank(paramUrlSplit[x])) continue;
					
					/*
					 * ※ 조사시스템 파라미터처리
					 * /ismp/aa/ismpaa100m01/rcrit-pbanc-list
					 * >>
					 * /ismp/aa/p12345.e1234/ismpaa100m01/rcrit-pbanc-list 로 변경
					 */
					if(sysIdByUrl != 'icsm') {
						if(chkCnt < 2) {
							tmpChkUrl += paramUrlSplit[x];
						} else if(chkCnt == 2) {
							if(mUtils.string.startsWith(paramUrlSplit[x], tmpChkUrl)) {
								const sSvyParam = sessionStorage.getItem('svyParam');
								newUrl += (mUtils.string.isEmpty(sSvyParam) ? '' : '/' + sSvyParam);
							}
						}
					}
					
					newUrl += '/' + paramUrlSplit[x];
					
					++chkCnt;
				}
				_option.url = newUrl;
			}
			
			// formdata 형식이면
			if(_option.enctype == 'multipart/form-data') {
				_option.processData = false;
				_option.contentType = false;
				_option.cache = false;
				
				_option.enctype = '';
			}
			return _option;
		};
		
		let _call = function() {
			let httpRequest = new XMLHttpRequest();
			debugger;
			 httpRequest.onreadystatechange = () => {
		    	/* readyState가 Done이고 응답 값이 200일 때, 받아온 response로 name과 age를 그려줌 */
			    if (httpRequest.readyState === XMLHttpRequest.DONE) {
					if (httpRequest.status === 200) {
				    	let result = httpRequest.response;
				        debugger;
					} else {
						debugger;
				    	alert('request에 뭔가 문제가 있어요.');
				    }
				}
	    	};
			/* Post 방식으로 요청 */
		    httpRequest.open(_option.type, _option.url, true);
		    /* Response Type을 Json으로 사전 정의 */
		    httpRequest.responseType = _option.dataType;
		    /* 요청 Header에 컨텐츠 타입은 Json으로 사전 정의 */
		    httpRequest.setRequestHeader('Content-Type', _option.contentType);
		    /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */
		    httpRequest.send(_option.data);
		};
		
		return {
			request : function(option) {
				_init(option);
				_call();	
			}
		};
	});	
	global.mUtils = Object.assign({}, global.mUtils, {
		ajax : new ajaxUtil()
	});
	
}(this));

	