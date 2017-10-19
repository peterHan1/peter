var _tips = {
	init : function(obj){
		var tipsObj = $(obj).find('.tips');
		var jtHtml = '<span class="b"></span><span class="t"></span>';
		if(tipsObj.find('span').length <= 0) tipsObj.append(jtHtml);
		tipsObj.show();
		return tipsObj;
	},
	getTips : function(obj){
		var tipsObj = this.init(obj);
		var t = tipsObj.parent().height();
		var w = -(tipsObj.width()/2);
		tipsObj.css({'margin-top':t+'px','margin-left':w+'px'});
	},
	// tips右侧提示 hjb
	getTipsRight : function(obj,hei){
		var tipsObj = this.init(obj);
		var w = tipsObj.parent().width()+8;
		tipsObj.css({'margin-top':hei+'px','margin-left':w+'px'});
	}
};
module.exports = _tips;