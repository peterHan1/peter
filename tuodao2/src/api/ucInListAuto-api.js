var _td = require('util/td.js');

var _product = {
	getAutoBank : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/check_bank.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	getInpForm: function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInAutoInp.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 关闭自动投标
	closeAuto : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/close_auto_tender.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 开启自动投标总人数
	closeAuto : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInAutoInp.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 自动投标记录
	getautoList : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInAutoList.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	paging : function(pages,pageNum,pageSize,backFuntion){
		$(".zxf_pagediv").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	}

};
module.exports = _product;