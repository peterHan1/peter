require('./invest.scss');
require('util/paging/page.scss');
require('util/paging/page.js');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');

var _td 				= require('util/td.js');
var _apiBanner			= require('api/invest_list-api.js');
var templateBanner  	= require('./invest_list.string');

$(function(){
	_td.request({
			url     : _td.getServerUrl('/invest-list.json'),
			data 	:{
				pageNum:1,
				pageSize:2
			},
			success :function(res){
				bannerHtml = _td.renderHtml(templateBanner,{
					list:res.content.list,
				});
				$('.invest_list_bot').html(bannerHtml);
				$(".zxf_pagediv").createPage({
					// 页数 pages
					pageNum: res.content.pages,
					// 当前页 pageNum
					current: res.content.pageNum,
					// 显示条数 pageSize
					shownum: res.content.pageSize,
					backfun: function(e) {
						console.log(e.current);
						_td.request({
							url     : _td.getServerUrl('/invest-list.json'),
							data 	:{
								pageNum:e.current,
								pageSize:10
							},
							success :function(res){
								console.log(res)
								bannerHtml = _td.renderHtml(templateBanner,{
									list:res.content.list,
								});
								$('.invest_list_bot').html(bannerHtml);
								
								},
							error : function(){

							}
						});
					}
				})	
				},
			error : function(){

			}
		});
	


	$('.invest_tab a').each(function () {
		if (location.href.indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
			$(this).addClass('on');
			var index = $(this).parent().index();
			$(".invest_list_bot ul").eq(index).show().siblings().hide();
			$(".invest_list_top ul").eq(index).show().siblings("ul").hide();
			if(index == 2){
				$(".invest_list_txt").show();
			}else{
				$(".invest_list_txt").hide();
			}
		} else {
			$(this).removeClass('on');
		};

	});
	$(document).on("click",".invest_list_top li",function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
	});
});
