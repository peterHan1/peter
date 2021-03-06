require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/uc-menu/index.js');
require('./uc_points_gold.scss');
require('util/layer/index.js');

var _td				= require('util/td.js');
var _apiOperate 	= require('api/operate-api.js');
var _paging 		= require('util/paging/index.js');
var	points_exchange = require('./points_exchange.string');
var	points_detail 	= require('./points_detail_table.string');
var	points_get 		= require('./points_get_table.string');
var	gold_exchange 	= require('./gold_exchange.string');
var	gold_detail 	= require('./gold_detail_table.string');
var	gold_get 		= require('./gold_get_table.string');

var pointsGold = {
	init : function(){
		this.getPoints();
		this.exchangeTab();
		this.getGold();
		this.layerJs();
		this.tabCut();
		this.exchangeNum();
	},
	// praise控制抽奖板块的出现隐藏
	praise : 0,
	headerData : {
		'accessId' 	:unescape(_td.getAccess('accessId')),
		'accessKey' :unescape(_td.getAccess('accessKey'))
	},
	// 查询是否是抽奖页面积分不足跳转
	exchangeTab : function(){
        var type = _td.getUrlParam('type');
		if (type == 'exchange') {
			$('.points_menu a').eq(2).addClass('welfare_border').siblings().removeClass('welfare_border');
			$('.points_detail').children().eq(2).show().siblings().hide();
			$('.praise').hide();
			pointsGold.getTasks('');
			pointsGold.praise = 1;
		} else {
			pointsGold.getPoints_exchange();
		}
	},
	// 给数字添加逗号，小数点后两位
	numberAdd : function(str){
		var reg = /\./g;
		if (reg.test(str)) {
			var arr = String(str).split('.');
			return String(arr[0]).split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')+'.'+arr[1];
		}else{
			return String(str).split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')+'.00';
		}
	},
	// 获取积分详细信息
	getPoints : function(){
		_apiOperate.getPoints(pointsGold.headerData,function(res){
			$('.points_current').html(pointsGold.numberAdd(res.content.scoreCurrent));
			$('.points_total').html(pointsGold.numberAdd(res.content.scoreTotal));
		},function(){
			$('.points_current').html('-----');
			$('.points_total').html('-----');
			console.log('请求失败');
		});
	},
	// 获取金币详细信息
	getGold : function(){
		_apiOperate.getGold(pointsGold.headerData,function(res){
			$('.gold_current').html(pointsGold.numberAdd(res.content.scoreCurrent));
		},function(){
			console.log('请求失败');
		});
	},
	// 判断是否ie浏览器或是具有ie内核
	ieBrowser : function(){
		var agent = navigator.userAgent.toLowerCase();
		if ((/(msie\s|trident.*rv:)([\w.]+)/).test(agent)) {
			$('.exchange .change li .btn_div input').height(22);
		}
	},
	// 积分兑换查询的优惠券类型与立即兑换按钮
	exchange_btn : function(listData){
		$.each($('.points_detail .change li'),function(i){
			if ($('.points_detail .change li').eq(i).find('.change_btn')[0].getAttribute("data-type") == 2) {
				$('.points_detail .change li').eq(i).addClass('txq');
				$('.points_detail .change li').eq(i).find('.change_img').html('<i class="iconfont">&#xe6b9;</i>&nbsp;免费提现'+$('.points_detail .change li').eq(i).find('.change_img').html()+'次');
			} else {
				$('.points_detail .change li').eq(i).find('.change_img').html('<i>'+$('.points_detail .change li').eq(i).find('.change_img').html()+'</i>%&nbsp;年利率加息');
			}
		})
		// 立即兑换按钮
		$('.points_detail .change li .change_btn').on('click',function(){
			var goodsNum = parseInt($(this).parent().find('input').val());
			var goodsId = $(this)[0].getAttribute("data-id");
			var goodsType = $(this)[0].getAttribute("data-type");
			var needScore = parseInt($(this).siblings('.btn_div').find('i').html())*goodsNum;
			var result = parseInt($('.points_current').html().split(',').join(''))-needScore;
			var exchangeData = {
				id 			: goodsId,
				type		: goodsType,
				num 		: goodsNum,
				sumScore 	: needScore
			}
			if (isNaN($(this).parent().find('input').val())) {
				layer.msg('请输入数字');
				return false;
			} else if(goodsNum < 1){
				layer.msg('兑换数量为小于1，无法兑换！');
				return false;
			} else {
				if (result < 0) {
					layer.msg('积分不足');
					return false;
				} else {
					pointsGold.getPoint_submit(exchangeData,result);
				}
			}
		})
	},
	// 积分兑换加息券，提现券提交
	getPoint_submit : function(exchangeData,result){
		var data = {
				id 			: exchangeData.id,
				type		: exchangeData.type,
				num			: exchangeData.num,
				sumScore 	: exchangeData.sumScore
			}
		_apiOperate.getPoint_submit(data,pointsGold.headerData, function(res){
			$('.points_current').html(pointsGold.numberAdd(result));
			layer.msg('兑换成功');
		},function(res){
			console.log(res.msg);
		})
	},
	// 积分兑换查询
	getPoints_exchange : function(){
		_apiOperate.getPoints_exchange(pointsGold.headerData, 1, function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(points_exchange,{
				list:res.content.list
			});
			$('.point_duihuan').html(bannerHtml);
			pointsGold.ieBrowser();
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.exchange_btn(listData);
			_paging.paging('point_page',res.content.total,res.content.pageSize,function(e){
				_apiOperate.getPoints_exchange(pointsGold.headerData,e.current,function(res){
					listData = res.content.list;
					var bannerHtml = _td.renderHtml(points_exchange,{
						list:res.content.list
					});
					$('.point_duihuan').html(bannerHtml);
					pointsGold.ieBrowser();
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.exchange_btn(listData);
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			_paging.paging('point_page',0,1000);
			$('.point_duihuan').html('<img src="" alt="" />');
			console.log('请求失败');
		})
	},
	// 金币立即兑换按钮
	gold_exchange_btn : function(){
		$('.gold_detail .change li .change_btn').on('click',function(){
			var goodsNum = parseInt($(this).parent().find('input').val());
			var goodsId = $(this)[0].getAttribute("data-id");
			var goodsType = $(this)[0].getAttribute("data-type");
			var needScore = parseInt($(this).siblings('.btn_div').find('i').html())*goodsNum;
			var result = parseInt($('.gold_current').html().split(',').join(''))-needScore;
			var exchangeData = {
				id 			: goodsId,
				type		: goodsType,
				num 		: goodsNum,
				sumScore 	: needScore
			}
			if (isNaN(goodsNum)) {
				laye.msg('请输入整数！');
				return false;
			} else if(goodsNum < 1){
				layer.msg('兑换数量为小于1，无法兑换！');
				return false;
			} else{
				if(result < 0){
					layer.msg('金币不足！');
					return false;
				}else{
					// pointsGold.getPoint_submit(exchangeData,result);
					$('.gold_current').html(pointsGold.numberAdd(result));
				}
			}
		})
	},
	// 金币兑换查询
	getGold_exchange : function(){
		_apiOperate.getGold_exchange(pointsGold.headerData,1,function(res){
			var listData = res.content.list;
			var bannerHtml = _td.renderHtml(gold_exchange,{
				list:res.content.list
			});
			$('.gold_duihuan').html(bannerHtml);
			pointsGold.ieBrowser();
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.gold_exchange_btn();
			_paging.paging('gold_page',res.content.total,res.content.pageSize,function(e){
				_apiOperate.getGold_exchange(pointsGold.headerData,e.current,function(res){
					listData = res.content.list;
					bannerHtml = _td.renderHtml(gold_exchange,{
						list:res.content.list
					});
					$('.gold_duihuan').html(bannerHtml);
					pointsGold.ieBrowser();
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.gold_exchange_btn();
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	// 积分明细table中部分td样式，内容
	pointsDetail_table : function(listData){
		$.each(listData,function(i){
			if (listData[i].type == 1) {
				listData[i].type = '收入';
				listData[i].score = '+' + listData[i].score;
			} else {
				listData[i].type = '支出';
				// listData[i].score='-'+listData[i].score;
			}
		});
	},
	// 积分明细
	getPoints_detail : function(){
		_apiOperate.getPoints_detail(pointsGold.headerData,1,function(res){
			pointsGold.pointsDetail_table(res.content.list);
			var bannerHtml = _td.renderHtml(points_detail,{
				list:res.content.list
			});
			$('._points_detail_table').html(bannerHtml);
			$.each($('.points_detail_table tr'),function(i){
				if($('.points_detail_table tr').eq(i).children().eq(2).html() == '收入'){
					$('.points_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
				}
				$('.points_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
			})
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.points_detail_table');
			_paging.paging('point_page',res.content.total,res.content.pageSize,function(e){
				_apiOperate.getPoints_detail(pointsGold.headerData,e.current,function(res){
					pointsGold.pointsDetail_table(res.content.list);
					var bannerHtml = _td.renderHtml(points_detail,{
						list:res.content.list
					});
					$('._points_detail_table').html(bannerHtml);
					$.each($('.points_detail_table tr'),function(i){
						if($('.points_detail_table tr').eq(i).children().eq(2).html() == '收入'){
							$('.points_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
						}
						$('.points_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
					})
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.changeColor('.points_detail_table');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			_paging.paging('point_page',0,1000);
			$('._points_detail_table').html('<img src="" alt="" />');
			console.log('请求失败');
		})
	},
	// 金币明细table中部分td样式，内容
	goldDetail_table : function(listData){
		$.each(listData,function(i){
			if (listData[i].type == 1) {
				listData[i].type = '收入';
				listData[i].score = '+' + listData[i].score;
			} else {
				listData[i].type='支出';
				// listData[i].score='-'+listData[i].score;
			}
		});
	},
	// 金币明细
	getGold_detail : function(){
		_apiOperate.getGold_detail(pointsGold.headerData,1,function(res){
			pointsGold.goldDetail_table(res.content.list);
			var bannerHtml = _td.renderHtml(gold_detail,{
				list:res.content.list
			});
			$('._gold_detail_table').html(bannerHtml);
			$.each($('.gold_detail_table tr'),function(i){
				if($('.gold_detail_table tr').eq(i).children().eq(2).html() == '收入'){
					$('.gold_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
				}
				$('.gold_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
			})
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.gold_detail_table');
			_paging.paging('gold_page',res.content.total,res.content.pageSize,function(e){
				_apiOperate.getGold_detail(pointsGold.headerData,e.current,function(res){
					pointsGold.goldDetail_table(res.content.list);
					var bannerHtml = _td.renderHtml(gold_detail,{
						list:res.content.list
					});
					$('._gold_detail_table').html(bannerHtml);
					$.each($('.gold_detail_table tr'),function(i){
						if($('.gold_detail_table tr').eq(i).children().eq(2).html() == '收入'){
							$('.gold_detail_table tr').eq(i).find('td').last().css('color','#ff7400');
						}
						$('.gold_detail_table tr').eq(i).children().eq(3).css({paddingLeft: '0px',paddingRight: '30px',textAlign: 'center'});
					})
					pointsGold.HeightAuto();
					pointsGold.elHeight();
					pointsGold.changeColor('.gold_detail_table');
				},function(){
					console.log("分页点击请求失败");
				});
			});
		},function(){
			console.log('请求失败');
		})
	},
	// 获取积分任务
	getTasks : function(){
		_apiOperate.getTasks(pointsGold.headerData,'',function(res){
			var listData = res.content.list;
			$.each(listData,function(i){
				if (listData[i].pcUrl == null) {
					listData[i].pcUrl = 'javascript:;';
				};
				if (listData[i].code == 1 || listData[i].code == 2 || listData[i].code == 3 || listData[i].isOverdue == 'yes' || listData[i].isComplete == 'yes') {
					listData[i].pcUrl = 'javascript:;';
				};
			})
			var bannerHtml = _td.renderHtml(points_get,{
				list:res.content.list
			});
			$('._points_get_table').html(bannerHtml);
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.points_get_table');
			$.each(listData,function(i){
				if (listData[i].isOverdue == 'yes') {
					$('._points_get_table tr').eq(i+1).children().eq(2).html('<span>任务已过期</span>');
				}
				if (listData[i].isComplete == 'yes') {
					$('._points_get_table tr').eq(i+1).children().eq(2).html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
				}else{
					$('._points_get_table tr').eq(i+1).find('a').on('click',function(e){
						if (listData[i].code == 1) {
							pointsGold.layerPublic('points_gzh');
						} else if (listData[i].code == 2 ) {
							pointsGold.layerPublic('points_login');
						} else if (listData[i].code== 3) {
							pointsGold.layerPublic('points_invest');
						}
					})
				}
			});
			_paging.paging('point_page',res.content.total,1000);
		},function(res){
			_paging.paging('point_page',0,1000);
			$('._points_get_table').html('<img src="" alt="" />');
			console.log(res.msg);
		})
	},
	// 获取金币任务
	getGold_get : function(){
		_apiOperate.getGold_get(pointsGold.headerData,function(res){
			var listData=res.content.list;
			$.each(listData,function(i){
				if (listData[i].pcUrl==null) {
					listData[i].pcUrl='javascript:;';
				};
				if(listData[i].isOverdue=='yes'){
					listData[i].todo='任务已过期';
					listData[i].pcUrl='javascript:;';
				}
			})
			var bannerHtml = _td.renderHtml(gold_get,{
				list:res.content.list
			});
			$('._gold_get_table').html(bannerHtml);
			pointsGold.HeightAuto();
			pointsGold.elHeight();
			pointsGold.changeColor('.gold_get_table');
			$.each(listData,function(i){
				if (listData[i].isOverdue == 'yes') {
					$('.points_get_table tr').eq(i+1).children().eq(2).html('任务已过期');
				}
				if (listData[i].isComplete == 'yes') {
					$('.points_get_table tr').eq(i+1).children().eq(2).html('<span class="iconfont">&#xe675;</span>&nbsp;已完成');
				} else {
					$('.points_get_table tr').eq(i+1).find('a').on('click',function(e){
						if (listData[i].code == 1) {
							pointsGold.layerPublic('points_gzh');
						} else if (listData[i].code == 2) {
							pointsGold.layerPublic('points_login');
						} else if (listData[i].code == 3) {
							pointsGold.layerPublic('points_invest');
						}
					})
				}
			});
			_paging.paging('point_page',res.content.total,1000);
		},function(res){
			console.log(res.msg);
		})
	},
	// table隔行变色
	changeColor : function (obj){
		$.each($(obj+' tr'),function(i){
			if (i%2 != 0) {
				$(obj+' tr').eq(i).css('background','#FBFBFB');
			}
		})
	},
	// 控制welfare_content的高与左侧菜单栏高度相同
	HeightAuto : function(){
		$('.uc_menu').height('auto');
		$('.uc_menu').siblings('div').height('auto');
	},
	elHeight : function (){
		var hL = $('.uc_menu')[0].clientHeight;
		var hR = $('.uc_menu').siblings('div')[0].clientHeight;
		if (hR >= hL) {
			$(".uc_menu").height(hR);
			$('.uc_menu').siblings('div').height(hR);
		}else{
			$('.uc_menu').siblings('div').height(hL);
			$(".uc_menu").height(hL);
		}
	},
	// tab切换集合
	tabCut : function(){
		// 积分，金币菜单tab
		$('.points .menu a').on("click",function(event){
			pointsGold.HeightAuto();
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index = $(this).index();
			$('.welfare_top_menu').children().eq(index).show().siblings().hide();
			$('.exchange').children().eq(index).show().siblings().hide();
			if(index == 1){
				$('.praise').hide();
				pointsGold.elHeight();
			}else{
				if(pointsGold.praise == 0){
					$('.praise').show();
				}
				pointsGold.elHeight();
			}
		})
		// 我的积分下菜单tab
		$('.points_menu a').on("click",function(event) {
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index = $(this).index();
			pointsGold.praise = index;
			$('.points_detail').children().eq(index).show().siblings().hide();
			if (index == 0) {
				$('.praise').show();
				pointsGold.getPoints_exchange();
			} else if (index == 1) {
				$.each($('.points_detail_table tr'),function(i){
					$('.points_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				})
				$('.praise').hide();
				pointsGold.getPoints_detail();
			} else {
				$('.praise').hide();
				pointsGold.getTasks('');
			}
		});
		// 我的金币下菜单tab
		$('.gold_menu a').on("click",function(event) {
			$(this).addClass('welfare_border').siblings().removeClass('welfare_border');
			var index = $(this).index();
			$('.gold_detail').children().eq(index).show().siblings().hide();
			if (index == 0) {
				pointsGold.getGold_exchange()
			} else if (index == 1) {
				$.each($('.gold_detail_table tr'),function(i){
					$('.gold_detail_table tr').eq(i).find('td').eq(3).css({textAlign:'center',paddingLeft:'0px',paddingRight:'30px'});
				})
				pointsGold.getGold_detail()
			} else {
				pointsGold.getGold_get()
			}
		});
	},
	// 兑换数量加减
	exchangeNum : function(){
		$(document).on('click','.add',function(){
			var num = $(this).parent().find('input').val();
			if (num == '') {
				$(this).parent().find('input').val(1);
			} else {
				$(this).parent().find('input').val(parseInt(num)+1);
			}
		})
		$(document).on('click','.cut',function(){
			var num = $(this).parent().find('input').val();
			if (num == '') {
				$(this).parent().find('input').val(0);
			} else {
				if ((parseInt(num)-1) < 0) {
					$(this).parent().find('input').val(0);
				} else {
					$(this).parent().find('input').val(parseInt(num)-1);
				}
			}
		})
		$(document).on('keyup','.goodsNum',function(){
			if ($(this).val() == '') {
				return false;
			} else {
				$(this).val($(this).val().replace(/[^\d]/g, ""));
			}
		})
		$(document).on('change','.goodsNum',function(){
			if ($(this).val() == '') {
				return false;
			} else {
				$(this).val(parseInt($(this).val().replace(/[^\d]/g, "")));
			}
		})
	},
	// 弹窗内部js
	layerJs : function(){
		$('#points_gzh ul li input').on({
			mouseover: function() {
			$(this).addClass('hover-input');
		},
			mouseout: function() {
				$(this).removeClass('hover-input');
			}
		})
		$('#points_gzh ul li input').on('focus',function(){
			$(this).removeClass('err-input');
		})
		$('#points_gzh ul li input').on('blur',function(){
			if ($(this).val() == '') {
				$(this).css({fontSize:'12px',color:'#9e9e9e'});
				$(this).removeClass('hover-input');
			} else {
				$(this).css({fontSize:'14px',color:'#333333'});
			}
		})
		$('#points_gzh ul li input').keyup(function() {
			if ($(this).val().length > 0) {
				$('#points_gzh ul li .del').show();
				$(this).css({fontSize:'14px',color:'#333333'});
			}
		});
		$('#points_gzh ul li .del').on('click',function(){
			$('#points_gzh ul li input').val('');
		})
		// 弹出层关闭
		$('.points_alert .i_know').on('click',function(){
			layer.closeAll();
		})
		$('#points_gzh .cancel').on('click',function(){
			layer.closeAll();
		})
		$('#points_gzh .submit_btn .submits').on({
			mouseover : function(){
				$(this).css('background','#ff7400');
			},
			mouseout : function(){
				$(this).css('background','#9e9e9e');
			}
		})
		$('#points_gzh .submit_btn .submits').on("click",function(){
			if ($('#points_gzh ul li input').val() != '' && $('#points_gzh ul li input').val().length == 6) {
				//调用接口
			} else {
				$('#points_gzh ul li input').addClass('err-input');
				$('.order_err p').show();
			}
			layer.title('口令验证成功');
			$('#points_gzh .content').hide();
			$('#points_gzh .center').show();
			$('#points_gzh .order_err p').hide();
		})
		// 登录成功弹窗
		$('#points_gzh .submit_btn .submits').on("click",function(){
			$('#points_login .content').hide();
			$('#points_gzh .center').show();
		})
	},
	// 获取积分任务部分弹窗公共样式
	layerPublic : function(obj){
		var titles = '';
		if (obj == 'points_gzh') {
			titles = '获取积分：首次关注拓道金服微信公众号';
		} else if (obj == 'points_login'){
			titles = '获取积分：首次登录APP';
		} else {
			titles='获取积分：APP端手动投资';
		}
		layer.open({
			type: 1,
			title: [titles,'color: #707070;'],
			skin: obj,
			area: ['560px', '330px'],
			content: $('#'+obj)
		});
	}
}

$(function(){
	pointsGold.init();
})

