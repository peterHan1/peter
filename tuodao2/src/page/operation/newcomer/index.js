require('./newcomer.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

/*$('.task li').eq(1).find('.btn').on('click',function(){
	$(this).html('<span class="iconfont">&#xe675;</span> 已完成');
	$(this).parent().off();
	$(this).css({color:'#6CBB50',background:'#ffffff'});
	$(this).attr('data-state','no');
	$(this).siblings('.p2').css('color','#9e9e9e');
	$(this).siblings('.p3').css('color','#9e9e9e');
})
$('.task li').eq(2).find('.btn').on('click',function(){
	$(this).attr('data-state','guoqi');
	$(this).parent().off();
	$(this).html('任务已过期');
	$(this).css('background','#ffffff');
	$(this).siblings('.p2').css('color','#9e9e9e');
	$(this).siblings('.p3').css('color','#9e9e9e');
})
*/
var _td = require('util/td.js');
var _apiNewTask = require('api/newcomer-api.js');
var newTaskHtml = require('./newcomerTask.string');
var newTask = {
	init : function(){
		this.newTask();
	},
	newTask:function(){
		_apiNewTask.getNewtask(function(res){
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
				if(listData[i].isComplete=='yes'){
					$('.task li').eq(i).find('.btn').html('<span class="iconfont">&#xe675;</span> 已完成');
					$('.task li').eq(i).off();
					$('.task li').eq(i).find('.btn').css({color:'#6CBB50',background:'#ffffff'});
					$('.task li').eq(i).find('.p2').css('color','#9e9e9e');
					$('.task li').eq(i).find('.p3').css('color','#9e9e9e');
				}
			})
		},function(){
			console.log('请求失败');
		})
	},
	mouseOver:function(){
		$('.task li').on({
			mouseover:function(){
				/*if($(this).find('.btn').attr('data-state')=='no' || $(this).find('.btn').attr('data-state')=='guoqi'){
					$(this).off();
				}else{
					$(this).find('.btn').css({
						background:'#ff7400',
						color:'#ffffff'
					})
				}*/
				$(this).css('box-shadow','0 5px 30px #e7e7e7');
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
				/*if($(this).find('.btn').attr('data-state')=='no'){
					$(this).css('color','#6CBB50');
					console.log($(this).find('.btn').attr('data-state'));
					$(this).off();
				}else if($(this).find('.btn').attr('data-state')=='guoqi'){
					$(this).off();
				}*/
			}
		})
	}
}
$(function(){
	newTask.init();
})