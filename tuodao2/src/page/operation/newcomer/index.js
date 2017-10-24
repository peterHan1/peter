require('./newcomer.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
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
		$(this).find('.btn').css({
				background:'#ff7400',
				color:'#ffffff'
			})
	},
	mouseout:function(){
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
$('.task li').eq(1).find('.btn').on('click',function(){
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
