var _inp = require('util/regular.js');
var investDateils = {
	init : function(){
		var inp = $(".investting input");
		this.eachA();
		this.eventFn();
		this.trColor();
		this.inputFocus(inp);

	},
	eachA : function(){
		var hre = location.href.split('?');
		$('.invest_tab a').each(function () {
			var dates = $(this).attr("data");
			for(var i in hre){
				if(hre[i] == dates){
					$(this).addClass('on');
				}
			}

		});
	},
	eventFn : function(){
		investDateils.yhQuan();
		$(".detail_tab li a").on("click",function(){
			var ind = $(this).parent("li").index();
			$(".detai").eq(ind).show().siblings('.detai').hide();
			$(this).addClass("on");
			$(this).parent().siblings().find('a').removeClass('on');
		});
		_inp.inpMoneyOnClick({
			elm: "all_money",
			input: "sub_money",
			// 可以余额
			balance:5000,
			// 可投金额
			invest:60000,
			callback: function(inp) {
				investDateils.setinput(inp);
			}
		});
		// 输入金额input输入状态
		_inp.inpMoneyOnkey({
			elm: "sub_money",
			btn_x:"btn_empty",
			// 可以余额
			balance:888888,
			// 可投金额
			invest:666666,
			callback: function(inp) {
				investDateils.setinput(inp);
			}
		});
		_inp.inpMoneyOnFocus({
			inp:"sub_money",
			btn_x:"btn_empty",
		});
		// 清空按钮
		$(".btn_empty").on("click",function(){
			$(".sub_money").val("");
			$(".invest_money").removeClass("bor_col");
			$(".in_span").remove();
			$(".sub_money").css("color","#333");
			$(".sub_money").focus();
			investDateils.setinput($(".sub_money"));
			$(".inp_ticket").val("");
			$(".p_ticket").html("请选择优惠券").css('color','#9e9e9e');
			return false;
		});
		// 支付按钮点击的状态
		$(document).on("click",".sub_btn",function(){
			var mon = $(".invest_money");
			var pswd = $(".input_pwd");
			var money = $(".sub_money").val();
			var psw = $(".sub_psw").val();
			if(money == "" && psw == ""){
				investDateils.show_mess("请填写加入金额! 和 请填写加入金额和支付密码!");
				$(".sub_money").focus();
				mon.addClass("bor_col");
				pswd.addClass("bor_col");
				return false;
			}else if(money == "" && $(".in_span").length <= 0){
				$(".sub_money").focus();
				mon.addClass("bor_col");
				investDateils.show_mess("请填写加入金额!");
				return false;
			}else if(psw == "" && $(".in_span").length <= 0){
				$(".sub_psw").focus();
				pswd.addClass("bor_col");
				investDateils.show_mess("请填写支付密码!");
				return false;
			}else if(psw != "123" && $(".in_span").length <= 0){
				$(".sub_psw").focus();
				investDateils.show_mess("密码错误，请重新输入!");
				pswd.addClass("bor_col");
				return false;
			}else{
				$(".current_money").removeClass("cur_money");
				$(".mess").remove();
				if($(".in_span").length <= 0){
					mon.removeClass('bor_col');
					pswd.removeClass('bor_col');
				}
			}
		});
		$(".iskonw,.rclose").on("click",function(){
			layer.closeAll();
		});
		// 优惠券弹窗选择
		$(".ul_select li").on("click",function(){
			var clas = $(this).attr("class");
			var sel = '<b class="select_b"></b>';
			if(clas != "yhq_no"){
				var datas = $(this).attr('data');
				$(".ul_select li .select_b").remove();
				$(this).append(sel);
				$(".yes").addClass("add_quan");
				$(".yes").attr("data",datas);
			}
		});
		$(document).on("click",".discount_bot .add_quan",function(){
			var dat = $(this).attr("data");
			var a = $(".sub_money");
			var d = $(".inp_ticket").val();
			$(".p_ticket").html(dat).css('color','#333');
			$(".inp_ticket").val(dat);
			$(this).removeClass("add_quan");
			layer.closeAll();
			var b = Math.floor((a.val()*0.09/12)*100)/100;
			var e = Math.floor((a.val()*0.09/12)*100)/100;
			$(".predict_money").html(b +"+"+e);
		});
		$(".discount_bot .no").on("click",function(){
			$(".ul_select li .select_b").remove();
			$(".yes").removeClass("add_quan");
			layer.closeAll();
		});
		// 已阅读
		$('#checkinp').on('click',function(){
			if($('#checkinp').is(':checked')){
				$('#sub_btn').attr('class','sub_btn');
			}else{
				$('#sub_btn').attr('class','no_btn');
			}
		});
	},
	yhQuan : function(){
		// 优惠券点击
		$(".add_ticket").on("click",function(){
			var val = $(".inp_ticket").val();
			var sel = '<b class="select_b"></b>';
			if($(".sub_money").val() == ""){
				// _inp.input_mess("选择优惠券前需要填写加入金额！",null,false);
				_inp.input_mess($(".sub_money"),true,$(".sub_money").parent(),"选择优惠券前需要填写加入金额！");
				return false;
			}else if($(".invest_money").hasClass('bor_col')){
				return false;
			}else{
				$(".ul_select li").each(function(){
					var vals = $(this).attr("data");
					if(val == vals){
						$(this).append(sel);
					}
				});
				layer.open({
					type: 1,
					title:'',
					skin: '',
					closeBtn:0,
					area:['635px','485px'],
					content: $('#discount_show')
				});
			}
		});
	},
	trColor : function(){
		var list = $(".chage_tr tr");
		for (var i = 0; i < list.length; i++) {
			if(i%2!=1){
				list[i].className = 'li_color';
			}
		};
	},
	inputFocus : function(el){
		el.focus(function(){
			$(this).parent().addClass("com_sty");
		});
		investDateils.inputBlur(el);
		investDateils.subMoney();
	},
	inputBlur : function(el){
		el.blur(function(){
			$(this).parent().removeClass("com_sty");
		});
	},
	subMoney : function(){
		// 输入金额input失去焦点状态
		$(".sub_money").blur(function(){
			var inputs = $(this);
			setTimeout(function(){
				investDateils.overFormat(inputs);
				$(".btn_empty").hide();
			},200);
		});
	},
	// 输入金额计算
	setinput : function(ins){
		var $amountInput = ins;
		event = window.event || event;
		if (event.keyCode == 37 | event.keyCode == 39) {
			return;
		}
		$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
		var a=ins;
		// 最后根据算法优化
		var b = Math.floor((a.val()*0.09/12)*100)/100;
		// 有奖励
		var flag = false;
		var c = 6;

		if(flag == true && quan == true){
			$(".predict_money").html(b +"+"+ c +"+"+ d);
		}else if(flag == true ){
			$(".predict_money").html(b +"+"+c);
		}else{
			$(".predict_money").html(b);
		}
		var m = a.val().replace(/\d(?=(\d{3})+$)/g,'$&,');
		if(m == ""){
			$(".sub_btn").val("实付0.00元，立即投资");
			$(".predict_money").html("0.00");
		}else{
			$(".sub_btn").val("实付"+m+"元，立即投资");
		}
	},
	overFormat :function(th){
		if(th.val() != ""){
			th.val(Number(th.val()).toFixed(2));
			var logNum = th.val().toString();
			integerNum = parseInt(logNum).toString().replace(/\d(?=(\d{3})+$)/g,'$&,');
			decimalNum = '.' + logNum.replace(/(.*)\.(.*)/g,'$2');
			var m = th.val();
			if(m == ""){
				$(".sub_btn").val("实付0.00元，立即投资");
				$(".predict_money").html("0.00");
			}else{
				$(".sub_btn").val("实付"+ integerNum+decimalNum +"元，立即投资");
			}
		}
	},
	// top提示错误
	show_mess : function(str){
		var txt = "<span class='mess'><i class='iconfont'>&#xe671;</i>"+ str +"</span>";
		$(".current_money").addClass("cur_money");
		if($(".mess").length > 0){
			$(".mess").remove();
		}
		$(".current_money").append(txt);
	},
	// countdown(".times","2017/08/28,09:18:00");
	countdown : function(obj,time){
		var html = '<input type="submit" value="实付0.00元，立即投资" class="sub_btn">';
		var ss=setInterval(function(){
			var endtime=new Date(time),
				nowtime = new Date(),
				leftsecond=parseInt((endtime.getTime()-nowtime.getTime())/1000),
				d=parseInt(leftsecond/3600/24),
				h=parseInt((leftsecond/3600)%24),
				m=parseInt((leftsecond/60)%60),
				m1=parseInt((leftsecond/3600)%24*60),
				s=parseInt(leftsecond%60);
			h= (h<10) ? "0"+h : h;
			m= (m<10) ? "0"+m : m;
			s= (s<10) ? "0"+s : s;
			if(leftsecond<=0){
				h=0;
				m=0;
				s=0;
			}
			$(obj).find("span b").text(h);
			$(obj).find("span i").text(m);
			$(obj).find("span em").text(s);
			if(leftsecond<=0){
				$('.countdown').remove();
				$('.input_sub').append(html);
				clearInterval(ss);
			}else{
			}
		},100);
	}
};
var JPlaceHolder = {
	// 检测    
	_check : function(){
		return 'placeholder' in document.createElement('input');
	},
	// 初始化    
	init : function(){
		if(!this._check()){
			this.fix();
		}
	},
	// 修复 
	fix : function(){
		jQuery(':input[placeholder]').each(function(index, element) {
			var self = $(this), txt = self.attr('placeholder');
			self.wrap($('<div></div>').css({position:'relative',width:'200px', float:'left',zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
			var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
			var holder = $('<span class="span-ie7"></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top,height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
			self.focusin(function(e) {
				holder.hide();
			}).focusout(function(e) {
				if(!self.val()){
					holder.show();
				}
			});
			holder.click(function(e) {
				 holder.hide();
				 self.focus();
			});
		});
	}
};
$(function(){
	investDateils.init();
	JPlaceHolder.init();
});
