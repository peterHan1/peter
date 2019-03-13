
require('./my-swiper.less');

var swipe = function (opts) {

  var swipe = $('.m-swipe'); // 最外层包裹
  var bodyWrapper = $('.j_PageWrapper'); // 内容包裹
  var headerWrapper = $('.j_HeaderWrapper'); // 标题包裹
  var sliderLine = $('.j_SliderLine'); // 下划线
  var pages = bodyWrapper.find('.m-page'); // 单个内容块
  var lis = headerWrapper.find('li'); // 单个标题块
  var currentPage = 0;
  var n = pages.length;
  var pageWidth = $(pages[0]).width();
  var liWidth = $(lis[0]).width();
  var scale = pageWidth/liWidth;

  var hasTouch = 'ontouchstart' in window;
  var bodyCanSwipe = false;
  var headerCanMove = lis.length > 3 ? true : false;  //li标签数小于等于3的时候不允许滑动
  var headerCanSwipe = false;
  var headerMaxSwipeLength = headerCanMove ? (lis.length-3.3)*liWidth : 0;  //headerWrapper最大滑动距离
  var bodyTranslateX = 0;
  var headerTranslateX = 0;
  var sliderTranslateX = 0;
  var bodyStartX = 0;
  var bodyEndX = 0;
  var headerStartX = 0;
  var headerEndX = 0;
  var oTop = swipe[0].offsetTop;
  var currentIndex = 0;

  var optDefault = {
    transitionTime: 0.3,
    height: 500,
    fixedTop: oTop
  };

  if(opts) {
    optDefault.transitionTime = opts.transitionTime? opts.transitionTime : 0.3;
    optDefault.height = opts.height? opts.height: 500;
    optDefault.fixedTop = opts.fixedTop? opts.fixedTop: oTop
  }


  if(n != lis.length) {
    console.log('请确保标题数和页数一致');
    return;
  }

  var fn = {
    //初始化swipe的fixedTop,page高度,header宽度,pageWrapper宽度,以及根据li个数进行头部样式调整
    init : function () {
      swipe.css({
        'position': 'fixed',
        'top': opts.fixedTop
      });
      var page = bodyWrapper.find('.m-page');
      page.forEach(function (p) {
        $(p).css('height',optDefault.height);
      });
      $('.j_PageWrapper').css('height',optDefault.height);
      headerWrapper.css('width',liWidth*n);
      bodyWrapper.css('width',pageWidth*n);
      if(n < 4) {
        headerWrapper.css('margin','auto');
      }
    },
    //设置动画时间
    setTransition: function (wrapper,time) {
      wrapper.css({
        '-webkit-transition':'transform '+time+'s '+'ease',
        'transition':'transform '+time+'s '+'linear'
      })
    },
    //动画进行,传入滑动最为位置
    translate: function (wrapper,diff) {
      wrapper.css({
        '-webkit-transform' : 'translate3d('+diff+'px,0,0)',
        'transform' : 'translate3d('+diff+'px,0,0)'
      })
    },
    //向前滑动一页
    back: function (type) {
      var me = this;

      //当为header滚动的时候执行
      if(type == 'header') {
        var l = headerEndX - headerStartX;
        var n = parseInt(l/liWidth);

        if(l%liWidth >= liWidth*0.25) {
          n+=1;
        }

        var headerX = headerTranslateX + liWidth*n;
        var sliderX = sliderTranslateX + liWidth*n;
        var bodyX = bodyTranslateX + pageWidth*n;

        if(sliderTranslateX + liWidth*n >=0) {
          headerX = 0;
          bodyX = 0;
          sliderX = 0;
        }

        me.translate(bodyWrapper,bodyX);
        me.translate(sliderLine,-sliderX);

        if(headerTranslateX <0) {
          me.translate(headerWrapper,headerX);
        }
        currentIndex -= n;
        return n;
      }

      //当为body滚动时执行
      me.translate(bodyWrapper,bodyTranslateX + pageWidth);
      me.translate(sliderLine,-(sliderTranslateX + liWidth));

      if(headerCanMove) {
        if(headerTranslateX+liWidth <=0 ) {
          me.translate(headerWrapper,headerTranslateX + liWidth);
        } else {
          me.translate(headerWrapper,0);
        }
      }

      currentIndex--;

      return 1;
    },


    //滑动距离不够回复原位
    reset: function () {
      var me = this;
      me.translate(bodyWrapper,bodyTranslateX);
      me.translate(sliderLine,-sliderTranslateX);
      if(headerCanMove && Math.abs(headerTranslateX) <= headerMaxSwipeLength) {
        me.translate(headerWrapper,headerTranslateX);
      }
    },
    //向后滑动一页
    forward: function (type) {


      var me = this;

      if(type == 'header') {
        var l = headerStartX - headerEndX;
        var num = parseInt(l/liWidth);

        if(l%liWidth >= liWidth*0.25) {
          num+=1;
        }
        var bodyX = bodyTranslateX - pageWidth*num;
        var headerX = headerTranslateX - liWidth*num;
        var sliderX = sliderTranslateX - liWidth*num;
        if(Math.abs(bodyTranslateX - pageWidth*num) >= pageWidth*n) {
          bodyX = -pageWidth*(n-1);
          headerX = -liWidth*(n-1);
          sliderX = -liWidth*(n-1);
          num = n-1;
        }
        if(Math.abs(headerX) <= headerMaxSwipeLength) {
          me.translate(headerWrapper,headerX);
        }else {
          me.translate(headerWrapper,-headerMaxSwipeLength);
        }
        me.translate(bodyWrapper,bodyX);
        me.translate(sliderLine,-sliderX);

        currentIndex += num;
        return num;
      }

      if(headerCanMove && Math.abs(headerTranslateX - liWidth) <= headerMaxSwipeLength) {
        me.translate(headerWrapper,headerTranslateX - liWidth);
      }
      me.translate(bodyWrapper,bodyTranslateX - pageWidth);
      me.translate(sliderLine,-(sliderTranslateX - liWidth));
      $('.j_Test').text(sliderLine.css('-webkit-transform'));

      currentIndex++;
      return 1;
    },
    changeOpacity: function (translate) {
      var index = parseInt(Math.abs(translate)/liWidth);
      lis.forEach(function (li,i) {
        if(i !== index) {
          $(lis[i]).removeClass('active');
        } else {
          $(lis[i]).addClass('active');
        }
      });
    },
    setPage: function (i) {
      $(lis[i]).trigger('click');
    },
    getIndex: function () {
      return currentIndex;
    }
  };


  fn.init();


  //body绑定触摸事件

  var touchStartX = 0;
  var touchEndX = 0;
  var touchStartY = 0;
  var touchEndY = 0;    //这四个变量用于记录触摸开始的坐标以及移动中的坐标,用来在横向滑动的时候阻止页面滚动
  var isVerticalScroll = false; //垂直滑动判断

  bodyWrapper.on('touchstart', function (ev) {
    bodyEndX = bodyStartX = hasTouch? ev.touches[0].pageX: ev.pageX;
    touchStartX = bodyStartX;
    touchStartY = hasTouch? ev.touches[0].pageY: ev.pageY;
    fn.setTransition(bodyWrapper,0);
    fn.setTransition(headerWrapper,0);
    fn.setTransition(sliderLine,0);
    bodyCanSwipe = true;
    isVerticalScroll = false;
  });



  bodyWrapper.on('touchmove', function (ev) {
    if(!bodyCanSwipe) return;
    if(isVerticalScroll) return;

    touchEndX = hasTouch ? ev.touches[0].pageX: ev.pageX;
    touchEndY = hasTouch? ev.touches[0].pageY: ev.pageY;

    if(Math.abs(touchEndX - touchStartX)/2 >= Math.abs(touchEndY - touchStartY)) {
      event.preventDefault();
    } else {
      isVerticalScroll = true;
      return;
    }
    bodyEndX = touchEndX;

    var length = bodyEndX -bodyStartX + bodyTranslateX;

    if(bodyTranslateX == 0 && (bodyEndX - bodyStartX) >= 0) { //第一页右滑动禁止
      return;
    }

    if(bodyTranslateX == -(n-1)*pageWidth && (bodyStartX - bodyEndX) >= 0) { //最后一页左滑动禁止
      return;
    }



    fn.translate(bodyWrapper,length);
    fn.translate(sliderLine,-length/scale);

    if(bodyEndX - bodyStartX >0 && headerTranslateX >=0) {
      return;
    }

    if(Math.abs(length/scale) <= headerMaxSwipeLength) { //滑动到最后四个分类禁止滑动header
      headerCanMove = true;
      fn.translate(headerWrapper,length/scale);
    } else {
      headerCanMove = false;
    }
  });

  bodyWrapper.on('touchend', function (ev) {
    isVerticalScroll = false;

    if(!bodyCanSwipe) return;

    if(bodyTranslateX == 0 && (bodyEndX - bodyStartX) >= 0) { //第一页右滑动禁止
      return;
    }

    if(bodyTranslateX == -(n-1)*pageWidth && (bodyStartX - bodyEndX) >= 0) { //最后一页左滑动禁止
      return;
    }

    fn.setTransition(bodyWrapper,optDefault.transitionTime);
    fn.setTransition(headerWrapper,optDefault.transitionTime);
    fn.setTransition(sliderLine,optDefault.transitionTime);
    if(bodyStartX - bodyEndX >= pageWidth*0.25) {
      fn.forward('body');
      bodyTranslateX -= pageWidth;
      headerTranslateX  = Math.abs(headerTranslateX) >= headerMaxSwipeLength ? -headerMaxSwipeLength : headerTranslateX - liWidth;
      sliderTranslateX -= liWidth;
    } else if(bodyStartX - bodyEndX <= -pageWidth*0.25) {
      fn.back('body');
      bodyTranslateX += pageWidth;
      if(headerCanMove) {
        headerTranslateX = headerTranslateX>=0 ? 0 : headerTranslateX + liWidth;
      }
      sliderTranslateX += liWidth;
    } else {
      fn.reset('body');
    }

    fn.changeOpacity(sliderTranslateX);

    bodyCanSwipe =false;


    bodyStartX = bodyEndX = 0;
  });
  //body绑定事件结束


  //header绑定滑动事件

  headerWrapper.on('touchstart', function (ev) {
    headerEndX = headerStartX = hasTouch? ev.touches[0].pageX: ev.pageX;
    fn.setTransition(headerWrapper,0);
    fn.setTransition(bodyWrapper,0);
    fn.setTransition(sliderLine,0);
    headerCanSwipe = true;
  });

  headerWrapper.on('touchmove', function (ev) {
    if(!headerCanSwipe || !headerCanMove) return;

    ev.preventDefault();

    headerEndX = hasTouch? ev.touches[0].pageX: ev.pageX;

    var length = headerEndX -headerStartX + headerTranslateX;
    var sliderLength = headerEndX - headerStartX + sliderTranslateX;

    if(sliderTranslateX == 0 && (headerEndX - headerStartX) >= 0) { //第一页右滑动禁止
      return;
    }

    if(sliderTranslateX <= -(n-1)*liWidth && (headerStartX - headerEndX) >= 0) { //最后一页左滑动禁止
      return;
    }


    if(headerTranslateX <0 &&headerCanMove && Math.abs(length) <= headerMaxSwipeLength) {
      fn.translate(headerWrapper,length);
    }
    fn.translate(sliderLine,-sliderLength);
    fn.translate(bodyWrapper,sliderLength*scale);
  });

  headerWrapper.on('touchend', function (ev) {
    if(!headerCanSwipe || !headerCanMove) return;

    if(sliderTranslateX == 0 && (headerEndX - headerStartX) >= 0) { //第一页右滑动禁止
      return;
    }

    if(sliderTranslateX <= -(n-1)*liWidth && (headerStartX - headerEndX) >= 0) { //最后一页左滑动禁止
      return;
    }


    fn.setTransition(bodyWrapper,optDefault.transitionTime);
    fn.setTransition(headerWrapper,optDefault.transitionTime);
    fn.setTransition(sliderLine,optDefault.transitionTime);
    if(headerStartX - headerEndX >= liWidth*0.25) {
      var num = fn.forward('header');

      //body header最大左滑动距离判断
      bodyTranslateX = bodyTranslateX-pageWidth*num <= -pageWidth*(n-1) ? -pageWidth*(n-1) : bodyTranslateX-pageWidth*num;
      headerTranslateX = headerTranslateX-liWidth*num <= -headerMaxSwipeLength ? -headerMaxSwipeLength : headerTranslateX-liWidth*num;
      sliderTranslateX = sliderTranslateX-liWidth*num <= -liWidth*(n-1) ? -liWidth*(n-1) : sliderTranslateX-liWidth*num;

    } else if(headerStartX - headerEndX <= -liWidth*0.25) {


      var num = fn.back('header');

      bodyTranslateX = bodyTranslateX + pageWidth*num >=0 ? 0 : bodyTranslateX+pageWidth*num;
      headerTranslateX = headerTranslateX + liWidth*num >=0 ? 0 : headerTranslateX+liWidth*num;
      sliderTranslateX = sliderTranslateX + liWidth*num >=0 ? 0 : sliderTranslateX+liWidth*num;

    } else {
      fn.reset();
    }

    fn.changeOpacity(sliderTranslateX);

    headerCanSwipe =false;


    headerStartX = headerEndX = 0;
  });



  //绑定li列表点击事件
  lis.forEach(function (li, index) {
    $(li).on('click', function (ev) {
      currentPage = index;
      lis.forEach(function (li,i) {
        if(i !== index) {
          $(lis[i]).removeClass('active');
        } else {
          $(lis[i]).addClass('active');

          currentIndex = i;
          bodyTranslateX = -pageWidth * i;
          headerTranslateX = liWidth * i > headerMaxSwipeLength ? -headerMaxSwipeLength : -liWidth * i;
          sliderTranslateX = -liWidth * i;

          fn.setTransition(bodyWrapper,optDefault.transitionTime);
          fn.setTransition(headerWrapper,optDefault.transitionTime);
          fn.setTransition(sliderLine,optDefault.transitionTime);
          fn.translate(bodyWrapper,bodyTranslateX);
          fn.translate(headerWrapper,headerTranslateX);
          fn.translate(sliderLine,-sliderTranslateX);

          $('.j_Test').text("wxzl");
        }
      });
    })
  });

  //header绑定事件结束

  return fn;
};

module.exports = swipe;
