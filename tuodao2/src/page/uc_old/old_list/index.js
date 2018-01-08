require('./old_list.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _paging 		= require('util/paging/index.js');
var _td 			= require('util/td.js');
var _apiData 		= require('api/product-api.js');
var myInvestHtml 	= require('./myInvest.string');
var capitalHtml 	= require('./capitalRecord.string');
var transferHtml 	= require('./transferRecord.string');
var farmInHtml 		= require('./farmInRecord.string');

var oldList = {
	init : function(){
		this.getMyInvest('');
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
			var l = $(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			$('.uc_old_tabBox ').children("div").eq(l).show().siblings().hide();
			if(l == 2){
				oldList.getCapital();
			} else if (l == 1) {
				oldList.getTransfer();
			} else if (l ==2 ) {
				oldList.getCapital();
			};
		});
		// 我的投资不同状态
		$('.old_invest_status li').click(function(){
			var l = $(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			if (l == 0) {
				oldList.getMyInvest('');
			} else if (l == 1) {
				oldList.getMyInvest(0);
			} else {
				oldList.getMyInvest(1);
			}
		});
		// 我的转让不同状态
		$('.old_transferUl li').click(function(){
			var l = $(this).index()
			$(this).addClass('on').siblings().removeClass('on');
			$('.old_transferTable ').children("table").eq(l).show().siblings().hide();
			if (l == 0) {
				oldList.getTransfer();
			} else {
				oldList.getFarmIn();
			}
		});
	},
	getMyInvest : function (type) {
		_apiData.oldInvest(oldList.headerData,1,type,function(res){
			if (res.content.list.length == 0) {
				$('.myInvest').html('<tr><th>项目编号</th><th>项目名称</th><th>投资时间</th><th>投资金额</th><th>到期收益</th><th>奖励</th><th>状态</th><th>操作</th></tr><tr><td colspan="8" class="get_data">暂无记录</td></tr>');
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
			_paging.paging('pageList',0,1000);
			$('.myInvest').html('<tr><th>项目编号</th><th>项目名称</th><th>投资时间</th><th>投资金额</th><th>到期收益</th><th>奖励</th><th>状态</th><th>操作</th></tr><tr><td colspan="8" class="get_data">数据加载失败</td></tr>');
			console.log('请求失败');
		})
	},
	getTransfer : function () {
		_apiData.oldTransfer(oldList.headerData,1,function(res){
			if (res.content.list.length == 0) {
				$('.transfer').html('<tr><th>项目标题</th><th>剩余期限</th><th>年化利率</th><th>可转本金</th><th>应收利息</th><th>可转让天数</th><th>操作</th></tr><tr><td colspan="7" class="get_data">暂无记录</td></tr>');
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
			_paging.paging('pageList',0,1000);
			$('.transfer').html('<tr><th>项目标题</th><th>剩余期限</th><th>年化利率</th><th>可转本金</th><th>应收利息</th><th>可转让天数</th><th>操作</th></tr><tr><td colspan="7" class="get_data">数据加载失败</td></tr>');
			console.log('请求失败');
		})
	},
	getFarmIn : function () {
		_apiData.oldFarmIn(oldList.headerData,1,function(res){
			if (res.content.list.length == 0) {
				$('.farmIn').html('<tr><th>项目标题</th><th>剩余期限</th><th>年化利率</th><th>投资时间</th><th>投资金额(元)</th><th>到期收益(元)</th><th>状态</th><th>操作</th></tr><tr><td colspan="8" class="get_data">暂无记录</td></tr>');
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
			_paging.paging('pageList',0,1000);
			$('.farmIn').html('<tr><th>项目标题</th><th>剩余期限</th><th>年化利率</th><th>投资时间</th><th>投资金额(元)</th><th>到期收益(元)</th><th>状态</th><th>操作</th></tr><tr><td colspan="8" class="get_data">数据加载失败</td></tr>');
			console.log('请求失败');
		})
	},
	getCapital : function (type) {
		_apiData.oldCapital(oldList.headerData,1,type,function(res){
			if (res.content.list.length == 0) {
				$('.capital').html('<tr><th>时间</th><th>类型</th><th>存入</th><th>支出</th><th>冻结</th><th>余额</th><th>备注</th></tr><tr><td colspan="7" class="get_data">暂无记录</td></tr>');
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
			_paging.paging('pageList',0,1000);
			$('.capital').html('<tr><th>时间</th><th>类型</th><th>存入</th><th>支出</th><th>冻结</th><th>余额</th><th>备注</th></tr><tr><td colspan="7" class="get_data">数据加载失败</td></tr>');
			console.log('请求失败');
		})
	}
}
$(function(){
	oldList.init();
})