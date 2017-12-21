require('./uc_invite.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/index.js');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiInvite = require('api/operate-api.js');
var record = require('./invite_record.string');
var invites = {
	init : function(){
		this.tabCut();
		this.hoverEvent();
		this.getUserDepository();
	},
	headerData : {
		'accessId' :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	// table隔行变色
	changeColor : function(obj){
		$.each($(obj+' tr'),function(i){
			if(i%2!=0){
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		});
	},
	// 控制welfare_content的高与左侧菜单栏高度相同
	HeightAuto : function (){
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
	tabCut : function(){
		$('.invite_menu a').on("click",function(event){
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index=$(this).index();
			$('.invite_content').children().eq(index).show().siblings().hide();
			if(index==1){
				invites.getInviteRecord();
			}
			invites.HeightAuto();
		});
	},
	numberAdd : function(str){
		var reg=/\./g;
		if(reg.test(str)){
			var arr=String(str).split('.');
			return String(arr[0]).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')+'.'+arr[1];
		}else{
			return String(str).split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')+'.00';
		}
	},
	// 用户存管是否激活
	getUserDepository : function(){
		_apiInvite.getMemberInfo(invites.headerData,function(res){
			if(res.content.isOpenDeposit==1){
				$('.depository_yes').show();
				$('.depository_yes_menu').show();
				invites.getFinancialPlanner();
				invites.HeightAuto();
				invites.getLink();
				invites.getCode(res);
				require('./share.js');
			}else{
				$('.depository_no').show();
				$('.depository_no_menu').show();
				invites.HeightAuto();
			}
		},function(){
			console.log('请求失败');
		});
	},
	// 用户理财师等级信息
	getFinancialPlanner : function(){
		_apiInvite.getFinancialPlanner(invites.headerData,function(res){
			if(res.content.currentLevelName=='初级理财师'){
				$('.invite_nav .lev_bg').addClass('lev01');
			}else if(res.content.currentLevel=='中级理财师'){
				$('.invite_nav .lev_bg').addClass('lev02');
			}else{
				$('.invite_nav .lev_bg').addClass('lev03');
			}
			$('.invite_nav .lev_name').html(res.content.currentLevelName);
			$('.invite_nav .distance').html('距'+res.content.upLevelName+'还差'+res.content.differV1Count+'个V1好友，'+res.content.differDueInFundTotal+'万元总待收');
			$('.mypoints1 .pointsNum').html(invites.numberAdd(res.content.returnAmount));
			$('.mypoints2 .pointsNum').html(invites.numberAdd(res.content.voucherAmount));
		},function(){
			console.log('请求失败');
		});
	},
	// 链接按钮的hover效果
	hoverEvent : function(){
		$('.copy').on({
			mouseover : function(){
				$(this).css({background:'#ff7400',color:'#ffffff'});
			},
			mouseout : function(){
				$(this).css({background:'#ffffff',color:'#ff7400'});
			}
		});
	},
	// 复制操作，必须放在event事件里才能生效，放在接口函数内不能生效
	copyEvent : function(copyValue){
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
	getLink : function(){
		var time='';
		var linkValue='';
		_apiInvite.getLink(invites.headerData,function(res){
			linkValue=res.content;
		},function(){
			console.log('请求失败');
		});
		$('.copy_link').on('click',function(){
			$(this).css({background:'#ffffff',color:'#ff7400'});
			$(this).off('mouseover mouseout');
			invites.copyEvent(linkValue);
			if(document.execCommand("copy")){
		  		$('.copy_link').html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
		  	}else{
		  		$('#invite_link li').eq(2).html(linkValue);
				layer.open({
					type: 1,
					title: ['复制邀请链接','color: #707070;'],
					skin: 'invite_alert',
					area: ['580px', 'auto'],
					content: $('#invite_link')
				});
			}
			time=setTimeout(function(){
				$('.copy_link').html('复制链接');
				invites.hoverEvent();
				clearTimeout(time);
			},2000);
		});
	},
	// 复制邀请码
	getCode : function(res){
		var time='';
		var linkValue='';
		linkValue=res.content.inviteCode;
		$('.depository_yes_menu .copy_code').on('click',function(){
			$(this).css({background:'#ffffff',color:'#ff7400'});
			$(this).off('mouseover mouseout');
			invites.copyEvent(linkValue);
			if(document.execCommand("copy")){
		  		$('.copy_code').html('<span class="iconfont">&#xe675;</span>&nbsp;复制成功');
		  	}else{
		  		$('#invite_link li').eq(0).html('浏览器不兼容，邀请码复制失败！');
		  		$('#invite_link li').eq(1).html('您可以手动复制邀请码：');
		  		$('#invite_link li').eq(2).html(linkValue);
				layer.open({
					type: 1,
					title: ['复制邀请码','color: #707070;'],
					skin: 'invite_alert',
					area: ['580px', 'auto'],
					content: $('#invite_link')
				});
			}
			time=setTimeout(function(){
				$('.copy_code').html('复制链接');
				invites.hoverEvent();
				clearTimeout(time);
			},2000)
		})
	},
	// 邀请记录
	getInviteRecord : function(){
		_apiInvite.getInviteRecord(invites.headerData,1,function(res){
			var listData=res.content.list;
			$.each(listData,function(i){
				listData[i].friendPhoneNum=listData[i].friendPhoneNum.substring(0,3)+"****"+listData[i].friendPhoneNum.substring(8,11);
			});
			if(res.content.list.length==0){
				$('.invite_record').children().eq(1).show().siblings().hide();
				return false;
			}else{
				var bannerHtml = _td.renderHtml(record,{
					list:res.content.list,
				});
				$('._invite_record_table').html(bannerHtml);
				invites.changeColor('.invite_table');
				_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
					_apiInvite.getInviteRecord(invites.headerData,e.current,function(res){
						var bannerHtml = _td.renderHtml(record,{
							list:res.content.list,
						});
						$('._invite_record_table').html(bannerHtml);
						invites.changeColor('.invite_table');
					},function(){
						console.log("分页点击请求失败");
					});
				})
			}
		},function(){
			console.log('请求失败');
		});
	}
}
$(function(){
	invites.init();
})
