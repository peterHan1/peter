require('./old_list.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('util/layer/index.js');

var _paging = require('util/paging/index.js');
_paging.paging('pageList',50,10)
var _td = require('util/td.js');
var _apiNews = require('api/operate-api.js');

var flag = false;
var contents = '<tr><td colspan="10" class="get_data">暂无记录</td></tr>';

//分页
var allNum;

$(function(){
	$('#uc_menu a').removeClass('on');
	$('.uc_menu .menu_main li:eq(5) a').addClass('on');
	// tenderNow('',0);
	$('.old_transferUl li').click(function(){
		var l=$(this).index()
		$('.old_transferUl li').removeClass('on');
		$(this).addClass('on');
		$('table').hide();
		$('table').hide();
		$('table').eq(l).show();
		if(l == 0){
			DataInit.pages.curPage = 1;
			tenderNow('', 0);
		}else if(l ==1){
			DataInit.pages.curPage = 1;
			tenderNow('repay', 1);
		}else if(l ==2){
			DataInit.pages.curPage = 1;
			tenderNow('repay_yes', 2);
		}
	});

	$('.old_investUl li').click(function(){
		var l=$(this).index()
		$('.old_investUl li').removeClass('on');
		$(this).addClass('on');
		$('table').hide();
		$('table').eq(3+l).show();
		if(l == 0){
			DataInit.pages.curPage = 1;
			showApply();
		}else if(l ==1){
			DataInit.pages.curPage = 1;
			myZQList();
		}
	});

	$(".uc_old_listTop ul li").click(function(){
		var l=$(this).index()
		$('.nav_tabUl li').removeClass('on');
		$(this).addClass('on');
		$('.uc_old_tabBox ').children("div").siblings().hide();
		$(".uc_old_tabBox").children("div").eq(l).show();

		$('table').hide();
		if(l == 0){
			$('.old_transferUl li').removeClass('on');
			$('.old_transferUl li').eq(0).addClass('on');
			$('table').eq(0).show();
			DataInit.pages.curPage = 1;
			tenderNow('', 0);
		}else if(l ==1){
			$('.old_investUl li').removeClass('on');
			$('.old_investUl li').eq(0).addClass('on');
			$('table').eq(3).show();
			DataInit.pages.curPage = 1;
			showApply();
		}else if(l ==2){
			$('table').eq(5).show();
			DataInit.pages.curPage = 1;
			recordInfo(5);
		}
	});

})


//投资的借款
function tenderNow(status,index) {
	layer.load(1, {shade: [0.3, '#000']});
	var param = {
		"page": DataInit.pages.curPage,
		"itemsPerPage": DataInit.pages.pageSize,
		"orderBy": 't.addtime',
		"order": 'desc',
		"status": status,
		"isVoucher": "",
		"borrowName": ""
	}
	$.ajax({
		url: "/json/uc/tenderNow?t=" + new Date(),
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		data: param,
		success: function (data) {
			layer.closeAll();
			//$("#accountCapitalWait").text(data.accountCapitalWait);
			//$("#tenderInterestYes").text(data.tenderInterestYes);
			//$("#accountInterestWait").text(data.accountInterestWait);
			$('table').eq(index).find("tr :gt(0)").remove();
			var list = data.dataRows;
			allNum = data.paginator.lastPage;
			if (list.length > 0) {
				$('table').eq(index).find('.get_data').parent().remove();
				var content = ""
				for (var i = 0; i < list.length; i++) {
					var borrow = list[i];
					content += "<tr>";
					content += "<td >NO." + borrow.borrowNid + "</td>";
					content += "<td>" + borrow.realName + "";
					if (borrow.isAuto == 0) {
						content += "<i class='iconfont'>&#xe627;</i>";
					}
					content += "</td>";
					content += "<td>" + borrow.time + "</td>";
					content += "<td>" + borrow.amount + "</td>";
					content += "<td>" + borrow.interest + "</td>";
					content += "<td>" + borrow.reward + "</td>";
					content += "<td>";
					if (borrow.tenderStatus != "") {
						content += "已转让";
					} else {
						if(borrow.statusText == "还款中"){
							content += "已迁移";
						}else{
							content += borrow.statusText;
						}
					}
					content += "</td>";
					content += "<td class='blue no_br'><a href='/uc/my/invest_details?param=" + borrow.tenderId + "'>查看详情</a></td>";
					content += "</tr>";
				}
				$('table').eq(index).find("tr").eq(0).after(content);
			} else {
				$('table').eq(index).find("tr").eq(0).after(contents);
				$('.tcdPageCode').empty();
			}
			if (DataInit.pages.curPage == 1) {
				$("#pagind_1").createPage({
					pageCount: allNum,
					current: DataInit.pages.curPage,
					backFn: function (p) {
						DataInit.pages.curPage = p;
						tenderNow(status, index);
					}
				});
			}
		},
		error: function (data) {
			layer.closeAll();
			layer.msg("系统错误");
		}
	});
}
//资金记录
function recordInfo(index){
	layer.load(1, {shade: [0.3,'#000']});
	var param= {
		"page": DataInit.pages.curPage,
		"itemsPerPage" : DataInit.pages.pageSize,
		"orderBy" : 'id desc,addtime',
		"order" : 'desc'
	};
	$.ajax({
		url: "/frontjson/user/account/log?t="+new Date(),
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		data: param,
		success:function(data) {
			layer.closeAll();
			$('table').eq(index).find("tr :gt(0)").remove();
			allNum=data.paginator.lastPage;
			if(data.dataRows.length>0){
				$('table').eq(index).find('.get_data').parent().remove();
				var content = "";
				var list = data.dataRows;
				for(var i=0; i<list.length;i++){
					content += '<tr>';
					content += '<td>'+list[i].addtime+'</td>';
					content += '<td>'+list[i].type+'</td>';
					content += '<td>';
					content += list[i].income+'</td>';
					content += '<td>';
					content += list[i].expend+'</td>';
					content += '<td>';
					content += list[i].frost+'</td>';
					content += '<td>';
					content +=list[i].balance+'</td>';
					var remark  =list[i].remark;
					content += '<td class="ps">'+remark+'</td>';
					content += '</tr>';
				}
				$('table').eq(index).find("tr").eq(0).after(content);
			}else{
				$('table').eq(index).find("tr").eq(0).after(contents);
				$('.tcdPageCode').empty();
			}
			if (DataInit.pages.curPage==1) {
				$("#pagind_3").createPage({
					pageCount:allNum,
					current:DataInit.pages.curPage,
					backFn:function(p){
						DataInit.pages.curPage=p;
						recordInfo(index);
					}
				});
			}
		},
		error:function(data) {
			layer.closeAll();
			layer.msg("系统错误");
		}
	});

}

function showApply()
{
	layer.load(1, {shade: [0.3,'#000']});
	var param= {
		"page": DataInit.pages.curPage,
		"itemsPerPage" : DataInit.pages.pageSize
	};
	$.ajax({
		url: "/json/zq/showApplyRecord?t="+new Date(),
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		data: param,
		success:function(data) {
			layer.closeAll();
			$('table').eq(3).find("tr :gt(0)").remove();
			allNum=data.paginator.lastPage;
			if(data.dataRows.length>0){
				$('table').eq(3).find('.get_data').parent().remove();
				var content = "";
				var list = data.dataRows;
				for(var i=0; i<list.length;i++){
					var name= list[i].name;
					content += '<tr>';
					content += '<td>'+list[i].name+'</td>';
					content += '<td>'+list[i].borrowPeriod+'期</td>';
					content += '<td>';
					content += list[i].borrowApr+'%</td>';
					content += '<td>';
					content += list[i].account+'</td>';
					content += '<td>';
					content += list[i].periodInterest+'</td>';
					content += '<td>';
					content += list[i].monthDay+'(天)'+'</td>';
					content += '<td>';
					content += "<a href='/front/zq_details?param="+list[i].zqid+"' >点击查看</a></td>";
					content += '</tr>';
				}
				$('table').eq(3).find("tr").eq(0).after(content);
			}else{
				$('table').eq(3).find("tr").eq(0).after(contents);
				$('.tcdPageCode').empty();
			}
			if (DataInit.pages.curPage==1) {
				$("#pagind_2").createPage({
					pageCount: allNum,
					current: DataInit.pages.curPage,
					backFn: function (p) {
						DataInit.pages.curPage = p;
						showApply();
					}
				});
			}
		},
		error:function(data) {
			layer.closeAll();
			layer.msg("系统错误");
		}
	});
}

function myZQList() {
	layer.load(1, {shade: [0.3,'#000']});
	var param= {
		"page": DataInit.pages.curPage,
		"itemsPerPage" : DataInit.pages.pageSize
	};
	$.ajax({
		url: "/json/zq/myRecyclAndRepayZQ?t="+new Date().getTime(),
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		data: param,
		success:function(data) {
			layer.closeAll();
			$('table').eq(4).find("tr :gt(0)").remove();
			allNum=data.paginator.lastPage;
			if(data.dataRows.length>0){
				$('table').eq(4).find('.get_data').parent().remove();
				var list = data.dataRows;
				var content = "";
				for(var i=0; i<list.length;i++){
					content += '<tr>';
					content += '<td>'+list[i].name+'</td>';
					content += '<td>'+list[i].borrowPeriod+'期</td>';
					content += '<td>';
					content += list[i].borrowApr+'%</td>';
					content += '<td>';
					content += list[i].tenderTimeFormat+'</td>';
					content += '<td>';
					content += list[i].tenderCapital+'</td>';
					content += '<td>';
					content += list[i].tenderInterest+'</td>';
					content += '<td>';
					var recoverAccountWait = Number(list[i].recoverAccountWait);
					if(recoverAccountWait > 0){
						content += '已迁移'+'</td>';
					}else{
						content += '已还款'+'</td>';
					}
					content += '<td>';
					content += '<a style="color: #31baf2;text-decoration:none;" target="_blank" href="/front/protocol/index_zr?param='+list[i].tenderId+'">查看协议</a></td>';
					content += '</tr>';
				}
				$('table').eq(4).find("tr").eq(0).after(content);
			}else{
				$('table').eq(4).find("tr").eq(0).after(contents);
				$('.tcdPageCode').empty();
			}
			if (DataInit.pages.curPage==1) {
				$("#pagind_2").createPage({
					pageCount: allNum,
					current: DataInit.pages.curPage,
					backFn: function (p) {
						DataInit.pages.curPage = p;
						myZQList();
					}
				});
			}
		},
		error:function(data) {
			layer.closeAll();
			layer.msg("数据获取失败");
		}
	});
}

