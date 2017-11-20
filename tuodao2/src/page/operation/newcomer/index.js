require('./newcomer.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _td = require('util/td.js');
var _apiNewTask = require('api/operationCenter-api.js');
var newTaskHtml = require('./newcomerTask.string');
var newTask = {
	init : function(){
		this.newTask();
		this.getMemberInfo();
	},
	headerData : {
		accessId : _td.getAccess('accessId'),
		accessKey : _td.getAccess('accessKey')
	},
	newTask:function(){
		_apiNewTask.getNewtask(newTask.headerData,function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(newTaskHtml,{
				list:res.content.list,
			});
			$('.task_list').html(bannerHtml);
			newTask.mouseOver();
			$.each(listData,function(i){
				var reg=/非债权转让标/g;
				if(reg.test(listData[i].taskName)){
					var Names=String(listData[i].taskName).split('（非债权转让标）').join('');
					$('.task li').eq(i).find('.p1').html(Names+'<br /><span>（非债权转让标）</span>');
					$('.task li').eq(i).children().first().addClass('pad_bot');
				}
				if((i+1)%5==0){
					$('.task li').eq(i).addClass('mar_rgt');
				}
				if(listData[i].isGuoqi=='yes'){
					$('.task li').eq(i).find('.btn').html('任务已过期');
					$('.task li').eq(i).off();
					$('.task li').eq(i).find('.p2').css('color','#9e9e9e');
					$('.task li').eq(i).find('.p3').css('color','#9e9e9e');
				}
				if(listData[i].isComplete=='yes'){
					$('.task li').eq(i).find('.btn').html('<span class="iconfont">&#xe675;</span> 已完成');
					$('.task li').eq(i).off();
					$('.task li').eq(i).find('.btn').css({color:'#6CBB50',background:'#ffffff'});
					$('.task li').eq(i).find('.p2').css('color','#9e9e9e');
					$('.task li').eq(i).find('.p3').css('color','#9e9e9e');
				}else{
					$('.task li').eq(i).on('click',function(e){
						if(listData[i].code==1){
							newTask.layerPublic(e,'points_gzh');
						}else if(listData[i].code==2){
							newTask.layerPublic(e,'points_login');
						}else if(listData[i].code==3){
							newTask.layerPublic(e,'points_invest');
						}else{
							window.open(listData[i].url);
						}
					})
				}
			})
		},function(){
			console.log('请求失败');
		})
	},
	// 阻止默认事件
	ReturnFalse:function(e){
		var event=e||window.event;
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	// 弹窗内部js
	layerJs:function(){
		$('#points_gzh ul li input').on('input',function(){
			if($(this).val()==''){
				$(this).css({fontSize:'12px',color:'#9e9e9e'});
			}else{
				$(this).css({fontSize:'14px',color:'#333333'});
			}
		})
		/*$("#points_gzh ul li input").on('focus',function(){
			$(this).css({color:'#333333',fontSize:'14px'});
		})*/
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
		$('#points_gzh .cancel').on('click',function(){
			layer.closeAll();
		})
		$('#points_gzh .submit_btn .submits').on({
			mouseover:function(){
				$(this).css('background','#ff7400');
			},
			mouseout:function(){
				$(this).css('background','#9e9e9e');
			}
		})
		$('#points_gzh .submit_btn .submits').on("click",function(){
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
	layerPublic:function(e,obj){
		var titles='';
		newTask.ReturnFalse(e);
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
	},
	getMemberInfo:function(){
		// 是否登录
		if(newTask.headerData){
			_apiNewTask.getMemberInfo(newTask.headerData,function(res){
				// 是否为新手
				if(res.content.isNewbie==1){
					// 是否投资
					if(res.content.investFlag==1){
						$('.presents_con .left').on('click',function(){
							window.open('uc_coupon.html','_self');
						})
						$('.presents_con .right').on('click',function(){
							window.open('invest.html','_self');// 列表
						})
					}else{
						$('.presents_con .left').on('click',function(){
							window.open('uc_coupon.html','_self');
						})
						$('.presents_con .right').on('click',function(){
							window.open('invest.html','_self');
						})
					}
				}else{
					if(res.content.investFlag==1){
						$('.presents_con .left').on('click',function(){
							window.open('uc_coupon.html','_self');
						})
						$('.presents_con .right').on('click',function(){
							window.open('invest.html','_self');// 列表
						})
					}else{
						$('.presents_con .left').on('click',function(){
							window.open('uc_coupon.html','_self');
						})
						$('.presents_con .right').on('click',function(){
							window.open('invest.html','_self');
						})
					}
				}
			},function(){
				window.open('register.html','_self');
				console.log('请求失败');
			})
		}
	},
	mouseOver:function(){
		$('.task li').on({
			mouseover:function(){
				$(this).css('box-shadow','0 5px 30px #cccccc');
				$(this).find('.btn').css({
					background:'#ff7400',
					color:'#ffffff'
				})
			},
			mouseout:function(){
				$(this).css('box-shadow','none');
				$(this).find('.btn').css({
					background:'#ffffff',
					color:'#9e9e9e'
				})
			}
		})
	}
}
$(function(){
	newTask.init();
})