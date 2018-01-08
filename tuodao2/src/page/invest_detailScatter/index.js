require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
require('util/fancybox/source/index.js');
var md5 			= require('util/md5.js');
var _details 		= require('util/invest_detail/index.js');
var _formError 		= require('util/invest_detail/formError.js');
var _td 			= require('util/td.js');
var _paging 		= require('util/paging/index.js');
var _apiInvest 		= require('api/product-api.js');
var _apiTrade 		= require('api/trade-api.js');
var _apiUser 		= require('api/user-api.js');
var _operation 		= require('api/operate-api.js');
var investScatter 	= require('./details-scatter.string');
var scatterPhone 	= require('./details-phone.string');
var logOut 			= require('./logOut.string');
var subScatterHtml 	= require('./subScatter.string');
var moneyInp 		= require('./moneyInp.string');
var finished 		= require('./finished.string');
var isApp 			= require('./isApp.string');
var discounts 		= require('./discount.string');
var projectDet 		= require('./projectDet.string');
var auditImg 		= require('./auditImg.string');
var investDetails = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		var paramId = _td.getUrlParam("tender");
		var code = _td.getUrlParam("params");
		this.addHtml(headerData, code, paramId);
		this.inputEvent(headerData, code, paramId);
	},
	// 获取项目详情
	addHtml: function(headerData, code, id) {
		// 获取项目金额
		_apiInvest.getInvestListDetails(id, function(res) {
			var com = res.content;
			var setBar = _details.setBarShow(com.borrowAmount, com.surplusInvestAmount);
			com.proType = _details.setData(com.productType);
			com.pubTime = _details.setTime(0, com.publishTime);
			com.definetype = _details.setDefineType(com.defineType);
			com.barTxt = setBar.planTxt;
			com.barxx = setBar.barWin;
			$('.detail_top_left').html(_td.renderHtml(investScatter, {
				content: com
			}));
			investDetails.getBorrowData(code);
			// 渲染右侧模块
			if (com.isApp == 1) {
				// 是否app专享标
				isAppHtml = _td.renderHtml(isApp, {
					content: res.content,
				});
				$('.detail_top_right').html(isAppHtml);
				return false;
			} else {
				if (com.borrowFullStatus == 1) {
					// 是否满标1
					_apiTrade.getScatterFinis(id, function(res) {
						finishedHtml = _td.renderHtml(finished, {
							content: res.content,
						});
						$('.detail_top_right').html(finishedHtml);
					}, function(err) {
						console.log(err);
					});
					return false;
				} else {
					_apiUser.getUserCon(headerData, function(res) {
						var userCom = res.content;
						var isNewbie = userCom.isNewbie;
						if (com.surplusInvestAmount < 100) {
							userCom.subMoney = "本项目剩余可投" + com.surplusInvestAmount + "元";
						} else {
							userCom.subMoney = "100元起投,单笔限额50万元";
						};
						// 已登录
						if (com.clearingBoolean == true) {
							// 是否存管结算时间
							userCom.btnClas = "no_btn";
							userCom.brnTxt = "存管清算时间，不能加入";
							$('.detail_top_right').html(_td.renderHtml(moneyInp, {content: userCom}));
							_details.clearing();
						} else if (com.defineType == 1 && isNewbie == 0) {
							// 是否新手标
							userCom.btnClas = "no_btn";
							userCom.brnTxt = "新手专享，非新手不能加入";
							$('.detail_top_right').html(_td.renderHtml(moneyInp, {content: userCom}));
							_details.isNewInvest();
						} else if (com.serverTime < com.availableInvestTime) {
							// 是否为定时标
							userCom.btnClas = "no_btn";
							userCom.brnTxt = "";
							$('.detail_top_right').html(_td.renderHtml(moneyInp, {
								content: userCom,
							}));
							_details.coundDown(com.serverTime, com.availableInvestTime);
						} else {
							// 正常状态
							userCom.btnClas = "sub_btn";
							userCom.brnTxt = "实付0.00元，立即加入";
							$('.detail_top_right').html(_td.renderHtml(moneyInp, {
								content: userCom,
							}));
						}
						investDetails.setInvestMoney(userCom.usableFund, com.borrowApr, com.awardType, com.awardScale, com.productPeriod, com.surplusInvestAmount, com.refundWay, com.productType);
					}, function(err) {
						// 未登录
						logOutHtml = _td.renderHtml(logOut);
						$('.detail_top_right').html(logOutHtml);
						investDetails.setInvestOutMoney(com.borrowApr,com.awardType,com.awardScale,com.productPeriod,com.refundWay);
					});
				}
			}
		}, function(err) {
			console.log(err);
		});
	},
	setInvestMoney: function(balance, apr, awardType, awardScale, period, amount, refundWay, productType) {
		// par:年利率，awardType:奖励类型 0无1金额2利率，awardScale:奖励利率，period:期限，amount:剩余可投，type:还款类型，productType:项目类型0散标1精选
		// 输入金额input
		var balances = (balance.replace(/,/g, "")) * 1;
		$('.investting .sub_money').keyup(function() {
			_details.setinput($(this), amount, apr, awardType, awardScale, period, refundWay);
			_details.MoneyKeyUp($(this), amount, amount, balances, productType);
			_details.QuanInit();
		});
		// 余额全投
		$(".all_money").on("click", function() {
			_details.all_money(amount, balances, $(".sub_money"));
		});
		// 清空按钮
		$(".btn_empty").on("click", function() {
			_formError.hide($(".sub_money"));
			$(".sub_money").val("").blur();
			_details.setinput($(".sub_money"),amount,apr,awardType,awardScale,period,refundWay);
			_details.QuanInit();
		});
		$(document).on("click", ".discount_bot .add_quan", function() {
			_details.addBtn_q($(this),apr,period,refundWay);
		});
	},
	setInvestOutMoney: function(apr,awardType,awardScale,period,refundWay){
		// 未登录input输入金额
		$('.investting .outInp_money').keyup(function() {
			var inpoutM = $(this).val() * 1;
			_details.earnings(inpoutM,apr,awardType,awardScale,period,refundWay);
		});
	},
	// 获取tab项目详情
	getBorrowData: function(code) {
		_apiInvest.getFrontBorrowExpand(code, function(res) {
			var borrowcom = res.content;
			borrowcom.sexText = _details.setsex(borrowcom.sex);
			borrowcom.buyTimeText = _details.setTime(1, borrowcom.buyTime);
			$('.details').html(_td.renderHtml(projectDet, {
				content: borrowcom
			}));
		}, function(err) {
			console.log(err);
		});
	},
	// 获取投资列表
	getListPhone: function(id) {
		_apiTrade.getScatterPhone(id, 10, 1, function(res) {
			$(".chage_tr").html(_td.renderHtml(scatterPhone, {
				list: res.content.list
			}));
			_paging.paging("pageList", res.content.total, 10, function(e) {
				_apiTrade.getScatterPhone(id, 10, e.current, function(res) {
					$(".chage_tr").html(_td.renderHtml(scatterPhone, {
						list: res.content.list
					}));
					_td.trColor("tbody_list");
				}, function(err) {
					console.log(err);
				});
			});
			_td.trColor("tbody_list");
		}, function(err) {
			console.log(err);
		});
	},
	// 获取审核资料
	getAuditData: function(code) {
		// 获取tab审核资料
		_apiInvest.getPicListByPcode(code, function(res) {
			auditImgHtml = _td.renderHtml(auditImg, {
				content: res.content,
			});
			$('.audit').html(auditImgHtml);
		}, function(err) {
			console.log(err);
		});
	},
	// 获取优惠券信息 三个通用
	getDiscount: function(headerData, params) {
		_operation.getDiscounts(headerData, params, function(res) {
			if (res.content != "") {
				layer.open({
					type: 1,
					title: '',
					skin: '',
					closeBtn: 0,
					area: ['635px', '485px'],
					content: $('#discount_show')
				});
				discountHtml = _td.renderHtml(discounts, {
					content: res.content,
				});
				$('.discount_con').html(discountHtml);
				$(".disValTxt").each(function(i) {
					if ($(this).attr("type") == 1) {
						$(this).html("抵用券");
						$(this).parent("p").find($(".disValUnit")).html("￥");
					} else {
						$(this).html("年利率加息");
						$(this).parent("p").find($(".disValUnits")).html("%");
					}
				});
			} else {
				$(".inp_disc").val("当前没有可用优惠券").addClass("no_ticket").parent($("#ticket")).removeClass('add_ticket').off("click");
				$(".disHint").hide();
			}
		}, function(err) {
			console.log(err);
		});
	},
	// 点击投资
	subBtnClick: function(headerData, params) {
		if ($(".form-error-info").length > 0) {
			_formError.allHide($(".sub_psw"), $(".sub_psw"), $(".appoint_psw"));
		} else {
			if ($(".appoint_psw").length > 0) {
				var formData = {
					money: $.trim($('#sub_money').val()),
					password: $.trim($('#sub_psw').val()),
					passwords: $.trim($('#appoint_psw').val()),
				};
			} else {
				var formData = {
					money: $.trim($('#sub_money').val()),
					password: $.trim($('#sub_psw').val()),
				};
			}
			// 表单验证结果
			validateResult = _details.formValidate(formData);
			if (validateResult.status) {
				investDetails.subScatterFn(headerData, params);
			} else {
				var clas = '.' + validateResult.class;
				_formError.allShow(clas, validateResult.msg);
			}
		}
	},
	// 点击投资调取接口
	subScatterFn: function(headerData, params) {
		_apiTrade.subInvestScatter(headerData, params, function(res) {
			_formError.allHide($(".sub_money"), $(".sub_psw"), $(".appoint_psw"));
			var dataList = {
				tenderKey: res.content,
				num: 0
			};
			var getResult = setInterval(function() {
				dataList.num++;
				_apiTrade.subInvestScatterResult(headerData, dataList, function(res) {
					status = res.content.status;
					if (status == 1) {
						subScatterOk = _td.renderHtml(subScatterHtml, {
							content: res.content,
						});
						$("#succeed_show").html(subScatterOk);
						layer.open({
							type: 1,
							title: '',
							closeBtn: 0,
							skin: 'succeed_show',
							area: ['560px', '360px'],
							content: $('#succeed_show')
						});
						clearInterval(getResult);
					} else if (status == 2) {
						$(".msg").html(res.content.content);
						// 加入失败
						layer.open({
							type: 1,
							title: '',
							closeBtn: 0,
							skin: 'succeed_show',
							area: ['560px', '360px'],
							content: $('#failed_show')
						});
						clearInterval(getResult);
					} else {
						if (dataList.num >= 3);
						clearInterval(getResult);
					}
				}, function(err) {
					$(".msg").html(err.msg);
					// 加入失败
					layer.open({
						type: 1,
						title: '',
						closeBtn: 0,
						skin: 'succeed_show',
						area: ['560px', '360px'],
						content: $('#failed_show')
					});
					clearInterval(getResult);
				});
			}, 1000);
		}, function(err) {
			console.log(err);
			if (err.code == 140007) {
				_formError.allShow($(".sub_psw"), "密码错误，请重新输入！");
			} else if (err.code == 140011) {
				_formError.allShow($(".appoint_psw"), "约标密码错误，请重新输入！");
			} else if (err.code == 140001) {
				// 激活存管弹窗
				layer.open({
					type: 1,
					title: '',
					closeBtn: 0,
					skin: 'succeed_show',
					area: ['560px', '360px'],
					content: $('#bank_show')
				});
			} else {
				$(".msg").html(err.msg);
				// 加入失败
				layer.open({
					type: 1,
					title: '',
					closeBtn: 0,
					skin: 'succeed_show',
					area: ['560px', '360px'],
					content: $('#failed_show')
				});
			}
		});
	},
	// 优惠券点击 三个通用
	yhQuan: function(headerData, params) {
		// 优惠券点击
		var val = $(".inp_ticket").val();
		var sel = '<b class="select_b"></b>';
		if ($(".sub_money").val() == "") {
			_formError.show($("#sub_money"), "选择优惠券前需要填写加入金额！");
			$(".sub_money").focus();
			return false;
		} else if ($(".invest_money p").length <= 0) {
			investDetails.getDiscount(headerData, params);
			$(".ul_select li").each(function() {
				var vals = $(this).attr("id");
				if (val == vals) {
					$(this).append(sel);
				}
			});
		}
	},
	// input的所有事件及页面点击事件
	inputEvent: function(headerData, code, id) {
		var _this = this;
		// 获得焦点
		$('.investting input').focus(function() {
			_details.focus(this);
		});
		// 失去焦点
		$('.investting input').blur(function() {
			_details.blur();
		});

		// 输入金额input
		$('.investting .sub_money').focus(function() {
			_details.inpMoneyOnFocus($(this));
		});
		$('.investting .sub_money').blur(function() {
			var thiss = $(this);
			setTimeout(function() {
				_details.overFormat(thiss);
			}, 300);
		});
		$(".sub_psw").keyup(function() {
			_formError.hide($(this));
		});
		$('.investting input').mouseover(function() {
			_details.mouseover(this);
		});
		$('.investting input').mouseout(function() {
			_details.mouseout();
		});
		// 支付按钮点击的状态
		$(document).on("click", ".sub_btn", function() {
			var orderPassword = "";
			var authCode = "";
			if ($(".appoint_psw").length > 0) {
				orderPassword = $(".appoint_psw").val();
			}
			if ($(".authCode").length > 0) {
				authCode = $(".authCode").val();
			}
			var params = {
				borrowId: id,
				tenderMoney: $("#sub_money").val(),
				payPassword: md5($.trim($('#sub_psw').val())),
				voucherId: $(".inp_ticket").val(),
				orderPassword: orderPassword,
				authCode: authCode,
				channel: "0"
			};
			_this.subBtnClick(headerData, params);
		});
		$(document).on("click", ".add_ticket", function() {
			var params = {
				scaleMoney: $("#sub_money").val(),
				scaleTimeLimit: $(".borrowPeriod").html(),
				needType: 1
			};
			_this.yhQuan(headerData, params);
		});
		$(document).on("click", ".iskonw", function() {
			layer.closeAll();
			location.reload();
		});
		$(document).on("click", ".rclose", function() {
			layer.closeAll();
			location.reload();
		});
		// 优惠券弹窗选择
		$(document).on("click", ".ul_select li", function() {
			_details.disSelect($(this));
		});
		$(document).on("click", ".discount_bot .no", function() {
			$(".ul_select li .select_b").remove();
			$(".yes").removeClass("add_quan");
			layer.closeAll();
		});
		$(".detail_tab li a").on("click", function() {
			var type = $(this).attr("type");
			var ind = $(this).parent("li").index();
			$(".detai").eq(ind).show().siblings('.detai').hide();
			$(this).addClass("on");
			$(this).parent().siblings().find('a').removeClass('on');
			if (type == "list") {
				_this.getListPhone(id);
			} else if (type == "audit") {
				_this.getAuditData(code);
			}
		});
		// 已阅读
		$("#checkinp").on("click",function(){
			if($(this).is(':checked')) {
				$("#sub_btn").removeClass("no_btn").addClass("sub_btn");
			}else{
				$("#sub_btn").removeClass("sub_btn").addClass("no_btn");
			}
		});
		// 登录点击跳转
		$(".loginBtn").on("click",function(){
			_td.doLogin();
		});
	}
};
$(function() {
	investDetails.init();
	// 图片延时加载
	// $("img.lazy").lazyload({effect: "fadeIn"});
	$('.fancybox').fancybox({
		fitToView: false,
		// centerOnScroll:true,
		helpers: {
			title: {
				type: 'inside',
				position: 'top'
			}
		}
	});
});