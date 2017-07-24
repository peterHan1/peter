(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
           var clientWidth = docEl.clientWidth;
		var rem = 1356;
        if(window.orientation === 180 || window.orientation === 0){
            var clientWidth = docEl.clientWidth;
			rem = 1356;
		}else if(window.orientation === 90 || window.orientation === -90){
            var clientWidth = docEl.clientWidth;
			rem = 2048;
		}
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / rem) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);  

})(document, window);

   