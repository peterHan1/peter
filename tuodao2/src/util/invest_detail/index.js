require('./index.scss');
// require('./invest_detail.js');
var _details = {
	// 两个通用
	setData : function(res){
		// 还款方式
		var refunway = res.content.refundWay;
		if(refunway == "0"){
			res.content.refundWay = "等额本息";
		}else if(refunway == "1"){
			res.content.refundWay = "按月付息";
		}else if(refunway == "2"){
			res.content.refundWay = "按天付息";
		}
		// 项目类型
		var product = res.content.productType;
		if(product == "0"){
			res.content.productType = "散标项目";
		}else if(product == "1"){
			res.content.productType = "精选计划";
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
	},
	// 债权转让
	setDataBond : function(res){
		// 还款方式
		var refunway = res.content.repaymentType;
		if(refunway == "0"){
			res.content.repaymentType = "等额本息";
		}else if(refunway == "1"){
			res.content.repaymentType = "按月付息";
		}else if(refunway == "2"){
			res.content.repaymentType = "按天付息";
		}
		// 投资期限单位
		var periodunit = res.content.periodType;
		if(periodunit == "0"){
			res.content.periodType = "天";
		}else if(periodunit == "1"){
			res.content.periodType = "个月";
		}else if(periodunit == "2"){
			res.content.periodType = "年";
		};
		// 时间格式
		var str = res.content.publishTime;
		var oDate = new Date(str),oYear = oDate.getFullYear(),oMonth = oDate.getMonth()+1,oDay = oDate.getDate(),oTime = oYear + '-' +oMonth +'-'+ oDay;
		res.content.publishTime = oTime;
	},
	// 三个通用
	setShow : function(cla){
		var _this = $("." + cla);
		// 加入进度
		var totalM = _this.find('.totalMoney').html();
		var resM =  _this.find('.lastMoney').html();
		var plan = Math.floor((totalM-resM)/totalM*100);
		console.log("totalM : "+ totalM)
		console.log("resM : "+ resM)
		console.log("plan : "+ plan)
		if(plan == 0){
			plan=100;
		}else{
			plan = plan;
		};
		_this.find($(".bar")).width(plan);
		_this.find($(".barNum")).html(plan + "%");
		// 有无奖励
		/*var awardStatus = _this.find('.award').attr("award");
		if(awardStatus == 0){
			_this.find('.award').remove();
		}elsse if(awardStatus == 1){
			$(".unit").html("元");
		}else if(awardStatus == 2){
			$(".unit").html("%");
		}*/
	}
};
module.exports = _details;