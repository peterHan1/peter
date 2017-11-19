(function() {
  var cartFix = function() {
    yhsd.ready(function(sdk) {
      var _elem = $('#yhsd_topCart_quantityTitle');
      var _elemP = $('#nav-cart-a');
      sdk.events.subscribe('flashMainCart', function(event){
        if (_elem.html() === '0') {
          _elemP.removeClass('total_active');
        } else {
          _elemP.addClass('total_active');
        }
      });
    });
  };
}).call(this);

window.bIsMobile = false;

// 顶部搜索
var TopSearch = {
  ico : $('#yhsd-header-search'),
  ipt : $('#yhsd-header-search-ipt'),
  init : function(){
    var self = this;
    var oIpt = self.ipt.find('input');
    //
    var sWidth = "200px";
    //
    if(bIsMobile){
      sWidth = '30%';
    }
    self.ico.on('click', function(){
      oIpt.focus();
      self.ipt.animate({
        'opacity' : 1,
        'width' : sWidth
      }, 200);
    });
    //
    oIpt.on('blur', function(){
      self.ipt.animate({
        'opacity' : 0,
        'width' : '0px'
      }, 200);
    });
  }
};
// 移动导航
var Mobilenav = {
  navEl : $('#nav_mobile'),
  menuEl : $('#mobile_menu'),
  bgEl : $('#mobile_bg'),
  init : function(){
    var self = this;
    var bInMenu = false;
    var bStartMove = false;
    //
    if($('html')[0].className.indexOf('ie') > -1){
        return false;
    }
    //
    $(window).on('resize', function(){
      self.menuEl.css({'left' : '-100%'});
      $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
    });
    //
    var fMenuOff= function(){
        bInMenu = false;
      self.bgEl.off('click', fMenuOff);
        self.menuEl.animate({
          'left' : '-100%'
        }, function(){
          $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
        });
    }
    //
    self.navEl.on('click', function(){
      //
      self.menuEl.show();
      //
      self.menuEl.animate({
        'left' : '0'
      }, function(){
        var sHeight = $(window).height() + 'px';
        $('.page').css({'height' : sHeight, 'overflow' : 'hidden'});
        bInMenu = true;
      self.bgEl.on('click', fMenuOff);
      });
    });

    var touchSatrtFunc = function(evt){
      if(!bInMenu){
        return;
      }
      var touch = evt.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      self.startX = x;
      bStartMove = true;
    };


    var touchMoveFunc = function(evt){
        if(!bStartMove){
      return;
        }
        var touch = evt.touches[0];
        var x = Number(touch.pageX); //页面触点X坐标


        var nLeft = x - self.startX;
        if(nLeft < 0){
          self.leftSlide = nLeft;
          if(nLeft < -40){
            self.menuEl.css({'left' : nLeft + 'px'});
          }
        }
    };

    var touchEndFunc = function(){
      if(!bInMenu){
        return;
      }
      bStartMove = false;
      if(self.leftSlide < -80){
        fMenuOff();
      }else{
        self.menuEl.animate({
          'left' : '0'
        });
      }
    }

    document.addEventListener('touchstart', touchSatrtFunc, false);
    document.addEventListener('touchmove', touchMoveFunc, false);
    document.addEventListener('touchend', touchEndFunc, false);
  }
};

// JS SDK
// 获取当前顾客信息

var Account = {
  current: function() {
    yhsd.ready(function(sdk) {
      sdk.account.current(function(oUser){
        if(oUser.res.customer) {
          tpl1 = '<a id="customer-item1" class="header-link settings-top_color" href="/account">' + oUser.res.customer.name + '</a>';
          tpl2 = '<a id="customer-item2" class="header-link settings-top_color" href="/account/logout">退出</a>';
          $('#customer-item1').replaceWith(tpl1);
          $('#customer-item2').replaceWith(tpl2);
        }
      });
    });
  }
}

