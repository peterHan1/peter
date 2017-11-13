require('page/invest_detail/invest_detail.scss');
// require('page/invest_detail/invest_detail.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _td 			= require('util/td.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/product-api.js');
var _apiTrade 		= require('api/trade-api.js');
var _apiUser 		= require('api/user-api.js');
var investListSift 	= require('./details-sift.string');
var subSiftHtml 	= require('./subSift.string');
var moneyInp 		= require('./moneyInp.string');
var logOut 			= require('./logOut.string');
var finished 		= require('./finished.string');
var siftPhone 		= require('./details-phone.string');

var investDetails = {
	init : function(){
		this.eachA();
		this.addHtml();
	},
	eachA : function(){
		var hre = location.href.split('?');
		$('.invest_tab a').each(function () {
			var dates = $(this).attr("data");
			for(var i in hre){
				if(hre[i] == dates){
					$(this).addClass('on');
				}
			}
		});
	},
	addHtml : function(){
		_apiInvest.getInvestListDetails(1,function(res){
			investDetails.setData(res);
			listDetailsHtml = _td.renderHtml(investListSift,{
				content:res.content,
			});
			$('.detail_top_left').html(listDetailsHtml);
			investDetails.setShow("detail_top_left");
			if(res.content.finished == true){
				finishedHtml = _td.renderHtml(finished,{
					content:res.content,
				});
				$('.detail_top_right').html(finishedHtml);
			}else{
				inputMoneyHtml = _td.renderHtml(moneyInp,{
					content:res.content,
				});
				$('.detail_top_right').html(inputMoneyHtml);
				investDetails.inputEvent();
				investDetails.clearing(res.content.cleanTime);
				investDetails.getUser();

			}
		},function(){
			console.log("请求失败");
		});
	},
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
	setShow : function(cla){
		var _this = $("." + cla);
		// 加入进度
		var totalM = _this.find('.totalMoney').html();
		var resM =  _this.find('.lastMoney').html();
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
		}else if(awardStatus == 1){
			$(".unit").html("元");
		}else if(awardStatus == 2){
			$(".unit").html("%");
		}
	},
	getUser : function(){
		// 是否登录		

		_apiUser.getUserCon(function(res){
			var balanceMoney = res.content.usableFund;
			$(".balance").html(balanceMoney).attr("money",balanceMoney);
			if(res.content.isNewbie == 0){
				$("#sub_btn").attr("class","no_btn").val("新手专享，非新手不能加入");
			}
		},function(){
			console.log('请求失败');
		});
	},

	getDiscount : function(){
		// 获取优惠券
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
			var thiss = $(this);
			setTimeout(function(){
				_this.overFormat(thiss);
			},300);
		});
		// 输入金额input
		$('.investting .sub_money').keyup(function(){
			var lastMoney = $(".lastMoney").attr("money");
			_this.setinput($(this));
			_this.MoneyKeyUp($(this),lastMoney);
			_this.QuanInit();
		});
		// 余额全投
		$(".all_money").on("click",function(){
			var lastMoney = $(".lastMoney").attr("money")*1;
			var balance = $(".balance").attr("money")*1;
			_this.all_money(lastMoney,balance,$(".sub_money"));
		});
		$(".sub_psw").keyup(function(){
			formError.hide($(this));
		});
		$('.investting input').mouseover(function(){
			_this.mouseover(this);
		});
		$('.investting input').mouseout(function(){
			_this.mouseover();
		});
		// 清空按钮
		$(".btn_empty").on("click",function(){
			formError.hide($(".sub_money"));
			$(".sub_money").val("").blur();
			_this.setinput($(".sub_money"));
			_this.QuanInit();
		});
		// 支付按钮点击的状态
		$(document).on("click",".sub_btn",function(){
			 _this.subBtnClick();
		});
		$(".add_ticket").on("click",function(){
			_this.yhQuan();
		});
		$(document).on("click",".iskonw",function(){
			layer.closeAll();
			location.reload();
		});
		$(document).on("click",".rclose",function(){
			layer.closeAll();
			location.reload();
		});
		// 优惠券弹窗选择
		$(".ul_select li").on("click",function(){
			var clas = $(this).attr("class");
			var sel = '<b class="select_b"></b>';
			if(clas != "yhq_no"){
				var datas = $(this).attr('data');
				$(".ul_select li .select_b").remove();
				$(this).append(sel);
				$(".yes").addClass("add_quan");
				$(".yes").attr("data",datas);
			}
		});
		$(document).on("click",".discount_bot .add_quan",function(){
			var dat = $(this).attr("data");
			var a = $(".sub_money");
			var d = $(".inp_ticket").val();
			$(".p_ticket").html(dat).css('color','#333');
			$(".inp_ticket").val(dat);
			$(this).removeClass("add_quan");
			layer.closeAll();
			var b = Math.floor((a.val()*0.09/12)*100)/100;
			var e = Math.floor((a.val()*0.09/12)*100)/100;
			$(".predict_money").html(b +"+"+e);
		});
		$(".discount_bot .no").on("click",function(){
			$(".ul_select li .select_b").remove();
			$(".yes").removeClass("add_quan");
			layer.closeAll();
		});
		$(".detail_tab li a").on("click",function(){
			var type=$(this).attr("type");
			var ind = $(this).parent("li").index();
			$(".detai").eq(ind).show().siblings('.detai').hide();
			$(this).addClass("on");
			$(this).parent().siblings().find('a').removeClass('on');
			if(type=="phone"){
				_this.getListPhone();
			}
		});
	},
	subSiftFn : function(){
		_apiTrade.subInvestSift(function(res){
			formError.allHide($(".sub_money"),$(".sub_psw"));
			subSiftOk = _td.renderHtml(subSiftHtml,{
				content:res.content,
			});
			$("#succeed_show").html(subSiftOk);
			layer.open({
				type: 1,
				title: '',
				closeBtn: 0,
				skin: 'succeed_show',
				area: ['560px', '360px'],
				content: $('#succeed_show')
			});
		},function(err){
			if(err.code == 142024){
				formError.allShow($(".sub_psw"), "密码错误，请重新登录！");
			}else if(err.code == 142019){
				// 激活存管弹窗
				layer.open({
					type: 1,
					title:'',
					closeBtn:0,
					skin: 'succeed_show',
					area:['560px','360px'],
					content: $('#bank_show')
				});
			}else{
				$(".msg").html(err.msg);
				// 加入失败
				layer.open({
					type: 1,
					title:'',
					closeBtn:0,
					skin: 'succeed_show',
					area:['560px','360px'],
					content: $('#failed_show')
				});
			}
		});
	},
	getListPhone : function(){
		_apiTrade.getSiftPhone(1,10,function(res){
			siftPhoneHtml = _td.renderHtml(siftPhone,{
				list:res.content.list,
			});
			$(".chage_tr").html(siftPhoneHtml);
				_paging.paging("pageList",res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
					_apiTrade.getSiftPhone(e.current,10,function(res){
						siftPhoneHtml = _td.renderHtml(siftPhone,{
							list:res.content.list,
						});
						$(".chage_tr").html(siftPhoneHtml);
						investDetails.trColor("tbody_list");
					},function(){

					});
				});
			investDetails.trColor("tbody_list");
		},function(){

		});
	},
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
			validateResult = this.moneyValidate(formData,str);
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
	// 输入金额验证
	moneydate : function(value, type){
		var lm = ($(".lastMoney").attr("money"))*1;
		var ym = ($(".balance").attr("money"))*1;
	    var value = $.trim(value);
		// 小于100
		if(lm < 100){
			// 小于500
			if('minMoneys' === type){
				return  value < lm;
			}
		}else if('minMoney' === type){
        	return value<100;
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
	// 输入金额表单验证
	moneyValidate:function(formData,str){
		var result = {
			status  : false,
			id : false,
			msg     : ''
		};
		if(investDetails.moneydate(formData.money, 'minMoney')){
			result.msg = '不得低于起投金额100元！';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'minMoneys')){
			result.msg = '不得低于可投金额'+str+'元';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'balance')){
			result.msg = '余额不足';
			result.id = 'sub_money';
			return result;
		}else if(investDetails.moneydate(formData.money, 'amount')){
			result.msg = '您输入的金额大于当前剩余可投金额！';
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
	all_money : function(lastMoney,balance,el){
		if(lastMoney > balance){
			el.val(balance).keyup().focus();
		}else{
			el.val(lastMoney).keyup().focus();
		};
	},
	subBtnClick : function(){
		if($(".form-error-info").length>0){
			formError.allHide($(".sub_psw"),$(".sub_psw"));
		}else{
			var formData = {
					money: $.trim($('#sub_money').val()),
					password: $.trim($('#sub_psw').val())
				},
				// 表单验证结果
				validateResult = this.formValidate(formData);
			if (validateResult.status) {
				investDetails.subSiftFn();
			} else {
				var clas = '.' + validateResult.class;
				formError.allShow(clas, validateResult.msg);
			}
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
	QuanInit : function(){
		$(".inp_ticket").val("");
		$(".p_ticket").html("请选择优惠券").css('color','#9e9e9e');
	},
	yhQuan : function(){
		// 优惠券点击
		var val = $(".inp_ticket").val();
		var sel = '<b class="select_b"></b>';
		if($(".sub_money").val() == ""){
			formError.show($("#sub_money"), "选择优惠券前需要填写加入金额！");
			$(".sub_money").focus();
			// _inp.input_mess("选择优惠券前需要填写加入金额！",null,false);
			// _inp.input_mess($(".sub_money"),true,$(".sub_money").parent(),"选择优惠券前需要填写加入金额！");
			return false;
		}else if($(".invest_money p").length <= 0){
			$(".ul_select li").each(function(){
				var vals = $(this).attr("data");
				if(val == vals){
					$(this).append(sel);
				}
			});
			layer.open({
				type: 1,
				title:'',
				skin: '',
				closeBtn:0,
				area:['635px','485px'],
				content: $('#discount_show')
			});
		}
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
$(function(){
	investDetails.init();
});
