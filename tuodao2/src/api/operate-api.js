var _td = require('util/td.js');

var _operate = {
	// 优惠券分页查询
	getCoupon : function(headerData,Data,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getUserDiscountPagedList',
			data    	: Data,
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 积分统计数值（可用，累计）
	getPoints : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getMyScoreStatistic',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取Points_exchange 积分兑换专区分页查询
	getPoints_exchange : function(headerData,pagenum,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getScoreMallPaged',
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
			url     	: '/api/router/op/scoreExchange',
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
			url     : '/api/router/op/getMyScoreDetailPaged',
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
	getTasks : function(headerData,status,resolve, reject){
		_td.request({
			url     : '/api/router/op/findUserTask',
			data 		: {
				type 		: status,
				currentPage	: 1,
				pageSize 	: 1000
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 金币统计数值（可用，累计）
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
	getGold_exchange : function(headerData,pagenum,resolve, reject){
		_td.request({
			method		: "get",
			url     	: _td.getServerUrl('/gold_exchange.json'),
			data    	: {
				currentPage 	: pagenum,
				pageSize 		: 6
			},
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 金币兑换提交
	getGold_submit : function(Data,headerData,resolve, reject){
		_td.request({
			method		: "get",
			url     	: _td.getServerUrl('/'),
			data    	: Data,
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取Gold_detail 金币明细
	getGold_detail : function(headerData,pagenum,resolve, reject){
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
	},
	// 金币获取,任务列表
	getGold_get : function(headerData,resolve, reject){
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
	},
	// 抽獎結果
	getDraw_result : function(headerData,type,needScore,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getInverstResult',
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
			url     	: '/api/router/op/getPcMyPrizeResult',
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
	// 邀请记录
	getInviteRecord : function(headerData,pagenum,resolve,reject){
		_td.request({
			url     	: '/api/router/op/getInviteRecord',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				currentPage 	: pagenum,
				pageSize 		: 10
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 用户理财师等级信息
	getFinancialPlanner : function(headerData,resolve,reject){
		_td.request({
			url     	: '/api/router/op/myInvitingView',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 邀请链接地址
	getLink	: function(headerData,resolve,reject){
		_td.request({
			url     	: '/api/router/user/getInviteUrl',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取会员账户信息
	getMemberInfo : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/user/getUserAccountInfo',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取用户vip信息
	getLevInfo : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/user/getUserVipInfo',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 新手专区获取首页新手标1信息
	getNewInfo : function(resolve, reject){
		_td.request({
			url     : '/api/router/getJuniorJump',
			success : resolve,
			error   : reject
		});
	},
	// 获取账户信息
	getUserOper : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getUserOperationData',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 获取签到信息
	userSign : function(headerData,resolve, reject){
		_td.request({
			url     : '/api/router/op/checkSign',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 点击签到
	addUserSign : function(headerData,resolve, reject){
		_td.request({
			url      : '/api/router/op/userSign',
			accessId : headerData.accessId,
			accessKey: headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 投资详情页 获取优惠券
	getDiscounts : function(headerData,params,resolve, reject){
		_td.request({
			url     	: '/api/router/op/getUserDiscountTenderList',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			asyncType	: true,
			success 	: resolve,
			error   	: reject
		});
	},
	// 媒体公告理财百科列表
	getNews : function(headerData,type,pagenum,resolve, reject){
		_td.request({
			url     	: '/api/router/op/selectContentByContentRemark',
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
	// 媒体公告理财百科详情
	getNewsDetail : function(headerData,ids,resolve, reject){
		_td.request({
			url     	: '/api/router/op/selectContentByContentId',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				contentId 		: ids
			},
			success 	: resolve,
			error   	: reject
		});
	},
	// 新手指南信息披露
	getGuideData : function(headerData,resolve, reject){
		_td.request({
			url     	: '/api/router/getPlatfromTaskPlatData',
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 首页BANNER
	indexBanner: function(data,resolve, reject){
		_td.request({
			url 	: '/api/router/op/selectPCBannerByParams',
			data 	: data,
			success : resolve,
			error 	: reject
		});
	},
	// 获取消息列表
	getMailLogs :  function(headerData,pagenum,pagesize,resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/op/getMailLogs',
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
			url     : '/api/router/op/getMailLogsCountNoRead',
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
			url     : '/api/router/op/allRead',
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error: reject
		});
	},
	// 平台数据-7日数据播报
	getPlatfromWeekVolumeChart: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromWeekVolumeChart',
			success : resolve,
			error: reject
		});
	},
	// 平台月度数据播报
	getPlatfromMonthVolumeChart: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromMonthVolumeChart',
			success : resolve,
			error: reject
		});
	},
	// 借款排行榜
	getPlatfromBorrowRank: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromBorrowRank',
			success : resolve,
			error: reject
		});
	},
	// 平台数据
	getPlatfromTaskPlatData: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromTaskPlatData',
			success : resolve,
			error: reject
		});
	},
	// 今日投资风云榜
	getPlatfromDayRank: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromDayRank',
			success : resolve,
			error: reject
		});
	},
	// 月度投资风云榜
	getPlatfromMonthRank: function(resolve,reject){
		_td.request({
			method	: 'post',
			url     : '/api/router/getPlatfromMonthRank',
			success : resolve,
			error: reject
		});
	}
};
module.exports = _operate;