require('./index.scss');
var _td = require('util/td.js');
var _details = {
	setinput : function(ins,amount,apr,awardType,awardScale,period,borrowType,refundWay){
		var $amountInput = ins;
		event = window.event || event;
		if (event.keyCode == 37 | event.keyCode == 39) {
			return;
		}
		$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
		if(ins.val() != ""){
			$(".btn_empty").show();
		}else{
			$(".btn_empty").hide();
		};
		var m = ins.val().replace(/\d(?=(\d{3})+$)/g,'$&,');
		if(m == ""){
			$(".sub_btn").val("实付0.00元，立即投资");
			$(".predict_money").html("0.00");
		}else{
			$(".sub_btn").val("实付"+m+"元，立即投资");
		};
		_details.earnings(ins.val(),apr,awardType,awardScale,period,borrowType,refundWay);
	},
	// 收益算法
	earnings : function(inMoney,apr,awardType,awardScale,period,borrowType,refundWay){
		//  apr:年利率 awardType:奖励类型 0无1金额2利率 awardScale:奖励利率 period:期限 标的类型：borrowType type:还款类型
		if(awardType == 0){
			// 无奖励
			var income = _details.MonthlyApr(inMoney,apr);
			$(".predict_money").html(income);
		}else if(awardType == 1 || awardType == 2){
			// 平台奖励
			if(awardType == 2){
				// 年化率
				var income = _details.MonthlyApr(inMoney,apr);
				// 奖励利息
				var awardIncome = _details.MonthlyApr(inMoney,awardScale);
				if(awardIncome > 0){
					$(".predict_money").html(income+"+"+awardIncome);
				}else{
					$(".predict_money").html(income);
				}
			}else if(awardType == 1){
				// 奖励金额
				var income = _details.MonthlyApr(inMoney,apr);
				$(".predict_money").html(income +"+"+ awardScale);
			}
		}
	},

	// 新手标
	isNewInvest : function(){
		var isNewHtml = '<p><i class="iconfont">&#xe68f;</i>这是新手专享标的，只有未投资过的新用户才可享受加息3%的新手奖励。 您已经投资过了，快去看看其它标的吧!</p>';
		$(".clearing").html(isNewHtml);
	},
	// 存管清算时间
	clearing : function(){
		var cleHtml = '<p><i class="iconfont">&#xe694;</i>当前是存管系统清算时间（每天23:55 - 00:05 ），不可进行投资，充值，提现操作，请您稍后重试。由此给您造成不便，敬请谅解！</p>';
		$(".clearing").html(cleHtml);
	},
	// 按月付息
	MonthlyApr : function(inputM,apr){
		var period = $(".borrowPeriod").html()*1;
		var awardIncome = (inputM*(apr/100)/12*period).toFixed(2);
		return awardIncome;
	},
	// 优惠券list点击选择
	disSelect : function(el){
		var sel = '<b class="select_b"></b>';
		var quanId = el.attr('id');
		var datas = el.attr('data');
		var types = el.attr('type');
		$(".ul_select li .select_b").remove();
		el.append(sel);
		$(".yes").addClass("add_quan");
		$(".yes").attr("id",quanId);
		$(".yes").attr("apr",datas);
		$(".yes").attr("type",types);
	},
	// 选择优惠券 确定点击
	disBtn : function(el){
		var disId = el.attr("id");
		var apr = el.attr("apr");
		var types = el.attr("type");
		if(types == 1){
			types = " 元抵用券";
			var disSpan = '<span>+'+apr+'</span>';
			$(".predict_money span").remove();
			$(".predict_money").append(disSpan);
		}else{
			types = "% 加息券";
			var inputM = $(".sub_money").val()*1;
			var addAward = '<span>+'+_details.MonthlyApr(inputM,apr)+'</span>';
			$(".predict_money span").remove();
			$(".predict_money").append(addAward);
		}
		$(".inp_disc").val(apr + types).css("color","#333");
		$(".inp_ticket").val(disId);
		el.removeClass("add_quan");
		layer.closeAll();
	},
	// 初始化优惠券按钮
	QuanInit : function(){
		if($(".add_ticket").length > 0){
			$(".inp_disc").val("请选择优惠券").css("color","#9e9e9e");
			$(".inp_ticket").val("");
		}else{
			$(".inp_disc").val("请选择优惠券").removeClass("no_ticket").parent($("#ticket")).addClass('add_ticket');
			$(".disHint").show();
		}
	},
	// 通用表单验证
	formValidate : function(formData){
		var result = {
			status  : false,
			class : false,
			msg     : ''
		};
		if(!_td.validate(formData.money, 'require') && !_td.validate(formData.password, 'require')){
			result.msg = '请填写投资金额和支付密码！';
			result.class = 'com_inp';
			return result;
		}else if(!_td.validate(formData.money, 'require')){
			result.msg = '请填写投资金额！';
			result.class = 'sub_money';
			return result;
		}else if(!_td.validate(formData.password, 'require')){
			result.msg = '请填写支付密码';
			result.class = 'sub_psw';
			return result;
		}else if(formData.passwords !== undefined){
			if(!_td.validate(formData.passwords, 'require')){
				result.msg = '请填写约标密码';
				result.class = 'appoint_psw';
				return result;
			}
		}
		// 通过验证，返回正确提示
		result.status   = true;
		result.class   	= true;
		result.msg      = '验证通过';
		return result;
	},
	MoneyKeyUp : function(el,str,lm,ym,productType){
		var formData = {
			money: $.trim($('#sub_money').val()),
		};
			// 表单验证结果
		if (formData.money != "") {
			validateResult = _details.moneyValidate(formData,str,lm,ym,productType);
			if (validateResult.status) {
				formError.hide(el);
			} else {
				var id = '#' + validateResult.id;
				formError.show(id, validateResult.msg);
			}
		}else{
			formError.hide(el);
		}
	},
	// 输入金额表单验证
	moneyValidate:function(formData,str,lm,ym,productType){
		var minAmount;
		if(productType == 1){
			minAmount = 500;
		}else{
			minAmount = 100;
		}
		var result = {
			status  : false,
			id : false,
			msg     : ''
		};
		if(_details.moneydate(formData.money, 'minMoney',lm,ym,minAmount)){
			result.msg = '不得低于起投金额'+minAmount+'元！';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'minMoneys',lm,ym,minAmount)){
			result.msg = '不得低于可投金额'+str+'元';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'balance',lm,ym,minAmount)){
			result.msg = '余额不足';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'amount',lm,ym,minAmount)){
			result.msg = '您输入的金额大于当前剩余可投金额！';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'quota',lm,ym,minAmount)){
			result.msg = '单笔限额为500,000元！';
			result.id = 'sub_money';
			return result;
		}
		// 通过验证，返回正确提示
		result.status   = true;
		result.class   	= true;
		result.msg      = '验证通过';
		return result;
	},
	// 输入金额验证
	moneydate : function(value,type,lm,ym,minAmount){
		var value = $.trim(value);
		// 小于500
		if(lm < minAmount){
			if('minMoneys' === type){
				return  value < lm;
			}
		}else if('minMoney' === type){
			return value < minAmount;
		}
		// 大于可投
		if('amount' === type){
			return value > lm;
		}
		// 余额不足
		if('balance' === type){
			return value > ym;
		}
		// 限额
		if('quota' === type){
			return value>500000;
		}
	},
	// 性别
	setsex : function(sex){
		switch (sex)
		{
			case 0:
				return "男";
			case 1:
				return "女";
			default: return "";
		}
	},
	// 项目类型
	setData : function(com){
		switch (com)
		{
			case 0:
				return "散标项目";
			case 1:
				return "精选计划";
			default: return "";
		}
	},
	// 时间格式化
	setTime : function(type,time) {
		var date = new Date(time * 1);
		var y = date.getFullYear() + '-';
		var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var d = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
		var f = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
		if(type == 1){
			return times = y + m + d;
		}else{
			return times = y + m + d + h + f + s;
		}
	},
	// 精选计划 散标定时标倒计时
	coundDown : function(serverTime,startTime){
		var t = Math.floor((startTime-serverTime)/1000);
		var tt = _details.setTimes(2,t);
		$("#sub_btn").val(tt + "后开抢");
		var setResult = setInterval(function() {
			t--;
			if(t < 0){
				$("#sub_btn").val("实付0.00元，立即加入");
				$("#sub_btn").removeClass("no_btn").addClass("sub_btn");
				return false;
			}else{
				var tt = _details.setTimes(2,t);
				$("#sub_btn").val(tt + "后开抢");
			}
		}, 1000);
	},
	// 债转倒计时
	coundTime : function(result){
		if(result < 0){
			$(".coundHtml").html("");
			return false;
		}else{
			var t = Math.floor(result/1000);
			var tt = _details.setTimes(1,t);
			$(".coundTime").html(tt);
		}
		var setResult = setInterval(function() {
			t--;
			if(t < 0){
				$(".coundHtml").html("");
				clearInterval(setResult);
				return false;
			}else{
				var tt = _details.setTimes(1,t);
				$(".coundTime").html(tt);
			}
		}, 1000);
	},
	// 倒计时格式化
	setTimes : function(type,result){
		var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
		var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
		var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
		if(type == 1){
			return result = h + "小时" + m + "分" + s + "秒";
		}else{
			return result = h + ":" + m + ":" + s;
		}
	},
	// input输入
	mouseover : function(obj){
		$('input').removeClass('hover-input');
		$(obj).addClass('hover-input');
	},
	mouseout : function(){
		$('input').removeClass('hover-input');
	},
	focus : function(obj){
		$('.all-errinfo').html('');
		$('input').removeClass('focus-input');
		$(obj).addClass('focus-input');
	},
	blur : function(){
		$('input').removeClass('focus-input');
	},
	// 加入进度
	setBarShow : function(totalM,resM){
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(totalM == resM){
			return {"planTxt":0,"barWin":"style=width:0%"};
		}else{
			return {"planTxt":plan,"barWin":"style=width:"+plan+"%"};
		}
	},
	// input得到焦点
	inpMoneyOnFocus: function(el) {
		var val = el.val();
		if (val == '0.00') {
			el.val('');
		} else {
			el.val(el.val().replace(/\.00/, '').replace(/(\.\d)0/, '$1'));
		};
		if (val != "") {
			$(".btn_empty").show();
		} else {
			$(".btn_empty").hide();
		}
	},
	// 输入金额格式化
	overFormat :function(th){
		if(th.val() != ""){
			th.val(Number(th.val()).toFixed(2));
			var logNum = th.val().toString();
			integerNum = parseInt(logNum).toString().replace(/\d(?=(\d{3})+$)/g,'$&,');
			decimalNum = '.' + logNum.replace(/(.*)\.(.*)/g,'$2');
			var m = th.val();
			if(m == ""){
				$(".sub_btn").val("实付0.00元，立即投资");
				$(".predict_money").html("0.00");
			}else{
				$(".sub_btn").val("实付"+ integerNum+decimalNum +"元，立即投资");
			}
		};
		$(".btn_empty").hide();
	},
	// 余额全投
	all_money : function(lastMoney,balance,el){
		if(lastMoney > balance){
			el.val(balance).keyup().focus();
		}else{
			el.val(lastMoney).keyup().focus();
		};
	},
	trColor : function(id){
		// 各行变色
		var trs=document.getElementById(id).getElementsByTagName("tr");
		for(var i=0;i<trs.length;i++){
			if(i%2==0){
				trs[i].className +=" trColor";
			}
		};
	},
};
var formError = {
	show : function(id,errMsg){
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>'+errMsg+'</span></p>';
		$(".invest_money p").remove();
		return $(id).parent().append(el);
	},
	hide : function(el){
		el.removeClass('err-input');
		el.parent("div").find('p').remove();
	},
	allShow : function(cla,errMsg){
		var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ errMsg +"</span>";
		$(".current_money").addClass("cur_money");
		if($(".mess").length > 0){
			$(".mess").remove();
		}
		$(".current_money").append(txt);
		$(cla).addClass('err-input');
	},
	allHide : function(el,els){
		$(".current_money").removeClass("cur_money");
		el.removeClass('err-input');
		els.removeClass('err-input');
		$(".mess").remove();
	}
};
module.exports = _details;