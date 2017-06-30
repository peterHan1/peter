
(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 1356) + 'px';
//      var h = $(window).height()
//		$("#left_ment,#right_cont").css("minHeight",h)

    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function(){
	addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); 
      	function hideURLbar(){ 
	        window.scrollTo(0,1); 
	    };
	
})
