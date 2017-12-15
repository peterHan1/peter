require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
require('util/invest_detail/index.js');
var _details 		= require('util/invest_detail/index.js');
var md5 			= require('util/md5.js');
var _td 			= require('util/td.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/trade-api.js');
var _apiUser 		= require('api/user-api.js');
var _operation 		= require('api/operate-api.js');
var investBond 		= require('./details-bond.string');
var investListPhone = require('./details-phone.string');
var subBonds 		= require('./subBond.string');
var discounts 		= require('./discount.string');
var moneyInp 		= require('./moneyInp.string');
var transferred 	= require('./transferred.string');
var logOut 			= require('./logOut.string');

var investDetails = {
	init : function(){
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		var product = _td.getUrlParam("product");
		this.addHtml(headerData,11);
		this.inputEvent(headerData,product);
	},
	addHtml : function(headerData,product){
		_apiInvest.getInvestBondDetails(product,function(res){
			_details.setDataBond(res);
			listDetailsHtml = _td.renderHtml(investBond,{
				content:res.content,
			});
			$('.detail_top_left').html(listDetailsHtml);
			var time = res.content.timeLeft;
			_details.coundTime(time);
			_details.setShow("detail_top_left");
			// 是否满标
			if(res.content.finished == true){
				transferred = _td.renderHtml(transferred,{
					content:res.content,
				});
				$('.detail_top_right').html(transferred);
			}else{
				investDetails.getUser(headerData,res.content.cleanTime,res.content.lastAccount);
			}
		},function(err){
			console.log(err);
		});

		_apiInvest.getInvestPhone(1,function(res){
			listPhoneHtml = _td.renderHtml(investListPhone,{
				list:res.content.list,
			});
			$('.chage_tr').html(listPhoneHtml);
			_details.trColor("tbody_list");
		},function(err){
			console.log(err);
		});
	},
	getUser : function(headerData,cleanTime,lastMoney){
		// 已登录
		_apiUser.getUserCon(headerData,function(res){
			inputMoney = _td.renderHtml(moneyInp,{
				content:res.content,
			});
			$('.detail_top_right').html(inputMoney);
			if((lastMoney*1) < 100){
				var str = "本项目剩余可投"+lastMoney+"元";
				$(".sub_money").attr("placeholder",str);
			};
			if(cleanTime == true){
				investDetails.clearing(cleanTime);
				return false;
			}else{
				$("#sub_btn").attr("class","sub_btn").val("实付0.00元，立即投资");
			}

		},function(err){
			// 未登录
			// if(err.code == 100105){
				logOutHtml = _td.renderHtml(logOut,{
					content:err.content,
				});
				$('.detail_top_right').html(logOutHtml);
			// }
		});
	},
	// 三个通用
	getDiscount : function(headerData,params){
		// 获取优惠券
		_operation.getDiscounts(headerData,params,function(res){
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
					if($(this).attr("type") == 1){
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
		},function(err){
			console.log(err);
		});
	},
	inputEvent : function(headerData,productid){
		var _this = this;
		// 获得焦点
		$('.investting input').focus(function(){
			_details.focus(this);
		});
		// 失去焦点
		$('.investting input').blur(function(){
			_details.blur();
		});
		// 输入金额input
		$('.investting .sub_money').focus(function(){
			_details.inpMoneyOnFocus($(this));
		});
		$('.investting .sub_money').blur(function(){
			var thiss = $(this);
			setTimeout(function(){
				_details.overFormat(thiss);
			},300);
		});
		// 输入金额input
		$('.investting .sub_money').keyup(function(){
			var lastMoney = $(".lastMoney").attr("money");
			_this.setinput($(this));
			_details.MoneyKeyUp($(this),lastMoney);
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
			_details.all_money(lastMoney,balance,$(".sub_money"));
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
			var params = {
				transferId 	: productid,
				payPassword	: md5($.trim($('#sub_psw').val())),
				voucherId 	: $(".inp_ticket").val(),
				money 		: $.trim($(".sub_money").val())
			};
			 _this.subBtnClick(headerData,params);
		});
		$(document).on("click",".add_ticket",function(){
			var params = {
				scaleMoney 		: 1,
				scaleTimeLimit	: 1,
				needType 		: 2
			};
			_this.yhQuan(headerData,params);
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
			var ind = $(this).parent("li").index();
			$(".detai").eq(ind).show().siblings('.detai').hide();
			$(this).addClass("on");
			$(this).parent().siblings().find('a').removeClass('on');
		});
	},
	subBond : function(headerData,params){
		_apiInvest.subInvestBond(headerData,params,function(res){
			formError.allHide($(".sub_money"),$(".sub_psw"));
			subBondOk = _td.renderHtml(subBonds,{
				content:res.content,
			});
			$("#succeed_show").html(subBondOk);
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
				$(".msg").html(err.content[0].msg);
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
	// 输入金额验证
	moneydate : function(value, type){
		var lm = ($(".lastMoney").attr("money"))*1;
		var ym = ($(".balance").attr("money"))*1;
	    var value = $.trim(value);
		// 小于100
		if(lm < 100){
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
	subBtnClick : function(headerData,params){
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
				investDetails.subBond(headerData,params);
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
	yhQuan : function(headerData,params){
		// 优惠券点击
		var val = $(".inp_ticket").val();
		var sel = '<b class="select_b"></b>';
		if($(".sub_money").val() == ""){
			formError.show($("#sub_money"), "选择优惠券前需要填写加入金额！");
			$(".sub_money").focus();
			return false;
		}else if($(".invest_money p").length <= 0){
			investDetails.getDiscount(headerData,params);
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
			return false;
		}else{
			$(".sub_btn").val("实付"+m+"元，立即投资");
		};
		var award = $(".award").attr("type");
		var inputM = $(".sub_money").val()*1;
		investDetails.earnings(award);
	}
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
