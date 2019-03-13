/**
 * list翻页公共文件
 * 这个脚本耦合性很高，有很多页面引用，改动须谨慎!!!!!!!!!!!!!!!!!!!!
 */
// require('fecomponent/mobi-zepto-countdown');

Zepto(function($){
  var $refresh = $('#J_Refresh');
  var page = 2;
  var pageNum = $refresh.data('pageNum');

  var $refreshList = $('.j_RefreshList');
  var $replyBox = $refreshList.find('.j_ReplyBox');

  var $tmpDoc = $(document.createDocumentFragment());
  $refresh.refresh({
    load: function (dir, type) {
      var me = this;
      $tmpDoc.load(location.href + ((location.href.indexOf('?')==-1)?'?':'&') + 'page='+page + ' .j_RefreshItem', function (data, status, xhr) {
        var $list = $refresh.find('.j_RefreshList');
        $list[dir == 'up' ? 'prepend' : 'append']($tmpDoc.children());
        me.afterDataLoading();    //数据加载完成后改变状态
        page++;
        if(page > pageNum){
          me.disable(dir);
        }
      });
    }
  });


  $('.j_Nav').click(function(){
    $(this).toggleClass('ui-state-active');
    $(this).next('.j_Panel').toggleClass('ui-state-active');
  });

  $replyBox.each(function(index, el) {
    $refreshList.on('click', '.j_LookMoreBtn', function(event) {
      event.preventDefault();
      var $replyList = $(this).parent();
      var $lookMoreBtn = $replyList.find('.j_LookMoreBtn');
      var $replyMsg = $replyList.find('.j_ReplyMsg');
      $replyMsg.show();
      $lookMoreBtn.hide();
    });
  });

  /*delete btn*/

  var $confirmDialog = $('#J_ConfirmDeleteDialog');

  $confirmDialog.dialog({
    autoOpen: false,
    buttons: {
      '是': function(){
        var messageIdInDialog = $confirmDialog.attr('messageid');
        var $removeBtn= $('li[data-message-id =' +'"'+messageIdInDialog+'"'+']');
         
         $.ajax({
          url:"/api/msg/deleteMsg",
          dataType:"json",
          type:'GET',
          data:{
            messageId: messageIdInDialog
          },
          error: function(){
            alert('啊噢，好像出错了噢'); 
          },
          success:function(json){
            //删除这个li 
            if(json.isSuccess){
              $removeBtn.remove(); 
              $confirmDialog.dialog('close');                 
            }
            else{
              alert('操作失败了噢');
            }
          }
        });
      },
      '否': function(){
        this.close();
      }
    }
  });
  $refreshList.on('click', '.j_DeleteIcon', function(event) {
    var messageId = $(this).parents('li').data('messageId');
    var messageIdInDialog = $confirmDialog.attr('messageid',messageId);
    $confirmDialog.dialog('open');
  });

  // 倒计时
  $('.j_coutdown').each(function(index, el) {
    var $this = $(this);
    var timeArr = $this.data('endtime');

    timeArr = new Date(timeArr);
    $this.html('<span class="text">还剩</span><span role="d0"></span><span role="d1"></span><span class="dot">:</span><span role="h0"></span><span role="h1"></span><span class="dot">:</span><span role="m0"></span><span role="m1"></span><span class="dot">:</span><span role="s0"></span><span role="s1"></span><span class="dot">.</span><span role="ms">9</span><span class="text">结束</span>');
    $this.data('endtime', timeArr);


    var currentTime = Date.now(),
        serverTime = $this.attr('data-servertime') || currentTime,
        endTime = $this.attr('data-endtime'),
        int,
        ms = 9;


    int = window.setInterval(function () {
      $this.children('[role="ms"]').html(ms);
      if(--ms < 0){
        ms = 9;
      }
    },100);

    var counter = new $.countdown({
      correctDateOffset: parseInt((serverTime - currentTime) / 1000),
      endDate: endTime,
      onUpdate: function(arr) {
        var d = arr.days,
            h = arr.hours,
            m = arr.minutes,
            s = arr.seconds;
            $this.children('[role="d0"]').html(parseInt(d / 10));
            $this.children('[role="d1"]').html(parseInt(d % 10));
            $this.children('[role="h0"]').html(parseInt(h / 10));
            $this.children('[role="h1"]').html(parseInt(h % 10));
            $this.children('[role="m0"]').html(parseInt(m / 10));
            $this.children('[role="m1"]').html(parseInt(m % 10));
            $this.children('[role="s0"]').html(parseInt(s / 10));
            $this.children('[role="s1"]').html(parseInt(s % 10));
      },
      onEnd: function () {
        window.clearInterval(int);
        $this.children('[role="ms"]').html(0);
      }
    });
    counter.start();
    // TODO 倒计时滚动不可见时停止计时节约计算
  });
});
