var _td = require('util/td.js');

var _product = {
	// 散标详情
	getScstter : function(id,resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInListScaTlt.json'),
			/*beforeSend: function(xhr){
				xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
				xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
				xhr.setRequestHeader("sign", "NO");
			},*/
			data    : {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	getScstterList : function(id,current,page,resolve, reject){
		_td.request({
			// method	: 'POST',
			url     : _td.getServerUrl('/unInListScaList.json'),
			/*beforeSend: function(xhr){
				xhr.setRequestHeader("accessId", "4e6f51c9b902eee2aa9c6be0b9498903");
				xhr.setRequestHeader("accessKey", "/v8anga5adaamaa4adeamgayadmazqbiadaazabhaduanwazadyaoqbkadaamqbiadeamqbiadyaywbkadaaywbh");
				xhr.setRequestHeader("sign", "NO");
			},*/
			data    : {
				tenderId 	: id,
				currentPage : current,
				pageSize 	: page
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