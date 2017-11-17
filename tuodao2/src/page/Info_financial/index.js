require('../Info_aboutTd/index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');


var _page=require('util/paging/index.js');
$(function(){
	_page.paging('pageList',100,10,function(e){

	});
});