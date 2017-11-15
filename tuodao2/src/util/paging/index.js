require('./page.js');
require('./page.scss');
var _paging = {
	paging : function(el,total,pageSize,backFuntion){
		$("." + el).createPage({
			// 页数 pages
			pageNum: Math.ceil(total/pageSize),
			// 当前页
			current: 1,
			// 显示条数 pageSize
			shownum: pageSize,
			backfun: backFuntion
		});
	}
};
module.exports = _paging;
