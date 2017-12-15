var _td = require('util/td.js');

// 交易中心
var _trade = {
	// 获取网银列表
	bankList: function(headerData,resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('api/router/recharge/bankList'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success: resolve,
			error: reject
		});
	},
	// 提现数据展示
	cash :  function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/tc/account/to_cash'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 申请提现
	cashApply: function(headerData,data, resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('api/router/tc/account/cash_apply'),
			data: data,
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success: resolve,
			error: reject
		});
	},
	// 获取用户提现列表
	cashList: function(headerData,pagenum, pagesize, resolve, reject) {
		_td.request({
			method: 'post',
			url: _td.getServerUrl('api/router/tc/account/cash_list'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data: {
				currentPage:pagenum,
				pageSize:pagesize
			},
			success: resolve,
			error: reject
		});
	},
	// 计算提现手续费
	cashFee :  function(headerData,cashMoney,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/tc/account/cash_fee'),
			data    : {
				cashMoney:cashMoney
			},
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 获取用户绑卡信息
	rechargeInfo :  function(headerData,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/recharge/rechargeInfo'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 网银充值
	rechargeOnline :  function(headerData,data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/recharge/online'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 快捷充值发送短信
	sendSmsCode :  function(headerData,money,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/recharge/sendSmsCode'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data    : {
				money: money
			},
			success : resolve,
			error   : reject
		});
	},
	// 快捷充值确认
	fastPay :  function(headerData,data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/recharge/fast/pay'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data    : data,
			success : resolve,
			error   : reject
		});
	},
	// 分页查询资金记录列表
	moneyRecord :  function(headerData,data,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/tc/account/account_log_list'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data: data,
			success : resolve,
			error   : reject
		});
	},
	// 获取精选计划 加入记录
	getSiftPhone : function(id,pagesize,pagenum,resolve, reject){
		_td.request({
			url  : _td.getServerUrl('api/router/joinPlanController/getJoinPlanList'),
			data : {
				borrowId	: id,
				pageSize 	: pagesize,
				currentPage : pagenum
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标详情 投资记录
	getScatterPhone : function(id,pagesize,pagenum,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/product/tender_list'),
			data    : {
				productId	: id,
				pageSize 	: pagesize,
				currentPage : pagenum
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标详情 满标投资人数
	getScatterFinis : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/product/tender_max_last'),
			data    : {
				productId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取精选计划 满标投资人数
	getSiftFinis : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/joinPlanController/getMaxAndPic'),
			data    : {
				borrowId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取investList 债权转让
	getInvestListBond : function(type,pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/creditAssignment/query'),
			data    : {
				type		: type,
				currentPage : pagenum,
				pageSize 	: pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情
	getInvestBondDetails : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/creditAssignment/query/info'),
			data    : {
				transferId	: id
			},
			asyncType: false,
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情 投资列表
	getInvestPhone : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tender/transfer/list'),
			data    : {
				transferId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情 账户中心金额
	getInvestUc : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/user/account/get_account'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 精选计划提交
	subInvestSift : function(headerData,params,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/joinPlanController/joinPlan'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			success 	: resolve,
			error   	: reject
		});
	},
	// 散标详情提交
	subInvestScatter : function(headerData,params,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/add_tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			success 	: resolve,
			error   	: reject
		});
	},
	// 散标详情 投标结果查询
	subInvestScatterResult : function(headerData,params,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/tender_result'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			success 	: resolve,
			error   	: reject
		});
	},
	// 债权转让提交
	subInvestBond : function(headerData,params,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: params,
			success 	: resolve,
			error  	 	: reject
		});
	},
	// 获取总待收金额 回款日历
	getsumMoney : function(headerData,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/tender/total_collection'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			success : resolve,
			error   : reject
		});
	},
	// 账户总览 获取本息 回款日历
	getMonthMoney : function(headerData,month,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('	api/router/tc/tender/pre_month_collection'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			data    : {
				month	: month
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取本息 回款日历
	getMoneys : function(headerData,day,type,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/month_collection'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			data    : {
				day	: day,
				type 	: type,
			},
			success : resolve,
			error   : reject
		});
	},
	// 当月某天回款 回款日历
	getMonth : function(headerData,month,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/tender/collection_days'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			data 		: {
				month : month
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取回款列表 回款日历
	getRturnList : function(headerData,day,type,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/tender/collection_calendar_list'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			data    : {
				day			: day,
				type 		: type,
				pageSize 	: 4 || pagesize,
				currentPage : 1 || current
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 精选计划
	getSift : function(headerData,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/joinPlanController/getTenderByUserId'),
			accessId	:headerData.accessId,
			accessKey	:headerData.accessKey,
			data    	: {
				status 		: sta 		|| "",
				startTime 	: startime 	|| "",
				endTime 	: endtime 	|| "",
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 精选计划投资详情
	getSiftDel : function(headerData,id,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/joinPlanController/selectTenderById'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				justId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划投资详情债权明细
	getSiftCred : function(headerData,id,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/joinPlanController/selectTenderListByChoicenessTenderId'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				justId 		: id,
				pageSize  	: pagesize 	|| 5,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划 回款计划
	getSiftReturn: function(headerData,id,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/joinPlanController/selectRecoverListBychioId'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				justId 	: id,
				pageSize  	: pagesize 	|| 5,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 散标
	getScstter : function(headerData,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/tender_list'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				status 		: sta 		|| "",
				startTime 	: startime 	|| "",
				endTime 	: endtime 	|| "",
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 散标详情
	getScstterDet : function(headerData,id,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/tender_detail'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	getScstterList : function(headerData,id,current,page,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/borrow_collection_list'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				tenderId 	: id,
				currentPage : current,
				pageSize 	: page
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 债权转让
	getBond : function(headerData,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/list'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
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
	// 以受让
	getBondyet : function(headerData,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/compromisedList'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
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
	// 申请转让
	getApply : function(headerData,id,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/preApply'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 提交申请转让
	subApply : function(headerData,id,pasw,resolve,reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/apply'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				tenderId 	: id,
				payPassword : pasw
			},
			success : resolve,
			error   : reject
		});
	},
	// 债转详情页头部
	getBondTop : function(headerData,id,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/tender/product/info'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				transferId : id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债转详情页 回款计划
	getBondRet : function(headerData,id,pagesize,current,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/creditAssignment/tender/repayment/plan'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    	: {
				tenderId : id,
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 自动投标
	getAutoBank : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/check_bank'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	getInpForm: function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/get_auto_tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 打开自动投标
	openAuto : function(headerData,param,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/add_auto_tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: param,
			success 	: resolve,
			error   	: reject
		});
	},
	// 关闭自动投标
	closeAuto : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/close_auto_tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 开启自动投标总人数
	getAutoSum : function(headerData,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/get_auto_tender'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			success 	: resolve,
			error   	: reject
		});
	},
	// 自动投标记录
	autoLists : function(headerData,pageSize,currentPage,resolve, reject){
		_td.request({
			url     	: _td.getServerUrl('api/router/tc/tender/auto_tender_list'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    : {
				pageSize: pageSize,
				currentPage: currentPage,
			},
			success 	: resolve,
			error  		: reject
		});
	},
	// 自动投标详情
	getAutoTop : function(headerData,id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('api/router/tc/tender/auto_tender_detail'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data    : {
				autoTenderId: id
			},
			success : resolve,
			error   : reject
		});
	},
	getAutoList : function(headerData,id,pagesize,current,resolve, reject){
		_td.request({
			url 		: _td.getServerUrl('api/router/tc/tender/sub_auto_tender_list'),
			accessId	: headerData.accessId,
			accessKey	: headerData.accessKey,
			data 		: {
				autoTenderId : id,
				pageSize	 : 10 || pagesize,
				currentPage	 : 1  || current
			},
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _trade;