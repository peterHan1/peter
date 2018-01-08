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
			// 开始判断$('.checkIpt').val()是否正确
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
		if ($(this).val() != '' && $('.codeIpt').val() != '') {
			$('._next').css('background','#ff7400');
		} else {
			$('._next').css('background','#cacaca');
		}
	})
	// 短信验证码，验证
	$('.codeIpt').on('input',function(){
		if ($(this).val().length > 9) {
			$(this).val($(this).val().substring(0,8));
		}
		if ($(this).val() != '' && $('.checkIpt').val() != '') {
			$('._next').css('background','#ff7400');
		} else {
			$('._next').css('background','#cacaca');
		}
	})
	// 下一步
	$('._next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			// $('.codeIpt').val() 前端获取的短信验证码的值
			// 判断短信验证码是否正确
			// 短信验证码正确：
				//清除计时器,更改title的值，
				clearInterval(timer);
				document.title = '重置密码';
				//并进入设置新密码页面,输入框获取焦点
				$('.findPsw').hide().siblings().show(); // 进入设置新密码页面
				$('.ipt1').focus(); // 输入框获取焦点
			// 短信验证码错误,弹窗提示
		}
	})

// 重置密码页面
	// 密码可见性转换
	$('.iconHide1').on('click',function(){
		$('.show1').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.show1').show();
		$('.ipt2').focus();
	})
	$('.iconShow1').on('click',function(){
		$('.hide1').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.hide1').show();
		$('.ipt1').focus();
	})

	// 密码可见性转换
	$('.iconHide2').on('click',function(){
		$('.show2').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.show2').show();
		$('.ipt4').focus();
	})
	$('.iconShow2').on('click',function(){
		$('.hide2').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.hide2').show();
		$('.ipt3').focus();
	})
	// 新密码验证
	$('.ipts1').on('input',function(){
		$('.ipt1').val($(this).val());
		$('.ipt2').val($(this).val());
		if ($(this).val() != '' && $('.ipt3').val() != '') {
			$('.submit').css('background','#ff7400');
		}else{
			$('.submit').css('background','#cacaca');
		}
	})
	// 确认密码验证
	$('.ipts2').on('input',function(){
		$('.ipt3').val($(this).val());
		$('.ipt4').val($(this).val());
		if ($(this).val() != '' && $('.ipt1').val() != '') {
			$('.submit').css('background','#ff7400');
		}else{
			$('.submit').css('background','#cacaca');
		}
	})
	// 提交
	$('.submit').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			var ipt1 =/^\s*$/g.test($('.ipt1').val());
			var ipt2 =/^\s*$/g.test($('.ipt3').val());
			if (ipt1 == false && ipt2 == false) {
				if($('.ipt1').val().length<6 || $('.ipt1').val().length>16 || $('.ipt3').val().length<6 || $('.ipt3').val().length>16) {
					layer.msg('请设置6-16位登录密码');
				} else {
					if($('.ipt1').val() == $('.ipt3').val()) {
						// $('.ipt1').val():新密码的值，$('.ipt3').val()：确认密码的值按照后台需求传入后台
						// 提交成功,跳转登录首页
						window.location.href = './login.html';
					} else {
						layer.msg('密码不一致，请重新输入');
					}
				}
			} else {
				layer.msg('请设置6-16位登录密码');
			}
		} else {
			return false;
		}
	})
})
