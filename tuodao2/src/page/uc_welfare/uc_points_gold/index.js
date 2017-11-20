require('./uc_points_gold.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/index.js');

// 获取积分任务完成，插入到table最下面
/*$(function(){
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
})*/
var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiPointsGold = require('api/operationCenter-api.js');
var points_exchange = require('./points_exchange.string');
var points_detail = require('./points_detail_table.string');
var points_get = require('./points_get_table.string');
var pointsGold = {
	init : function(){
		this.getPoints();
		this.drawHtml();
		this.layerJs();
		this.tabCut();
		this.exchangeNum();
		this.exchangeTab();
	},
	// praise控制抽奖板块的出现隐藏
	praise : 0,
	headerData : {
		accessId : _td.getAccess('accessId'),
		accessKey : _td.getAccess('accessKey')
	},
	// 查询是否是抽奖页面积分不足跳转
	exchangeTab : function(){
		var url=window.location.search;
        //转换成字符串
        url=url.toString();
        var array=new Array();//用来存放分分割后的字符串
        array=url.split("?");
		if(array[1]==2){
			$('.points_menu a').eq(array[1]).addClass('welfare_border').siblings().removeClass('welfare_border');
			$('.points_detail').children().eq(array[1]).show().siblings().hide();
			$('.praise').hide();
			pointsGold.getPoints_get();
			pointsGold.praise=1;
		}else{
			pointsGold.getPoints_exchange();
		}
	},
	// 给数字添加逗号，小数点后两位
	numberAdd : function(str){
		return String(str).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')+'.00';
	},
	// 获取积分详细信息
	getPoints : function(){
		_apiPointsGold.getPoints(pointsGold.headerData,function(res){
			$('.points_current').html(pointsGold.numberAdd(res.content.scoreCurrent));
			$('.points_total').html(pointsGold.numberAdd(res.content.scoreTotal));
		},function(){
			console.log('请求失败');
		});
	},
	// 判断是否ie浏览器或是具有ie内核
	ieBrowser : function(){
		var agent = navigator.userAgent.toLowerCase();
		if ((/(msie\s|trident.*rv:)([\w.]+)/).test(agent)){
			$('.exchange .change li .btn_div input').height(22);
		}
	},
	// 积分兑换查询的优惠券类型与立即兑换按钮
	exchange_btn : function(listData,res){
		$.each($('.points_detail .change li'),function(i){
			if($('.points_detail .change li').eq(i).find('.change_btn')[0].getAttribute("data-type") == 2){
				$('.points_detail .change li').eq(i).addClass('last_child');
				$('.points_detail .change li').eq(i).find('.change_img').html('<i class="iconfont">&#xe6b9;</i>&nbsp;免费提现'+$('.points_detail .change li').eq(i).find('.change_img').html()+'次');
			}else{
				$('.points_detail .change li').eq(i).find('.change_img').html('<i>'+$('.points_detail .change li').eq(i).find('.change_img').html()+'</i>%&nbsp;年利率加息');
			}
		})
		// 立即兑换按钮
		$('.points_detail .change li .change_btn').on('click',function(){
			var goodsNum=parseInt($(this).parent().find('input').val());
			var goodsId=$(this)[0].getAttribute("data-id");
			var goodsType=$(this)[0].getAttribute("data-type");
			var needScore=parseInt($(this).siblings('.btn_div').find('i').html())*goodsNum;
			var result=parseInt($('.points_current').html().split(',').join(''))-needScore;
			var exchangeData={
				id 			: goodsId,
				type		: goodsType,
				num 		: goodsNum,
				sumScore 	: needScore
			}
			if(goodsNum<1){
				layer.msg('兑换数量为0，无法兑换');
			}else{
				if(result<0){
					layer.msg('积分不足');
					return false;
				}else{
					pointsGold.getGoods_exchange(exchangeData,result);
				 	// window.location.reload();
				}
			}
		})
	},
	// 积分兑换查询
	getPoints_exchange : function(){
		_apiPointsGold.getPoints_exchange(pointsGold.headerData,1,function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(points_exchange,{
				list:res.content.list,
			});
			$('.duihuan').html(bannerHtml);
			pointsGold.ieBrowser();
			pointsGold.HeightAuto();
			console.log($('.welfare_content').height())
			pointsGold.elHeight();
			pointsGold.exchange_btn(listData,res);
			_paging.paging('point_page',res.content.total,res.content.pageSize,function(e){
				_apiPointsGold.getPoints_exchange(pointsGold.headerData,e.current,function(res){
					listData = res.content.list;
					bannerHtml = _td.renderHtml(points_exchange,{
						list:res.content.list,
					});
					$('.duihuan').html(bannerHtml);
					pointsGold.ieBrowser();
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.exchange_btn(listData,res);
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	// 积分兑换提交
	getGoods_exchange : function(exchangeData,result){
		var data = {
				id 			: exchangeData.id,
				type		: exchangeData.type,
				num			: exchangeData.num,
				sumScore 	: exchangeData.sumScore
			}
		_apiPointsGold.getGoods_exchange(data,pointsGold.headerData,function(res){
			$('.points_current').html(pointsGold.numberAdd(result));
			layer.msg('兑换成功');
		},function(){
			console.log('请求失败');
		})
	},
	// 积分明细table中部分td样式，内容
	pointsDetail_table : function(listData){
		$.each(listData,function(i){
			listData[i].hanppenTime=pointsGold.format(listData[i].hanppenTime);
			if(listData[i].type == 1){
				listData[i].type='收入';
				listData[i].score='+'+listData[i].score;
			}/*else{
				listData[i].type='支出';
				listData[i].score='-'+listData[i].score;
			}*/
		});
	},
	// 积分明细
	getPoints_detail : function(){
		_apiPointsGold.getPoints_detail(pointsGold.headerData,1,10,function(res){
			pointsGold.pointsDetail_table(res.content.list);
			var bannerHtml = _td.renderHtml(points_detail,{
				list:res.content.list,
			});
			$('._points_detail_table').html(bannerHtml);
			$.each($('._points_detail_table tr'),function(i){
				if($('._points_detail_table tr').eq(i).children().eq(2).html() == '收入'){
					$('.points_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
				}
				$('._points_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
			})
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.points_detail_table');
			_paging.paging('point_page',res.content.total,res.content.pageSize,function(e){
				_apiPointsGold.getPoints_detail(pointsGold.headerData,e.current,10,function(res){
					pointsGold.pointsDetail_table(res.content.list);
					var bannerHtml = _td.renderHtml(points_detail,{
						list:res.content.list,
					});
					$('._points_detail_table').html(bannerHtml);
					$.each($('._points_detail_table tr'),function(i){
						if($('._points_detail_table tr').eq(i).children().eq(2).html() == '收入'){
							$('.points_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
						}
						$('._points_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
					})
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.changeColor('.points_detail_table');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	// 获取积分任务
	getPoints_get : function(){
		_apiPointsGold.getPoints_get(pointsGold.headerData,function(res){
			var bannerHtml = _td.renderHtml(points_get,{
				list:res.content.list,
			});
			var listData=res.content.list;
			$('._points_get_table').html(bannerHtml);
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.points_get_table');
			$.each(listData,function(i){
				if(listData[i].isGuoqi=='yes'){
					$('._points_get_table tr').eq(i+1).children().eq(2).html('任务已过期');
				}
				if(listData[i].isComplete=='yes'){
					$('._points_get_table tr').eq(i+1).children().eq(2).html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
				}else{
					$('._points_get_table tr').eq(i+1).find('a').on('click',function(e){
						if(listData[i].code==1){
							pointsGold.layerPublic(e,'points_gzh');
						}else if(listData[i].code==2){
							pointsGold.layerPublic(e,'points_login');
						}else if(listData[i].code==3){
							pointsGold.layerPublic(e,'points_invest');
						}else if(listData[i].code==4){
							pointsGold.getUserSign();
						}
					})
				}
			});
			_paging.paging('point_page',res.content.total,1000);
		},function(){
			console.log('请求失败');
		})
	},
	// 签到
	getUserSign : function(){
		_apiPointsGold.getUserSign(pointsGold.headerData,function(res){
			$('._points_get_table tr').eq(i+1).children().eq(2).html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
			// window.location.reload();
			var value=parseInt($('.points_current').html().split(',').join(''))+res.content;
			$('.points_current').html(pointsGold.numberAdd(value));
			console.log('签到成功');
		},function(){
			console.log('请求失败');
		})
	},
	// 时间为个位数时添加0
	add0 : function(m){
		return m<10?'0'+m:m;
	},
	// 时间戳转换成yy-mm-dd h:m:s
	format : function(shijianchuo){
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
	changeColor : function (obj){
		$.each($(obj+' tr'),function(i){
			if(i%2!=0){
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		})
	},
	// 阻止默认事件
	ReturnFalse : function(e){
		var event=e||window.event;
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	// 控制welfare_content的高与左侧菜单栏高度相同
	HeightAuto : function(){
		$('.uc_menu').height('auto');
		$('.uc_menu').siblings('div').height('auto');
	},
	elHeight : function (){
		var hL = $('.uc_menu')[0].clientHeight;
		var hR = $('.uc_menu').siblings('div')[0].clientHeight;
		if(hR>=hL){
			$(".uc_menu").height(hR);
			$('.uc_menu').siblings('div').height(hR);
		}else{
			$('.uc_menu').siblings('div').height(hL);
			$(".uc_menu").height(hL);
		}
	},
	// tab切换集合
	tabCut : function(){
		// 积分，金币菜单tab
		$('.points .menu a').on("click",function(event){
			pointsGold.HeightAuto();
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index=$(this).index();
			$('.welfare_top_menu').children().eq(index).show().siblings().hide();
			$('.exchange').children().eq(index).show().siblings().hide();
			if(index==1){
				$('.praise').hide();
				pointsGold.elHeight();
			}else{
				if(pointsGold.praise==0){
					$('.praise').show();
				}
				pointsGold.elHeight();
			}
		})
		// 我的积分下菜单tab
		$('.points_menu a').on("click",function(event) {
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index=$(this).index();
			pointsGold.praise=index;
			$('.points_detail').children().eq(index).show().siblings().hide();
			if(index==0){
				$('.praise').show();
				pointsGold.getPoints_exchange();
			}else if(index==1){
				for(var i=0;i<$('.points_detail_table tr').length;i++){
					$('.points_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				}
				$('.praise').hide();
				pointsGold.getPoints_detail();
			}else{
				$('.praise').hide();
				pointsGold.getPoints_get();
			}
		});
		// 我的金币下菜单tab
		$('.gold_menu a').on("click",function(event) {
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index=$(this).index();
			$('.gold_detail').children().eq(index).show().siblings().hide();
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			if(index==1){
				for(var i=0;i<$('.gold_detail_table tr').length;i++){
					$('.gold_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				}
			}
		});
	},
	// 兑换数量加减
	exchangeNum : function(){
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
	},
	// 抽奖页面跳转
	drawHtml : function(){
		$('.praise').on("click",function(event){
			window.open('draw_present.html','_blank');
		})
	},
	// 弹窗内部js
	layerJs : function(){
		$('#points_gzh ul li input').on({
			mouseover: function() {
			$(this).addClass('hover-input');
		},
			mouseout: function() {
				$(this).removeClass('hover-input');
			}
		})
		$('#points_gzh ul li input').on('focus',function(){
			$(this).removeClass('err-input');
		})
		$('#points_gzh ul li input').on('blur',function(){
			if($(this).val()==''){
				$(this).css({fontSize:'12px',color:'#9e9e9e'});
				$(this).removeClass('hover-input');
			}else{
				$(this).css({fontSize:'14px',color:'#333333'});
			}
		})
		$('#points_gzh ul li input').keyup(function() {
			if ($(this).val().length > 0) {
				$('#points_gzh ul li .del').show();
				$(this).css({fontSize:'14px',color:'#333333'});
			}
		});
		$('#points_gzh ul li .del').on('click',function(){
			$('#points_gzh ul li input').val('');
		})
		// 弹出层关闭
		$('.points_alert .i_know').on('click',function(){
			layer.closeAll();
		})
		$('#points_gzh .cancel').on('click',function(){
			layer.closeAll();
		})
		$('#points_gzh .submit_btn .submits').on({
			mouseover : function(){
				$(this).css('background','#ff7400');
			},
			mouseout : function(){
				$(this).css('background','#9e9e9e');
			}
		})
		$('#points_gzh .submit_btn .submits').on("click",function(){
			if($('#points_gzh ul li input').val()!='' && $('#points_gzh ul li input').val().length==6){
				//调用接口
			}else{
				$('#points_gzh ul li input').addClass('err-input');
				$('.order_err p').show();
			}
			layer.title('口令验证成功');
			$('#points_gzh .content').hide();
			$('#points_gzh .center').show();
			$('#points_gzh .order_err p').hide();
		})
		// 登录成功弹窗
		$('#points_gzh .submit_btn .submits').on("click",function(){
			$('#points_login .content').hide();
			$('#points_gzh .center').show();
		})
	},
	// 获取积分任务部分弹窗公共样式
	layerPublic : function(obj){
		var titles='';
		// pointsGold.ReturnFalse(e);
		if(obj=='points_gzh'){
			titles='获取积分：首次关注拓道金服微信公众号';
		}else if(obj=='points_login'){
			titles='获取积分：首次登录APP';
		}else{
			titles='获取积分：APP端手动投资';
		}
		layer.open({
			type: 1,
			title: [titles,'color: #707070;'],
			skin: obj,
			area: ['560px', '330px'],
			content: $('#'+obj)
		});
	}
}
$(function(){
	pointsGold.init();
})

