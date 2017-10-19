require('./uc_coupon.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');

// 得到总页数
$(".zxf_pagediv").createPage({
	// 页数
	pageNum: 2,
	// 当前页
	current: 1,
	// 显示条数
	shownum: 2,
	backfun: function(e) {
		console.log(e.current);
		// $("#data-container").html(thisDate(e.current));
	}
});

$('.coupon_menu a').on("click",function(){
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	states=index;
	$('.ticket_all').children().eq(index).show().siblings().hide();
	$('.state_menues').children().eq(index).show().siblings().hide();
})

$('.dyq_state_menu a').on("click",function(){
	$(this).addClass('menu_on').siblings().removeClass('menu_on');
	var index=$(this).index();
	$('.dyq_tickets').children().eq(index).show().siblings().hide();
})

$('.jxq_state_menu a').on("click",function(){
	$(this).addClass('menu_on').siblings().removeClass('menu_on');
	var index=$(this).index();
	$('.jxq_tickets').children().eq(index).show().siblings().hide();
})
// 跳转链接邀请好友界面
$('.coupon_link').on('click',function(){
	var friends  				= require('./friends.string');
	var  _td 					= require('util/td.js');
	var friendsHtml 			= _td.renderHtml(friends);
	$('.friends').html(friendsHtml);
	require('./friends.js');
	$('.friends').show();
	$('.welfare').hide();
})

$('.dyq_ticket_yes li').on("click",function(){
	$(this).find('img').css('opacity','1');
})
$('.jxq_ticket_yes li').on("click",function(){
	$(this).find('img').css('opacity','1');
})