<template>
 <div class="borrowPay">
   <div class="borrowSub">
      <div class="subMoney">
        <p>￥2</p>
        <p>待付款</p>
      </div>
     <div class="subBtn" @click="subSelect()">立即支付</div>
     <div class="subTxt">点击立即支付即同意<span>《租用服务协议》</span></div>
   </div>
   <div class="borrowDetails">
     <div>
       使用详情：
     </div>
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
         <span>应付金额：</span>
         <span>2元</span>
       </li>
       <li>
          <span></span>
         <span>实付金额：</span>
         <span>2元</span>
       </li>
       <li>
          <span></span>
         <span>租借时间：</span>
         <span>2018-01-28 12:21:37</span>
       </li>
       <li>
          <span></span>
         <span>归还时间</span>
         <span>2018-01-28 13:00:00</span>
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
        this.isShow = true;
      },
      closeSub () {
        this.isShow = false;
      },
      waySelect (txt) {
        this.wayPay = txt;
      }
    }
  }
</script>

<style scoped lang="less">
  .borrowPay{
    height: 100%;
    background-color: #f9f9f9;
    padding: 0.4rem 0.3rem 0;
    box-sizing: border-box;
    .borrowSub{
      width: 100%;
      text-align: center;
      background-color: #fff;
      padding-bottom: 0.28rem;
      .subMoney{
        padding: 0.5rem 0 0.56rem;
        p:nth-child(1){
          font-size: 0.6rem;
          color: #333;
          line-height: 0.66rem;
        }
        p:nth-child(2){
          font-size: 0.28rem;
          color: #999;
          line-height: 0.5rem;
        }
      }
      .subBtn{
        display: inline-block;
        width: 70%;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: #ffc600;
        color: #323232;
        text-align: center;
        border-radius: 5px;
        font-size: 0.34rem;
      }
      .subTxt{
        font-size: 0.24rem;
        color: #757576;
        margin-top: 0.3rem;
        span{
          color: #3f89e0;
        }
      }
    }
    .borrowDetails{
      margin-top: 0.56rem;
      div{
        height: 0.9rem;
        line-height: 0.9rem;
        background-color: #fff;
        font-size: 0.3rem;
        color: #333;
        padding-left: 0.33rem;
        box-sizing: border-box;
        margin-bottom: 0.33rem;
      }
      ul{
        padding: 0 0.25rem 0 0.33rem;
      }
      li{
        line-height: 0.6rem;
        color: #333;
        font-size: 0.28rem;
        overflow: hidden;
        position: relative;
        padding-left: 0.28rem;
        span{
          display:inline-block;
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

