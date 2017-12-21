require('./index.scss');
var _invest = {
	setTips : function(type){
		var deType;
		if(type == 1){
			return deType = true;
		}else{
			return deType = false;
		}
	},
	setCount : function(bool,time,start,str){
		if(bool == 1){
			return {"txt":"已抢完","btnCla":"finish","txtCla":"finish"};
		}else{
			if(start > time){
				var startTime = _invest.setTime(2,start);
				var startTxt;
				var st = (start-time) / 1000;
				var t = st / (60*60*24);
				if(t < 1){
					startTxt = startTime + "开抢";
				}else if(t >= 1 && t < 2){
					startTxt = "明天" + startTime + "开抢";
				}else if(t>=2 && t < 3){
					startTxt = "后天" + startTime + "开抢";
				}else{
					startTxt = "即将开抢";
				}
				return {"txt":startTxt,"btnCla":"btn_tim","txtCla":"expect"};
			}else{
				return {"txt":str,"btnCla":"btn","txtCla":"expect"};
			}
		}
	},
	// 债权转让
	setUnit : function(unit){
		switch (unit)
		{
			case 0:
				return "天";
			case 1:
				return "个月";
			case 2:
				return "年";
			default: return "";
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
	setBarShow : function(totalM,resM){
		var plan = Math.floor((totalM-resM)/totalM*100);
		if(totalM == resM){
			return {"planTxt":0,"barWin":"style=width:0%"};
		}else{
			return {"planTxt":plan,"barWin":"style=width:"+plan+"%"};
		}
	}
};
module.exports = _invest;