require('./uc_invite.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
console.log('invite');

// 得到总页数
$(".zxf_pagediv").createPage({
	// 页数
	pageNum: 100,
	// 当前页
	current: 1,
	// 显示条数
	shownum: 6,
	backfun: function(e) {
		console.log(e.current);
		// $("#data-container").html(thisDate(e.current));
	}
});

$('.invite_menu a').on("click",function(event){
	$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
	var index=$(this).index();
	$('.invite_content').children().eq(index).show().siblings().hide();
})
// table隔行变色
function _changeColor(obj){
	for(var i=0;i<$(obj+' tr').length;i++){
		if(i%2!=0){
			$(obj+' tr').eq(i).css('background','#FBFBFB');
		}
	}
}
_changeColor('.invite_table');

