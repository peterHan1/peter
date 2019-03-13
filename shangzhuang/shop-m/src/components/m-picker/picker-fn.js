(function ($) {
  "use strict";
  var _modalTemplateTempDiv = document.createElement('div');

  $.modalStack = [];

  $.modal = function (params) {
    params = params || {};
    var modalHTML = '';
    var buttonsHTML = '';
    if (params.buttons && params.buttons.length > 0) {
      for (var i = 0; i < params.buttons.length; i++) {
        buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
      }
    }
    var extraClass = params.extraClass || '';
    var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
    var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
    var afterTextHTML = params.afterText ? params.afterText : '';
    var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
    var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
    modalHTML = '<div class="modal ' + extraClass + ' ' + noButtons + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';

    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $(_modalTemplateTempDiv).children();

    $(defaults.modalContainer).append(modal[0]);

    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
      $(el).on('click', function (e) {
        if (params.buttons[index].close !== false) $.closeModal(modal);
        if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
        if (params.onClick) params.onClick(modal, index);
      });
    });
    $.openModal(modal);
    return modal[0];
  };


  $.pickerModal = function (pickerModal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
      pickerModal = $(pickerModal);
      if (pickerModal.length > 0) {
        if (removeOnClose) pickerModal.addClass('remove-on-close');
        $(defaults.modalContainer).append(pickerModal[0]);
      }
      else return false; //nothing found
    }
    pickerModal = $(pickerModal);
    if (pickerModal.length === 0) return false;
    pickerModal.show();
    $.openModal(pickerModal);
    return pickerModal[0];
  };


  $.openModal = function (modal, cb) {
    modal = $(modal);
    var isModal = modal.hasClass('modal'),
      isNotToast = !modal.hasClass('toast');
    if ($('.modal.modal-in:not(.modal-out)').length && defaults.modalStack && isModal && isNotToast) {
      $.modalStack.push(function () {
        $.openModal(modal, cb);
      });
      return;
    }

    var isPickerModal = modal.hasClass('picker-modal');
    if (isModal) {
      modal.show();
      modal.css({
        marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
      });
    }



    var clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open');

    // Picker modal body class
    if (isPickerModal) {
      $(defaults.modalContainer).addClass('with-picker-modal');
    }

    // Classes for transition in
    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
      if (modal.hasClass('modal-out')) modal.trigger('closed');
      else modal.trigger('opened');
    });
    // excute callback
    if (typeof cb === 'function') {
      cb.call(this);
    }
    return true;
  };
  $.closeModal = function (modal) {
    modal = $(modal || '.modal-in');
    if (typeof modal !== 'undefined' && modal.length === 0) {
      return;
    }
    var isModal = modal.hasClass('modal'),
      isPickerModal = modal.hasClass('picker-modal'),
      removeOnClose = modal.hasClass('remove-on-close');

    modal.trigger('close');

    // Picker modal body class
    if (isPickerModal) {
      $(defaults.modalContainer).removeClass('with-picker-modal');
      $(defaults.modalContainer).addClass('picker-modal-closing');
    }

    modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
      if (modal.hasClass('modal-out')) modal.trigger('closed');
      else modal.trigger('opened');

      if (isPickerModal) {
        $(defaults.modalContainer).removeClass('picker-modal-closing');
      }
      if (isPickerModal) {
        modal.removeClass('modal-out').hide();
        if (removeOnClose && modal.length > 0) {
          modal.remove();
        }
      }
      else {
        modal.remove();
      }
    });
    if (isModal &&  defaults.modalStack ) {
      $.modalStackClearQueue();
    }

    return true;
  };

  var defaults =  $.modal.prototype.defaults  = {
    modalStack: true,
    modalContainer : document.body ? document.body : 'body'
  };
})(Zepto);



