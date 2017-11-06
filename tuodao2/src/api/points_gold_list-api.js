var _td = require('util/td.js');

var _product = {
	// 积分数值（可用，累计）
	getPoints : function(resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getMyScoreStatistic'),
			url     : _td.getServerUrl('/points.json'),
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
	// 获取Points_exchange 积分兑换专区分页查询
	getPoints_exchange : function(pagenum,pagesize,resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getScoreMallPaged'),
			url     : _td.getServerUrl('/points_exchange.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 6 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 积分兑换提交
	getGoods_exchange : function(goodsId,goodsType,goodsNum,needScore,resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/scoreExchange'),
			url     : _td.getServerUrl('/points_exchange.json'),
			data    : {
				/*accessId	: userId,
				accessKey	: userKey,*/
				id 			: goodsId,
				type		: goodsType,
				goodsNum 	: goodsNum,
				sumScore 	: needScore
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取points_detail 积分明细
	getPoints_detail : function(pagenum,pagesize,resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/getMyScoreDetailPaged'),
			url     : _td.getServerUrl('/points_detail_table.json'),
			data    : {
				/*accessId	: userId,
				accessKey	: userKey,*/
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 积分获取,任务列表
	getPoints_get : function(pagenum,pagesize,resolve, reject){
		_td.request({
			// method	:'POST',
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/findUserTask'),
			url     : _td.getServerUrl('/points_get_table.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},

			/*headers	:{
				accessId	: userId,
				accessKey	: userKey
			},*/
			success : resolve,
			error   : reject
		});
	},
	// 签到
	getUserSign : function(resolve, reject){
		_td.request({
			// method	: "POST",
			// url     : _td.getServerUrl('http://72.127.2.140:8080/api/router/op/userSign'),
			url     : _td.getServerUrl('/userSign.json'),
			/*data    : {
				accessId	: userId,
				accessKey	: userKey
			},*/
			success : resolve,
			error   : reject
		});
	},
	pagingPoint : function(pages,pageNum,pageSize,backFuntion){
		$(".point_page").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
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