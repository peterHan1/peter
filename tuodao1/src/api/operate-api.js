var _td = require('util/td.js');

var _welfare = {
// 我的优惠券下api接口
	// 优惠券分页查询
	getCoupon : function(headerData,Data,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getUserDiscountPagedList'),
			data    	: Data,
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
// 我的积分下api接口
	// 积分统计数值（可用，累计）
	getPoints : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getMyScoreStatistic'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取Points_exchange 积分兑换专区分页查询
	getPoints_exchange : function(headerData,pagenum,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getScoreMallPaged'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				currentPage 	: pagenum,
				pageSize 		: 6
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 积分兑换提交
	getPoint_submit : function(Data,headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/scoreExchange'),
			data    	: Data,
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取points_detail 积分明细
	getPoints_detail : function(headerData,pagenum,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/op/getMyScoreDetailPaged'),
			data    : {
				currentPage 	: pagenum,
				pageSize 		: 10
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 积分获取,任务列表
	getPoints_get : function(headerData,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/op/findUserTask'),
			data    : {
				currentPage 	: 1,
				pageSize 		: 1000
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 积分统计数值（可用，累计）
	getGold : function(headerData,resolve, reject){
		_td.request({
			method		: "get",
			url     	: _td.getServerUrl('/gold.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取gold_exchange 金币兑换专区分页查询
	/* getGold_exchange : function(headerData,pagenum,resolve, reject){
		_td.request({
			method		: "get",
			url     	: _td.getServerUrl('/gold_exchange.json'),
			data    	: {
				currentPage 	: pagenum,
				pageSize 		: 6
			},
			success 	: resolve,
			error   	: reject
		});
	},*/
	// 积分兑换提交
	/* getGold_submit : function(Data,headerData,resolve, reject){
		_td.request({
			method		: "get",
			url     	: _td.getServerUrl('/'),
			data    	: Data,
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},*/
	// 获取Gold_detail 金币明细
	/* getGold_detail : function(headerData,pagenum,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/gold_detail.json'),
			data    : {
				currentPage 	: pagenum,
				pageSize 		: 10
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},*/
	// 积分获取,任务列表
	/* getGold_get : function(headerData,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/gold_get.json'),
			data    : {
				currentPage 	: 1,
				pageSize 		: 1000
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},*/
// 抽奖下api接口
	// 抽獎結果
	getDraw_result : function(headerData,type,needScore,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getInverstResult'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				inverstType		: type,
				score			: needScore
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 抽奖记录
	getDrawRecord : function(headerData,pagenum,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getPcMyPrizeResult'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pagenum,
				pageSize 		: 5
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 抽奖详情统计
	getDrawCount : function(headerData,resolve,reject){
		_td.request({
			// url     : _td.getServerUrl('api/router/op/getMyDrawStatistic'),
			url     	: _td.getServerUrl('/draw_record.json'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
// 我的邀请下api
	// 邀请记录
	getInviteRecord : function(headerData,pagenum,pagesize,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getInviteRecord'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 是否激活存管
	getUserDepository	: function(headerData,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/check_bank'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 用户理财师等级信息
	getFinancialPlanner : function(headerData,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/account/getFinancialPlanner'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 邀请链接地址
	getLink	: function(headerData,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/user/getInviteUrl'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 邀请码
	getCode	: function(headerData,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/user/getUserAccountInfo'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
// 获取会员账户信息
	getMemberInfo : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/user/getUserAccountInfo'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取用户vip信息
	getLevInfo : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/user/getUserVipInfo'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
// 新手任务查询
	getNewtask : function(resolve, reject){
		_td.request({
			// url     	: _td.getServerUrl('router/op/findUserTask'),
			url     	: _td.getServerUrl('/points_get_table.json'),
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取账户信息
	getUserOper : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getUserOperationData'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取签到信息
	userSign : function(headerData,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/op/checkSign'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 点击签到
	addUserSign : function(headerData,resolve, reject){
		_td.request({
			url      : _td.getServerUrl('api/router/op/userSign'),
			accessId : headerData.accessId,
			accessKey: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 投资详情页 获取优惠券
	getDiscounts : function(headerData,params,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/getUserDiscountTenderList'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			success 	: resolve,
			error   	: reject
		});
	},
	getNewtask : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/findUserTask'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				type 		: 2,
				currentPage	: 1,
				pageSize 	: 1000
			},
			success 		: resolve,
			error   		: reject
		});
	},
	getNews : function(headerData,type,pagenum,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/selectContentByContentRemark'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				contentRemark 		: type,
				currentPage			: pagenum,
				pageSize 			: 10
			},
			success 	: resolve,
			error   	: reject
		});
	},
	getNewsDetail : function(headerData,ids,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/op/selectContentByContentId'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				contentId 		: ids
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 首页BANNER
	indexBanner: function(data,resolve, reject){
		_td.request({
			url 	: _td.getServerUrl('api/router/op/selectPCBannerByParams'),
			data 	: data,
			success : resolve,
			error 	: reject
		});
	},
	// 获取消息列表
	getMailLogs :  function(headerData,pagenum,pagesize,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/op/getMailLogs'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data: {
				currentPage:pagenum,
				pageSize:pagesize
			},
			success : resolve,
			error: reject
		});
	},
	// 获取未读消息条数
	getMailLogsCountNoRead: function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/op/getMailLogsCountNoRead'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error: reject
		});
	},
	// 全部标记为已读
	allRead: function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/op/allRead'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error: reject
		});
	}
};
module.exports = _welfare;