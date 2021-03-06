function iscrolls(boxId,topId,botId,pullDownfun,pullUpfun){
	var top_id = $("#" + topId);
	var bot_id=$("#" + botId);
	var pullDownOffset = top_id.height();
	var pullUpOffset = bot_id.height();
	myScroll = new iScroll(boxId,{
		scrollX:false,
		scrollY:true,
		click:true,
		onRefresh: function(){
			if(top_id.hasClass('loading')) {
				top_id.attr("class","");
				top_id.html('下拉刷新');
			}else if(bot_id.hasClass('loading')) {
				bot_id.attr("class","");
				bot_id.html('上拉加载更多');
			}
		},
		onScrollMove: function () {	
			if(this.y > 50 && !top_id.hasClass("flip")){
				console.log(111)
				top_id.addClass("flip")
				top_id.html("释放刷新");
				this.minScrollY = 0;
			}else if(this.y < 40 && top_id.hasClass("flip")){
				console.log(222)
				
				top_id.removeClass("flip")
				top_id.html("下拉刷新");
				this.minScrollY = -pullDownOffset;
			}else if(this.y < (this.maxScrollY - 40) && !bot_id.hasClass("flip")){
				console.log(333)
				
				bot_id.addClass("flip")
				bot_id.html ("释放刷新");
				this.maxScrollY = this.maxScrollY;
			}else if(this.y > (this.maxScrollY + 40) && bot_id.hasClass("flip")){
				console.log(444)
				
				bot_id.removeClass("flip")
				bot_id.html("松开加载更多");
				this.maxScrollY = pullUpOffset; 

			}
		},
		onScrollEnd: function () {
			if(top_id.hasClass("flip")) {
				top_id.attr("class","loading");
				top_id.html("加载中");
				pullDownAction();	//执行回调函数 下拉刷新
			}else if(bot_id.hasClass("flip")){
				bot_id.attr("class","loading");
				bot_id.html("加载中");
				pullUpAction();	// 执行回调函数 上拉加载
			}
		}
	});
	

	
		//下拉刷新当前数据
	function pullDownAction () {
		setTimeout(function () {
			//这里执行刷新操作
			pullDownfun();
			myScroll.refresh();	
		}, 400);
	}
	//上拉加载更多数据
	function pullUpAction () {
		setTimeout(function () {
			//这里执行刷新操作
			pullUpfun()
			myScroll.refresh();
		}, 400);
	}
}