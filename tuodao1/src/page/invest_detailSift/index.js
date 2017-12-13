require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _details 		= require('util/invest_detail/index.js');
var _td 			= require('util/td.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/product-api.js');
var _apiTrade 		= require('api/trade-api.js');
var _apiUser 		= require('api/user-api.js');
var _operation 		= require('api/operate-api.js');
var investListSift 	= require('./details-sift.string');
var subSiftHtml 	= require('./subSift.string');
var moneyInp 		= require('./moneyInp.string');
var logOut 			= require('./logOut.string');
var finished 		= require('./finished.string');
var siftPhone 		= require('./details-phone.string');
var discounts 		= require('./discount.string');
var planDetail 		= require('./details-plan.string');

var investDetails = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		console.log("accessId: " + headerData.accessId);
		console.log("accessKey: " + headerData.accessKey);
		var tender = _td.getUrlParam("tender");
		this.addHtml(headerData,tender);
		this.inputEvent(tender);
	},
	addHtml : function(headerData,tender){
		_apiInvest.getInvestListDetails(tender,function(res){
			_details.setData(res);
			listDetailsHtml = _td.renderHtml(investListSift,{
				content:res.content,
			});
			planDetailsHtml = _td.renderHtml(planDetail,{
				content:res.content,
			});
			_apiTrade.getSiftPhone(tender,"","",function(res){
				$(".phoneNum").html(" ( " + res.content.total + " ) ");
			});
			$('.detail_top_left').html(listDetailsHtml);
			$('.siftPlan').html(planDetailsHtml);
			$(".pubtime").html(investDetails.setTime($(".pubtime").html()));
			_details.setShow("detail_top_left");
			investDetails.awardtype();
			if(res.content.finished == true){
				// 是否满标 不需要判断登录
				_apiTrade.getSiftFinis(tender,function(res){
					finishedHtml = _td.renderHtml(finished,{
						content:res.content,
					});
					$('.detail_top_right').html(finishedHtml);
				},function(err){
					console.log(err)
				});
				return false;
			}else{
				// 未满标 显示ipnut
				investDetails.getUser(headerData,res.content.surplusInvestAmount,res.content.cleanTime,res.content.defineType);

			}
		},function(err){
			console.log(err);
		});
	},
	getUser : function(headerData,lastMoney,cleanTime,defineType){
		// 登录状态
		_apiUser.getUserCon(headerData,function(res){
			console.log(res)
			inputMoneyHtml = _td.renderHtml(moneyInp,{
				content:res.content,
			});
			$('.detail_top_right').html(inputMoneyHtml);
			if((lastMoney*1) < 500){
					var str = "本项目剩余可投"+lastMoney+"元";
					$(".sub_money").attr("placeholder",str);
				};
			if(cleanTime == true){
				investDetails.clearing(cleanTime);
				return false;
			}else if(defineType == 0 && res.content.isNewbie == 0){
				var defineTypes = true;
				investDetails.isNewInvest(defineTypes);
				return false;
			}else{
				$("#sub_btn").attr("class","sub_btn").val("实付0.00元，立即投资");
			}
		},function(err){
			console.log(err)
			// 未登录
			if(err.code == 100105){
				logOutHtml = _td.renderHtml(logOut,{
					content:err.content,
				});
				$('.detail_top_right').html(logOutHtml);
			}
		});
	},
	// 三个通用
	getDiscount : function(){
		// 获取优惠券
		_operation.getDiscount(function(res){
			if(res.content != ""){
				layer.open({
					type: 1,
					title:'',
					skin: '',
					closeBtn:0,
					area:['635px','485px'],
					content: $('#discount_show')
				});
				discountHtml = _td.renderHtml(discounts,{
					content:res.content,
				});
				$('.discount_con').html(discountHtml);
				$(".disValTxt").each(function(i){
					if($(this).attr("data") == 1){
						$(this).html("抵用券");
						$(this).parent("p").find($(".disValUnit")).html("￥");
					}else{
						$(this).html("年利率加息");
						$(this).parent("p").find($(".disValUnits")).html("%");

					}
				});
			}else{
				$(".inp_disc").val("当前没有可用优惠券").addClass("no_ticket").parent($("#ticket")).removeClass('add_ticket').off("click");
				$(".disHint").hide();
			}
		},function(){
			console.log("请求失败");
		});
	},
	inputEvent : function(tender){
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
		// 未登录input输入金额
		$('.investting .outInp_money').keyup(function(){
			var award = $(".award").attr("type");
			var inputM = $(this).val()*1;
			investDetails.earnings(inputM,award);
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
		$(document).on("click",".ul_select li",function(){
			_this.disSelect($(this));
		});
		$(document).on("click",".discount_bot .add_quan",function(){
			_this.disBtn($(this));
		});
		$(document).on("click",".discount_bot .no",function(){
			$(".ul_select li .select_b").remove();
			$(".yes").removeClass("add_quan");
			layer.closeAll();
		});
		// 之上三个通用
		$(".detail_tab li a").on("click",function(){
			var type=$(this).attr("type");
			var ind = $(this).parent("li").index();
			$(".detai").eq(ind).show().siblings('.detai').hide();
			$(this).addClass("on");
			$(this).parent().siblings().find('a').removeClass('on');
			if(type=="phone"){
				_this.getListPhone(tender);
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
	getListPhone : function(tender){
		_apiTrade.getSiftPhone(tender,10,1,function(res){
			$(".phoneNum").html(" ( " + res.content.total + " ) ");
			siftPhoneHtml = _td.renderHtml(siftPhone,{
				list:res.content.list,
			});
			$(".chage_tr").html(siftPhoneHtml);
				_paging.paging("pageList",res.content.total,10,function(e){
					_apiTrade.getSiftPhone(tender,10,e.current,function(res){
						siftPhoneHtml = _td.renderHtml(siftPhone,{
							list:res.content.list,
						});
						$(".chage_tr").html(siftPhoneHtml);
						investDetails.trColor("tbody_list");
					},function(err){
						console.log(err)
					});
				});
			investDetails.trColor("tbody_list");
		},function(err){
			console.log(err)
		});
	},
	// 三个通用
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
		if(lm < 500){
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
			result.msg = '不得低于起投金额500元！';
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
	// 三个通用
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
	// 三个通用
	QuanInit : function(){
		if($(".add_ticket").length > 0){
			$(".inp_disc").val("请选择优惠券").css("color","#9e9e9e");
			$(".inp_ticket").val("");
		}else{
			$(".inp_disc").val("请选择优惠券").removeClass("no_ticket").parent($("#ticket")).addClass('add_ticket');
			$(".disHint").show();
		}
	},
	// 三个通用
	yhQuan : function(){
	// 优惠券点击
		var val = $(".inp_ticket").val();
		var sel = '<b class="select_b"></b>';
		if($(".sub_money").val() == ""){
			formError.show($("#sub_money"), "选择优惠券前需要填写加入金额！");
			$(".sub_money").focus();
			return false;
		}else if($(".invest_money p").length <= 0){
			investDetails.getDiscount();
			$(".ul_select li").each(function(){
				var vals = $(this).attr("id");
				if(val == vals){
					$(this).append(sel);
				}
			});
		}
	},
	// 三个通用
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
	// 三个通用
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
			var addAward = '<span>+'+investDetails.MonthlyApr(inputM,apr)+'</span>';
			$(".predict_money span").remove();
			$(".predict_money").append(addAward);
		}
		$(".inp_disc").val(apr + types).css("color","#333");
		$(".inp_ticket").val(disId);
		el.removeClass("add_quan");
		layer.closeAll();
	},
	// 三个通用
	// 收益算法
	earnings : function(inputM,type){
		if(type == 0){
			// 无奖励
			var apr = $(".borrowApr").html()*1;
			var income = investDetails.MonthlyApr(inputM,apr);
			$(".predict_money").html(income);
		}else if(type == 1 || type == 2){
			// 平台奖励
			var awardType = $(".award").attr("type");
			if(awardType == 2){
				// 年化率
				var apr = $(".borrowApr").html()*1;
				var income = investDetails.MonthlyApr(inputM,apr);
				// 奖励利息
				var awardApr = $(".awardApr").html()*1;
				var awardIncome = investDetails.MonthlyApr(inputM,awardApr);
				if(awardIncome > 0){
					$(".predict_money").html(income+"+"+awardIncome);
				}else{
					$(".predict_money").html(income);
				}
			}else if(awardType == 1){
				// 奖励金额
				var apr = $(".borrowApr").html()*1;
				var income = investDetails.MonthlyApr(inputM,apr);
				var awardApr = $(".awardApr").html()*1;
				$(".predict_money").html(income +"+"+ awardApr);
			}
		}
	},
	// 三个通用
	// 按月付息
	MonthlyApr : function(inputM,apr){
		var period = $(".borrowPeriod").html()*1;
		var awardIncome = (inputM*(apr/100)/12*period).toFixed(2);
		return awardIncome;
	},
	// 三个通用
	mouseover : function(obj){
		$('input').removeClass('hover-input');
		$(obj).addClass('hover-input');
	},
	// 三个通用
	mouseout : function(){
		$('input').removeClass('hover-input');
	},
	// 三个通用
	clearing : function(bool){
		var cleHtml = '<p><i class="iconfont">&#xe694;</i>当前是存管系统清算时间（每天23:55 - 00:05 ），不可进行投资，充值，提现操作，请您稍后重试。由此给您造成不便，敬请谅解！</p>';
		if(bool == true){
			$(".clearing").html(cleHtml);
			$("#sub_btn").attr("class","no_btn").val("存管清算时间，不能加入");
		}
	},
	// 两个通用
	isNewInvest : function(bool){
		var isNewHtml = '<p><i class="iconfont">&#xe68f;</i>这是新手专享标的，只有未投资过的新用户才可享受加息3%的新手奖励。 您已经投资过了，快去看看其它标的吧!</p>';
		if(bool == true){
			$(".clearing").html(isNewHtml);
			$("#sub_btn").attr("class","no_btn").val("新手专享，非新手不能加入");
		}
	},
	// 预期年化是否有奖励显示隐藏
	awardtype : function(){
		var type = $(".award").attr("type");
		if(type == 0){
			$(".award").html("");
		}
	},
	// 三个通用
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
	// 三个通用 时间格式化
	setTimes : function(res){
		var list = res.content.list;
		// 状态
		$.each(list,function(i){
			var time = list[i].addTime;
			setTime(time);
			list[i].addTime = times;
		});
	},
	setTime : function(time) {
		var date = new Date(time * 1);
		var y = date.getFullYear() + '-';
		var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var d = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
		var f = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
		return times = y + m + d + h + f + s;
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
	// 三个通用
	// 输入金额计算
	setinput : function(ins){
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
		var award = $(".award").attr("type");
		var inputM = $(".sub_money").val()*1;
		investDetails.earnings(inputM,award);
	},
	// 三个通用
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
