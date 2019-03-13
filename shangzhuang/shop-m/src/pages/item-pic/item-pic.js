'use strict';

var Hammer = require('fecomponent/mobi-hammer');
var globalConfig = require('fecomponent/mobi-detect-ua');
require('fecomponent/mobi-jswebview');

$(function () {
  if(globalConfig.Browser.versions.showjoyShopiOs || globalConfig.Browser.versions.showjoyShopAndroid) {
    $('.j_ItemPic').on('click', function() {
      var imgIndex = $(this).index();
      $.JSBridge.callHandler('shopc_show_imgLists', {
        index: imgIndex
      }, function () { });
    });
  } else {
    var stateMap = {
      scale: 1,
      position: {
        x: 0,
        y: 0
      }
    };

    var transform = '';

    var setTransform = function () {
      var arr = transform.split(/\)\s/);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].search(/scale/) !== -1) {
          stateMap.scale = arr[i].match(/\d+(\.\d+)?/)[0];
        } else if (arr[i].search(/translate/) !== -1) {
          stateMap.position.x = arr[i].match(/\-?\d+px/g)[0].match(/\-?\d+/);
          stateMap.position.y = arr[i].match(/\-?\d+px/g)[1].match(/\-?\d+/);
        }
      }
    }
    var showBox = function (ev) {
      if (ev.target.nodeName === 'IMG') {
        $('.j_BoxDescriptionImg').show();
        var src = ev.target.src;
        $('.j_BoxDescriptionImg').find('img').attr('src', src);
      }
    }
    var hideWrap = function (ev) {
      ev.preventDefault();
      $('.j_BoxDescriptionImg').hide();
      $('.j_Img').css({
        '-webkit-transform': 'scale(1)',
        'transform': 'scale(1)'
      });
      stateMap.scale = 1;
      stateMap.position.x = 0;
      stateMap.position.y = 0;
    };
    var scaleImg = function (ev) {
      $('.j_Img').css({
        '-webkit-transform': 'scale(' + (stateMap.scale * ev.scale) + ')' + '  translate3d(' + 
          (stateMap.position.x) + 'px,' + (stateMap.position.y) + 'px, 0px)',
        'transform': 'scale(' + (stateMap.scale * ev.scale) + ')' + '  translate3d(' + 
          (stateMap.position.x) + 'px,' + (stateMap.position.y) + 'px, 0px)'
      });
    }
    var scaleEndImg = function () {
      transform = $('.j_Img').css('-webkit-transform') === 
        null ? ('.j_Img').css('-webkit-transform') : $('.j_Img').css('-webkit-transform');
      setTransform();
      if (stateMap.scale < 1) {
        $('.j_Img').css({
          '-webkit-transform': 'scale(1)',
          'transform': 'scale(1)'
        });
        stateMap.scale = 1;
        stateMap.position.x = 0;
        stateMap.position.y = 0;
      }
    };

    var moveImg = function (ev) {
      if (stateMap.scale > 1) {
        $('.j_Img').css({
          '-webkit-transform': 'scale(' + (stateMap.scale) + ')' + ' translate3d(' + 
            parseFloat(parseFloat(stateMap.position.x) + parseFloat(ev.deltaX)) + 'px,' + 
            parseFloat(parseFloat(stateMap.position.y) + parseFloat(ev.deltaY)) + 'px, 0px)',
          'transform': 'scale(' + (stateMap.scale) + ')' + ' translate3d(' + 
            parseFloat(parseFloat(stateMap.position.x) + parseFloat(ev.deltaX)) + 'px,' + 
            parseFloat(parseFloat(stateMap.position.y) + parseFloat(ev.deltaY)) + 'px, 0px)'
        });
      }
    }
    var moveEndImg = function () {
      transform = $('.j_Img').css('-webkit-transform') === 
        null ? ('.j_Img').css('-webkit-transform') : $('.j_Img').css('-webkit-transform');
      setTransform();
    };
    var wrap = $('.j_BoxDescriptionImg')[0];
    var wrapHammer = new Hammer(wrap);
    var singletap = new Hammer.Tap();
    var doubletap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();

    wrapHammer.add(singletap);
    wrapHammer.add(doubletap);
    singletap.requireFailure(doubletap);
    doubletap.requireFailure(singletap);
    wrapHammer.add(pinch);
    wrapHammer.add(pan);

    wrapHammer.on('tap', hideWrap);
    wrapHammer.on('pinchmove', scaleImg);
    wrapHammer.on('pinchend', scaleEndImg);
    wrapHammer.on('panmove', moveImg);
    wrapHammer.on('panend', moveEndImg);

    var img = $('.j_Box2')[0];
    var imgHammer = new Hammer(img);
    imgHammer.on('tap', showBox);
  }
});