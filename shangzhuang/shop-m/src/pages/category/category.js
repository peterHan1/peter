// var swipe = require('components/m-swipe/m-swipe');
var Countly = require('components/countly/countly');

(function () {
  
  var $sidebarItem = $('.j_SidebarItem');
  var $sideContentItem = $('.j_SideContentItem');

  var oHash = window.location.hash;

  if(oHash && oHash.length>0) {
    var index = oHash.split('=')[1];
    // fn.setPage(index);
    $sidebarItem.removeClass('active');
    $sideContentItem.removeClass('active');

    $sidebarItem.eq(index).addClass('active');
    $sideContentItem.eq(index).addClass('active');
  }


  $sidebarItem.on('click', function () {
    var index = $(this).data('index');
    $sidebarItem.removeClass('active');
    $(this).addClass('active');

    $sideContentItem.removeClass('active');
    $sideContentItem.eq(index).addClass('active');

    if(history.replaceState) {
      history.replaceState({}, '', '#categoryIndex=' + index);
    } else {
      window.location.hash = 'categoryIndex=' + index;
    }

    Countly.clickEvent('categoryBtn', 'j_SidebarItem item', $(this).text());

  })


})();
