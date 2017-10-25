require('page/invest_detail/invest_detail.scss');
require('page/invest_detail/invest_detail.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('./fancybox/jquery.lazyload.min.js');
require('./fancybox/source/jquery.fancybox.js');
require('./fancybox/source/jquery.fancybox.scss');

var _td = require('util/td.js');
var _apiInvest = require('api/invest_listDetails-api.js');
var investListScatter = require('./invest_listDetails-scatter.string');

// 图片延时加载
// $("img.lazy").lazyload({effect: "fadeIn"});
$('.fancybox').fancybox({
	fitToView   : false,
	// centerOnScroll:true,
	helpers:  {
		title: {
			type: 'inside',
			position: 'top'
		}
	}
});
$(function(){
	_apiInvest.getInvestListDetails(1,function(res){
		setData(res);
		bannerHtml = _td.renderHtml(investListScatter,{
			content:res.content,
		});
		$('.detail_top_left').html(bannerHtml);
		setShow("detail_top_left");
	},function(){
		console.log("请求失败");
	});

	function setData(res){
		// 还款方式
		var refunway = res.content.refundWay;
		if(refunway == "0"){
			res.content.refundWay = "等额本息";
		}else if(refunway == "1"){
			res.content.refundWay = "按月付息";
		}else if(refunway == "2"){
			res.content.refundWay = "按天付息";
		}
		// 投资期限单位
		var periodunit = res.content.periodUnit;
		if(periodunit == "0"){
			res.content.periodUnit = "天";
		}else if(periodunit == "1"){
			res.content.periodUnit = "个月";
		}else if(periodunit == "2"){
			res.content.periodUnit = "年";
		};
		// 时间格式
		var str = res.content.publishTime;
		var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
		res.content.publishTime = oTime;
	};
	function setShow(cla){
		var _this = $("." + cla);
		// 加入进度
		var totalM = _this.find('.totalMoney').html();
		var resM =  _this.find('.resMoney').html();
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(plan == 0){
			plan=100;
		}else{
			plan = plan;
		};
		_this.find($(".bar")).width(plan);
		_this.find($(".barNum")).html(plan + "%");
		// 有无奖励
		var awardStatus = _this.find('.award').attr("award");
		if(awardStatus == 0){
			_this.find('.award').remove();
		}
	};
});
