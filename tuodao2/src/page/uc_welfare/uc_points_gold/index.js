require('./uc_points_gold.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

$(document).ready(function(){
	console.log('readyssss');
	// var agent = navigator.userAgent.toLowerCase();
	// if (window.navigator.userAgent.indexOf("MSIE")>=1){
	if (!!window.ActiveXObject || "ActiveXObject" in window){
	// if ((/(msie\s|trident.*rv:)([\w.]+)/.test(agent)){
		console.log('ready');
		$('.exchange .change li .btn_div input').height(22);
	}
})

$(function(){
	// praise控制抽奖板块的出现隐藏
	var praise=0;
	$('.points .menu a').on("click",function(event){
		$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
		var index=$(this).index();
		$('.welfare_top_menu').children().eq(index).show().siblings().hide();
		$('.exchange').children().eq(index).show().siblings().hide();
		if(index==1){
			$('.praise').hide();
		}else{
			if(praise==0){
				$('.praise').show();
			}
		}
	})

	// 控制welfare_content的高
	/*var get_points=document.getElementById('get_points');
	$('.welfare_content').on('click',function(event){
		var event=event ||window.event;
		var target=event.target||event.srcElement;
		if(target.id==get_points){
			$('.welfare_content').height(1205);
			$('.uc_menu').height(1205);
		}else{
			$('.welfare_content').height(888);
			$('.uc_menu').height(888);
		}
	})*/
	$('.points_menu a').on("click",function(event) {
		$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
		var index=$(this).index();
		praise=index;
		$('.points_detail').children().eq(index).show().siblings().hide();
		if(index==0){
			$('.praise').show();
		}else if(index==1){
			for(var i=0;i<$('.points_detail_table tr').length;i++){
				$('.points_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				if($('.points_detail_table tr').eq(i).find('td').eq(3).html()=='+1'){
					$('.points_detail_table tr').eq(i).find('td').eq(3).css('color','#ff7400');
				}
			}
			$('.praise').hide();
		}else{
			$('.praise').hide();
		}
		/*if(index==2){
			$('.welfare_content').height(1205);
			$('.uc_menu').height($('.welfare_content').height());
			console.log($('.welfare_content')[0].clientHeight);
		}else{
			$('.uc_menu').css('height','inherit');
		}*/
	});
	$('.gold_menu a').on("click",function(event) {
		$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
		var index=$(this).index();
		$('.gold_detail').children().eq(index).show().siblings().hide();
		if(index==1){
			for(var i=0;i<$('.gold_detail_table tr').length;i++){
				$('.gold_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				if($('.gold_detail_table tr').eq(i).find('td').eq(3).html()=='+1'){
					$('.gold_detail_table tr').eq(i).find('td').eq(3).css('color','#ff7400');
				}
			}
		}
	});
	// 抽奖页面
	$('.praise').on("click",function(event){
		var draw  					= require('./draw.string');
		var  _td 					= require('util/td.js');
		var drawHtml 				= _td.renderHtml(draw);
		$('.draw').html(drawHtml).show();
		$('.welfare').hide();
		require('./draw.js');
	})
})

// 获取积分任务完成，插入到table最下面
$(function(){
	$('.points_get_table a').on('click',function(){
		var tr=$('<tr></tr>');
		tr.html($(this).parent().parent().html());
		$(this).parent().parent().remove();
		tr.find('a').html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
		tr.find('a').css('color','#8B8B8B');
		tr.find('span').css('color','#57B766');
		$('.points_get_table').append(tr);
		$('.points_get_table tr').css('background','#ffffff');
	})
})
$(function(){
	$('#points_gzh ul li input').on('input',function(){
		if($(this).val()==''){
			$(this).css({fontSize:'12px',color:'#9e9e9e'});
		}else{
			$(this).css({fontSize:'14px',color:'#333333'});
		}
	})
	$('#points_gzh ul li input').on('blur',function(){
		if($(this).val()==''){
			$(this).css({fontSize:'12px',color:'#9e9e9e'});
		}else{
			$(this).css({fontSize:'14px',color:'#333333'});
		}
	})
	// 弹出层关闭
	$('.points_alert .i_know').on('click',function(){
		layer.closeAll();
	})
	/*$('#points_gzh i_know').on('click',function(){
		layer.closeAll();

	})*/
	$(".points_detail .points_gzh").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_gzh',
			area: ['560px', '330px'],
			content: $('#points_gzh')
		});
	});
	$('#points_gzh .submit_btn .submits').on("click",function(){
		layer.title('口令成功');
		$('#points_gzh .content').hide();
		$('#points_gzh .center').show();
		$('#points_gzh .order_err p').hide();
	})

	$(".points_detail .points_login").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_login',
			area: ['560px', '330px'],
			content: $('#points_login'),
		});
	});
	$('#points_gzh .submit_btn .submits').on({
		mouseover:function(){
			$(this).css('background','#ff7400');
		},
		mouseout:function(){
			$(this).css('background','#9e9e9e');
		}
	})
	$('#points_gzh .submit_btn .submits').on("click",function(){
		layer.title('口令成功');
		$('#points_gzh .content').hide();
		$('#points_gzh .order_success').show();
	})

	$(".points_detail .points_invest").on("click", function() {
		layer.open({
			type: 1,
			title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
			skin: 'points_invest',
			area: ['560px', '330px'],
			content: $('#points_invest'),
		});
	});
})
// 兑换数量加减
$(document).on('click','.add',function(){
	var num=$(this).parent().find('input').val();
	$(this).parent().find('input').val(parseInt(num)+1);
})
$(document).on('click','.cut',function(){
	var num=$(this).parent().find('input').val();
	$(this).parent().find('input').val(parseInt(num)-1);
	if($(this).parent().find('input').val()<=0){
		$(this).parent().find('input').val(0);
	}
})
var _td = require('util/td.js');
var _apiPointsGold = require('api/points_gold_list-api.js');
var points_exchange = require('./points_exchange.string');
var points_detail = require('./points_detail_table.string');
var points_get = require('./points_get_table.string');
var pointsGold = {
	init:function(){
		this.getPoints();
		this.getPoints_exchange();
		this.getPoints_detail();
		this.getPoints_get();
		this.changeColor('.record_yes');
		this.changeColor('.gold_detail_table');
		this.changeColor('.gold_get_table');
	},
	getPoints:function(){
		_apiPointsGold.getPoints(function(res){
			$('.points_current').html(res.content.scoreCurrent);
			$('.points_total').html(res.content.scoreTotal);
		},function(){
			console.log('请求失败');
		});
	},
	getPoints_exchange:function(){
		_apiPointsGold.getPoints_exchange(1,3,function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(points_exchange,{
				list:res.content.list,
			});
			$('.duihuan').html(bannerHtml);
			$.each(listData,function(i){
				if(listData[i].type == 2){
					$('.change li').eq(i).addClass('last_child');
					$('.change li').eq(i).find('.change_img').html('<i class="iconfont">&#xe6b9;</i>&nbsp;免费提现'+res.content.list[i].numValue+'次');
				}
				// 立即兑换按钮
				$('.change li').eq(i).on('click','.change_btn',function(){
					var num=parseInt($(this).parent().find('input').val());
					var ids=listData[i].id;
					var type=listData[i].type;
					var sumScore=(listData[i].needScore)*num;
					if(sumScore>parseInt($('.points_current').html())){
						alert('积分不足');
						return false;
					}else{
						console.log(listData[i].id+' '+listData[i].needScore+num)
						$.ajax({
							type: "POST",
							url: "http://72.127.2.37/api/router/op/scoreExchange.json",
							beforeSend: function(xhr) {
								xhr.setRequestHeader("accessId", "accessId");
								xhr.setRequestHeader("accessKey", "accessKey");
								xhr.setRequestHeader("sign", "NO");
							},
							data: {
								id : ids,
								type : type,
								sumScore : sumScore,
								num : num
							},
							success: function(data) {
								console.log(data.msg);
								if (data.code == 100000) {
									pointsGold.getPoints();
								}
							},
							error: function(data) {
								console.log(data.msg);
							}
						});
					 	window.location.reload();
					}
				})
			});
			_apiPointsGold.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiPointsGold.getPoints_exchange(e.current,20,function(res){
					listData = res.content.list;
					bannerHtml = _td.renderHtml(points_exchange,{
						list:res.content.list,
					});
					$('.duihuan').html(bannerHtml);
					$.each(listData,function(i){
						if(listData[i].type == 2){
							$('.change li').eq(i).addClass('last_child');
							$('.change li').eq(i).find('.change_img').html('<i class="iconfont">&#xe6b9;</i>&nbsp;免费提现'+res.content.list[i].numValue+'次');
						}
						// 立即兑换按钮
						$('.change li').eq(i).on('click','.change_btn',function(){
							var num=parseInt($(this).parent().find('input').val());
							var ids=listData[i].id;
							var type=listData[i].type;
							var sumScore=(listData[i].needScore)*num;
							if(sumScore>parseInt($('.points_current').html())){
								alert('积分不足');
								return false;
							}else{
								console.log(listData[i].id+' '+listData[i].needScore+num)
								$.ajax({
									type: "POST",
									url: "http://72.127.2.37/api/router/op/scoreExchange.json",
									beforeSend: function(xhr) {
										xhr.setRequestHeader("accessId", "accessId");
										xhr.setRequestHeader("accessKey", "accessKey");
										xhr.setRequestHeader("sign", "NO");
									},
									data: {
										id : ids,
										type : type,
										sumScore : sumScore,
										num : num
									},
									success: function(data) {
										console.log(data.msg);
										if (data.code == 100000) {
											pointsGold.getPoints();
										}
									},
									error: function(data) {
										console.log(data.msg);
									}
								});
							 	window.location.reload();
							}
						})
					});
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getPoints_detail:function(){
		_apiPointsGold.getPoints_detail(1,10,function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(points_detail,{
				list:res.content.list,
			});
			$('._points_detail_table').html(bannerHtml);
			pointsGold.changeColor('.points_detail_table');
			$.each(listData,function(i){
				$('.points_detail_table tr').eq(i+1).find('td').first().html(pointsGold.format(res.content.list[i].hanppenTime));
				if(listData[i].type == "收入"){
					$('.points_detail_table tr').eq(i+1).find('td').last().css('color','#ff7400');
				}
			})
			_apiPointsGold.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiPointsGold.getPoints_detail(e.current,20,function(res){
					var listData = res.content.list;
					var bannerHtml = _td.renderHtml(points_detail,{
						list:res.content.list,
					});
					$('._points_detail_table').html(bannerHtml);
					pointsGold.changeColor('.points_detail_table');
					$.each(listData,function(i){
						$('.points_detail_table tr').eq(i+1).find('td').first().html(pointsGold.format(res.content.list[i].hanppenTime));
					})
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getPoints_get:function(){
		_apiPointsGold.getPoints_get(1,3,function(res){
			console.log();
			var bannerHtml = _td.renderHtml(points_get,{
				list:res.content.list,
			});
			$('._points_get_table').html(bannerHtml);
			pointsGold.changeColor('.points_get_table');
			_apiPointsGold.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiPointsGold.getPoints_get(e.current,20,function(res){
					var bannerHtml = _td.renderHtml(points_get,{
						list:res.content.list,
					});
					$('._points_get_table').html(bannerHtml);
					pointsGold.changeColor('.points_get_table');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	// 时间为个位数时添加0
	add0:function(m){
		return m<10?'0'+m:m;
	},
	// 时间戳转换成yy-mm-dd h:m:s
	format:function(shijianchuo){
		var time = new Date(shijianchuo);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y+'-'+pointsGold.add0(m)+'-'+pointsGold.add0(d)+' '+pointsGold.add0(h)+':'+pointsGold.add0(mm)+':'+pointsGold.add0(s);
	},
	// table隔行变色
	changeColor:function (obj){
		$.each($(obj+' tr'),function(i){
			if(i%2!=0){
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		})
	}
}
$(function(){
	pointsGold.init();
})

