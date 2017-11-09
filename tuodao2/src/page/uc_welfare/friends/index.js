require('page/common/top/index.js');
require('page/common/nav/index.js');
require('./friends.scss');
var friend = {
	init:function(){
		this.nowInvite();
	},
	nowInvite:function(){
		$('.second_btn').on('click',function(){
			// 先判断是否登录
			// window.open('uc_invite.html','_self');
			// window.location.href='register.html';
			if(true){
				window.open('uc_invite.html','_self');
			}else{
				window.location.href='userlogin.html';
			}
		})
	}
}
$(function(){
	friend.init();
})
