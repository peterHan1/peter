require('./index.scss');
require('page/common/uc-menu/index.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/paging/page.scss');
require('util/paging/page.js');
var _td 		= 	require('util/td.js');
var _tips	 	= 	require('util/tips/index.js');
var _apiInvest 	= 	require('api/ucInListAutoDet-api.js');
var autoTit 	= 	require('./autoDel.string');
var autoList	= 	require('./autoDelList.string');
var ucInvest = {
	init : function(){
		this.addTopHtml();
		this.addListHtml();
	},
	addTopHtml : function(){
		_apiInvest.getAutoTop(1,function(res){
			autoDelTop = _td.renderHtml(autoTit,{
				content:res.content,
			});
			$(".autoDetails_top").html(autoDelTop);
		},function(){
			console.log("请求失败");
		});
	},
	addListHtml : function(){
		_apiInvest.getAutoList(1,1,10,function(res){
			console.log(res);
			autoDelList = _td.renderHtml(autoList,{
				list:res.content.list,
			});
			$("#tbody_list").html(autoDelList);
			_apiInvest.paging(res.content.pages,res.content.pageNum,res.content.pageSize,function(e){
				_apiInvest.getAutoList(1,e.current,10,function(res){
					autoDelList = _td.renderHtml(autoList,{
						list:res.content.list,
					});
					$("#tbody_list").html(autoDelList);
					ucInvest.tipsHover();
					ucInvest.trColor();
				},function(){
					console.log("请求失败");
				});
			});
			ucInvest.tipsHover();
			ucInvest.trColor();
		},function(){
			console.log("请求失败");
		});
	},
	tipsHover : function(){
		$(".td_tips").mouseover(function(){
			_tips.getTipsRight($(this),13);
		});
		$(".td_tips").mouseout(function(){
			$(this).find('.tips').hide();
		});
	},
	trColor : function(){
		trColor('tbody_list');
		// 各行变色
		function trColor(id){
			var trs=document.getElementById(id).getElementsByTagName("tr");
			for(var i=0;i<trs.length;i++){
				if(i%2==0){
					trs[i].className +=" trColor";
				}
			};
		}
	},
};
$(function(){
	ucInvest.init();
});