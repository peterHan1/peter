require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
var _tips = require('util/tips/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
$(function() {
	$(".hint").mouseover(function() {
		_tips.getTipsRight($(this), -10);
	});
	$(".hint").mouseout(function() {
		$(this).find('.tips').hide();
	});
	// 自定义select
	$(".option li").click(function() {
		var type_name = $(this).attr('name');
		$(".option li").removeClass("on");
		$(this).addClass("on");
		var value = $(this).text();
		$(this).parent().siblings("p").find(".month").text(value);
		if (type_name == "months") {
			$(".deadline").html("月");
			$(".months").show().siblings('p').hide();
		} else if (type_name == "endmonth") {
			$(".deadline").html("月");
			$(".endmonth").show().siblings('p').hide();
		} else if (type_name == "endday") {
			$(".deadline").html("天");
			$(".endday").show().siblings('p').hide();
		}
	});
	$(document).on("click", ".select_com", function(event) {
		event.stopPropagation();
		$(this).find(".option").toggle();
		$(this).siblings().find(".option").hide();
	});
	$(document).click(function(event) {
		var eo = $(event.target);
		if ($(".select_com").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length) {
			$('.option').hide();
		}
	});
	$("input").on("input propertychange", function() {
		check("amount", "time", "rate", "award", "calc_btn", "kd");
	});
	// 按钮变色
	function check(amount, time, rate, award, btn, name) {
		var amount = $("#" + amount).val();
		var time = $("#" + time).val();
		var rate = $("#" + rate).val();
		var award = $("#" + award).val();
		if (amount != "" && time != "" && rate != "") {
			$("#" + btn).addClass(name);
			$("#" + btn).removeAttr("disabled");
			$("#" + btn).on("mouseover", function() {
				$("#" + btn).addClass("color");
			});
			$("#" + btn).on("mouseleave", function() {
				$("#" + btn).removeClass("color");
			});
		} else {
			$("#" + btn).removeClass(name);
			$("#" + btn).attr("disabled", "disabled");
			return false;
		}
	}
	// 立即计算
	$("#calc_btn").on("click", function() {
		if ($(this).hasClass('kd')) {
			$(".calc_result").show();
			$(".calc_table").show();
			var profit = 0;
			// 还款类型
			var type = $(".select_com .month").html();
			// 投资金额
			var amount = $.trim($("#amount").val());
			// 投资期限
			var time = $.trim($("#time").val());
			// 年化利率
			var rate = $.trim($("#rate").val());
			// 平台奖励
			var award = $.trim($("#award").val());
			// 逻辑
			$(".result_money .amount").html(amount);
			if (type == "等额本息") {
				// 计算公式：月还款=（本金*月利息*（1+月利率）^投资期限）/（（1+月利率）^投资期限-1）
				var account = amount;
				var apr = rate;
				var period = time;
				var interest = account * (apr * 0.01 + award * 0.01) / 12;
				var perMonthAprAll = (apr * 0.01 + award * 0.01) / 12;
				var perMonthApr = apr * 0.01 / 12;
				preMonth = Number(account * perMonthApr * Math.pow((1 + perMonthApr), period) / (Math.pow((1 + perMonthApr), period) - 1)).toFixed(2);
				preMonthAll = Number(account * perMonthAprAll * Math.pow((1 + perMonthAprAll), period) / (Math.pow((1 + perMonthAprAll), period) - 1)).toFixed(2);
				allAward = Number((preMonthAll - preMonth) * period).toFixed(2);
				$(".result_money .award").text(allAward);
				$("tr:not(':first')").remove();
				// 剩余本金
				var leftAcc = account;
				var planList = new List();
				for (var i = 0; i < period; i++) {
					var plan = new Array();
					var d = new Date();
					d.setMonth(d.getMonth()+i+1);
					var months = d.getFullYear() + "-"+ (d.getMonth() + 1) +"-"+ d.getDate();
					var per = (i + 1) + "/" + period;
					var perCapital, perInterest;
					if (i == period - 1) {
						perCapital = leftAcc;
						perInterest = (leftAcc * perMonthApr).toFixed(2);
						preMonth = Number(perCapital) + Number(perInterest);
					} else {
						perInterest = (leftAcc * perMonthApr).toFixed(2);
						perCapital = (preMonth - perInterest).toFixed(2);
					}
					profit = Number(Number(profit) + Number(perInterest)).toFixed(2);
					leftAcc = Number(Number(leftAcc) - Number(perCapital)).toFixed(2) < 0.2 ? 0 : Number(Number(leftAcc) - Number(perCapital)).toFixed(2);

					preMonth = Number(preMonth).toFixed(2);
					plan[0] = per;
					plan[1] = preMonth;
					plan[2] = perCapital;
					plan[3] = perInterest;
					plan[4] = 0;
					plan[5] = months;
					planList.add(plan);
				}
				var left = 0;
				for (var i = planList.size() - 1; i >= 0; i--) {
					planList.get(i)[4] = left;
					left = Number(Number(left) + Number(planList.get(i)[1])).toFixed(2);
				}
				for (var i = 0; i < planList.size(); i++) {
					var $tr = $("<tr><td>" + planList.get(i)[0] + "</td><td>" + planList.get(i)[5] + "</td><td>" + planList.get(i)[1] + "</td><td>" + planList.get(i)[2] + "</td><td>" + planList.get(i)[3] + "</td>");
					$(".calc_table table #tbody_list").append($tr);
				}
				var bxhj = Number(profit) + Number(account);
				$(".result_money .interest").text(profit);
			} else if (type == "按月付息") {
				var interest = amount * (rate / 100) * time / 12;
				interest = interest.toFixed(2);
				var principal = amount;
				console.log(principal);
				var allAward = Number(principal * award * 0.01 * time / 12).toFixed(2);
				var perMonthApr = (rate * 0.01) / 12;
				var period = time;
				$("tr:not(':first')").remove();
				var leftAcc = principal;
				var leftAll = Number((principal * perMonthApr).toFixed(2) * period + Number(principal)).toFixed(2);

				for (var i = 0; i < period; i++) {
					var d = new Date();
					d.setMonth(d.getMonth()+i+1);
					var months = d.getFullYear() + "-"+ (d.getMonth() + 1) +"-"+ d.getDate();
					var per = (i + 1) + "/" + period;
					var perInterest = (principal * perMonthApr).toFixed(2);
					var perCapital = 0;
					if (i + 1 == period) {
						perCapital = principal;
					} else {
						perCapital = 0;
					}

					var preMonth = Number(Number(perInterest) + Number(perCapital)).toFixed(2);

					profit = Number(Number(profit) + Number(perInterest)).toFixed(2);
					leftAcc = Number(Number(leftAcc) - Number(perCapital)).toFixed(2) < 0.2 ? 0 : Number(Number(leftAcc) - Number(perCapital)).toFixed(2);


					leftAll = Number(leftAll - preMonth).toFixed(2) < 0.2 ? 0 : Number(leftAll - preMonth).toFixed(2);

					var $tr = $("<tr><td>" + per + "</td><td>" + months + "</td><td>" + preMonth + "</td><td>" + perCapital + "</td><td>" + perInterest + "</td>");
					$(".calc_table table #tbody_list").append($tr);
				}
				$(".result_money .interest").html(interest);
				$(".result_money .award").html(allAward);
			} else {
				var principal = amount;
				var allAward = Number(principal * award * 0.01 * time / 365).toFixed(2);
				var perMonthApr = (rate * 0.01) / 365;
				var period = time;
				$("tr:not(':first')").remove();
				var leftAcc = principal;
				var leftAll = Number((principal * perMonthApr).toFixed(2) * period + Number(principal)).toFixed(2);

				var per = "1/1";
				var perInterest = (principal * perMonthApr * period).toFixed(2);
				var perCapital = principal;
				var d = new Date();
				var months = d.getFullYear() + "-"+ (d.getMonth() + 1) +"-"+ d.getDate();
				var preMonth = Number(Number(perInterest) + Number(perCapital)).toFixed(2);
				profit = Number(Number(profit) + Number(perInterest)).toFixed(2);
				leftAcc = Number(Number(leftAcc) - Number(perCapital)).toFixed(2) < 0.2 ? 0 : Number(Number(leftAcc) - Number(perCapital)).toFixed(2);


				leftAll = Number(leftAll - preMonth).toFixed(2) < 0.2 ? 0 : Number(leftAll - preMonth).toFixed(2);

				var $tr = $("<tr><td>" + per + "</td><td>" + months + "</td><td>" + preMonth + "</td><td>" + perCapital + "</td><td>" + perInterest + "</td>");
				$(".calc_table table #tbody_list").append($tr);
				$(".result_money .interest").html(profit);
				$(".result_money .award").html(allAward);
			}
		} else {
			return false;
		}
	});
	// 重置
	$(".reset").on("click", function() {
		$(".inp_ul input").val("");
		$(".calc_result").hide();
		$(".calc_table").hide();
		$("#calc_btn").removeClass("kd");
		$("#calc_btn").attr("disabled", "disabled");
	});
	// 点击咨询客服
	$(".consult .qq").on("click",function(){
		  location.href = "tencent://message/?uin=2391289524&Site=在线QQ&amp;Menu=yes";
	});
	function List() {
		this.list = new Array();
	};

	/**
	 * 将指定的元素添加到此列表的尾部。
	 * @param object 指定的元素
	 */
	List.prototype.add = function(object) {
		this.list[this.list.length] = object;
	};

	/**
	 * 将List添加到此列表的尾部。
	 * @param listObject 一个列表
	 */
	List.prototype.addAll = function(listObject) {
		this.list = this.list.concat(listObject.list);
	};

	/**
	 *  返回此列表中指定位置上的元素。
	 * @param index 指定位置
	 * @return 此位置的元素
	 */
	List.prototype.get = function(index) {
		return this.list[index];
	};

	/**
	 * 移除此列表中指定位置上的元素。
	 * @param index 指定位置
	 * @return 此位置的元素
	 */
	List.prototype.removeIndex = function(index) {
		var object = this.list[index];
		this.list.splice(index, 1);
		return object;
	};

	/**
	 * 移除此列表中指定元素。
	 * @param object 指定元素
	 * @return 此位置的元素
	 */
	List.prototype.remove = function(object) {
		var i = 0;
		for (; i < this.list.length; i++) {
			if (this.list[i] === object) {
				break;
			}
		}
		if (i >= this.list.length) {
			return null;
		} else {
			return this.removeIndex(i);
		}
	};

	/**
	 * 移除此列表中的所有元素。
	 */
	List.prototype.clear = function() {
		this.list.splice(0, this.list.length);
	};

	/**
	 * 返回此列表中的元素数。
	 * @return 元素数量
	 */
	List.prototype.size = function() {
		return this.list.length;
	};

	/**
	 * 返回列表中指定的 start（包括）和 end（不包括）之间列表。
	 * @param start 开始位置
	 * @param end   结束位置
	 * @return  新的列表
	 */
	List.prototype.subList = function(start, end) {
		var list = new List();
		list.list = this.list.slice(start, end);
		return list;
	};

	/**
	 *  如果列表不包含元素，则返回 true。
	 * @return true or false
	 */
	List.prototype.isEmpty = function() {
		return this.list.length == 0;
	};
});