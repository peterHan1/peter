require('./old_list.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiData = require('api/product-api.js');
var myInvestHtml = require('./myInvest.string');
var capitalHtml = require('./capitalRecord.string');
var transferHtml = require('./transferRecord.string');
var farmInHtml = require('./farmInRecord.string');

var oldList = {
	init : function(){
		this.getMyInvest(0);
		this.getTransfer();
		this.tabCut();
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	// 一些tab切换
	tabCut : function(){
		// 我的投资，转让，资金记录
		$(".nav_tabUl li").click(function(){
			var l=$(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			$('.uc_old_tabBox ').children("div").eq(l).show().siblings().hide();
			if(l == 2){
				oldList.getCapital();
			}
		});
		// 我的投资不同状态
		$('.old_invest_status li').click(function(){
			var l=$(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			if(l == 0){
				oldList.getMyInvest(0);
			}else if(l == 1){
				oldList.getMyInvest(1);
			}else{
				oldList.getMyInvest(2);
			}
		});
		// 我的转让不同状态
		$('.old_transferUl li').click(function(){
			var l=$(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			$('.old_transferTable ').children("table").eq(l).show().siblings().hide();
			if(l == 0){
				oldList.getTransfer();
			}else{
				oldList.getFarmIn();
			}
		});
	},
	getMyInvest : function (type) {
		_apiData.oldInvest(oldList.headerData,1,type,function(res){
			if(res.content.list.length==0){
				$('.myInvest').append('<tr><td colspan="8" class="get_data">暂无记录</td></tr>');
				return false;
			}
			var bannerHtml = _td.renderHtml(myInvestHtml,{
				list:res.content.list
			});
			$('.myInvest').html(bannerHtml);
			$('.myInvest a').on('click',function(){
				$(this).attr('href','uc_oldDetail.html?myInvest='+$(this)[0].getAttribute("data-id"));
			})
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiData.oldInvest(oldList.headerData,1,type,function(res){
					var bannerHtml = _td.renderHtml(myInvestHtml,{
						list:res.content.list
					});
					$('.myInvest').html(bannerHtml);
					$('.myInvest a').on('click',function(){
						$(this).attr('href','uc_oldDetail.html?myInvest='+$(this)[0].getAttribute("data-id"));
					})
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getTransfer : function () {
		_apiData.oldTransfer(oldList.headerData,1,function(res){
			if(res.content.list.length==0){
				$('.transfer').append('<tr><td colspan="7" class="get_data">暂无记录</td></tr>');
				return false;
			}
			var bannerHtml = _td.renderHtml(transferHtml,{
				list:res.content.list
			});
			$('.transfer').html(bannerHtml);
			$('.transfer a').on('click',function(){
				$(this).attr('href','uc_oldDetail.html?transfer='+$(this)[0].getAttribute("data-id"));
			})
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiData.oldInvest(oldList.headerData,1,function(res){
					var bannerHtml = _td.renderHtml(transferHtml,{
						list:res.content.list
					});
					$('.transfer').html(bannerHtml);
					$('.transfer a').on('click',function(){
						$(this).attr('href','uc_oldDetail.html?transfer='+$(this)[0].getAttribute("data-id"));
					})
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getFarmIn : function () {
		_apiData.oldFarmIn(oldList.headerData,1,function(res){
			if(res.content.list.length==0){
				$('.farmIn').append('<tr><td colspan="8" class="get_data">暂无记录</td></tr>');
				return false;
			}
			var bannerHtml = _td.renderHtml(farmInHtml,{
				list:res.content.list
			});
			$('.farmIn').html(bannerHtml);
			$('.farmIn a').on('click',function(){
				$(this).attr('href','uc_oldDetail.html?farmIn='+$(this)[0].getAttribute("data-id"));
			})
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiData.oldInvest(oldList.headerData,1,function(res){
					var bannerHtml = _td.renderHtml(farmInHtml,{
						list:res.content.list
					});
					$('.farmIn').html(bannerHtml);
					$('.farmIn a').on('click',function(){
						$(this).attr('href','uc_oldDetail.html?farmIn='+$(this)[0].getAttribute("data-id"));
					})
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getCapital : function (type) {
		_apiData.oldCapital(oldList.headerData,1,type,function(res){
			if(res.content.list.length==0){
				$('.capital').append('<tr><td colspan="7" class="get_data">暂无记录</td></tr>');
				return false;
			}
			var bannerHtml = _td.renderHtml(capitalHtml,{
				list:res.content.list
			});
			$('.capital').html(bannerHtml);
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiData.oldInvest(oldList.headerData,1,type,function(res){
					var bannerHtml = _td.renderHtml(capitalHtml,{
						list:res.content.list
					});
					$('.capital').html(bannerHtml);
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
	oldList.init();
})