require('./page.js');
require('./page.scss');
var _paging = {
	paging : function(el,pages,pageNum,pageSize,backFuntion){
		$("." + el).createPage({
			// 页数 pages
			pageNum: pages,
			// 当前页 pageNum
			current: pageNum,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	}
};
module.exports = _paging;
