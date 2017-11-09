require('./uc_invite.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('util/layer/layer.js');
require('util/layer/layer.scss');
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
var _apiInvite = require('api/operationCenter-api.js');
var record = require('./invite_record.string');
var invites = {
	init:function(){
		this.getInviteRecord();
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
	copyEvent:function(copyValue){
		// 动态创建 input 元素
	  	var aux = document.createElement("input");
	  	// 获得需要复制的内容
	 	aux.setAttribute("value",copyValue);
	  	// 添加到 DOM 元素中
	  	document.body.appendChild(aux);
	  	// 执行选中
	  	// 注意: 只有 input 和 textarea 可以执行 select() 方法.
	  	aux.select();
	  	// 获得选中的内容
	    var content = window.getSelection().toString();
	  	// 执行复制命令
	  	document.execCommand("copy");
	  	// 将 input 元素移除
	  	document.body.removeChild(aux);
	},
	// 复制邀请链接地址
	getLink:function(obj){
		var time='';
		var linkValue='';
		_apiInvite.getLink(function(res){
			console.log(res.content);
			linkValue=res.content;
		},function(){
			console.log('请求失败');
		})
		$(obj).on('click',function(){
			if(obj=='.copy_link'){
				$(this).css({background:'#ffffff',color:'#ff7400'});
				$(this).off('mouseover mouseout');
				invites.copyEvent(linkValue);
				if(document.execCommand("copy")){
			  		$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
			  	}else{
					/*layer.open({
						type: 1,
						title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
						skin: 'invite_link',
						area: ['560px', '330px'],
						content: $('#invite_link')
					});*/
  				}
				time=setTimeout(function(){
					$(obj).html('复制链接');
					invites.hoverEvent();
					clearTimeout(time);
				},2000);
			}else if(obj=='.qq_share'){
				invites.copyEvent(linkValue);
				if(document.execCommand("copy")){
				  	$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
			  	}else{
					/*layer.open({
						type: 1,
						title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
						skin: 'invite_link',
						area: ['560px', '330px'],
						content: $('#invite_link')
					});*/
  				}
			}else{
				invites.copyEvent(linkValue);
				if(document.execCommand("copy")){
			  		$(obj).html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
			  	}else{
					/*layer.open({
						type: 1,
						title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
						skin: 'invite_link',
						area: ['560px', '330px'],
						content: $('#invite_link')
					});*/
  				}
			}
		});
	},
	// 复制邀请码
	getCode:function(){
		var time='';
		var linkValue='';
		_apiInvite.getCode(function(res){
			linkValue=res.content.invitCode;
		},function(){
			console.log('请求失败');
		})
		$('.depository_yes_menu .copy_code').on('click',function(){
			$(this).css({background:'#ffffff',color:'#ff7400'});
			$(this).off('mouseover mouseout');
			invites.copyEvent(linkValue);
			if(document.execCommand("copy")){
		  		$('.copy_code').html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
		  	}else{
				/*layer.open({
					type: 1,
					title: ['获取积分：首次关注拓道金服微信公众号','color: #707070;'],
					skin: 'invite_link',
					area: ['560px', '330px'],
					content: $('#invite_link')
				});*/
			}
			time=setTimeout(function(){
				$('.copy_code').html('复制链接');
				invites.hoverEvent();
				clearTimeout(time);
			},2000);
		});
	},
	// 邀请记录
	getInviteRecord:function(){
		_apiInvite.getInviteRecord(1,20,function(res){
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
					_apiInvite.getInviteRecord(e.current,20,function(res){
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