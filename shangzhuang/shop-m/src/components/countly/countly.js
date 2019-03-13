
function setCookie(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
          date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
          date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = $.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
}

function clickEvent(type, className, desc, options) {

  var userInfo = setCookie('userInfo');

  if (!userInfo) {
    return false;
  }

  var userId;
  var shopId;
  var pageUrl;

  try {
    userId = JSON.parse(JSON.parse(userInfo)).id;
    shopId = $('.j_GlobalShopid').val();
    pageUrl = window.location.href;
    if (!userId || !shopId || !pageUrl) {
        return false;
    }
    userId = $.trim(userId.toString());
    if (!userId.length) {
        return false;
    }
  } catch (e) {
    return false;
  }

  Countly.q.push(
  ['add_event', {
    key: type,
    segmentation: {
      userId: userId,
      shopId: shopId,
      pageUrl: pageUrl
    }
  }]);
}

function logError(error, segments) {
  var userInfo = setCookie('userInfo');

  var userId;
  var shopId;
  var pageUrl;

  try {
    userId = JSON.parse(JSON.parse(userInfo)).id;
    shopId = $('.j_GlobalShopid').val();
    pageUrl = window.location.href;

    userId = $.trim(userId.toString());
    
  } catch (e) {
    
  }

  var segmentationObj = {
    shopId: shopId,
    userId: userId,
    pageUrl: pageUrl,
  }
  
  if (segments) {
    for (var key in segments) {
      segmentationObj[key] = segments[key];
    }
  }

  Countly.log_error(error, segmentationObj);
}

function trackError() {
  var userInfo = setCookie('userInfo');

  var userId;
  var shopId;
  var pageUrl;

  try {
    userId = JSON.parse(JSON.parse(userInfo)).id;
    shopId = $('.j_GlobalShopid').val();
    pageUrl = window.location.href;

    userId = $.trim(userId.toString());
    
  } catch (e) {
    
  }

  var segmentationObj = {
    shopId: shopId,
    userId: userId,
    pageUrl: pageUrl,
  }

  Countly.q.push(['track_errors', segmentationObj]);
}

module.exports = {
  clickEvent: clickEvent,
  logError: logError,
  trackError: trackError,
} 