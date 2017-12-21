require('./old_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _paging = require('util/paging/index.js');
var _td = require('util/td.js');
var _apiData = require('api/product-api.js');
var huikuanHtml = require('./huikuan.string');

var oldDetail = {
	init : function () {
		this.hovers();
		this.getUrlDetail();
	},
	headerData : {
		'accessId'  :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	hovers : function(){
		$('.uc_invest_details .money .money_1 .left dt i').hover(
			function(){
				$('.uc_invest_details .tips').show();
			},function(){
				$('.uc_invest_details .tips').hide();
			})
	},
	getUrlDetail : function(){
		var url=window.location.search;
        //转换成字符串
        url=url.toString();
        var array=new Array();//用来存放分分割后的字符串
        array=url.split("?");
        var arrys=array[1].toString().split("=");
        var ids=parseInt(arrys[1]);
        var type=arrys[0];
        oldDetail.getData(type,ids);
        oldDetail.getHuikuan(ids);
	},
	getHuikuan : function(ids){
		_apiData.huikuanList(oldDetail.headerData,ids,1,function(res){
			if(res.content.list.length==0){
				$('.huikuanTable').append('<tr><td colspan="5" class="get_data">暂无记录</td></tr>');
				return false;
			}
			var bannerHtml = _td.renderHtml(huikuanHtml,{
				list:res.content.list
			});
			$('.huikuanTable').html(bannerHtml);
			_paging.paging('pageList',res.content.total,res.content.pageSize,function(e){
				_apiData.huikuanList(oldDetail.headerData,ids,res.current,function(res){
					var bannerHtml = _td.renderHtml(huikuanHtml,{
						list:res.content.list
					});
					$('.huikuanTable').html(bannerHtml);
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	getHtml : function(res){
		$('#detailsTitle').html('<b>'+res.content.borrowType+'</b>'+res.content.name+'<i><span></span>'+res.content.productCode+'</i>');
		$('#borrowApr').html(res.content.apr);
		$('#time').html(res.content.endTime);
		$('#day').html(res.content.endTime);
		$('#tenderAccount').html(res.content.preAccount);
		$('#interest').html(res.content.preAccount);
		$('#award').html(res.content.preAccount);
		if(res.content.voucherType==0){
			$('#VouType').text('不使用');
		}else if(res.content.voucherType==1){
			$('#VouType').text('使用抵扣券');
		}else{
			$('#VouType').text('使用加息券');
		}
		if(res.content.repaymentType==0){
			$('#borrowStyle').text('等额本息');
		}else if(res.content.repaymentType==1){
			$('#borrowStyle').text('按月付息,到期还本');
		}else{
			$('#borrowStyle').text('按天计息');
		}
	},
	getData : function (type,ids) {
		if(type=="myInvest"){
			_apiData.oldInvestDetail(oldDetail.headerData,ids,function(res){
				oldDetail.getHtml(res);
			},function(){
				console.log('请求失败');
			})
		}else if(type=="transfer"){
			_apiData.oldTransferDetail(oldDetail.headerData,ids,function(res){
				oldDetail.getHtml(res);
			},function(){
				console.log('请求失败');
			})
		}else if(type=="farmIn"){
			_apiData.oldFarmInDetail(oldDetail.headerData,ids,function(res){
				oldDetail.getHtml(res);
			},function(){
				console.log('请求失败');
			})
		}
	}
}
$(function(){
	oldDetail.init();
})