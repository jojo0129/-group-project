/*
console.log("script import before");
const utils = {};
const test = await import('./mod.js');
let test1 = await import('./BlockUi.js');
console.log("script import after");
utils.stringUtils = new test.StringUtils();
utils.numberUtils = new test.StringUtils();
utils.blockUi = new test1.BlockUi();

console.log(utils.stringUtils.capitalize("test"));
utils.blockUi.onBlockUi();
utils.blockUi.offBlockUi();
*/
'use strict';
console.log("script before");
let test = await import('./mod.js');
let test1 = await import('./BlockUi.js');
let utils;
(function(global) {
	utils = Object.assign({}, {
		stringUtils : new test.StringUtils()
	});
	console.log("script after1");
}(this));
console.log("script after2");