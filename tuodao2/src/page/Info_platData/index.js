require('../Info_aboutTd/index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');

var echarts=require('util/echarts/echarts.common.min.js');
$(function() {
	charts();
	chartsM();
	function charts() {
		var myChart = echarts.init(document.getElementById('tu'));
		var seven = ['08-30', '08-31', '09-01', '09-02', '09-03', '09-04', '09-05'];
		var sevenM = [1183.69, 1503.12, 1341.7, 952.63, 798.37, 1270.37, 1203.5];
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
	}

	function chartsM() {
		var myChart = echarts.init(document.getElementById('month'));
		var seven = ['03月', '04月', '05月', '06月', '07月', '08月'];
		var sevenM = [20066.48, 24480.06, 32809.37, 38141.23, 31667.78, 40349.79];
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
	}
	// tab切换
	$(".plat_nav ul li").on("click",function(){
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
});