$(function(){
//	status表示用户的身份 status:0 新用户 status1:存量用户
//	person表示用户信息是否可修改 0表示不能修改 1表示能修改
	var status = 1;
	var person = 0;
	var click = true; //click为true的时候可以选择银行 click为false的时候 不能选择 详情看选择银行代码
	var iscro = true;
//	渲染银行的文本的时候 记得一定要给 $('.deposit .formBox .choose_bank').attr('name',bankName); 赋值,因为关系到确定按钮可不可以变亮点击
	if(status == 0){
		$('.deposit .formBox .card .check').show();
//		判断验证按钮是否可点
		$('.deposit .formBox .card .check').on('click',function(){
			var name=$('.deposit .user').val();
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			var card = $('.deposit .idCard').val();
			if(reg.test(card) === true && name != '') {
				$('.deposit .formBox .card .check').removeClass('kd');
				if(person == 0){
					$('.deposit .choose_bank span').addClass('dis');
					$('.deposit .choose_bank .icon').hide();
					$('.deposit .bankNumber').addClass('dis');
					$('.deposit .bankNumber').attr('disabled','disabled');
					var phoneNumber = $('.deposit .phoneNumber').val();
					if(phoneNumber != ''){
						$('.deposit .phoneNumber').attr('disabled','disabled');
						$('.deposit .phoneNumber').addClass('dis');
					}
					click = false;
				}
			}else{
				if(name == ''){
					layer.msg('您的真实姓名不能为空');
				}else{
					layer.msg('请输入正确的身份证号码');
				}
			}
		});
		$('.deposit .idCard').on('focus',function(){
			$('.deposit .formBox .card .check').addClass('kd');
		})
		$('.deposit .user').on('focus',function(){
			$('.deposit .formBox .card .check').addClass('kd');
		})
	}
	//选择银行
	$('.deposit .formBox .choose_bank').on('click',function(){
		if(click == false){
			return false;
		}else{
			$('.deposit').hide();
			$('.select_bank').show();
			if(iscro == true){
				var myScroll = new IScroll('#wrapper',{  
				    scrollY : true,         //滚动方向（垂直）  
				    click : true,           //IScroll默认禁止了点击事件，如需绑定点击事件，请将该参数值设为true  
				});
			}
			iscro = false;
		}
	});
	 $(".select_bank #bank_ul li").bind("click",function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		$('.deposit').show();
		$('.select_bank').hide();
		var bankName=$(this).find('h4').html();
		$('.deposit .formBox .choose_bank .bankName').html(bankName);
		$('.deposit .formBox .choose_bank').attr('name',bankName);
		$('.deposit .formBox .choose_bank .bankName').css('color','#212a36');
		check();
	})
	//银行页面返回
	$('.select_bank .tilte span').on('click',function(){
		$('.deposit').show();
		$('.select_bank').hide();
	});
	//开户页面返回
	$('.deposit .tilte span').on('click',function(){
		layer.open({
			  type: 1,
			  title:false,
			  closeBtn:0,
			  skin: 'window_box',
			  content: $('#window_box')
		});
	});
	$('#window_box .continue').on('click',function(){
		layer.closeAll();
	});
	//银行卡获取焦点删除按钮显示
	$('.deposit .bankNumber').on('focus',function(){
		if($(this).val()!=''){
			$('.deposit .cardNum span').show();
		}
	})
	$('.deposit .bankNumber').on('keyup',function(){
		if($(this).val()!=''){
			$('.deposit .cardNum span').show();
		}
	})
	$('.deposit .bankNumber').on('blur',function(){
		setTimeout(function(){
			$('.deposit .cardNum span').hide();
		},300)
	})
	$('.deposit .cardNum span').on('click',function(){
		$('.deposit .bankNumber').val('');
		$('.deposit #btn').removeClass('kd');
		$('.deposit #btn').attr('disabled','disabled');
	});
	//监听确定按钮变色
	$('.deposit input').on('keyup',function(){
		check();
	})
	function check(){
		var user = $('.user').val();
		var idCard = $('.idCard').val();
		idCard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
		var bankName = $('.choose_bank').attr('name');
		var bankNumber = $('.bankNumber').val().replace(/\s+/g, "");
		bankNumber = /^([1-9]{1})(\d{14}|\d{18})$/.test(bankNumber);
		var phoneNumber = $('.phoneNumber').val();
		phoneNumber = /^1[34578]\d{9}$/.test(phoneNumber);
		var payLength = $('.payNumber').val().length;
		if(user != '' && idCard == true && bankName != '' && bankNumber == true && phoneNumber !='' && payLength >=6){
			$('.deposit #btn').addClass('kd');
			$('.deposit #btn').removeAttr('disabled');
		}else{
			$('.deposit #btn').removeClass('kd');
			$('.deposit #btn').attr('disabled','disabled');
		}
	}
	
//	开通按钮点击
  	var success = true;
	$('.deposit #btn').on('click',function(){
		if($(this).hasClass('kd')){
			if(success == true){
				$('#show_success').show();
				setTimeout(function(){
					$('#show_success').hide();
				},2000)
			}else{
				layer.mag('银行返回的信息')
			}
		}else{
			return false;
		}
	});
})
