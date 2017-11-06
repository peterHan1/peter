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
		// $("#data-container").html(thisDate(e.current));
	}
});
var _td = require('util/td.js');
var _apiInvite = require('api/invite-api.js');
var record = require('./invite_record.string');
var invites = {
	init:function(){
		this.getRecord();
		this.tabCut();
		this.hoverEvent();
		this.getLink('.copy_link');
		this.getCode();
		// this.getUserDepository();
	},
	// table隔行变色
	changeColor:function(obj){
		$.each($(obj+' tr'),function(i){
			if(i%2!=0){
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		})
	},
	// 控制welfare_content的高与左侧菜单栏高度相同
	elHeight:function (){
		$('.uc_menu').height('auto');
		$('.uc_menu').siblings('div').height('auto');
		var hL = $('.uc_menu')[0].clientHeight;
		var hR = $('.uc_menu').siblings('div')[0].clientHeight;
		if(hR>=905){
			$(".uc_menu").height(hR);
			$('.uc_menu').siblings('div').height(hR);
		}else{
			$('.uc_menu').siblings('div').height(hL);
			$(".uc_menu").height(hL);
		}
	},
	// 邀请好友、记录切换
	tabCut:function(){
		$('.invite_menu a').on("click",function(event){
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index=$(this).index();
			$('.invite_content').children().eq(index).show().siblings().hide();
			invites.elHeight();
		})
	},
	// 用户存管是否激活
	getUserDepository:function(){
		console.log('chenggong');
		_apiInvite.getUserDepository(function(res){
			$('.depository_yes').show();
			$('.depository_yes_menu').show();
			invites.getLev();
			invites.elHeight();
		},function(){
			$('.depository_no').show();
			$('.depository_no_menu').show();
			invites.elHeight();
			console.log('请求失败');
		});
	},
	// 用户理财师等级信息
	getLev:function(){
		_apiInvite.getLev(function(res){
			if(res.content.currentLevel=='初级理财师'){
				$('.invite_nav .lev_bg').css('background',"url('../../../image/welfare/lev_01.png')no-repeat");
			}else if(res.content.currentLevel=='中级理财师'){
				$('.invite_nav .lev_bg').css('background',"url('../../../image/welfare/lev_02.png')no-repeat");
			}else{
				$('.invite_nav .lev_bg').css('background',"url('../../../image/welfare/lev_03.png')no-repeat");
			}
			$('.invite_nav .lev_name').html(res.content.currentLevel);
			$('.invite_nav .distance').html(res.content.differV1Count+'，'+res.content.differDueInFundTotal);
		},function(){
			console.log('请求失败');
		});
	},
	// 链接按钮的hover效果
	hoverEvent:function(){
		$('.copy').on({
			mouseover:function(){
				$(this).css({background:'#ff7400',color:'#ffffff'});
			},
			mouseout:function(){
				$(this).css({background:'#ffffff',color:'#ff7400'});
			}
		});
	},
	// 复制邀请链接地址
	getLink:function(obj){
		$(obj).on('click',function(){
			if(obj=='.copy_link'){
				$(this).css({background:'#ffffff',color:'#ff7400'});
				$(this).off('mouseover mouseout');
				_apiInvite.getLink(function(res){
					console.log('复制成功'+res.content);
					$(obj).siblings('input').val(res.content).select();
					console.log($(obj).siblings('input').val());
					if(document.execCommand('Copy')){
						$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
					}else{
						alert('由于浏览器不兼容，请手动复制链接 \n 邀请链接：'+res.content);
					}
				},function(){
					console.log('请求失败');
				})
			}else if(obj=='.qq_share'){
				_apiInvite.getLink(function(res){
					console.log('复制成功'+res.content);
					$(obj).siblings('input').val(res.content).select();
					console.log($(obj).siblings('input').val());
					if(document.execCommand('Copy')){
						$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
					}else{
						alert('由于浏览器不兼容，请手动复制链接 \n 邀请链接：'+res.content);
					}

				},function(){
					console.log('请求失败');
				})
			}else{
				_apiInvite.getLink(function(res){
					console.log('复制成功'+res.content);
					$(obj).siblings('input').val(res.content).select();
					console.log($(obj).siblings('input').val());
					if(document.execCommand('Copy')){
						$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
					}else{
						alert('由于浏览器不兼容，请手动复制链接 \n 邀请链接：'+res.content);
					}
					
				},function(){
					console.log('请求失败');
				})
			}
		});
	},
	// 复制邀请码
	getCode:function(){
		$('.depository_yes_menu .copy_code').on('click',function(){
			$(this).css({background:'#ffffff',color:'#ff7400'});
			$(this).off('mouseover mouseout');
			_apiInvite.getCode(function(res){
				console.log('复制成功'+res.content.invitCode);
				$('.copy_code').siblings('input').val(res.content.invitCode).select();
					console.log($('.copy_code').siblings('input').val());
					if(document.execCommand('Copy')){
						$('.copy_code').html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
					}else{
						alert('由于浏览器不兼容，请手动复制邀请码 \n 邀请码：'+res.content);
					}
			},function(){
				console.log('请求失败');
			})
		});
	},
	// 邀请记录
	getRecord:function(){
		_apiInvite.getRecord(1,20,function(res){
			if(res.content.list.length==0){
				$('.invite_record').children().eq(1).show().siblings().hide();

				return false;
			}else{
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
			}
		},function(){
			console.log('请求失败');
		})
	}
}
$(function(){
	invites.init();
})
