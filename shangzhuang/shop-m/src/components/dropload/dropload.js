/**
 * 下拉加载
 * 南洋
 */

require('./style.less');

var $win = $(window);
var $doc = $(document);

var DropLoad = function(element, options){
    var me = this;
    me.$element = $(element);
    me.$container = $(element).children();
    me.isLock = false;
    me.canGet = true;
    me.page = 1;
    me.init(options);
};

// 初始化
DropLoad.prototype.init = function(options){
    var me = this;
    me.opts = $.extend({}, {
        scrollArea : window,
        domDown : {
            domContent: '<div class="joy-ui-dropload-loading j_FixedBottom"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAS1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////+DmQsHAAAAGHRSTlMAZl3MmUJAFQ4a5rmmDQuKjYMM7bwchEOhomOfAAAA70lEQVRIx+2U0Q6DIAxFWbeCiog4p/7/l87REZeKOsLb5nm7JMfQa4P4eR51VdWPJOM+zdxTnHry1AlKRUqVr+RfTA29duU7lDR+iAUCYMeNUl9ntArxVXIwOrjMgGGKu3oGEQEvHsmONSl9TAFSgB33pOgEZSDFxRRJCsbHL2NKQeOvK3O6d0pE6RBAFuIkDwW2BSU2KSSvWdnbjCVn+2d+OnDzwJYi17vckmIpfbWYlpT2UEm/WMb4VHJ7UPJf7LIZAbBZcoMAo9kzGvYuGsrhGzvvIkby0WLwnKnkX4yP27B3khNKRbNkg770kzye8mYLEERgadMAAAAASUVORK5CYII="></div>',
            domClass: 'j_FixedBottom'
        },
        distance : 50,  // 拉动距离
        loadDownFn : '', // function
        initLoadFn: ''
    }, options);

    // 判断滚动区域
    me.$scrollArea = $(me.opts.scrollArea); 

    me.$container.css({
        position: 'relative',
        'padding-bottom': '1.333333rem'
    })

    //绑定scroll
    me.$scrollArea.on('scroll', function () {
        if (!me.isLock) {
            fnScroll(me);
        }
    });  
    
    if (me.opts.initLoadFn != '') {
        me.opts.initLoadFn(me);
        me.isLock = true;
        me.page = 2;
    }

    me.$scrollArea.trigger('scroll');
    
};


// scroll
function fnScroll(me) {
    var contentScrollHeight = (me.opts.scrollArea == window) ? $(document)[0].body.scrollHeight : me.$element.children().height();
    if (me.$scrollArea.scrollTop() >= contentScrollHeight - me.$scrollArea.height() - me.opts.distance) {
        if (me.canGet) {
            me.canGet = false;
            if (me.page != 1) {
                me.$element.children().append(me.opts.domDown.domContent);
                me.$domResult = $('.' + me.opts.domDown.domClass);
            }
            fnCallback(me);
            me.page++;
        };

  }
}

// 回调
function fnCallback(me) {
    if (me.opts.loadDownFn != '') {
        me.opts.loadDownFn(me);
    }
}

// 锁定
DropLoad.prototype.lock = function(){
    var me = this;
    me.isLock = true;
};

// 解锁
DropLoad.prototype.unlock = function(){
    var me = this;
    me.isLock = false;
};

// append 内容
DropLoad.prototype.append = function(html){
    var me = this;
    me.$container.append(html);
};

// 填充内容
DropLoad.prototype.html = function(html){
    var me = this;
    me.$container.html(html);
};

// 重置
DropLoad.prototype.resetload = function(){
    var me = this;
    if(!!me.$domResult){
      if (me.isLock) {
        me.$domResult.html('已加载完毕');
      } else {
        me.$domResult.css({'height':'0'}).remove();
        me.canGet = true;
      }
    } else {
        if (me.isLock) {
          me.$element.children().append(me.opts.domDown.domContent);
          me.$domResult = $('.' + me.opts.domDown.domClass);
          me.$domResult.html('已加载完毕');
        } else {
          me.canGet = true;
        }
    }
};
module.exports = DropLoad;