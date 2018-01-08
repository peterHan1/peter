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
	// 图形验证码，验证
	$('.checkIpt').on('input',function(){
		if ($('.idCard').val() != '' && $(this).val() != '' && $('.codeIpt').val() != '' && $('.user').val() !='') {
			$('.next').css('background','#ff7400');
			// 请求成功
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 短信验证码，验证
	$('.codeIpt').on('input',function(){
		if ($(this).val().length > 9) {
			$(this).val($(this).val().substring(0,8));
		}
		if ($('.idCard').val() != '' && $(this).val() != '' && $('.checkIpt').val() != '' && $('.user').val() !='') {
			$('.next').css('background','#ff7400');
			// 请求成功
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 姓名验证
	$('.user').on('input',function(){
		if ($('.idCard').val() != '' && $(this).val() != '' && $('.checkIpt').val() != '' && $('.codeIpt').val() !='') {
			$('.next').css('background','#ff7400');
			// 请求成功
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 身份证号码验证
	$('.idCard').on('input',function(){
		if ($('.codeIpt').val() != '' && $(this).val() != '' && $('.checkIpt').val() != '' && $('.user').val() !='') {
			$('.next').css('background','#ff7400');
			// 请求成功
		} else {
			$('.next').css('background','#cacaca');
		}
	})
	// 下一步
	$('.next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			var userName = $('.user').val();// userName 从前端获取的用户姓名
			var userIdcode = $('.idCard').val();// userIdcode 从前端获取的用户身份证号
			if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g.test($('.idCard').val())) {
				// 首先判断短信验证码$('.codeIpt').val()是否正确
				// 短信验证码正确，则开始判断用户的姓名，手机号，身份证号是否一致
					// 不一致则弹窗提示：
					layer.msg('请输入正确的身份信息');
					// 一致则跳转重新设置交易密码页面
					window.location.href = './forgetDealPswNext.html';
				// 短信验证码错误，弹窗提示
			} else {
				layer.msg('请输入正确的身份证号');
			}
		}
	})
})
