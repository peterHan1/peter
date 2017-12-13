require('./index.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/info_nav/index.js');
require('util/map/chinamap.js');
var infoJoin = {
	init : function(){
		this.evenFn();
	},
	evenFn : function(){
		console.log(666);
	}
};
$(document).ready(function () {
	// map.Map();
});