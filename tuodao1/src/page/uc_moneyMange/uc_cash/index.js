require("./uc_cash.scss");
require("./uc_cash.js");
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('page/common/uc-menu/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');
require("./bank.js");
require("./bank.scss");
require('util/paging/page.scss');
require('util/paging/page.js');
$(function(){
	// 分页
	$(".zxf_pagediv").createPage({
		// 页数
		pageNum: 10,
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