require('./index.scss');
var _invest = {
	// 债权转让
	setUnit : function(res){
		var resList = res.content.list;
		// 剩余期限单位
		$.each(resList,function(i){
			if(resList[i].periodType == "0"){
				resList[i].periodType = "天";
			}else if(resList[i].periodType == "1"){
				resList[i].periodType = "个月";
			}else if(resList[i].periodType == "2"){
				resList[i].periodType = "年";
			}
		});
	},
	setTips : function(){
		var tip = $(".tip").attr("type");
		if(tip == 1){
			$(".tip").addClass("tips");
		}
	},
	// 时间格式化
	setTime : function(type,time) {
		var date = new Date(time * 1);
		var y = date.getFullYear() + '-';
		var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var d = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
		var f = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + '';
		var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
		if(type == 1){
			return times = y + m + d;
		}else if(type == 2){
			return times = h + f;
		}else{
			return times = y + m + d + h + f + s;
		}
	},
	// 加入进度
	setShow : function(ul){
		$("."+ul).find("li").each(function(){
			// 加入进度
			var totalM = $(this).find('.totalMoney').attr("m")*1;
			var resM = $(this).find('.resMoney').attr("m")*1;
			var plan = Math.floor((totalM-resM)/totalM*100);
			if(totalM == resM){
				plan = 0;
			}else{
				plan = plan;
			}
			$(this).find($(".bar")).width(plan);
			$(this).find($(".barNum")).html(plan);
			// 满标 年化率颜色和按钮状态
			var btnStatus = $(this).find('.butt').attr("status");
			if(btnStatus == 1 || btnStatus == "false"){
				$(this).find('.butt').removeClass('btn').addClass("finish").html("已抢完");
				$(this).find('.expect').addClass("finish");
			}
			// 有无奖励
			var awardStatus = $(this).find('.award').attr("award");
			if(awardStatus == 0){
				$(this).find('.award').remove();
			}
		});
	}
};
module.exports = _invest;