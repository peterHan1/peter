require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./encyclopedia.scss');
require('./index.js');

var _paging = require('util/paging/index.js');
_paging.paging('pageList',100,1);