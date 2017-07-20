$(".keyword").on("click",function(){
	var h = $("#left_ment").height();
	var ish = $(".keyword").height();
	$(".search_d").width('85%');
	$(".search").css("backgroundColor","rgba(0,0,0,0.3)");
	$(".top").hide();
	$(".search,.sea_can,.opa_d").show();
	$(".search_show").height(h-ish);

});
$('.keyword').bind('input propertychange', function() {  
    if($(this).val() != ""){
    	$(".search_d .search_x").show();
    }else{
    	$(".search_d .search_x").hide();
    	
    }
});  
$(".search_d .search_x").on("click",function(){
	$('.search_d .keyword').val("").focus();
    $(".search_d .search_x").hide();
})
$(".sea_can").on("click",function(){
	$(".search_d").width('95%');
	$(".top,section").show();
	$(".search").css("backgroundColor","#e2e3e7");
	
	$(".search_show,.sea_can,.opa_d,.search_no").hide();
	$(".search_d .search_x").hide();
	$(".search input").val("");
	$(".search_data").html("");
});