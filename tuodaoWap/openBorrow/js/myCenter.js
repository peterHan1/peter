$(function(){
//	openDeposit代表是否开通存管  0: 未开通 1: 开通
//	个人中心提现页面没有数据的时候  让cash_list隐藏  使no_data显示
	var openDeposit = 1;
	if(openDeposit == 0){
		layer.open({
		  type: 1,
		  title:false,
		  closeBtn:0,
		  area: ['5.1rem'],
		  skin: 'win_boxs',
		  content: $('#win_boxs')
		});
		$('.cash_list').hide();
	}
//顶部tab
	var type = getUrlType("type");
	if(type === "1"){
		$(".top_nav li").eq(1).addClass('on');
		$('.cash_list').eq(1).show();
		var myScroll = new IScroll('#wrappers',{  
		    scrollY : true,
		    click : true,
		});
	}else{
		$(".top_nav li").eq(0).addClass('on');
		$('.cash_list').eq(0).show();
		var myScroll = new IScroll('#wrapper',{  
		    scrollY : true,
		    click : true,
		});
	}
//底部tab
	$('.myBottom ul li').on('click',function(){
		var _index = $(this).index();
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');
		$('.mainBox').hide();
		$('.mainBox').eq(_index).show();
	});
//	退出弹窗
	$('#quit').on('click',function(){
		layer.open({
			  type: 1,
			  title:false,
			  closeBtn:0,
			  skin: 'quit_box',
			  content: $('#quit_box')
		});
	});
	$('#quit_box .stay').on('click',function(){
		layer.closeAll();
	})
	$('#quit_box .quit').on('click',function(){
		layer.closeAll();
		//	退出登录
	})
	function getUrlType(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
})
