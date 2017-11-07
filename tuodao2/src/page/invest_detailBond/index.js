require('page/invest_detail/invest_detail.scss');
// require('page/invest_detail/invest_detail.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

var _td = require('util/td.js');
var _apiInvest = require('api/investListDe-api.js');
var investListBond = require('./details-bond.string');
var investListPhone = require('./details-phone.string');

var formError = {
	show : function(id,errMsg){
		$(id).addClass('err-input');
		var el = '<p class="form-error-info">&nbsp;<i class="iconfont">&#xe671;</i>&nbsp;<span>'+errMsg+'</span></p>';
		$("invest_money p").remove();
		return $(id).parent().append(el);
	},
	hide : function(){
		$('input').removeClass('err-input');
		$('.invest_money p').remove();
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
	allHide : function(){
		$(".current_money").removeClass("cur_money");
		$('input').removeClass('err-input');
		$(".mess").remove();
	}
};
var investDetails = {
	init : function(){
		this.addHtml();
		this.setMoney();
		this.inputEvent();
	},
	setMoney : function(){
		_apiInvest.getInvestUc(function(res){
			$(".moneys").html(res.content.totalBalance);
		},function(){

		});
	},
	addHtml : function(){
		_apiInvest.getInvestBondDetails(1,function(res){
			investDetails.setData(res);
			investDetails.clearing(res.content.cleanTime);
			var time = res.content.endTime;
			listDetailsHtml = _td.renderHtml(investListBond,{
				content:res.content,
			});
			$('.detail_top_left').html(listDetailsHtml);
			investDetails.coundTime(time);
			investDetails.setShow("detail_top_left");
			investDetails.serBar();
		},function(){
			console.log("请求失败");
		});

		_apiInvest.getInvestPhone(1,function(res){
			investDetails.setTimes(res);
			listPhoneHtml = _td.renderHtml(investListPhone,{
				list:res.content.list,
			});
			$('.chage_tr').html(listPhoneHtml);
			investDetails.trColor("tbody_list");
		},function(){
			console.log("请求失败");
		});
	},
	inputEvent : function(){
		var _this = this;
		// 获得焦点
		$('.investting input').focus(function(){
			_this.focus(this);
		});
		// 失去焦点
		$('.investting input').blur(function(){
			_this.blur();
		});
		// 输入金额input
		$('.investting .sub_money').focus(function(){
			_this.inpMoneyOnFocus($(this));

		});
		$('.investting .sub_money').blur(function(){
			_this.overFormat($(this));
		});
		// 输入金额input
		$('.investting .sub_money').keyup(function(){
			_this.setinput($(this));
			_this.keyUp();
			// if($('#mobile').val().length > 11){
			// 	_this.blur();
			// }else{
			// 	if($('#mobile').val().length>0){
			// 		_this.blur();
			// 	}
			// 	formError.hide();
			// }
		});
		$('.investting input').mouseover(function(){
			_this.mouseover(this);
		});
		$('.investting input').mouseout(function(){
			_this.mouseover();
		});
		// 清空按钮
		$(".btn_empty").on("click",function(){
			$(".sub_money").val("").blur();
			_this.setinput($(".sub_money"));
			// $(".inp_ticket").val("");
			// $(".p_ticket").html("请选择优惠券").css('color','#9e9e9e');
			return false;
		});
		// 支付按钮点击的状态
		$(document).on("click",".sub_btn",function(){
			 _this.subBtnClick();
		});
	},
	focus : function(obj){
		$('.all-errinfo').html('');
		$('input').removeClass('focus-input');
		// $('input').removeClass('err-input');
		$(obj).addClass('focus-input');

	},
	blur : function(){
		$('input').removeClass('focus-input');
	},
	keyUp : function(){
		var formData = {
				money: $.trim($('#sub_money').val()),
			},
			// 表单验证结果
			validateResult = this.moneyValidate(formData);
		if (validateResult.status) {
			console.log(111);
			formError.hide();
		} else {
			var id = '#'+validateResult.id;
			formError.show(id,validateResult.msg);
			console.log(validateResult.msg);
		}
	},

	// 输入金额表单验证
	moneyValidate:function(formData){
		var result = {
			status  : false,
			id : false,
			msg     : ''
		};
		console.log(!investDetails.moneydate(formData.money, 'minMoney'))
		if(investDetails.moneydate(formData.money, 'minMoney')){
			result.msg = '不得低于起投金额100元！';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'minMoneys')){
			result.msg = '不得低于起投金额500元！';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'amount')){
			result.msg = '您输入的金额大于当前剩余可投金额！';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'balance')){
			result.msg = '余额不足';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'quota')){
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
	moneydate : function(value, type){
	    var value = $.trim(value);
		// 小于100
		if('minMoney' === type){
        	return value<100;
		}
		// 小于500
		if('minMoneys' === type){
			return  value<500;
		}
		// 大于可投
		if('amount' === type){
			return value>20000;
		}
		// 余额不足
		if('balance' === type){
			return value>20000;
		}
		// 限额
		if('quota' === type){
			return value>500000;
		}

	},
	subBtnClick : function(){
		var formData = {
				money: $.trim($('#sub_money').val()),
				password: $.trim($('#sub_psw').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		if (validateResult.status) {
			formError.allHide();
		} else {
			var clas = '.'+validateResult.class;
			console.log(clas);
			formError.allShow(clas,validateResult.msg);
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
		}
		// 通过验证，返回正确提示
		result.status   = true;
		result.class   	= true;
		result.msg      = '验证通过';
		return result;
	},
	mouseover : function(obj){
		$('input').removeClass('hover-input');
		$(obj).addClass('hover-input');
	},
	mouseout : function(){
		$('input').removeClass('hover-input');
	},
	clearing : function(bool){
		var cleHtml = '<p><i class="iconfont">&#xe694;</i>当前是存管系统清算时间（每天23:55 - 00:05 ），不可进行投资，充值，提现操作，请您稍后重试。由此给您造成不便，敬请谅解！</p>';
		if(bool == true){
			$(".clearing").html(cleHtml);
			$("#sub_btn").attr("class","no_btn").val("存管清算时间，不能加入");
		}else{
			$(".clearing").html("");
			$("#sub_btn").attr("class","sub_btn").val("实付0.00元，立即投资");
		}
	},
	setData : function(res){
		// 还款方式
		var refunway = res.content.repaymentType;
		if(refunway == "0"){
			res.content.repaymentType = "等额本息";
		}else if(refunway == "1"){
			res.content.repaymentType = "按月付息";
		}else if(refunway == "2"){
			res.content.repaymentType = "按天付息";
		}
		// 投资期限单位
		var periodunit = res.content.periodType;
		if(periodunit == "0"){
			res.content.periodType = "天";
		}else if(periodunit == "1"){
			res.content.periodType = "个月";
		}else if(periodunit == "2"){
			res.content.periodType = "年";
		};
		// 时间格式
		var str = res.content.publishTime;
		var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
		res.content.publishTime = oTime;
	},
	coundTime : function(time){
		function times(time){
			var nowTime = new Date();
			var endTime = new Date(time * 1000);
			var t = endTime.getTime() - nowTime.getTime();
			var hour = Math.floor(t / 1000 / 60 / 60 % 24);
			var min = Math.floor(t / 1000 / 60 % 60);
			var sec = Math.floor(t / 1000 % 60);

			if (hour < 10) {
				hour = "0" + hour;
			}
			if (min < 10) {
				min = "0" + min;
			}
			if (sec < 10) {
				sec = "0" + sec;
			}
			var countDownTime = hour + "小时" + min + "分" + sec + "秒";
			$(".coundTime").html(countDownTime);
		}
		times(time);
		setInterval(function() {
			times(time);
		}, 1000);
	},
	setTimes : function(res){
		var list = res.content.list;
		// 状态
		$.each(list,function(i){
			var time = list[i].addTime;
			setTime(time);
			list[i].addTime = times;
		});
		function setTime(time){
			var date = new Date(time * 1000);
			var y = date.getFullYear() + '-';
			var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var d = (date.getDate() <10 ? "0" + date.getDate() : date.getDate()) + ' ';
			var h = date.getHours() + ':';
			var f = date.getMinutes() + ':';
			var s = date.getSeconds();
			return times = y + m + d + h + f + s;
		}
	},
	serBar : function(){
		var totalM = $('.tranMoney').html();
		var resM = $('.lastMoney').html();
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(plan == 0){
			plan=100;
		}else{
			plan = plan;
		};
		$(".bar").width(plan);
		$(".barNum").html(plan);
	},
	setShow : function(cla){
		var _this = $("." + cla);
		// 加入进度
		var totalM = _this.find('.totalMoney').html();
		var resM =  _this.find('.resMoney').html();
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(plan == 0){
			plan=100;
		}else{
			plan = plan;
		};
		_this.find($(".bar")).width(plan);
		_this.find($(".barNum")).html(plan + "%");
		// 有无奖励
		var awardStatus = _this.find('.award').attr("award");
		if(awardStatus == 0){
			_this.find('.award').remove();
		}
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
	// 输入金额计算
	setinput : function(ins){
		var $amountInput = ins;
		event = window.event || event;
		if (event.keyCode == 37 | event.keyCode == 39) {
			return;
		}
		$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
		var a=ins;
		// 最后根据算法优化
		var b = Math.floor((a.val()*0.09/12)*100)/100;
		// 有奖励
		var flag = false;
		var c = 6;
		if(ins.val() != ""){
			$(".btn_empty").show();
		}else{
			$(".btn_empty").hide();

		};
		if(flag == true && quan == true){
			$(".predict_money").html(b +"+"+ c +"+"+ d);
		}else if(flag == true ){
			$(".predict_money").html(b +"+"+c);
		}else{
			$(".predict_money").html(b);
		}
		var m = a.val().replace(/\d(?=(\d{3})+$)/g,'$&,');
		if(m == ""){
			$(".sub_btn").val("实付0.00元，立即投资");
			$(".predict_money").html("0.00");
		}else{
			$(".sub_btn").val("实付"+m+"元，立即投资");
		};
	},
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
};
$(function(){
	investDetails.init();
});
