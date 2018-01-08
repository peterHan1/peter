require('./newcomer.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _td 		= require('util/td.js');
var _apiOperate = require('api/operate-api.js');
var _apiProduct = require('api/product-api.js');
var newTaskHtml = require('./newcomerTask.string');
var newTask = {
	init : function(){
		this.newTask();
		this.linkPage();
		this.layerJs();
	},
	headerData : {
		'accessId' 	:unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	newTask : function(){
		_apiOperate.getTasks(newTask.headerData,2,function(res){
			var listData = res.content.list;
			$.each(listData,function(i){
				if (listData[i].pcUrl == null) {
					listData[i].pcUrl = 'javascript:;';
				};
				if (listData[i].code==1 || listData[i].code==2 || listData[i].code==3
				 || listData[i].isOverdue=='yes' || listData[i].isComplete=='yes') {
					listData[i].pcUrl='javascript:;';
				};
			})
			var bannerHtml = _td.renderHtml(newTaskHtml,{
				list:res.content.list
			});
			$('.task_list').html(bannerHtml);
			newTask.mouseOver();
			$.each(listData,function(i){
				if(listData[i].taskName.indexOf('非债权') > -1){
					var Names = String(listData[i].taskName).split('（')[0];
					$('.task li').eq(i).find('.p1').html(Names+'<br /><span>（非债权转让标）</span>');
				}
				if ((i+1)%5 == 0) {
					$('.task li').eq(i).addClass('mar_rgt');
				}
				if (listData[i].isOverdue == 'yes') {
					$('.task li').eq(i).find('.btn').html('任务已过期');
					$('.task li').eq(i).off();
					$('.task li').eq(i).find('a').off();
					$('.task li').eq(i).find('.p2').css('color','#9e9e9e');
					$('.task li').eq(i).find('.p3').css('color','#9e9e9e');
				}
				if (listData[i].isComplete == 'yes') {
					$('.task li').eq(i).find('.btn').html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
					$('.task li').eq(i).off();
					$('.task li').eq(i).find('a').off();
					$('.task li').eq(i).find('.btn').css({color:'#6CBB50',background:'#ffffff'});
					$('.task li').eq(i).find('.p2').css('color','#9e9e9e');
					$('.task li').eq(i).find('.p3').css('color','#9e9e9e');
				}
				if (listData[i].isComplete == 'yes' || listData[i].isOverdue == 'yes') {
					$('.task li').eq(i).find('a').on('click',function(){
						return false;
					})
				} else {
					$('.task li').eq(i).find('a').on('click',function(){
						if (listData[i].code == 1) {
							newTask.layerPublic('points_gzh');
						} else if (listData[i].code == 2){
							newTask.layerPublic('points_login');
						} else if (listData[i].code == 3){
							newTask.layerPublic('points_invest');
						}
					})
				}
			})
		},function(){
			$('task_list').html('<img src="" alt="" />');
			console.log('请求失败');
		})
	},
	// 弹窗内部js
	layerJs : function(){
		$('#points_gzh ul li input').on('input',function(){
			if ($(this).val() == '') {
				$(this).css({fontSize:'12px',color:'#9e9e9e'});
			} else {
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
			mouseover : function(){
				$(this).css('background','#ff7400');
			},
			mouseout : function(){
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
	layerPublic : function(obj){
		var titles = '';
		if (obj == 'points_gzh') {
			titles = '获取积分：首次关注拓道金服微信公众号';
		} else if (obj == 'points_login'){
			titles = '获取积分：首次登录APP';
		} else {
			titles = '获取积分：APP端手动投资';
		}
		layer.open({
			type: 1,
			title: [titles,'color: #707070;'],
			skin: obj,
			area: ['560px', '330px'],
			content: $('#'+obj)
		});
	},
	// 注册领红包，立即投资跳转
	linkPage : function(){
		$('.presents_con .left').on('click',function(){
			$(this).attr('href','uc_coupon.html');
		})
		$('.presents_con .right').on('click',function(){
			_apiOperate.getNewInfo(function(res){
				if (res.content.isJunior == 1) {
					window.location.href = './invest_detailScatter.html?tender='+res.content.id+'&params='+res.content.code;
				} else {
					window.location.href = './investScatter.html';
				}
			},function(res){
				console.log(res.msg);
			})
		})
	},
	mouseOver : function(){
		$('.task li').on({
			mouseover : function(){
				$(this).css('box-shadow','0 5px 30px #cccccc');
				$(this).find('.btn').css({
					background:'#ff7400',
					color:'#ffffff'
				})
			},
			mouseout : function(){
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