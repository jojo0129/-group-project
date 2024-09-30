
	class BlockUi {
		constructor() {
			this.option = {
				blockId : "blockDiv"
				, msgInfo : {
					msgId : "msgDiv"
					, imgUrl : "/images/egovframework/cmmn/spinner.gif"
					, imgHeight : "140px"
					, msgTexts : ["데이터를 처리중입니다.", "잠시만 기다려 주세요."]
				} 
			};
		}
		
		setStyle(blockObj) {
			if( blockObj.id == this.option.blockId ) {
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
			else if( blockObj.id == this.option.msgInfo.msgId ) {
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
		
		onBlockUi() {
			let doc = document;
			let blockDivObj = doc.querySelector(`#${this.option.blockId}`);
			let msgDivObj = doc.querySelector(`#${this.option.msgInfo.msgId}`);
			/* block div 생성 */
			if( blockDivObj == null ) {
				blockDivObj = doc.createElement("div");
				blockDivObj.id = this.option.blockId;
				this.setStyle(blockDivObj);
				doc.body.appendChild(blockDivObj);
			}
			else {
				blockDivObj.style.display = "block";
			}
			
			/* message div 생성 */
			if( msgDivObj == null ) {
				msgDivObj = doc.createElement("div");
				msgDivObj.id = this.option.msgInfo.msgId;			
				this.setStyle(msgDivObj);
				let img = doc.createElement("img");
				img.setAttribute("src", this.option.msgInfo.imgUrl);
				img.setAttribute("height", this.option.msgInfo.imgHeight);
				msgDivObj.appendChild(img);
				let textDiv = doc.createElement("div");
				if( this.option.msgInfo.msgTexts && Array.isArray(this.option.msgInfo.msgTexts) && this.option.msgInfo.msgTexts.length > 0 ) {
					for( let text of this.option.msgInfo.msgTexts ) {
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
		}
		
		offBlockUi() {
			let doc = document;
			let blockDivObj = doc.querySelector(`#${this.option.blockId}`);
			let msgDivObj = doc.querySelector(`#${this.option.msgInfo.msgId}`);
			if( blockDivObj && blockDivObj.style.display !== "none" ) {
				blockDivObj.style.display = "none";	
			}
			
			if( msgDivObj && msgDivObj.style.display !== "none" ) {
				msgDivObj.style.display = "none";	
			}
		}
	};
	
	export { BlockUi };
	