require("./uc_messageCenter.scss");
require("./uc_messageCenter.js");
require('util/paging/page.scss');
require('util/paging/page.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
$(function(){
	// 分页
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 100,
		// 当前页
		current: 1,
		// 显示条数
		shownum: 10,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
});