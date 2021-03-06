$(document).ready(function(e) {
	$(window).resize(function(){
	    w()
	});
	w();
	function w(){
//		$(".move_con").width($(".move_li").width() + $(".move_conR").width());
//  	$(".move_conL").width('687px');
    	var shabi = document.getElementById('right_cont').offsetWidth;
		console.log($("#right_cont").width())
	}
    
    
    var lines = $(".move_conL");
    var len = lines.length; 
    var lastX, lastXForMobile;
    var pressedObj; 
    var lastLeftObj; 
    var start;
    // 网页在移动端运行时的监听
    for (var i = 0; i < len; ++i) {
        lines[i].addEventListener('touchstart', function(e){
            lastXForMobile = e.changedTouches[0].pageX;
            pressedObj = this; 
            var touches = event.touches[0];
            start = { 
                x: touches.pageX,
                y: touches.pageY
            };
        });
        lines[i].addEventListener('touchmove',function(e){
            var touches = event.touches[0];
            delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
            };

            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault();
            }
        });
        lines[i].addEventListener('touchend', function(e){
            if (lastLeftObj && pressedObj != lastLeftObj) {
                $(lastLeftObj).animate({marginLeft:"0"}, 300);
                lastLeftObj = null;
            }
            var diffX = e.changedTouches[0].pageX - lastXForMobile;
            if (diffX < -130) {
                $(pressedObj).animate({marginLeft:"-14%"}, 300);
                lastLeftObj && lastLeftObj != pressedObj && 
                    $(lastLeftObj).animate({marginLeft:"0"}, 300);
                lastLeftObj = pressedObj; 
            } else if (diffX > 130) {
              if (pressedObj == lastLeftObj) {
                $(pressedObj).animate({marginLeft:"0"}, 300); 
                lastLeftObj = null; 
              }
            }
        });
    }
    // 网页在PC浏览器中运行时的监听
    for (var i = 0; i < len; ++i) {
        $(lines[i]).bind('mousedown', function(e){
            lastX = e.clientX;
            pressedObj = this; 
        });
        $(lines[i]).bind('mouseup', function(e){
            if (lastLeftObj && pressedObj != lastLeftObj) { 
                $(lastLeftObj).animate({marginLeft:"0"}, 500); 
                lastLeftObj = null; 
            }
            var diffX = e.clientX - lastX;
            if (diffX < -130) {
                $(pressedObj).animate({marginLeft:"-100px"}, 500); 
                lastLeftObj && lastLeftObj != pressedObj && 
                    $(lastLeftObj).animate({marginLeft:"0"}, 500); 
                lastLeftObj = pressedObj; 
            } else if (diffX > 130) {
              if (pressedObj == lastLeftObj) {
                $(pressedObj).animate({marginLeft:"0"}, 500); 
                lastLeftObj = null; 
              }
            }
        });
    }
});