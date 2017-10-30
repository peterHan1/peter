var _td = require('util/td.js');

var _product = {
	// 精选计划
	getSift : function(id,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			method	: 'POST',
			url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/joinPlanController/getTenderByUserId'),
			beforeSend: function(xhr){
				xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
				xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
				xhr.setRequestHeader("sign", "NO");
			},
			data    : {
				userId 		: id,
				status 		: sta 		|| " ",
				startTime 	: startime 	|| " ",
				endTime 	: endtime 	|| " ",
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
			},
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