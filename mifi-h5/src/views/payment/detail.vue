<template>
 <div class="details">
   <div class="detailTop">
       <div class="useStatus">
         <div class="iconfont">&#xe619;</div>
         <div>
           <p>使用中</p>
           <p>感谢您使用悠游随身WIFI</p>
         </div>
       </div>
       <div class="psw">
         <p>
           WiFi：&nbsp;&nbsp;&nbsp;
           yoyo
         </p>
         <p>
           密码：&nbsp;&nbsp;&nbsp;
           12345678
         </p>
       </div>
   </div>
   <div class="detailBot">
     <div class="botTit">
       当前使用详情：
     </div>
     <div class="list">
      <div class="ulTit">包月借49元</div>
        <ul>
         <li>
            <span></span>
           <span>套餐类型：</span>
           <span>每小时2元</span>
         </li>
         <li>
            <span></span>
           <span>使用时长：</span>
           <span>50分钟</span>
         </li>
         <li>
            <span></span>
           <span>预估金额：</span>
           <span>2元</span>
         </li>
         <li>
            <span></span>
           <span>租借时间：</span>
           <span>2018-01-28 12:21:37</span>
         </li>
         <li>
            <span></span>
           <span>租借地点</span>
           <span>上海大厦</span>
         </li>
         <li>
            <span></span>
           <span>订单编号</span>
           <span>1422456</span>
         </li>
         <li>
            <span></span>
           <span>设备类型</span>
           <span>随身MIFI</span>
         </li>
       </ul>
     </div>
    
   </div>
   <div class="payway" v-show="isShow">
     <div class="wayshade"></div>
     <div class="waycon">
       <div class="waycontop">
         <p><i class="iconfont" @click="closeSub()">&#xe613;</i></p>
         <p>支付</p>
         <p>¥ 2</p>
         <p>金额</p>
       </div>
       <div class="wayselect">
         <ul>
           <li @click="waySelect('balance')" :class="{on:wayPay == 'balance'}">
            <i class="iconfont">&#xe618;</i>
            余额支付
           </li>
           <li @click="waySelect('wepay')" :class="{on:wayPay == 'wepay'}">
            <i class="iconfont">&#xe61a;</i>
            微信支付
           </li>
         </ul>  
       </div>
       <div class="wayconSub">
         <div class="subBtn">支付</div> 
         <div class="subTxt">点击支付即同意<span>《租借服务协议》</span></div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false,
        wayPay: 'balance'
      }
    },
    methods: {
      subSelect () {
        this.isShow = true
      },
      closeSub () {
        this.isShow = false
      },
      waySelect (txt) {
        this.wayPay = txt
      }
    }
  }
</script>

<style scoped lang="less">
  .details{
    height: 100%;
    background-color: #f9f9f9;
    padding: 0.4rem 0.3rem 0;
    box-sizing: border-box;
    .detailTop{
      background-color: #fff;
      padding-left: 18%;
      padding-bottom: 0.6rem;
      .useStatus{
        padding-top: 0.6rem;
        div{
          display: inline-block;
        }
        div:nth-child(1){
          font-size: 0.7rem;
          color: #09ba07;
          font-weight: bolder;
          line-height: 0;
        }
        div:nth-child(2){
          color: #333;
          margin-left: 0.45rem;
          p:nth-child(1){
            font-size: 0.32rem;
            font-family: PingFangSC-Medium, sans-serif;
          }
          p:nth-child(2){
            font-size: 0.3rem;
          }
        }
      }
      .psw{
        padding-left: 0.6rem;
        margin-top: 0.55rem;
        p{
          font-size: 0.34rem;
          color: #333;
          font-family: PingFangSC-Medium, sans-serif;
          line-height: 0.5rem;
        }
      }
    }
    .detailBot{
      margin-top: 0.25rem;
      .botTit{
        height: 0.65rem;
        line-height: 0.65rem;
        font-size: 0.28rem;
        color: #ff8400;
        padding-left: 0.2rem;
        box-sizing: border-box;
      }
      .list{
        background-color: #fff;
      }
      .ulTit{
        font-size: 0.3rem;
        color: #333;
        font-family: PingFangSC-Medium, sans-serif;
        padding-left: 0.22rem;
        line-height: 0.6rem;
        padding-top: 0.2rem
      }
      ul{
        padding: 0 0.25rem 0.1rem 0.22rem;
      }
      li{
        line-height: 0.6rem;
        overflow: hidden;
        position: relative;
        padding-left: 0.28rem;
        span{
          display:inline-block;
          font-size: 0.28rem;
          color: #636262;
        }
        span:nth-child(1){
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.1rem;
            height: 0.1rem;
            background-color: #ffc600;
            border-radius: 50%;
        }
        span:nth-child(2){
          float: left;
        }
        span:nth-child(3){
          float: right;
        }
      }
    }
    .payway{
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      .wayshade{
        background: #000;
        opacity: 0.3;
        z-index: 9;
        width: 100%;
        height: 100%;
      }
      .waycon{
        position: fixed;
        background-color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 80%;
        .waycontop{
          border-bottom: 1px solid  #e5e5e5;
          padding: 0 0.3rem 0.6rem;
          overflow: hidden;
          p{
            text-align: center;
            font-size: 0.28rem;
            color: #333;
          }
          p:nth-child(1){
            text-align: right;
            line-height: 0.5rem;
            margin-top: 0.2rem;
            i{
              font-size: 0.5rem;
              color: #000;
            }
          }
          p:nth-child(2){
            line-height: 0.3rem;
          }
          p:nth-child(3){
            font-size: 0.6rem;
            margin-top: 0.45rem;
          }
          p:nth-child(4){
            color: #999;
          }
        }
        .wayselect{
          padding-left: 0.3rem;
          li{
            line-height: 0.95rem;
            border-bottom: 1px solid #e5e5e5;
            position: relative;
            padding-left: 1rem;
            font-size: 0.28rem;
            color: #333;
            i{
              font-size: 0.5rem;
              display: inline-block;
              line-height: 0.5rem;
              position: absolute;
              left: 0.35rem;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          li:nth-child(1){
            i{
              color: #c69f16;
            }
          }
          li:nth-child(2){
            i{
              color: #09ba07;
            }
          }
          li.on{
            background: url(../../assets/img/subSelect.png) no-repeat 92% 50%;
            background-size: 6%;
          }
        }
        .wayconSub{
          width: 100%;
          margin-top: 1.1rem;
          .subBtn{
            width: 80%;
            line-height: 0.88rem;
            background-color: #ffc600;
            color: #323232;
            font-size: 0.34rem;
            text-align: center;
            margin: 0 auto;
            border-radius: 5px;
          }
          .subTxt{
            font-size: 0.24rem;
            color: #757576;
            text-align: center;
            margin-top: 0.28rem;
            span{
              color: #3f89e0;
            }
          }
        }
      }
    }
  }
</style>

