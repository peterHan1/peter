require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _td 		= require('util/td.js');
var _tips 		= require('util/tips/index.js');
var _apiInvest 	= require('api/trade-api.js');
var _paging 	= require('util/paging/index.js');
var autoInp 	= require('./autoInp.string');
var setInp 		= require('./setInp.string');
var autoSum 	= require('./autoSum.string');
var autoRank 	= require('./autoRank.string');
var autoList 	= require('./autoList.string');

var ucInvest = {
	init: function() {
		var headerData = {
			'accessId': unescape(_td.getAccess('accessId')),
			'accessKey': unescape(_td.getAccess('accessKey'))
		};
		this.autoOpen(headerData);
		this.setInpForm(headerData);
		this.urlEach(headerData);
	},
	urlEach: function(headerData) {
		$('.auto_switchTab a').each(function() {
			if (location.href.indexOf($(this).attr('href')) > -1 && $(this).attr('href') != "") {
				var types = $(this).attr('type');
				var index = $(this).parent().index();
				$(this).addClass('on');
				$(".auto_com").eq(index).show().siblings(".auto_com").hide();
				if (types == "1") {
					ucInvest.getAutoList(headerData);
				}
			} else {
				$(this).removeClass('on');
			};

		});
	},
	// 开启自动投标总人数
	getAutoSum: function(headerData) {
		_apiInvest.getAutoSum(headerData, function(res) {
			autoSum = _td.renderHtml(autoSum, {
				content: res.content,
			});
			$('.auto_tips').html(autoSum);
		}, function(err) {
			console.log(err);
		});
	},
	// 是否开通自动投标
	setInpForm: function(headerData) {
		_apiInvest.getInpForm(headerData, function(res) {
			var sta = res.content.status;
			autoSum = _td.renderHtml(autoSum, {
				content: res.content,
			});
			$('.auto_tips').html(autoSum);
			if (sta == "0") {
				$("#switch").attr("class", "switch_off");
				$("#switch").attr("status", sta);
				ucInvest.getAutoSum(headerData);
			} else if (sta == "1") {
				$(".auto_setForm").show();
				$("#switch").attr("status", sta);
				$("#switch").attr("class", "switch_on");
				inpSet = _td.renderHtml(setInp, {
					content: res.content,
				});
				$('.auto_setBox').html(inpSet);
				ranking = _td.renderHtml(autoRank, {
					content: res.content,
				});
				$(".auto_tips").html(ranking);
				ucInvest.setForm(headerData);
			}
		}, function(err) {
			console.log(err);
		});
	},
	// 自动投标按钮打开、关闭
	autoOpen: function(headerData) {
		$("#switch").on("click", function() {
			var _this = $(this);
			var sta = $(this).attr("status");
			if ($(this).is('.switch_off')) {
				ucInvest.getBank(headerData, $(this));
			} else if (sta == "1" && $(this).is('.switch_on')) {
				console.log("已经开启 手动关闭");
				$(".auto_setInp").remove();
				ucInvest.closAuto(headerData, $(this));
			} else if (sta == "0" && $(this).is('.switch_on')) {
				console.log("没有开启 也没有保存");
				$(".auto_setInp").remove();
				$(".auto_setForm").hide();
				$(this).attr("class", "switch_off");
			}
		});
	},
	// 是否开通存管
	getBank: function(headerData, el) {
		_apiInvest.getAutoBank(headerData, function(res) {
			el.attr("class", "switch_on");
			$(".auto_ranking").show();
			$(".auto_setForm").show();
			var flag = res.content;
			if (flag == false) {
				var banlHtml = '<div class="auto_deposit"><div class="auto_deposit_bg"></div><p>为了保障您的资金安全,请在充值、投资、提现前开通存管</p><a href="">立即激活存管用户</a></div>';
				$(".auto_setBox").html(banlHtml);
			} else {
				autoinp = _td.renderHtml(autoInp, {});
				$('.auto_setBox').html(autoinp);
				$(".select_com").addClass('select');
				ucInvest.setForm(headerData);
			}
		}, function(err) {
			console.log(err);
		});
	},
	getAutoList: function(headerData) {
		_apiInvest.autoLists(headerData, 10, 1, function(res) {
			list = _td.renderHtml(autoList, {
				list: res.content.list,
			});
			$('#tbody_list').html(list);
			_td.trColor("tbody_list");
			_paging.paging("pageList", res.content.total, 10, function(e) {
				_apiInvest.autoLists(headerData, 10, e.current, function(res) {
					list = _td.renderHtml(autoList, {
						list: res.content.list,
					});
					$('#tbody_list').html(list);
					_td.trColor("tbody_list");
				}, function() {
					console.log("分页请求失败");
				});
			});
		}, function() {
			console.log("请求失败");
		});
	},
	closAuto: function(headerData, el) {
		_apiInvest.closeAuto(headerData, function(res) {
			el.attr("class", "switch_off");
			el.attr("status", "0");
			$(".auto_ranking").hide();
			$(".auto_setForm").hide();
			ucInvest.getAutoSum(headerData);
			ucInvest.setInpForm(headerData);
		}, function(err) {
			console.log(err);
		});
	},
	setForm: function(headerData) {
		// 点击修改
		$(".set_form").on("click", function() {
			$(".select_com").addClass("select");
			$(".auto_setInp input").removeAttr("disabled");
			$(".set_btn").hide();
			$(".reminder").hide();
			$(".sub_btn").show();
			$(".redios_inp").show();
		});
		ucInvest.cancelBtn();
		ucInvest.customRadio();
		ucInvest.customSelect();
		ucInvest.tipsHover();
		ucInvest.saveBtn(headerData);
		ucInvest.setInputMoney();

	},
	// 取消按钮
	cancelBtn: function() {
		$(".callOff").on("click", function() {
			var sta = $("#switch").attr("status");
			if (sta == "0") {
				$("#switch").attr("class", "switch_off");
				$(".auto_setForm").hide();
				$(".auto_setInp").remove();

			} else {
				$(".select_com").removeClass("select");
				$(".auto_setInp input").attr("disabled", "disabled");
				$(".set_btn").show();
				$(".reminder").show();
				$(".sub_btn").hide();
				$(".redios_inp").hide();
			}
		});
	},
	// 保存按钮
	saveBtn: function(headerData) {
		$(".save_btn").on("click", function() {
			var minPeriod = $(".minPeriod").html();
			var maxPeriod = $(".maxPeriod").html();
			var minMoney = $(".minAccount").val();
			var maxMoney = $(".maxAccount").val();
			var useCoupon = $(".redios_inp").attr("name");
			var minAccount = minMoney;
			var maxAccount = maxMoney;
			// 输入金额判断
			if (minMoney > maxMoney) {
				minAccount = maxMoney;
				maxAccount = minMoney;
			}
			var param = {
				minAccount: minAccount,
				maxAccount: maxAccount,
				minPeriod: minPeriod,
				maxPeriod: maxPeriod,
				useCoupon: useCoupon,
			};
			_apiInvest.openAuto(headerData, param, function(res) {
				ucInvest.saveSub(minAccount, maxAccount);
				ucInvest.setInpForm(headerData);
			}, function(err) {
				console.log(err);
			});
		});
	},
	// 保存提交成功执行
	saveSub: function(minAccount, maxAccount) {
		var radio = $(".redios_inp").attr("name");
		if (radio == '0') {
			$(".reminder").show().html("不使用");
		} else {
			$(".reminder").show().html("使用");
		}
		$(".select_com").removeClass("select");
		$(".auto_setInp input").attr("disabled", "disabled");
		$(".set_btn").show();
		$(".sub_btn").hide();
		$(".redios_inp").hide();
		$(".minAccount").val(minAccount);
		$(".maxAccount").val(maxAccount);
	},
	customRadio: function() {
		// 自定义radio
		$(".redios").on("click", function() {
			var check = $(this).attr("name");
			$(this).addClass("checked");
			$(this).find("i").html("&#xe61e;");
			$(this).siblings(".redios").find("i").html("&#xe622;");
			$(this).siblings().removeClass('checked');
			$(".redios_inp").attr("name", check);

		});
	},
	customSelect: function() {
		// 自定义select
		$(document).off("click", ".option li").on("click", ".option li", function() {
			$(".option li").removeClass("on");
			$(this).addClass("on");
			var value = $(this).text();
			$(this).parent().siblings("p").find(".month").text(value);
			var minPeriod = $(".minPeriod").html();
			var maxPeriod = $(".maxPeriod").html();
			var minul = $(".minOption");
			var maxul = $(".maxOption");
			var minList = "";
			var maxList = "";
			// 投资期限判断
			for (var i = 1; i < maxPeriod * 1 + 1; i++) {
				var li = "<li>" + i + "</li>";
				minList += li;
			}
			minul.html(minList);
			for (var i = minPeriod; i < 36 + 1; i++) {
				var li = "<li>" + i + "</li>";
				maxList += li;
			}
			maxul.html(maxList);
		});
		$(document).off("click", ".select").on("click", ".select", function(event) {
			event.stopPropagation();
			$(this).find(".option").toggle();
			$(this).siblings().find(".option").hide();
		});
		$(document).click(function(event) {
			var eo = $(event.target);
			if ($(".select").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length) {
				$('.option').hide();
			}
		});
	},
	setInputMoney: function() {
		$(".auto_setInp input").on("keyup", function() {
			this.value = this.value.replace(/[^\d]/g, '');
		});
	},
	tipsHover: function() {
		$(".hint").mouseover(function() {
			if ($(this).find("a").width() >= $(this).width()) {
				_tips.getTipsRight($(this), 0);
			}
		});
		$(".hints").mouseover(function() {
			if ($(this).find("a").width() >= $(this).width()) {
				_tips.getTipsRight($(this), -10);
			}
		});
		$(".hint").mouseout(function() {
			$(this).find('.tips').hide();
		});
	}
};
$(function() {
	ucInvest.init();
});