require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./friends.scss');
var _td = require('util/td.js');
$('.second_btn').on('click',function(){
	_td.doLogin();
	$(this).attr('href','uc_invite.html');
})
