$(function(){
	// 获取焦点
	$('.phone').focus();
	$('.phone').on('keyup',function(){
		$(this).val($(this).val().replace(/[^\d]/g, ""));
	})
	$('.phone').on('input',function(){
		if ($(this).val().length == 11) {
			$('.next').css('background','#ff7400');
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 下一步
	$('.next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			if (/^1[34578]\d{9}$/.test($('.phone').val())){
				// $('.phone').val(),前端获取的手机号码
				// 开始判断此手机的用户是否为借款人,	1:是借款人 0：不是
					// 是借款人：则继续判断该用户是否已注册，1:已注册  0：未注册
						// 已注册：跳转输入密码页面
						window.location.href = './loginNext.html';
						// 未注册，跳转注册页面
						window.location.href = './register.html';
					// 不是借款人，弹窗提示
					layer.open({
					  	type: 1,
					  	title:false,
					  	closeBtn:0,
					  	skin: 'investUser',
					  	area: ['300px', '200px'],
					  	content: $('#investUser')
					})
			} else {
				layer.msg('请输入正确的手机号码');
			}
		} else {
			return false;
		}
	})
	// 关闭弹窗
	$('.investUser_bottom').on('click',function(){
		layer.closeAll();
	})
})
