require('page/invest_detail/invest_detail.js');
require('util/paging/page.scss');
require('util/paging/page.js');
require('./fancybox/jquery.lazyload.min.js');
require('./fancybox/source/jquery.fancybox.js');
require('./fancybox/source/jquery.fancybox.scss');

// 图片延时加载
// $("img.lazy").lazyload({effect: "fadeIn"});

$('.fancybox').fancybox({
	fitToView   : false,
	// centerOnScroll:true,
	helpers:  {
		title: {
			type: 'inside',
			position: 'top'
		}
	}
});