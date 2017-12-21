require('../Info_aboutTd/index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');

var _td = require('util/td.js');
var _operate = require('api/operate-api.js');
var echarts = require('util/echarts/echarts.common.min.js');
var getPlatfromBorrowRank1 = require('./getPlatfromBorrowRank1.string');
var getPlatfromBorrowRank2 = require('./getPlatfromBorrowRank2.string');
var getPlatfromBorrowRank3 = require('./getPlatfromBorrowRank3.string');
var today = require('./today.string');
var month = require('./month.string');

var platData = {
	init: function() {
		this.load();
		this.charts();
		this.chartsM();
		this.tabCut();
	},
	load: function() {
		// 平台数据
		_operate.getPlatfromTaskPlatData(function(res) {
			var borrowAmount = res.content.borrowAmount;
			borrowAmount = (borrowAmount / 10000).toFixed(2);
			$(".shang .borrowAmount").html(borrowAmount + "万");
			$(".shang .borrowNum").html(res.content.borrowNum);
			$(".shang .borrowerNum").html(res.content.borrowerNum);
			var nowBorrowAmount = res.content.nowBorrowAmount;
			nowBorrowAmount = (nowBorrowAmount / 10000).toFixed(2);
			$('.zhong .nowBorrowAmount').html(nowBorrowAmount + "万");
			$('.zhong .nowBorrowNum').html(res.content.nowBorrowNum);
			$('.zhong .nowBorrowerNum').html(res.content.nowBorrowerNum);
			$('.zhong .nowInvestorNum').html(res.content.nowInvestorNum);
			var todayBorrowAmount = res.content.todayBorrowAmount;
			todayBorrowAmount = (todayBorrowAmount / 10000).toFixed(2);
			$('.zhong .todayBorrowAmount').html(todayBorrowAmount + "万");
			$('.zhong .todayBorrowNum').html(res.content.todayBorrowNum);
			$('.xia .overdueRate span').html(res.content.overdueRate);
			var overdueAmount = res.content.overdueAmount;
			overdueAmount = (overdueAmount / 10000).toFixed(2);
			$('.xia .overdueAmount').html(overdueAmount + "万");
			$('.xia .overdueNum').html(res.content.overdueNum);
			var overdueNinetyAmount = res.content.overdueNinetyAmount;
			overdueNinetyAmount = (overdueNinetyAmount / 10000).toFixed(2);
			$('.xia .overdueNinetyAmount').html(overdueNinetyAmount + "万");
			$('.xia .overdueNinetyNum').html(res.content.overdueNinetyNum);
			var compensationAmount = res.content.compensationAmount;
			compensationAmount = (compensationAmount / 10000).toFixed(2);
			$('.xia .compensationAmount').html(compensationAmount + "万");
			$('.xia .compensationNum').html(res.content.compensationNum);
			$('.xia .correlationBorrowAmount').html(res.content.correlationBorrowAmount);
			$('.xia .correlationBorrowNum').html(res.content.correlationBorrowNum);
		},function(err){
			console.log(err);
		});
		// 今日投资风云榜
		_operate.getPlatfromDayRank(function(res) {
			today = _td.renderHtml(today, {
				list: res.content,
			});
			$('.borrow_details .left .content').html(today);
		});
		// 月度投资风云榜
		_operate.getPlatfromDayRank(function(res) {
			month = _td.renderHtml(month, {
				list: res.content,
			});
			$('.borrow_details .right .content').html(month);
		});
		// 投资排行榜
		_operate.getPlatfromBorrowRank(function(res) {
			getPlatfromBorrowRank1 = _td.renderHtml(getPlatfromBorrowRank1, {
				list: res.content,
			});
			for (var i = 0; i <= res.content.length - 1; i++) {
				var amount =(res.content[i].amount/10000).toFixed(2);
				res.content[i].amount = amount;
			}
			$('.paihang table .ones').html(getPlatfromBorrowRank1);
			getPlatfromBorrowRank2 = _td.renderHtml(getPlatfromBorrowRank2, {
				list: res.content,
			});
			$('.paihang table .twos').html(getPlatfromBorrowRank2);
			getPlatfromBorrowRank3 = _td.renderHtml(getPlatfromBorrowRank3, {
				list: res.content,
			});
			$('.paihang table .threes').html(getPlatfromBorrowRank3);
		});
	},
	charts: function() {
		var myChart = echarts.init(document.getElementById('tu'));
		var seven = [];
		var sevenM = [];
		_operate.getPlatfromWeekVolumeChart(function(res) {
			seven = res.content.key;
			sevenM = res.content.val;
			option = {
				title: {
					text: '成交量（万元）',
					textStyle: {
						fontSize: 14,
						fontWeight: 'normal',
						color: '#9e9e9e'
					}
				},
				grid: {
					left: '1%',
					right: '10%',
					top: '15%',
					containLabel: true
				},
				xAxis: [{
					name: '（月-日）',
					nameTextStyle: {
						fontSize: 14,
						color: '#9e9e9e'
					},
					type: 'category',
					data: seven,
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#f2f2f2'
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#9e9e9e',
							fontSize: 14
						}
					}
				}],
				yAxis: [{
					type: 'value',
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['#f2f2f2'],
							width: 1,
							type: 'solid'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 80
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#9e9e9e',
							fontSize: 14
						}
					}
				}],
				series: [{
					name: '成交量',
					type: 'bar',
					data: sevenM,
					barWidth: 12,
					itemStyle: {
						normal: {
							barBorderRadius: [10, 10, 0, 0],
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#ff3501'
							}, {
								offset: 0.2,
								color: '#ff9741'
							}, {
								offset: 1,
								color: '#ffd6b3'
							}]),
							label: {
								show: true,
								position: 'top',
								textStyle: {
									fontSize: 14,
									color: '#ff7400',
									fontStyle: 'italic',
									baseline: 'top'
								}
							}
						}
					}
				}]
			};
			myChart.setOption(option);
		});
	},
	chartsM: function() {
		var myChart = echarts.init(document.getElementById('month'));
		var seven = [];
		var sevenM = [];
		_operate.getPlatfromMonthVolumeChart(function(res) {
			seven = res.content.key;
			sevenM = res.content.val;
			option = {
				title: {
					text: '成交量（万元）',
					textStyle: {
						fontSize: 14,
						fontWeight: 'normal',
						color: '#9e9e9e'
					}
				},
				grid: {
					left: '1%',
					right: '10%',
					top: '15%',
					containLabel: true
				},
				xAxis: [{
					name: '（月）',
					nameTextStyle: {
						fontSize: 14,
						color: '#9e9e9e'
					},
					type: 'category',
					data: seven,
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#f2f2f2'
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#9e9e9e',
							fontSize: 14
						}
					}
				}],
				yAxis: [{
					type: 'value',
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ['#f2f2f2'],
							width: 1,
							type: 'solid'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 80
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#9e9e9e',
							fontSize: 14
						}
					}
				}],
				series: [{
					name: '成交量',
					type: 'bar',
					data: sevenM,
					barWidth: 12,
					itemStyle: {
						normal: {
							barBorderRadius: [10, 10, 0, 0],
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#ff3501'
							}, {
								offset: 0.2,
								color: '#ff9741'
							}, {
								offset: 1,
								color: '#ffd6b3'
							}]),
							label: {
								show: true,
								position: 'top',
								textStyle: {
									fontSize: 14,
									color: '#ff7400',
									fontStyle: 'italic'
								}
							}
						}
					}
				}]
			};
			myChart.setOption(option);
		});
	},
	tabCut: function() {
		// tab切换
		$(".plat_nav ul li").on("click", function() {
			var index = $(this).index();
			$(".plats").hide();
			$(".plats").eq(index).show();
			$(this).addClass("on");
			$(this).siblings("li").removeClass("on");
		});
		// 运营报告tab切换
		$(".report_box .tab a").on("click", function() {
			$(".report_box .tab a").removeClass("xz");
			$(this).addClass("xz");
			var index = $(this).index();
			if (index == 0) {
				$(".show_box_7").show();
				$(".show_box_6").hide();
			} else {
				$(".show_box_6").show();
				$(".show_box_7").hide();
			}
		});
	}
};
$(function() {
	platData.init();
});