(function($) {
  "use strict";
  ['width', 'height'].forEach(function(dimension) {
    var  Dimension = dimension.replace(/./, function(m) {
      return m[0].toUpperCase();
    });
    $.fn['outer' + Dimension] = function(margin) {
      var elem = this;
      if (elem) {
        var size = elem[dimension]();
        var sides = {
          'width': ['left', 'right'],
          'height': ['top', 'bottom']
        };
        sides[dimension].forEach(function(side) {
          if (margin) size += parseInt(elem.css('margin-' + side), 10);
        });
        return size;
      } else {
        return null;
      }
    };
  });

  //support
  $.support = (function() {
    var support = {
      touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
    };
    return support;
  })();

  $.touchEvents = {
    start: $.support.touch ? 'touchstart' : 'mousedown',
    move: $.support.touch ? 'touchmove' : 'mousemove',
    end: $.support.touch ? 'touchend' : 'mouseup'
  };

  $.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;

    // automatic axis detection
    if (typeof axis === 'undefined') {
      axis = 'x';
    }

    curStyle = window.getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
    }
    else {
      transformMatrix = curStyle.MozTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      //Normal Browsers
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === 'y') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      //Normal Browsers
      else
        curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  };
  /* jshint ignore:start */
  $.requestAnimationFrame = function (callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
    else {
      return window.setTimeout(callback, 1000 / 60);
    }
  };
  $.cancelAnimationFrame = function (id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
    else {
      return window.clearTimeout(id);
    }
  };
  /* jshint ignore:end */

  $.fn.dataset = function() {
    var dataset = {},
      ds = this[0].dataset;
    for (var key in ds) { // jshint ignore:line
      var item = (dataset[key] = ds[key]);
      if (item === 'false') dataset[key] = false;
      else if (item === 'true') dataset[key] = true;
      else if (parseFloat(item) === item * 1) dataset[key] = item * 1;
    }
    // mixin dataset and __eleData
    return $.extend({}, dataset, this[0].__eleData);
  };
  $.fn.data = function(key, value) {
    var tmpData = $(this).dataset();
    if (!key) {
      return tmpData;
    }
    // value may be 0, false, null
    if (typeof value === 'undefined') {
      // Get value
      var dataVal = tmpData[key],
        __eD = this[0].__eleData;

      //if (dataVal !== undefined) {
      if (__eD && (key in __eD)) {
        return __eD[key];
      } else {
        return dataVal;
      }

    } else {
      // Set value,uniformly set in extra ```__eleData```
      for (var i = 0; i < this.length; i++) {
        var el = this[i];
        // delete multiple data in dataset
        if (key in tmpData) delete el.dataset[key];

        if (!el.__eleData) el.__eleData = {};
        el.__eleData[key] = value;
      }
      return this;
    }
  };
  function __dealCssEvent(eventNameArr, callback) {
    var events = eventNameArr,
      i, dom = this;// jshint ignore:line

    function fireCallBack(e) {
      /*jshint validthis:true */
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i++) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i++) {
        dom.on(events[i], fireCallBack);
      }
    }
  }
  $.fn.animationEnd = function(callback) {
    __dealCssEvent.call(this, ['webkitAnimationEnd', 'animationend'], callback);
    return this;
  };
  $.fn.transitionEnd = function(callback) {
    __dealCssEvent.call(this, ['webkitTransitionEnd', 'transitionend'], callback);
    return this;
  };
  $.fn.transition = function(duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms';
    }
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
    }
    return this;
  };
  $.fn.transform = function(transform) {
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
    }
    return this;
  };
  $.fn.prevAll = function (selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) return $([]);
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling;
      if (selector) {
        if($(prev).is(selector)) prevEls.push(prev);
      }
      else prevEls.push(prev);
      el = prev;
    }
    return $(prevEls);
  };
  $.fn.nextAll = function (selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return $([]);
    while (el.nextElementSibling) {
      var next = el.nextElementSibling;
      if (selector) {
        if($(next).is(selector)) nextEls.push(next);
      }
      else nextEls.push(next);
      el = next;
    }
    return $(nextEls);
  };

  //重置zepto的show方法，防止有些人引用的版本中 show 方法操作 opacity 属性影响动画执行
  $.fn.show = function(){
    var elementDisplay = {};
    function defaultDisplay(nodeName) {
      var element, display;
      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, '').getPropertyValue("display");
        element.parentNode.removeChild(element);
        display === "none" && (display = "block");
        elementDisplay[nodeName] = display;
      }
      return elementDisplay[nodeName];
    }

    return this.each(function(){
      this.style.display === "none" && (this.style.display = '');
      if (getComputedStyle(this, '').getPropertyValue("display") === "none");
      this.style.display = defaultDisplay(this.nodeName);
    });
  };
})(Zepto);

