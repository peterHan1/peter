$(function(){
	var isFriends = true;// 判断用户是否有邀请好友，ture有邀请，false没有
	var isData = true; // 判断用户是否有出借，充值，收益记录,只要有记录就为true
	// 没有任何记录（isData = false）,用于显示没有记录状态的页面执行以下代码
		// isData = false;
		// $('.bill-three .public_book_shade').hide();
		// $('.bill-three .public_book_Noshade').show();
	// 以上两个变量用于控制翻页的情况,请在登录判断之后优先获取


	// 音乐的播放暂停
	$('.music').on('touchstart',function(){
		if ($(this).hasClass('openMusic')) {
			$('#audio')[0].pause();
			$(this).removeClass('openMusic');
		}else{
			$('#audio')[0].play();
			$(this).addClass('openMusic');
		}
	})
	// transitionend兼容函数
	function whichTransitionEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
			}
		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
   }
   var transitionEvent = whichTransitionEvent()
// 加载页（第一个页面）的与到第二页面过渡的js，加载期间就请求接口判断有没有登录
	// 加载页面的加载进度百分比计算
	var times = setInterval(function() {
		$('.num').html(Math.floor($('.line').width() / $('.inside').width() * 100) + '%');
	}, 10)
	$('.progress .line').stop(true,true).animate({
		width:'100%'
	}, 1000, function () {
		if ($('.num').html() != '100%') {
			$('.num').html('100%');
		}
		clearInterval(times);
		$('.bill-two').show();
		$('.bill-one').fadeOut(800, function () {
			// 未登录则跳转到登录页
			// 登录过了则执行以下代码

			// 加载页面消失后的回调，第二页面出现
			pageTwo();
		})
	})
	// 第二页面（翻书页面）出现函数
	function pageTwo () {
		$('#bill-two-home').hide();
		$('#bill-two-pages').hide();
		$('.bill-two .shade').hide();
		$('.bill-two .title').hide();
		$('.bill-two .openBtn').hide();
		$('.bill').removeClass('activeOther'); // activeOther只控制大图的转动效果
		$('.bill-two').show();
		setTimeout(function(){
			$('.bill').addClass('activeOther');
		},800);
		$('.bill-two .bill-two-bg').on(transitionEvent, function() {
			// 第二页面的放大效果消失后的回调
			$('#bill-two-home').show();
			$('#bill-two-pages').show();
			$('.bill-two .shade').show();
			$('.bill-two .title').fadeIn(900);
			setTimeout(function() {
				$('.bill-two .openBtn').fadeIn(900);
			}, 500)
			$(this).off(transitionEvent);
		})
	}
	// 第二页面的立即打开账本按钮
	$('.bill-two .openBtn').on('touchstart',function(){
		$('#bill-two-home').addClass('turnPage');
		setTimeout(function(){
			$('.bill-two .whiteMask').fadeIn(800,function(){
				$('.bill-two .whiteMask').hide();
				$('.bill-two').hide();
				$('#bill-two-home').removeClass('turnPage');
				$('.bill-three').show();
				touchNextPage();// 当翻书页消失才可执行翻页函数
				pageThree();
			});
		},800)
	})

	// 第三页面（我们许多个第一次）出现函数
	function pageThree () {
		$('.bill').removeClass('active');
		$('.bill-three .public_nextPage').hide();
		$('.bill-three .three-move').removeClass('activeDelay');
		setTimeout(function(){$('.bill').addClass('active');},500);
		if (!isData) {
			$('.bill-three .public_book .noRecord img').eq(1).on(transitionEvent, function(){
				// 底部滑动查看下一页显示
				$('.bill-three .public_nextPage').fadeIn(600);
				$(this).off(transitionEvent);
			})
		} else {
			var liIndex = $('.bill-three .txt ul li').length - 1;
			$('.bill-three .txt ul li').eq(liIndex).on(transitionEvent, function(){
				// 手指滑手机gif图出现
				$('.bill-three .three-move').addClass('activeDelay');
				$(this).off(transitionEvent);
			})
			$('.bill-three .three-move').on(transitionEvent, function(){
				// 底部滑动查看下一页显示
				$('.bill-three .public_nextPage').fadeIn(600);
				$(this).off(transitionEvent);
			})
		}
	}
	// 第三页面（我们许多个第一次），判断用户的出借，充值，收益情况


	// 第五页趋势图生成函数
	// 请在个人每月收益数据请求成功后，执行
	var	myIncome = [100,200,300,350,400,500,600,400,300,900,1000,1200]; //个人每月收益数组，按照从1月到12月排序
	charts();
	function charts(){// 平台环比数据，交易金额
		var myChart = echarts.init(document.getElementById('my_echarts'));
		// 折线图分段显示
		// 对于标签数据上下交叉显示，可以先画整个不显示标签数据的折线，再接着重复画每个点，用于覆盖原先的点，并给改点添加标签数据，重新定位
		option = {
			grid: {
				left: '-6%',
				right: '8%',
				bottom: '2%',
				top: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				axisTick: {show:false},
				data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
				axisLabel:{interval:0, textStyle:{color:'#4f5b71',fontSize:12}},
				axisLine:{
					lineStyle:{color:'#D4D4D4',width: 1}// x轴的颜色和宽度
				},
			},
			yAxis: {
				type: 'value',
				axisLabel:{show:false},
				axisTick: {show:false},
				splitLine:{
					show:true,
					lineStyle: {
						color: '#D4D4D4',
						width: 1,
						type: 'solid'
					}
				},
				axisLine:{
					lineStyle:{width: 0}// y轴的宽度
				}
			},
			series: [{
				data: myIncome,
				type: 'line',
				smooth: true,// 折现弯曲平滑属性
				symbol: 'circle',// 折线拐点形状
				symbolSize: 3,// 折线拐点大小
				// 折线区域颜色
				areaStyle: {normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
							offset: 0, color: '#F6E8C5' // 0% 处的颜色
						}, {
							offset: 1, color: '#F6E8C5' // 100% 处的颜色，从上往下渐变
						}]
					)}
				},
				itemStyle: {
					normal: {
						lineStyle:{
							width:2,//折线宽度
							color:"#feba00"//折线颜色
						},
						color: "#fe8401",// 折线图整体颜色
						borderWidth: 0,// 拐点边框大小
						borderColor:'green',// 拐点边框颜色
						label: {
							show: false,// 控制标签数据的显示
							position: 'top',
							textStyle: {fontSize:12,color: '#333',fontFamily: 'DIN',baseline:'top'},
							formatter:function(value){// 格式化数据,每三个数字后加个逗号
								return String(value.data).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')
							}
						}
					}
				}
			}]
		};
		myChart.setOption(option);
	}
	var pageIndex = 0; // 当前页面的下标
	var touchBlooe = true;
	// 翻上页
	function lastPage () {
		if(touchBlooe){
			touchBlooe = false;
			setTimeout(function(){
				// 自定义3秒钟才可以继续滑动
				touchBlooe = true
			},1000)
			if (!isData) { // 没有记录的用户跳转
				if (!isFriends) {
					// 没有记录的用户并且没有邀请好友跳转$('.noData_noFriends')
					if (pageIndex === 0) {
						return false;
					}else if(pageIndex === 1){
						$('.noData_noFriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.noData_noFriends').eq(pageIndex).fadeIn();
						pageThree();
					}else{
						$('.bill').removeClass('active');
						$('.noData_noFriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.noData_noFriends').eq(pageIndex).fadeIn();
						setTimeout(function(){
							$('.bill').addClass('active');
						},1000)
					}
				}else{
					// 没有记录的用户但是有邀请好友跳转$('.noData_hasFriends')一共4个模块
					if (pageIndex === 0) {
						return false;
					}else if(pageIndex === 1){
						$('.noData_hasFriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.noData_hasFriends').eq(pageIndex).fadeIn();
						pageThree();
					} else {
						$('.bill').removeClass('active');
						$('.noData_hasFriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.noData_hasFriends').eq(pageIndex).fadeIn();
						setTimeout(function(){
							$('.bill').addClass('active');
						},1000)
					}
				}
			} else{
				if (isFriends) {
					//$('.hasData_hasfriends')有记录并且有邀请好友
					if (pageIndex === 0) {
						return false;
					}else if(pageIndex === 1){
						$('.hasData_hasfriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.hasData_hasfriends').eq(pageIndex).fadeIn();
						pageThree();
					} else {
						$('.bill').removeClass('active');
						$('.hasData_hasfriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.hasData_hasfriends').eq(pageIndex).fadeIn();
						setTimeout(function(){
							$('.bill').addClass('active');
						},1000)
					}
				}else{
					//$('.hasData_nofriends')有记录但是没有邀请好友
					if (pageIndex === 0) {
						return false;
					}else if(pageIndex === 1){
						$('.hasData_nofriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.hasData_nofriends').eq(pageIndex).fadeIn();
						pageThree();
					} else {
						$('.bill').removeClass('active');
						$('.hasData_nofriends').eq(pageIndex).fadeOut();
						pageIndex--;
						$('.hasData_nofriends').eq(pageIndex).fadeIn();
						setTimeout(function(){
							$('.bill').addClass('active');
						},1000)
					}
				}
			}
		}
	}

	// 翻下页
	function nextPage () {
		if(touchBlooe){
			touchBlooe = false;
			setTimeout(function(){
				// 自定义3秒钟才可以继续滑动
				touchBlooe = true
			},1000)
			if (!isData) { // 没有记录的用户跳转
				if (!isFriends) {
					// 没有记录的用户并且没有邀请好友跳转$('.noData_noFriends')一共2个模块
					if(pageIndex === 1){
						return false
					}else{
						if (pageIndex == 0) {
							console.log(pageIndex)
							$('.noData_noFriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.noData_noFriends').eq(pageIndex).fadeIn();
							pageThree();
						}else{
							$('.bill').removeClass('active');
							$('.noData_noFriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.noData_noFriends').eq(pageIndex).fadeIn();
							setTimeout(function(){
								$('.bill').addClass('active');
							},800)
						}
					}
				}else{
					// 没有记录的用户但是有邀请好友跳转$('.noData_hasFriends')一共3个模块
					if(pageIndex === 2){
						return false
					}else{
						if (pageIndex == 0) {
							$('.noData_hasFriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.noData_hasFriends').eq(pageIndex).fadeIn();
							pageThree();
						}else{
							$('.bill').removeClass('active');
							$('.noData_hasFriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.noData_hasFriends').eq(pageIndex).fadeIn();
							setTimeout(function(){
								$('.bill').addClass('active');
							},800)
						}
					}
				}
			} else{
				if (isFriends) {
					//$('.hasData_hasfriends')有记录并且有邀请好友一共7个模块
					if(pageIndex === 6){
						return false
					} else {
						if (pageIndex == 0) {
							$('.hasData_hasfriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.hasData_hasfriends').eq(pageIndex).fadeIn();
							pageThree()
						}else{
							$('.bill').removeClass('active')
							$('.hasData_hasfriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.hasData_hasfriends').eq(pageIndex).fadeIn();
							setTimeout(function(){
								$('.bill').addClass('active')
							},800)
						}
					}
				}else{
					//$('.hasData_nofriends')有记录但是没有邀请好友一共6个模块
					if(pageIndex === 5){
						return false
					} else {
						if (pageIndex == 0) {
							$('.hasData_nofriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.hasData_nofriends').eq(pageIndex).fadeIn();
							pageThree()
						}else{
							$('.bill').removeClass('active')
							$('.hasData_nofriends').eq(pageIndex).fadeOut();
							pageIndex++;
							$('.hasData_nofriends').eq(pageIndex).fadeIn();
							setTimeout(function(){
								$('.bill').addClass('active')
							},800)
						}
					}
				}
			}
		}
	}
	// 翻页函数
	function touchNextPage () {
		var startX,startY;
		$(".bills").on("touchstart", function(e) {
		    if (e.cancelable) {
		        if (!e.defaultPrevented) {
		            e.preventDefault();
		        }
		    }
		    startX = e.originalEvent.changedTouches[0].pageX,
		    startY = e.originalEvent.changedTouches[0].pageY;
		});
		$(".bills").on("touchend", function(e) {
		    if (e.cancelable) {
		        if (!e.defaultPrevented) {
		            e.preventDefault();
		        }
		    }
		    moveEndX = e.originalEvent.changedTouches[0].pageX,
		    moveEndY = e.originalEvent.changedTouches[0].pageY,
		    X = moveEndX - startX,
		    Y = moveEndY - startY;
		    //左滑
		    if ( X > 30 ) {
		    	lastPage()
		    }
		    //右滑
		    else if ( X < -30 ) {
		    	nextPage()
		    }
		});
	}
})