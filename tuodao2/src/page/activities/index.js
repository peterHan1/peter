require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');
_td = require('util/td.js');

var nine_draw  		= require('./nine_draw/index.string');
var nine_drawHtml 	= _td.renderHtml(nine_draw);
$('.content').html(nine_drawHtml);
var _draw = require('./nine_draw/index.js');
_draw.init();
