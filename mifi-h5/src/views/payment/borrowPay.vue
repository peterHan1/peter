<template>
 <div class="borrowPay">
   <div class="borrowMess">
    <ul>
      <li>
        <div>
           <p class="pName">
             <span>小时借</span>
             <i>送2G流量</i>
           </p>
           <p class="pPrice">1.2元/时</p>
         </div>
         <div>
           <p class="pPrices">￥1.2</p>
           <p class="pNum">×3</p>
         </div>
      </li>
      <li>
        <div class="">
           <p class="pName">
             <span>包天借</span>
             <i>无限流量</i>
           </p>
           <p class="pPrice">8元/天</p>
         </div>
         <div>
           <p class="pPrices">￥1.2</p>
           <p class="pNum">×3</p>
         </div>
      </li>
    </ul>
   </div>
   <div class="borrowPrice">
     <ul>
       <li>
         <div><span class="discountBg"></span>优惠券：</div>
         <div>使用优惠券 <i class="iconfont">&#xe600;</i></div>
       </li>
       <li>
         <div><span class="packetBg"></span>红包：</div>
         <div>使用红包 <i class="iconfont">&#xe600;</i></div>
       </li>
       <li>
         <div class="moneySum">
           <span>合计：</span>
           <span>￥3.6</span>
         </div>
       </li>
     </ul>
   </div>
   <div class="borrowSub">
     <div class="subBtn">立即支付</div>
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
     </ul>
   </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .borrowPay{
    background-color: #f9f9f9;
    .borrowMess{
      background-color: #fff;
      padding: 0 0.55rem;
      box-sizing: border-box;
      border-top: 0.4rem solid #f9f9f9;
      ul{
        width: 100%;
      }
      li{
       display: flex;
       padding: 0.46rem 0;
       border-bottom: 1px solid #e5e5e5;
        div{
          display: inline-block;
          flex: 1;
        }
        div:nth-child(1){
          text-align: left;
          .pName{
            span{
              font-size: 0.34rem;
              color: #3b3b3b;
            }
            i{
              font-size: 0.18rem;
              line-height: 0.34rem;
              display: inline-block;
              background-color: #ffc600;
              color: #000;
              border-radius: 4px;
              padding: 0 0.02rem
            }
          }
          .pPrice{
            font-size: 0.24rem;
            color: #595959;
            padding-left: 0.2rem;
          }
        }
        div:nth-child(2){
          text-align: right;
          font-size: 0.28rem;
          color: #323232;
          line-height: 0.5rem;
        }
      }
      li:last-child{
        border: none;
      }
    }
    .borrowPrice{
      padding: 0 0.5rem;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 0.2rem;
      li{
        font-size: 0.28rem;
        line-height: 0.95rem;
        height: 0.95rem;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        box-sizing: border-box;
        div:nth-child(1){
          float: left;
          position: relative;
          padding-left: 0.5rem;
        }
        div:nth-child(2){
          float: right;
          color: #ffc600;
        }
        .discountBg{
          display: inline-block;
          width: 0.32rem;
          height: 0.2rem;
          background: url("../../assets/img/discountBg.png") no-repeat;
          background-size: 100%;
          position: absolute;
          left: 0.05rem;
          top: 50%;
          transform: translateY(-50%);
        }
        .packetBg{
          display: inline-block;
          width: 0.25rem;
          height: 0.36rem;
          background: url("../../assets/img/packetBg.png") no-repeat;
          background-size: 100%;
          position: absolute;
          left: 0.1rem;
          top: 50%;
          transform: translateY(-50%);
        }
        .iconfont{
          font-size: 0.32rem;
          color: #989898;
        }
        div.moneySum{
          float: right;
          color: #ffc600;
          padding-right: 0.15rem;
          span{
            font-size: 0.34rem;
          }
          span:nth-child(1){
            color: #323232;
          }
        }
      }
      li:nth-child(3){
        border: none;
      }
    }
    .borrowSub{
      width: 100%;
      text-align: center;
      margin-top: 0.66rem;
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
        padding-left: 0.66rem;
        box-sizing: border-box;
        margin-bottom: 0.33rem;
      }
      ul{
        padding: 0 0.58rem 0 0.52rem;
      }
      li{
        line-height: 0.6rem;
        color: #333;
        font-size: 0.28rem;
        position: relative;
        overflow: hidden;
        padding-left: 0.26rem;
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
  }
</style>

