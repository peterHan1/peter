var _td = require('util/td.js');

var _product = {
	// 获取总待收金额
	getsumMoney : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInReSumMoney.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 获取本息
	getMoney : function(day,type,resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInReMoney.json'),
			data    : {
				month	: day,
				type 	: type,
			},
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 当月某天回款
	getMonth : function(resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInReDate.json'),
			// beforeSend: function(xhr){
			// 	xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
			// 	xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
			// 	xhr.setRequestHeader("sign", "NO");
			// },
			success : resolve,
			error   : reject
		});
	},
	// 获取回款列表
	getRturnList : function(day,type,pagesize,current,resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInReList.json'),
			data    : {
				day			: day,
				type 		: type,
				pageSize 	: 5 || pagesize,
				currentPage : 1 || current
			},
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