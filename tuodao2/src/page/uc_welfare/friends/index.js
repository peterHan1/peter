require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./friends.scss');

var _td = require('util/td.js');
var friends = {
	init : function(){
		this.nowInvite();
	},
	headerData : {
        accessId 	: _td.getAccess('accessId'),
        accessKey 	: _td.getAccess('accessKey')
    },
	nowInvite : function(){
		$('.second_btn').on('click',function(){
			// 先判断是否登录
			// window.open('uc_invite.html','_self');
			// window.location.href='register.html';
			if(friends.headerData){
				window.open('uc_invite.html','_self');
			}else{
				window.open('userlogin.html');
			}
		})
	}
}
$(function(){
	friends.init();
})
