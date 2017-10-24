require('./invest_detail.js');
require('page/invest_detail/invest_detail.scss');
require('page/common/top/index.js');
require('page/common/nav/index.js');
require('page/common/footer-nav/index.scss');
require('util/layer/layer.js');
require('util/layer/layer.scss');


var JPlaceHolder = {
	// 检测    
	_check : function(){
		return 'placeholder' in document.createElement('input');
	},
	// 初始化    
	init : function(){
		if(!this._check()){
			this.fix();
		}
	},
	// 修复 
	fix : function(){
		jQuery(':input[placeholder]').each(function(index, element) {
			var self = $(this), txt = self.attr('placeholder');
			self.wrap($('<div></div>').css({position:'relative',width:'200px', float:'left',zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
			var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
			var holder = $('<span class="span-ie7"></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top,height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
			self.focusin(function(e) {
				holder.hide();
			}).focusout(function(e) {
				if(!self.val()){
					holder.show();
				}
			});
			holder.click(function(e) {
				 holder.hide();
				 self.focus();
			});
		});
	}};
// 执行
jQuery(function(){
	JPlaceHolder.init();
});