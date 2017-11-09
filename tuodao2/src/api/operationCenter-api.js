var _td = require('util/td.js');

var _product = {
// 我的优惠券下api接口
	// 优惠券分页查询
	getCoupon : function(type,status,lock,pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('router/op/getUserDiscountPagedList'),
			// url     : _td.getServerUrl('/coupon.json'),
			data    : {
				discountType	: type,
				discountStatus	: status,
				discountLock	: lock,
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	pagingDyq : function(pages,pageNum,pageSize,backFuntion){
		$(".dyq_page").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	},
	pagingJxq : function(pages,pageNum,pageSize,backFuntion){
		$(".jxq_page").createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	},
// 我的积分下api接口
	// 积分统计数值（可用，累计）
	getPoints : function(resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getMyScoreStatistic'),
			url     : _td.getServerUrl('/points.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取Points_exchange 积分兑换专区分页查询
	getPoints_exchange : function(pagenum,pagesize,resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getScoreMallPaged'),
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
			// url     : _td.getServerUrl('router/op/scoreExchange'),
			url     : _td.getServerUrl('/points_exchange.json'),
			data    : {
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
			// url     : _td.getServerUrl('router/op/getMyScoreDetailPaged'),
			url     : _td.getServerUrl('/points_detail_table.json'),
			data    : {
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
			// url     : _td.getServerUrl('router/op/findUserTask'),
			url     : _td.getServerUrl('/points_get_table.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 20 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 签到
	getUserSign : function(resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/userSign'),
			url     : _td.getServerUrl('/userSign.json'),
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
	},
// 抽奖下api接口
	// 抽礼品
	getDraw_present : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/draw_present.json'),
			success : resolve,
			error   : reject
		});
	},
	// 抽积分
	getDraw_points : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/draw_points.json'),
			success : resolve,
			error   : reject
		});
	},
	// 抽獎結果
	getDraw_result : function(type,needScore,resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getInverstResult'),
			url     : _td.getServerUrl('/draw_result.json'),
			data    : {
				inverstType		: type,
				score			: needScore
			},
			success : resolve,
			error   : reject
		});
	},
	// 抽奖记录
	getDrawRecord : function(pagenum,pagesize,resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getInviteRecord'),
			url     : _td.getServerUrl('/draw_record.json'),
			success : resolve,
			error   : reject
		});
	},
// 我的邀请下api
	// 邀请记录
	getInviteRecord : function(pagenum,pagesize,resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getInviteRecord'),
			url     : _td.getServerUrl('/invite_record.json'),
			success : resolve,
			error   : reject
		});
	},
	// 存管信息
	getUserDepository	: function(resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('router/tc/tender/check_bank'),
			success : resolve,
			error   : reject
		});
	},
	// 用户理财师等级信息
	getLev : function(resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('router/account/getFinancialPlanner'),
			success : resolve,
			error   : reject
		});
	},
	// 邀请链接地址
	getLink	: function(resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/getInviteRecord'),
			url     : _td.getServerUrl('/invite_link.json'),
			success : resolve,
			error   : reject
		});
	},
	// 邀请码
	getCode	: function(resolve,reject){
		_td.request({
			url     : _td.getServerUrl('/user.json'),
			success : resolve,
			error   : reject
		});
	},
// 会员账户信息
	getMemberInfo : function(resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/user/getUserAccountInfo'),
			url     : _td.getServerUrl('/user.json'),
			success : resolve,
			error   : reject
		});
	},
// 新手任务查询
	getNewtask : function(resolve, reject){
		_td.request({
			// url     : _td.getServerUrl('router/op/findUserTask'),
			url     : _td.getServerUrl('/points_get_table.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取账户信息 
	getUserOper : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/userOperation.json'),
			success : resolve,
			error   : reject
		});
	},
	// 签到 
	userSign : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/userSign.json'),
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