(function($) {
  "use strict";

  var Picker = function (params) {
    var p = this;
    var defaults = {
      updateValuesOnMomentum: false,
      updateValuesOnTouchmove: true,
      rotateEffect: false,
      momentumRatio: 7,
      freeMode: false,
      // Common settings
      scrollToInput: true,
      inputReadOnly: true,
      toolbar: true,
      toolbarCloseText: '确定',
      toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择</h1>\
                </header>',
    };
    params = params || {};
    for (var def in defaults) {
      if (typeof params[def] === 'undefined') {
        params[def] = defaults[def];
      }
    }
    p.params = params;
    p.cols = [];
    p.initialized = false;

    // Inline flag
    p.inline = p.params.container ? true : false;

    // 3D Transforms origin bug, only on safari
    var originBug =  false;

    // Value
    p.setValue = function (arrValues, transition) {
      var valueIndex = 0;
      for (var i = 0; i < p.cols.length; i++) {
        if (p.cols[i] && !p.cols[i].divider) {
          p.cols[i].setValue(arrValues[valueIndex], transition);
          valueIndex++;
        }
      }
    };
    p.updateValue = function () {
      var newValue = [];
      var newDisplayValue = [];
      for (var i = 0; i < p.cols.length; i++) {
        if (!p.cols[i].divider) {
          newValue.push(p.cols[i].value);
          newDisplayValue.push(p.cols[i].displayValue);
        }
      }
      if (newValue.indexOf(undefined) >= 0) {
        return;
      }
      p.value = newValue;
      p.displayValue = newDisplayValue;
      if (p.params.onChange) {
        p.params.onChange(p, p.value, p.displayValue);
      }
      if (p.input && p.input.length > 0) {
        $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
        $(p.input).trigger('change');
      }
    };

    // Columns Handlers
    p.initPickerCol = function (colElement, updateItems) {
      var colContainer = $(colElement);
      var colIndex = colContainer.index();
      var col = p.cols[colIndex];
      if (col.divider) return;
      col.container = colContainer;
      col.wrapper = col.container.find('.picker-items-col-wrapper');

      //每一个选择元素
      col.items = col.wrapper.find('.picker-item');

      var i, j;
      var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
      col.replaceValues = function (values, displayValues) {
        col.destroyEvents();
        col.values = values;
        col.displayValues = displayValues;
        var newItemsHTML = p.columnHTML(col, true);
        col.wrapper.html(newItemsHTML);
        col.items = col.wrapper.find('.picker-item');
        col.calcSize();
        col.setValue(col.values[0], 0, true);
        col.initEvents();
      };
      col.calcSize = function () {
        if (p.params.rotateEffect) {
          col.container.removeClass('picker-items-col-absolute');
          if (!col.width) col.container.css({width:''});
        }
        var colWidth, colHeight;
        colWidth = 0;

        //单个col的高度
        colHeight = col.container[0].offsetHeight;
        wrapperHeight = col.wrapper[0].offsetHeight;
        //单个选择元素的高度
        itemHeight = col.items[0].offsetHeight;
        //所有选择元素
        itemsHeight = itemHeight * col.items.length;


        //判断最小最大滑动距离
        minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
        maxTranslate = colHeight / 2 - itemHeight / 2;

        if (col.width) {
          colWidth = col.width;
          if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
          col.container.css({width: colWidth});
        }
        if (p.params.rotateEffect) {
          if (!col.width) {
            col.items.each(function () {
              var item = $(this);
              item.css({width:'auto'});
              colWidth = Math.max(colWidth, item[0].offsetWidth);
              item.css({width:''});
            });
            col.container.css({width: (colWidth + 2) + 'px'});
          }
          col.container.addClass('picker-items-col-absolute');
        }
      };
      col.calcSize();


      col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


      var activeIndex = 0;
      var animationFrameId;

      // Set Value Function
      col.setValue = function (newValue, transition, valueCallbacks) {
        if (typeof transition === 'undefined') transition = '';
        var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
        if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
          return;
        }
        var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
        // Update wrapper
        col.wrapper.transition(transition);
        col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');

        // Watch items
        if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
          $.cancelAnimationFrame(animationFrameId);
          col.wrapper.transitionEnd(function(){
            $.cancelAnimationFrame(animationFrameId);
          });
          updateDuringScroll();
        }

        // Update items
        col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
      };

      col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
        if (typeof translate === 'undefined') {
          translate = $.getTranslate(col.wrapper[0], 'y');
        }
        if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
        var previousActiveIndex = col.activeIndex;
        col.activeIndex = activeIndex;
        /*
         col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

         col.items.transition(transition);
         var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
         var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
         var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
         */
        //去掉 .picker-after-selected, .picker-before-selected 以提高性能
        col.wrapper.find('.picker-selected').removeClass('picker-selected');
        if (p.params.rotateEffect) {
          col.items.transition(transition);
        }
        var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');

        if (valueCallbacks || typeof valueCallbacks === 'undefined') {
          // Update values
          col.value = selectedItem.attr('data-picker-value');
          col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
          // On change callback
          if (previousActiveIndex !== activeIndex) {
            if (col.onChange) {
              col.onChange(p, col.value, col.displayValue);
            }
            p.updateValue();
          }
        }

        // Set 3D rotate effect
        if (!p.params.rotateEffect) {
          return;
        }
        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;

        col.items.each(function () {
          var item = $(this);
          var itemOffsetTop = item.index() * itemHeight;
          var translateOffset = maxTranslate - translate;
          var itemOffset = itemOffsetTop - translateOffset;
          var percentage = itemOffset / itemHeight;

          var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

          var angle = (-18*percentage);
          if (angle > 180) angle = 180;
          if (angle < -180) angle = -180;
          // Far class
          if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
          else item.removeClass('picker-item-far');
          // Set transform
          item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
        });
      };

      function updateDuringScroll() {
        animationFrameId = $.requestAnimationFrame(function () {
          col.updateItems(undefined, undefined, 0);
          updateDuringScroll();
        });
      }

      // Update items on init
      if (updateItems) col.updateItems(0, maxTranslate, 0);

      var allowItemClick = true;
      var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
      function handleTouchStart (e) {
        if (isMoved || isTouched) return;
        e.preventDefault();
        isTouched = true;
        touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();

        allowItemClick = true;
        startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
      }
      function handleTouchMove (e) {
        if (!isTouched) return;
        e.preventDefault();
        allowItemClick = false;
        touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (!isMoved) {
          // First move
          $.cancelAnimationFrame(animationFrameId);
          isMoved = true;
          startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
          col.wrapper.transition(0);
        }
        e.preventDefault();

        var diff = touchCurrentY - touchStartY;
        currentTranslate = startTranslate + diff;
        returnTo = undefined;

        // Normalize translate
        if (currentTranslate < minTranslate) {
          currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
          returnTo = 'min';
        }
        if (currentTranslate > maxTranslate) {
          currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
          returnTo = 'max';
        }
        // Transform wrapper
        col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

        // Update items
        col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);

        // Calc velocity
        velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
        velocityTime = (new Date()).getTime();
        prevTranslate = currentTranslate;
      }
      function handleTouchEnd (e) {
        if (!isTouched || !isMoved) {
          isTouched = isMoved = false;
          return;
        }
        isTouched = isMoved = false;
        col.wrapper.transition('');
        if (returnTo) {
          if (returnTo === 'min') {
            col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
          }
          else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
        }
        touchEndTime = new Date().getTime();
        var velocity, newTranslate;
        if (touchEndTime - touchStartTime > 300) {
          newTranslate = currentTranslate;
        }
        else {
          velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
          newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
        }

        newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

        // Active Index
        var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

        // Normalize translate
        if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

        // Transform wrapper
        col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

        // Update items
        col.updateItems(activeIndex, newTranslate, '', true);

        // Watch items
        if (p.params.updateValuesOnMomentum) {
          updateDuringScroll();
          col.wrapper.transitionEnd(function(){
            $.cancelAnimationFrame(animationFrameId);
          });
        }

        // Allow click
        setTimeout(function () {
          allowItemClick = true;
        }, 100);
      }

      function handleClick(e) {
        if (!allowItemClick) return;
        $.cancelAnimationFrame(animationFrameId);
        /*jshint validthis:true */
        var value = $(this).attr('data-picker-value');
        col.setValue(value);
      }

      col.initEvents = function (detach) {
        var method = detach ? 'off' : 'on';
        col.container[method]($.touchEvents.start, handleTouchStart);
        col.container[method]($.touchEvents.move, handleTouchMove);
        col.container[method]($.touchEvents.end, handleTouchEnd);
        col.items[method]('click', handleClick);
      };
      col.destroyEvents = function () {
        col.initEvents(true);
      };

      col.container[0].f7DestroyPickerCol = function () {
        col.destroyEvents();
      };

      col.initEvents();

    };
    p.destroyPickerCol = function (colContainer) {
      colContainer = $(colContainer);
      if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
    };
    // Resize cols
    function resizeCols() {
      if (!p.opened) return;
      for (var i = 0; i < p.cols.length; i++) {
        if (!p.cols[i].divider) {
          p.cols[i].calcSize();
          p.cols[i].setValue(p.cols[i].value, 0, false);
        }
      }
    }
    $(window).on('resize', resizeCols);

    // HTML Layout
    p.columnHTML = function (col, onlyItems) {
      var columnItemsHTML = '';
      var columnHTML = '';
      if (col.divider) {
        columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
      }
      else {
        for (var j = 0; j < col.values.length; j++) {
          columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
        }

        columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
      }
      return onlyItems ? columnItemsHTML : columnHTML;
    };
    p.layout = function () {
      var pickerHTML = '';
      var pickerClass = '';
      var i;
      p.cols = [];
      var colsHTML = '';
      for (i = 0; i < p.params.cols.length; i++) {
        var col = p.params.cols[i];
        colsHTML += p.columnHTML(p.params.cols[i]);
        p.cols.push(col);
      }
      pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
      pickerHTML =
        '<div class="' + (pickerClass) + '">' +
        (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
        '<div class="picker-modal-inner picker-items">' +
        colsHTML +
        '<div class="picker-center-highlight"></div>' +
        '</div>' +
        '</div>';

      p.pickerHTML = pickerHTML;
    };

    // Input Events
    function openOnInput(e) {
      e.preventDefault();
      // 安卓微信webviewreadonly的input依然弹出软键盘问题修复
      if (false) {
        /*jshint validthis:true */
        this.focus();
        this.blur();
      }
      if (p.opened) return;
      //关闭其他picker
      //$.closeModal($('.picker-modal'));
      p.open();
      if (p.params.scrollToInput) {
        var pageContent = p.input.parents('.content');
        if (pageContent.length === 0) return;

        var paddingTop = parseInt(pageContent.css('padding-top'), 10),
          paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
          pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
          pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
          newPaddingBottom;
        var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
        if (inputTop > pageHeight) {
          var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
          if (scrollTop + pageHeight > pageScrollHeight) {
            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
            if (pageHeight === pageScrollHeight) {
              newPaddingBottom = p.container.height();
            }
            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
          }
          pageContent.scrollTop(scrollTop, 300);
        }
      }
      //停止事件冒泡，主动处理
      e.stopPropagation();
    }
    function closeOnHTMLClick(e) {
      if (!p.opened) return;
      if (p.input && p.input.length > 0) {
        if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
      }
      else {
        if ($(e.target).parents('.picker-modal').length === 0) p.close();
      }
    }

    if (p.params.input) {
      p.input = $(p.params.input);
      if (p.input.length > 0) {
        if (p.params.inputReadOnly) p.input.prop('readOnly', true);
        if (!p.inline) {
          p.input.on('click', openOnInput);
        }
      }
    }

    if (!p.inline) $('html').on('click', closeOnHTMLClick);

    // Open
    function onPickerClose() {
      p.opened = false;
      if (p.input && p.input.length > 0) p.input.parents('.content').css({'padding-bottom': ''});
      if (p.params.onClose) p.params.onClose(p);

      // Destroy events
      p.container.find('.picker-items-col').each(function () {
        p.destroyPickerCol(this);
      });
    }

    p.opened = false;
    p.open = function () {

      if (!p.opened) {

        // Layout
        p.layout();
        p.opened = true;
        // Append
        if (p.inline) {
          p.container = $(p.pickerHTML);
          p.container.addClass('picker-modal-inline');
          $(p.params.container).append(p.container);
        }
        else {

          //p.container 为整个selector
          p.container = $($.pickerModal(p.pickerHTML));

          $(p.container)
            .on('close', function () {
              onPickerClose();
            });
        }

        // Store picker instance
        p.container[0].f7Picker = p;

        // Init Events
        p.container.find('.picker-items-col').each(function () {
          var updateItems = true;
          if ((!p.initialized && p.params.value) || (p.initialized && p.value)) {
            updateItems = false;
          }
          p.initPickerCol(this, updateItems);
        });

        // Set value
        if (!p.initialized) {
          if (p.params.value) {
            p.setValue(p.params.value, 0);
          }
        }
        else {
          if (p.value) p.setValue(p.value, 0);
        }
      }

      // Set flag
      p.initialized = true;

      if (p.params.onOpen) p.params.onOpen(p);
    };

    // Close
    p.close = function () {
      if (!p.opened || p.inline) return;
      $.closeModal(p.container);
      return;
    };

    // Destroy
    p.destroy = function () {
      p.close();
      if (p.params.input && p.input.length > 0) {
        p.input.off('click', openOnInput);
      }
      $('html').off('click', closeOnHTMLClick);
      $(window).off('resize', resizeCols);
    };

    if (p.inline) {
      p.open();
    }

    return p;
  };

  $(document).on("click", ".close-picker", function() {
    var pickerToClose = $('.picker-modal.modal-in');
    $.closeModal(pickerToClose);
  });

  $.fn.picker = function(params) {
    var args = arguments;
    return this.each(function() {
      if(!this) return;
      var $this = $(this);

      var picker = $this.data("picker");
      if(!picker) {
        var p = $.extend({
          input: this,
          value: $this.val() ? $this.val().split(' ') : ''
        }, params);
        picker = new Picker(p);
        $this.data("picker", picker);
      }
      if(typeof params === typeof "a") {
        picker[params].apply(picker, Array.prototype.slice.call(args, 1));
      }
    });
  };
})(Zepto);
