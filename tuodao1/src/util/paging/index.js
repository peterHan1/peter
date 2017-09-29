
require('./page.scss');
require('./page.js');
$(function(){
	// 得到总页数
	$(".zxf_pagediv").createPage({
		pageNum: 10,
		current: 1,
		shownum: 5,
		backfun: function(e) {
			console.log(e.current);
			// $("#data-container").html(thisDate(e.current));
		}
	});
});