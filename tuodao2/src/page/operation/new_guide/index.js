require('./new_guide.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td = require('util/td.js');
var _apiNewGuide = require('api/operate-api.js');

var newGuide = {
	init : function(){
		this.getGuideData();
	},
	headerData : {
		'accessId' :unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	numChange : function(res,obj){
		var data=parseInt(String(res).split('.')[0]);
		var num1,num2,num3=0;
		var type='';
		num1=parseInt(data/100000000);
		num2=parseInt((data%100000000)/10000);
		num3=(data%100000000)%10000;
		if(obj=='.day'){
			type='天';
		}else if(obj=='.regNum'){
			type='人';
		}else{
			type='元';
		}
		if(num1<=0){
			num1=null;
			if(num2<=0){
				num2=null;
				$(obj).html('<span>'+num3+'</span>&nbsp;'+type);
			}else{
				$(obj).html('<span>'+num2+'</span>&nbsp;万&nbsp;<span>'+num3+'</span>&nbsp;'+type);
			}
		}else{
			$(obj).html('<span>'+num1+'</span>&nbsp;亿&nbsp;<span>'+num2+'</span>&nbsp;万&nbsp;<span>'+num3+'</span>&nbsp;'+type);
		}
	},
	getGuideData:function(){
		_apiNewGuide.getGuideData(newGuide.headerData,function(res){
			newGuide.numChange(res.content.account,'.account');
			newGuide.numChange(res.content.account,'.account');
			newGuide.numChange(res.content.account,'.account');
			newGuide.numChange(res.content.regNum,'.regNum');
		},function(){
			console.log('请求失败');
		})
	}
}
$(function(){
	newGuide.init();
})