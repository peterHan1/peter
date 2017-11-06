var _td = require('util/td.js');

var _product = {
	// 新手任务查询
	getNewtask : function(resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/findUserTask'),
			url     : _td.getServerUrl('/points_get_table.json'),
			/*data    : {
				accessId	: userId,
				accessKey	: userKey
			},*/
			/*beforeSend: function(xhr) {
				xhr.setRequestHeader("accessId", "dd7cb9c1611b25f2761d89b51bdbcb11");
				xhr.setRequestHeader("accessKey", "/v8aoqbjagiangazagqangaxadyazga5agqaywbhadmamaa1adiamabiadqaygbiadaayqbhadcanabladyanaaw");
				xhr.setRequestHeader("sign", "NO");
			},*/
			success : resolve,
			error   : reject
		});
	},
	pagingGold : function(pages,pageNum,pageSize,backFuntion){
		$(".gold_page").createPage({
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