// 橱窗按钮
var GalleryControl = {
    init: function(PCDir, MobiDir){
        // 0: horizontal
        // 1: vertical
        var PCDir = PCDir || 0,
            MobiDir = MobiDir || 0,
            self = this;

        if (self.isMobileQuery()) {
            self.act(MobiDir);
        } else {
            self.act(PCDir);
        }
        $(window).on('resize',function(){
            $('.pro-detail-gallery-list-btns').remove();

            if (self.isMobileQuery()) {
                self.act(MobiDir);
            } else {
                self.act(PCDir);
            }
        })
    },
    act: function(direction) {
        var $oList = $('.pro-detail-gallery-list'),
            $oListA = $oList.children('a'),
            $oListLength,
            $oListALength,
            nAdmissibleNumber,
            $visibleOListA = $('.pro-detail-gallery-list a:visible');


        if (direction){
            //垂直
            $oListLength = $oList.outerHeight(),
            $oListALength = $visibleOListA.outerHeight();

            var $oListAMarginTop = parseInt($visibleOListA.css('marginTop')),
                $oListAMarginBottom = parseInt($visibleOListA.css('marginBottom')),
                $oListAMargin = $oListAMarginTop >= $oListAMarginBottom ? $oListAMarginTop : $oListAMarginBottom;

            $oListALength += $oListAMargin;

            // 创建按钮
            var prevBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-prev'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAAaVBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0srH8VAAAAInRSTlMAa/qknZVQEebaqoN6dUEG9O/OycCwqZCJcmZfWlg0JR0LSn3EmAAAAGdJREFUeAHNyFcOgzAURcFjG1MgIb33u/9FRonAMnobYD6HOQpNhRXX9dZ+ob6qm4/ZEt6b3Ypc/C28/D7/sx78PXUg6XRj0CswWOhKUuo0riNzVwfgtGTCyUHh044uPnJsMdrAbHwB2LEEgfxPpdIAAAAASUVORK5CYII='></span>";
            var nextBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-next'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAAXVBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0Zwd5uAAAAHnRSTlMAmvdwlodWEebXpXtiT0DvzsnAsZFral4xJR0LBgNNpSo0AAAAZklEQVQYGc3Bhw2DQBREwfcvcGTnbG//ZRohhA5ogBn2wwIbZpjzrHhncJNnoZVn0OhOplBk1Khl1unKJOrBpFfNLKpg9NSFTFDB4OXOP3KmDt6H05clU5/K6sNacOUxsVVXif35A/suA8gBF9MzAAAAAElFTkSuQmCC'></span>";
        } else {
            // 水平
            $oListLength = $oList.outerWidth(),
            $oListALength = $visibleOListA.outerWidth();

            var $oListAMarginLeft = parseInt($visibleOListA.css('marginLeft')),
                $oListAMarginRight = parseInt($visibleOListA.css('marginRight')),
                $oListAMargin = $oListAMarginLeft + $oListAMarginRight;

            $oListALength += $oListAMargin;

            // 创建按钮
            var prevBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-prev'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAhFBMVEUAAAD////m5ubn5+fl5eX////7+/v////g4ODs7Ozm5ubq6urj4+Pu7u7p6enn5+f////o6Ojq6urq6uri4uLu7u7v7+/s7Ozm5ubk5OTs7Ozp6enk5OTr6+v09PTx8fHn5+f19fX7+/v19fX39/fs7Oz////39/fg4ODe3t7i4uLl5eWLEt5aAAAAKHRSTlMACOHQmBgMBPjq3banmHlvHebe1tbOxsbGtrWYj46GhIRpXE40LxISbdyzUwAAAHdJREFUGBltwUUSwzAQBMARWWY7zEy78v//l6oco+nGP9eCOogF47UxyIWjbiJyodKVQe49132BXLHQHoRxcgURt3ICYXbSgamlAzWlJ6hbKl+gHlN5BnW36QKqWEoP6lPLACrMdDBgxkrWEczotTGgvFhwrsXPF510Bw9yKdQgAAAAAElFTkSuQmCC'></span>";
            var nextBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-next'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAY1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0qoXkoAAAAIHRSTlMA+aeTjXluUxgG2JiFaFrv7ubhybyvnp1zZExCQTQmDuORh7IAAABjSURBVBgZbcFFEgMxAAPBMa69FGbS/1+ZQ24pdfOTMl4MN7yiildU8KpmvEUZb9WEN+iCN+iMN2jCe4SI1XcbnLYfG8Z7OzaMVzh8MJ46doy7Th1jVcRZlHCumnFiqFgp8+cLSYwEKlrmUqgAAAAASUVORK5CYII='></span>";
        }

        // 可容纳的数量
        nAdmissibleNumber = parseInt($oListLength / $oListALength);

        // 初始化显示
        $oList.find('.hidden').removeClass('hidden');

        // 橱窗图片数量不足时返回
        if ($oListA.size() <= nAdmissibleNumber) return;
        // 多余的图片隐藏
        var selector = 'a:gt(' + (nAdmissibleNumber - 1) + ')';
        $oList.children(selector).addClass('hidden');

        $oList.prepend(prevBtnHtml);
        $oList.append(nextBtnHtml);

        var $prevBtn = $('.pro-detail-gallery-list-prev');
        var $nextBtn = $('.pro-detail-gallery-list-next');

        $nextBtn.click(function() {
            $visibleOListA = $('.pro-detail-gallery-list a:visible');

            var $lastVisibleOListA = $visibleOListA.last(),
                $firstVisibleOListA = $visibleOListA.first();

            if ($oListA.index($lastVisibleOListA) == $oListA.size()-1) return;

            $firstVisibleOListA.addClass('hidden');
            $lastVisibleOListA.next('a').removeClass('hidden');

        })

        $prevBtn.click(function() {
            $visibleOListA = $('.pro-detail-gallery-list a:visible')

            var $lastVisibleOListA = $visibleOListA.last(),
                $firstVisibleOListA = $visibleOListA.first();

            if ($oListA.index($firstVisibleOListA) == 0) return;

            $firstVisibleOListA.prev('a').removeClass('hidden');
            $lastVisibleOListA.addClass('hidden');

        })
    },
    isMobileQuery: function() {
        var isMatch = false;

        if(window && window.matchMedia) {
            isMatch = window.matchMedia("screen and (max-width: 768px)").matches;
        }

        return isMatch;
    }
}

