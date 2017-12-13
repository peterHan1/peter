
//分享
$(document).ready(function(e) {
  var share_url = encodeURIComponent('http://www.51tuodao.com/front/register');
  var share_title = encodeURIComponent('money,money,go my home!!');
  var share_pic = "http://static.51tuodao.com/pc2.0/images/logo.png";  //默认的分享图片
  var share_from = encodeURIComponent("拓道金服"); //分享自（仅用于QQ空间，新浪的只需更改appkey 和 ralateUid就行）
  //Qzone
  $('#share a.Qzone').click(function(e) {
      window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+share_url+"&title="+share_title+"&pics="+share_pic+"&site="+share_from+"","newwindow");
  });
  //Cqq qq friends
  $('#share a.Cqq').click(function(e) {
      window.open("http://connect.qq.com/widget/shareqq/index.html?url="+share_url+"&title="+share_title+"&pics="+share_pic+"&site="+share_from+"","newwindow");
  });
  //Sina Weibo
  $('#share a.sina_wb').click(function(e) {
  var param = {
      url:share_url ,
      appkey:'678438995',
      title:share_title,
      pic:share_pic,
      ralateUid:'5203500173',
      rnd:new Date().valueOf()
    }
    var temp = [];
    for( var p in param ){
      temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
  });
  //tengxun_wb
  $('#share a.tengxun_wb').click(function(e) {
    window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title='+share_title+'&site='+share_from+'&pic='+share_pic+'&url='+share_url+'','newwindow');
  });
  //renren
  $('#share a.renren').click(function(e) {
    window.open('http://widget.renren.com/dialog/share?resourceUrl='+share_url+'&title='+share_title+'&images='+share_pic+'','newwindow');
  });
  // weixin
  $('#share a.weixin').click(function(){
    layer.open({
        type: 1,
        title:'我的专属二维码',
        content: $('#weixin_link'),
        skin: 'invite_alert',
        area: ['420px','auto']
    });
  })

});
