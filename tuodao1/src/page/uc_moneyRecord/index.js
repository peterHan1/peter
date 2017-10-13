require("./uc_moneyRecord.scss");
require("./uc_moneyRecord.js");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('util/laydate/laydate.js');
require('util/laydate/laydate.scss');
$(function(){
	// 分页
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 5,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
	// 日历
	$(".layer_date").on("click",function(event){
		if(event.target==this){
			laydate({
				format: 'YYYY-MM-DD',
				// 选择时间后回调
			 	choose: function(dates){
			 		console.log(dates);
			  	}
			});
		}
	});
});