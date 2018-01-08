require('./new_guide.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');

var _td 			= require('util/td.js');
var _apiNewGuide 	= require('api/operate-api.js');

var newGuide = {
	init : function(){
		this.getGuideData();
	},
	headerData : {
		'accessId' 	:unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	numChange : function(res,obj){
		var data = parseInt(String(res).split('.')[0]);
		var num1,num2,num3=0;
		var type = '';
		num1 = parseInt(data/100000000);
		num2 = parseInt((data%100000000)/10000);
		num3 = (data%100000000)%10000;
		if (obj == '.regNum') {
			type = '人';
		} else {
			type = '元';
		}
		if (num1 <= 0) {
			num1 = null;
			if (num2 <= 0) {
				num2 = null;
				$(obj).html('<span>'+num3+'</span>&nbsp;'+type);
			} else {
				$(obj).html('<span>'+num2+'</span>&nbsp;万&nbsp;<span>'+num3+'</span>&nbsp;'+type);
			}
		} else {
			$(obj).html('<span>'+num1+'</span>&nbsp;亿&nbsp;<span>'+num2+'</span>&nbsp;万&nbsp;<span>'+num3+'</span>&nbsp;'+type);
		}
	},
	getGuideData:function(){
		var date1 = new Date();
		var date2 = new Date('2013/11/24,00:00:00');
		var date3 = date1-date2;
		var date = Math.ceil(date3/1000/60/60/24);
		var nums1 = parseInt(date/100000000);
		var nums2 = parseInt((date%100000000)/10000);
		var nums3 = (date%100000000)%10000;
		if (nums1 <= 0) {
			nums1 = null;
			if (nums2 <= 0) {
				nums2 = null;
				$('.days').html('<span>'+nums3+'</span>&nbsp;天');
			} else {
				$('.days').html('<span>'+nums2+'</span>&nbsp;万&nbsp;<span>'+nums3+'</span>&nbsp;天');
			}
		} else {
			$('.days').html('<span>'+nums1+'</span>&nbsp;亿&nbsp;<span>'+nums2+'</span>&nbsp;万&nbsp;<span>'+nums3+'</span>&nbsp;天');
		}
		_apiNewGuide.getGuideData(newGuide.headerData,function(res){
			newGuide.numChange(res.content.account,'.account');
			newGuide.numChange(res.content.interest,'.interest');
			newGuide.numChange(res.content.regNum,'.regNum');
		},function(){
			$('.account').html('-----');
			$('.interest').html('-----');
			$('.regNum').html('-----');
			console.log('请求失败');
		})
	}
}
$(function(){
	newGuide.init();
})