$(function(){
	$('.pswHide').focus();
	$('.phone').on('input',function(){
		$('.pswShow').val($(this).val());
		$('.pswHide').val($(this).val());
		if ($(this).val().length <6 || $(this).val().length > 16) {
			$('.next').css('background','#cacaca');
		} else {
			$('.next').css('background','#ff7400');
		}
	})
	// 密码可见性转换
	$('.iconHide').on('click',function(){
		$('.show').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.show').show();
		$('.pswShow').focus();
	})
	$('.iconShow').on('click',function(){
		$('.hide').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.hide').show();
		$('.pswHide').focus();
	})
	// 登录按钮
	$('.next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			if (!(/^\s*$/g.test($('.pswHide').val()))) {
				if($('.pswHide').val().length<6 || $('.pswHide').val().length>16) {
					layer.msg('请输入6-16登录密码');
				} else {
					// 开始判断$('.pswHide').val()登录密码是否正确
					// 正确：开始判断是否激活存管
						// 激活存管跳转个人中心
						window.location.href = './myCenter.html';
						// 未激活跳转激活存管页面
						window.location.href = './openDeposit.html';
					// 密码错误，弹窗提示
					layer.msg('登录密码不正确，请重新输入');
				}
			} else {
				layer.msg('登录密码不正确，请重新输入');
			}
		} else {
			return false;
		}
	})
	// 忘记密码跳转
	$('.forget').on('click',function(){
		window.location.href = './forgetLoginPsw.html';
	})
})