// 文章列表
var postList = {
  init: function() {
    var $dirlist = $('#post-dirs-list');
    var $arrow = $dirlist.find('.post-dir-btn');
    $arrow.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $tar = $(e.currentTarget);
      var $next = $tar.parent().next();
      if($tar.hasClass('dir_off')) {
        $tar.removeClass('dir_off');
        $next.slideDown();
      } else {
        $tar.addClass('dir_off');
        $next.slideUp();
      }
    });
  }
};

var postDetail = {
  _post_count: 5,
  rePostTpl: '<a href="/posts/#{handle}" class="post-re-each settings-main_border settings-text_color"><span class="post-re-each-dot"></span>#{title}</a>',
  init: function() {
    var self = this;
    var $recentPostList = $('#post-re-list');
    yhsd.ready(function(jssdk) {
      jssdk.post.get({
        size: self._post_count + 1
      }, function(data) {
        var listInner = '';
        var rePostTpl = self.rePostTpl;
        var currentHandle = location.pathname.slice(7);
        if(data.res.code === 200 && data.res.posts.length > 1) {
          var posts = data.res.posts, i;
          for(i = 0; i < posts.length; i++) {
            // 不显示当前文章
            if(posts[i].handle != currentHandle) {
              listInner += rePostTpl.replace(/#{handle}/, posts[i].handle)
                .replace(/#{title}/, posts[i].title);
            }
          }
        } else {
          listInner = '<div class="post-re-list-tip settings-desc_color">暂无内容</div>';
        }
        $recentPostList.html(listInner);
      });
    });
  }
}

// Start Function

$(document).ready(function(){
  bIsMobile = $('body').hasClass('is_mobile');
  var oRouteCustom = {};
  oRouteCustom['all'] = function(path){
    Mobilenav.init();
    TopSearch.init();
    Account.current();
  };
  oRouteCustom['productDetail'] = function(path){
    GalleryControl.init(0,0);
  };
  oRouteCustom['postAll'] = function(path) {
    postList.init();
  };
  oRouteCustom['postDetail'] = function(path) {
    postDetail.init();
  };
  $yhsd.route.init(oRouteCustom);
    /* 移动端购物车商品数修复 */

    /* Placeholder 低端浏览器兼容 */
    _html = $('html');
    if (_html.hasClass('ie6') || _html.hasClass('ie7') || _html.hasClass('ie8')) {
      return setTimeout(function() {
        return $('input, textarea').placeholder();
      }, 100);
    }
});

