require('./index.scss');

var _td 		= require('util/td.js');
var templateNav = require('./nav.string');
var _apiUser 	= require('api/user-api.js');

var navPage = {

	init : function(){
		this.loadUserInfo();
		// _td.loadUserInfo(templateNav,'.nav-uc');
		this.bindEven('#navigate li');

	},
	loadUserInfo : function(){
		var _this = this;
		var headerData = {
			'accessId' : unescape(_td.getAccess('accessId')),
			'accessKey' :unescape(_td.getAccess('accessKey'))
		};
		if(headerData.accessId && headerData.accessKey){
			_apiUser.checkLogin(headerData,function(res){
				var loginHtml = _td.renderHtml(templateNav,{
					isLogin : true,
					user : res.content
				});
				$('.nav-uc').prepend(loginHtml);
				_this.bindEven('.nav-uc .uc');
			},function(errMsg){
				// console.log(errMsg);
				if(!errMsg.success){
					var loginHtml = _td.renderHtml(templateNav,{
						isLogin : false
					});
					$('.nav-uc').prepend(loginHtml);
					// _td.doLogin();
				}
			});
		}else{
			var loginHtml = _this.renderHtml(template,{
						isLogin : false
					});
			$('.nav-uc').prepend(loginHtml);
		}

		// $('#uccc').click(function(e){
		// 	e.preventDefault();
		// 	alert(222);
		// });



	},
	bindEven: function(obj){
		this.move(obj);
		this.mouseOut(obj);
	},
	move: function(obj){
		$(obj).mouseover(function(){
			if($(this).children().length>1){
				$(this).find('dl').show();
				$(this).addClass('on');
			}
		});
	},
	mouseOut: function(obj){
		$(obj).mouseout(function(){
			$(this).find('dl').hide();
			$(this).removeClass('on');
		});
	}


};
// module.exports = navPage.init();
$(function(){
	navPage.init();
	// $('.uc').on("mouseover",function(){
	// 	alert(22222);
	// 	// if($(this).children().length>1){
	// 	// 	$(this).find('dl').show();
	// 	// 	$(this).addClass('on');
	// 	// }
	// });
});
// $(function(){
// 	$('#navigate li, .uc').mouseover(function(){
// 		if($(this).children().length>1){
// 			$(this).find('dl').show();
// 			$(this).addClass('on');
// 		}
// 	});
// 	$('#navigate li, .uc').mouseout(function(){
// 		$(this).find('dl').hide();
// 		$(this).removeClass('on');
// 	});


// 	$('#navigate a').each(function () {
// 		if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
// 			$(this).addClass('cur');
// 		} else {
// 			$(this).removeClass('cur');
// 		}
// 	});

// 	$(window).scroll(function(){
// 		var h = $(window).scrollTop();
// 		var topH = $('.top').height();
// 		(h>topH) ?	$(".scroll-nav").addClass('active') : $(".scroll-nav").removeClass('active');
// 	});
// });