require('./uc_invite.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
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

var _td = require('util/td.js');
var _apiInvite = require('api/invite_record-api.js');
var record = require('./invite_record.string');
var invites = {
	init:function(){
		this.getRecord();
	},
	// table隔行变色
	changeColor:function(obj){
		$.each($(obj+' tr'),function(i){
			if(i%2!=0){
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		})
	},
	getRecord:function(){
		_apiInvite.getRecord(1,3,function(res){
			console.log();
			var bannerHtml = _td.renderHtml(record,{
				list:res.content.list,
			});
			$('._invite_record_table').html(bannerHtml);
			invites.changeColor('.invite_table');
			_apiInvite.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvite.getRecord(e.current,20,function(res){
					var bannerHtml = _td.renderHtml(record,{
						list:res.content.list,
					});
					$('._invite_record_table').html(bannerHtml);
					invites.changeColor('.invite_table');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	}
}
$(function(){
	invites.init();
})
