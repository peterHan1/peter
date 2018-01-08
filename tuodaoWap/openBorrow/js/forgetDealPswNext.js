$(function(){
	$('.ipt1').focus();
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
	// 新密码输入，只能输入数字
	$('.ipts1').on('keyup',function(){
		$(this).val($(this).val().replace(/[^\d]/g, ""));
	})
	// 确认密码输入，只能输入数字
	$('.ipts2').on('keyup',function(){
		$(this).val($(this).val().replace(/[^\d]/g, ""));
	})
	// 新密码验证
	$('.ipts1').on('input',function(){
		$('.ipt1').val($(this).val());
		$('.ipt2').val($(this).val());
			if($(this).val() != '' && $('.ipt3').val() !=''){
				$('.next').css('background','#ff7400');
			} else {
				$('.next').css('background','#cacaca');
			}
	})
	// 确认密码验证
	$('.ipts2').on('input',function(){
		$('.ipt3').val($(this).val());
		$('.ipt4').val($(this).val());
		if($(this).val() != '' && $('.ipt1').val() !=''){
				$('.next').css('background','#ff7400');
			} else {
				$('.next').css('background','#cacaca');
			}
	})
	// 提交
	$('.next').on('click',function(){
		if($(this).css('background-color') == 'rgb(255, 116, 0)') {
			var ipt1 =/^\d{6}$/g.test($('.ipt1').val());
			var ipt2 =/^\d{6}$/g.test($('.ipt3').val());
			if (ipt1 == true && ipt2 == true) {
				if($('.ipt1').val() == $('.ipt3').val()) {
					// $('.ipt1').val():新的交易密码，$('.ipt3').val()：确认交易密码，提交成功跳转提现详情页
					window.location.href = './cashDetails.html';
				} else {
					layer.msg('密码不一致，请重新输入');
				}
			} else {
				layer.msg('请设置6位的交易密码');
			}
		} else {
			return false;
		}
	})
})