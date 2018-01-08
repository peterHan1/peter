$(function(){
	$('.oldIpt1').focus();
	// 密码可见性转换
	$('.iconHide').on('click',function(){
		$('.show').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.show').show();
		$('.oldIpt2').focus();
	})
	$('.iconShow').on('click',function(){
		$('.hide').find('input').val($(this).siblings().val());
		$(this).parent().hide();
		$('.hide').show();
		$('.oldIpt1').focus();
	})
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
	// 旧密码输入验证
	$('.ipts').on('input',function(){
		$('.oldIpt1').val($(this).val());
		$('.oldIpt2').val($(this).val());
		if ($(this).val() != '' && $('.ipt1').val() != '' && $('.ipt3').val() != '') {
			$('.submit').css('background','#ff7400');
		} else {
			$('.submit').css('background','#cacaca');
		}
	})
	// 新密码输入验证
	$('.ipts1').on('input',function(){
		$('.ipt1').val($(this).val());
		$('.ipt2').val($(this).val());
		if ($(this).val() != '' && $('.oldIpt1').val() != '' && $('.ipt3').val() != '') {
			$('.submit').css('background','#ff7400');
		} else {
			$('.submit').css('background','#cacaca');
		}
	})
	// 确认密码输入验证
	$('.ipts2').on('input',function(){
		$('.ipt3').val($(this).val());
		$('.ipt4').val($(this).val());
		if ($(this).val() != '' && $('.oldIpt1').val() != '' && $('.ipt1').val() != '') {
			$('.submit').css('background','#ff7400');
		} else {
			$('.submit').css('background','#cacaca');
		}
	})
	// 提交
	$('.submit').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			if (!(/^\s*$/g.test($('.oldIpt1').val()))) {
				if($('.oldIpt1').val().length<6 || $('.oldIpt1').val().length>16) {
					layer.msg('请输入6-16位的旧密码');
				} else {
					if (!(/^\s*$/g.test($('.ipt1').val())) && !(/^\s*$/g.test($('.ipt3').val()))) {
						if($('.ipt1').val().length<6 || $('.ipt1').val().length>16 || $('.ipt3').val().length<6 || $('.ipt3').val().length>16) {
							layer.msg('请设置6-16位登录密码');
						} else {
							if($('.ipt1').val() == $('.ipt3').val()){
								// 提交成功成功,开始判断$('.oldIpt1').val()旧密码是否正确
								// 旧密码正确则,保存重新设置的交易密码，新登录密码：$('.ipt1').val(),确认登录密码：$('.ipt3').val()
								// 保存成功后返回登录页面
								window.location.href = './login.html';
								// 错误，这弹窗提示
								layer.msg('请输入正确的旧密码');
							} else {
								layer.msg('密码不一致，请重新输入');
							}
						}
					} else {
						layer.msg('请设置6-16位登录密码');
					}
				}
			} else {
				layer.msg('请输入6-16位的旧密码');
			}
		}
	})
	$('.findPsw span').on('click',function(){
		window.location.href = './forgetLoginPsw.html';
	})
})