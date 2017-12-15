require('./index.scss');
// require('./invest_detail.js');
var _details = {
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
	// 债转倒计时
	coundTime : function(result){
		var t = Math.floor(result/1000);
		var tt = times(t);
		$(".coundTime").html(tt);
		setInterval(function() {
			t--;
			var tt = times(t);
			$(".coundTime").html(tt);
		}, 1000);
		function times(result){
			var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
			var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
			var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
			return result = h + "小时" + m + "分" + s + "秒";
		}
	},
	// input输入 三个通用
	focus : function(obj){
		$('.all-errinfo').html('');
		$('input').removeClass('focus-input');
		$(obj).addClass('focus-input');
	},
	blur : function(){
		$('input').removeClass('focus-input');
	},
	MoneyKeyUp : function(el,str){
		var formData = {
			money: $.trim($('#sub_money').val()),
		};
			// 表单验证结果
		if (formData.money != "") {
			validateResult = _details.moneyValidate(formData,str);
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
	moneyValidate:function(formData,str){
		var result = {
			status  : false,
			id : false,
			msg     : ''
		};
		if(_details.moneydate(formData.money, 'minMoney')){
			result.msg = '不得低于起投金额500元！';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'minMoneys')){
			result.msg = '不得低于可投金额'+str+'元';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'balance')){
			result.msg = '余额不足';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'amount')){
			result.msg = '您输入的金额大于当前剩余可投金额！';
			result.id = 'sub_money';
			return result;
		}else if(_details.moneydate(formData.money, 'quota')){
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
		var lm = ($(".lastMoney").attr("money"))*1;
		var ym = ($(".balance").attr("money"))*1;
	    var value = $.trim(value);
		// 小于500
		if(lm < 500){
			if('minMoneys' === type){
				return  value < lm;
			}
		}else if('minMoney' === type){
			return value < 500;
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
	// 两个通用
	setData : function(res){
		// 还款方式
		var refunway = res.content.refundWay;
		if(refunway == "0"){
			res.content.refundWay = "等额本息";
		}else if(refunway == "1"){
			res.content.refundWay = "按月付息";
		}else if(refunway == "2"){
			res.content.refundWay = "按天付息";
		}
		// 项目类型
		var product = res.content.productType;
		if(product == "0"){
			res.content.productType = "散标项目";
		}else if(product == "1"){
			res.content.productType = "精选计划";
		}
		// 投资期限单位
		var periodunit = res.content.periodUnit;
		if(periodunit == "0"){
			res.content.periodUnit = "天";
		}else if(periodunit == "1"){
			res.content.periodUnit = "个月";
		}else if(periodunit == "2"){
			res.content.periodUnit = "年";
		};
	},
	// 债权转让
	setDataBond : function(res){
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
	// 三个通用
	setShow : function(cla){
		var _this = $("." + cla);
		// 加入进度
		var totalM = _this.find('.totalMoney').html();
		var resM =  _this.find('.lastMoney').html();
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(totalM == resM){
			plan=0;
		}else{
			plan = plan;
		};
		_this.find($(".bar")).width(plan);
		_this.find($(".barNum")).html(plan + "%");
		// 有无奖励
		/*var awardStatus = _this.find('.award').attr("award");
		if(awardStatus == 0){
			_this.find('.award').remove();
		}elsse if(awardStatus == 1){
			$(".unit").html("元");
		}else if(awardStatus == 2){
			$(".unit").html("%");
		}*/
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
	// 三个通用 输入金额格式化
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
	// 三个通用 余额全投
	all_money : function(lastMoney,balance,el){
		if(lastMoney > balance){
			el.val(balance).keyup().focus();
		}else{
			el.val(lastMoney).keyup().focus();
		};
	},
	// 三个通用
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