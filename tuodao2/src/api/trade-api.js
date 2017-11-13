var _td = require('util/td.js');

// 交易中心
var _trade = {
	// 获取网银列表
	bankList: function(headerData,headerData,resolve, reject) {
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
				currentPage: 1 || pagenum,
				pageSize: 10 || pagesize
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
	moneyRecord :  function(headerData,pagenum, pagesize,resolve,reject){
		_td.request({
			method	: 'post',
			url     : _td.getServerUrl('api/router/tc/account/account_log_list'),
			accessId:headerData.accessId,
			accessKey:headerData.accessKey,
			data: {
				currentPage: 1 || pagenum,
				pageSize: 10 || pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取精选计划 加入记录
	getSiftPhone : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-siftPhone.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 10 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 获取散标详情 投资记录
	getScatterPhone : function(pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-scatterPhone.json'),
			data    : {
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 10 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},

	// 获取investList 债权转让
	getInvestListBond : function(type,pagenum,pagesize,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-listbond.json'),
			data    : {
				type			: type,
				currentPage 	: 1 	|| pagenum,
				pageSize 		: 10 	|| pagesize
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情
	getInvestBondDetails : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-bondDetails.json'),
			data    : {
				transferId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情
	getInvestPhone : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/invest-bondPhone.json'),
			data    : {
				transferId	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债权转让详情 账户中心金额
	getInvestUc : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/get_account.json'),
			success : resolve,
			error   : reject
		});
	},
	// 精选计划提交
	subInvestSift : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/subSift.json'),
			success : resolve,
			error   : reject
		});
	},
	// 散标详情提交
	subInvestScatter : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/subScatter.json'),
			success : resolve,
			error   : reject
		});
	},
	// 债权转让提交
	subInvestBond : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/subBond.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取总待收金额 回款日历
	getsumMoney : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/unInReSumMoney.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取本息 回款日历
	getMoney : function(day,type,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/unInReMoney.json'),
			data    : {
				month	: day,
				type 	: type,
			},
			success : resolve,
			error   : reject
		});
	},
	// 当月某天回款 回款日历
	getMonth : function(resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/unInReDate.json'),
			success : resolve,
			error   : reject
		});
	},
	// 获取回款列表 回款日历
	getRturnList : function(day,type,pagesize,current,resolve, reject){
		_td.request({
			method	: "get",
			url     : _td.getServerUrl('/unInReList.json'),
			data    : {
				day			: day,
				type 		: type,
				pageSize 	: 5 || pagesize,
				currentPage : 1 || current
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 精选计划
	getSift : function(id,sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSift.json'),
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
	// 精选计划投资详情
	getSiftDel : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel1.json'),
			data    : {
				justId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划投资详情债权明细
	getSiftCred : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel2.json'),
			data    : {
				justId 		: id,
				pageSize  	: pagesize 	|| 5,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 理财计划 回款计划
	getSiftReturn: function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListSiftDel3.json'),
			data    : {
				justId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 散标
	getScstter : function(sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListScatter.json'),
			data    : {
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
	// 散标详情
	getScstterDet : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListScaTlt.json'),
			data    : {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	getScstterList : function(id,current,page,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListScaList.json'),
			data    : {
				tenderId 	: id,
				currentPage : current,
				pageSize 	: page
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 债权转让
	getBond : function(sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBond.json'),
			data    : {
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
	getBondyet : function(sta,startime,endtime,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondYet.json'),
			data    : {
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
	getApply : function(id,resolve,reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondApply.json'),
			data    : {
				tenderId 	: id
			},
			success : resolve,
			error   : reject
		});
	},
	// 提交申请转让
	subApply : function(id,pasw,resolve,reject){
		_td.request({
			url     : _td.getServerUrl('/unInListBondApplySub.json'),
			data    : {
				tenderId 	: id,
				payPassword : pasw
			},
			success : resolve,
			error   : reject
		});
	},
	// 债转详情页头部
	getBondTop : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/bondDelTop.json'),
			data    : {
				transferId : id
			},
			success : resolve,
			error   : reject
		});
	},
	// 债转详情页 回款计划
	getBondRet : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/bondDelRet.json'),
			data    : {
				tenderId : id,
				pageSize  	: pagesize 	|| 10,
				currentPage	: current 	|| 1
			},
			success : resolve,
			error   : reject
		});
	},
	// 我的投资 自动投标
	getAutoBank : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/check_bank.json'),
			success : resolve,
			error   : reject
		});
	},
	getInpForm: function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoInp.json'),
			success : resolve,
			error   : reject
		});
	},
	// 打开自动投标
	openAuto : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoAdd.json'),
			success : resolve,
			error   : reject
		});
	},
	// 关闭自动投标
	closeAuto : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoClose.json'),
			success : resolve,
			error   : reject
		});
	},
	// 开启自动投标总人数
	getAutoSum : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoInp.json'),
			success : resolve,
			error   : reject
		});
	},
	// 自动投标记录
	getautoList : function(resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoList.json'),
			success : resolve,
			error   : reject
		});
	},
	// 自动投标详情
	getAutoTop : function(id,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoDel.json'),
			data    : {
				autoTenderId: id
			},
			success : resolve,
			error   : reject
		});
	},
	getAutoList : function(id,pagesize,current,resolve, reject){
		_td.request({
			url     : _td.getServerUrl('/unInAutoDelist.json'),
			data    : {
				autoTenderId : id,
				currentPage	 : 1  || current,
				pageSize	 : 10 || pagesize
			},
			success : resolve,
			error   : reject
		});
	}
};
module.exports = _trade;