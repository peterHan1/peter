$(function(){
	$('.checkIpt').focus();
	// 点击获取短信验证码，并验证图形验证码是否正确
	var num = 60;// 倒计时60秒
	var timer = '';// 用来清除计时器的赋值变量
	$('.code').on('click',function(){
		if (num != 60) {
			return false;
		}
		clearInterval(timer);
		if ($('.checkIpt').val() == ''){
			layer.msg('请输入图片验证码');
		} else {
			// $('.checkIpt').val() 前端获取的图片验证码的值
			// 开始判断$('.checkIpt').val()图片验证码是否正确
			// $('.checkIpt').val()图片验证码的值正确：开始发送短信验证码，
				// 若短信验证码成发送，弹窗提示
				layer.msg('短信验证码已发送到您的手机');
				// 开始执行倒计时，60秒后短信验证码失效
				timer = setInterval(function() {
					$('.code').css({'color':'#626262','font-size':'0.28rem'});
					num--;
					$('.code').html(num+'S');
					if (num < 0) {
						clearInterval(timer);
						num = 60;
						$('.code').html('重新获取验证码');
						$('.code').css({'color':'#ff7400','font-size':'0.24rem'});
					}
				}, 1000);
			// $('.checkIpt').val()图片验证码的值错误，弹窗提示：并更新图形验证码
			layer.msg('图片验证码错误，请重新输入');
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
	// 图形验证码，验证
	$('.checkIpt').on('input',function(){
		if ($(this).val() != '' && $('.codeIpt').val() != '' && $('.pswHide').val() != '') {
			$('.next').css('background','#ff7400');
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 短信验证码，验证
	$('.codeIpt').on('input',function(){
		if ($(this).val().length > 9) {
			$(this).val($(this).val().substring(0,8));
		}
		if ($(this).val() != '' && $('.checkIpt').val() != '' && $('.pswHide').val() != '') {
			$('.next').css('background','#ff7400');
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 登录密码验证
	$('.pswIpt').on('input',function(){
		$('.pswHide').val($(this).val());
		$('.pswShow').val($(this).val());
		if($(this).val() != '' && $('.checkIpt').val() != '' && $('.codeIpt').val() != ''){
			$('.next').css('background','#ff7400');
		} else {
			$('.next').css('background','#cacaca');
		}
	})

	// 完成按钮验证
	$('.next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			alert($('.pswHide').val())
			if (!(/^\s*$/g.test($('.pswHide').val()))) {
				if($('.pswHide').val().length<6 || $('.pswHide').val().length>16 || $('.pswShow').val().length<6 || $('.pswShow').val().length>16) {
					layer.msg('请设置6-16位登录密码');
				} else {
					// 提交成功
					// 判断短信验证码$('.codeIpt').val()是否正确
					// 正确：则保存登录密码$('.pswHide').val(),并弹窗提示注册成功，2秒后跳转到激活存管页面
					layer.msg('注册成功');
					setTimeout(function(){
						window.location.href = './openDeposit.html';// 进入激活存管页面
					},2000);
					// 错误：弹窗提示
				}
			} else {
				layer.msg('请设置6-16位登录密码');
			}
		}
	})
})
