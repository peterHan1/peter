<template>
 <div class="borrowPay">
   <div class="borrowSub">
      <div class="subMoney">
        <p>￥2</p>
        <p>待付款</p>
      </div>
     <div class="subBtn">立即支付</div>
     <div class="subTxt">点击立即支付即同意<span>《租用服务协议》</span></div>
   </div>
   <div class="borrowDetails">
     <div>
       使用详情：
     </div>
     <ul>
       <li>
         <span>套餐类型：</span>
         <span>每小时2元</span>
       </li>
       <li>
         <span>使用时长：</span>
         <span>50分钟</span>
       </li>
       <li>
         <span>应付金额：</span>
         <span>2元</span>
       </li>
       <li>
         <span>实付金额：</span>
         <span>2元</span>
       </li>
       <li>
         <span>租借时间：</span>
         <span>2018-01-28 12:21:37</span>
       </li>
       <li>
         <span>归还时间</span>
         <span>2018-01-28 13:00:00</span>
       </li>
       <li>
         <span>租借地点</span>
         <span>上海大厦</span>
       </li>
       <li>
         <span>订单编号</span>
         <span>1422456</span>
       </li>
       <li>
         <span>设备类型</span>
         <span>随身MIFI</span>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        money: ['充150', '充100', '充50', '充20'],
        num: 9
      }
    },
    methods: {
      selectMoney (index) {
        this.num = index
      },
      recharge () {

      }
    }
  }
</script>

<style scoped lang="less">
  .borrowPay{
    height: 100%;
    background-color: #f9f9f9;
    padding: 0.4rem 0.3rem 0;
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
        padding-left: 0.66rem;
        box-sizing: border-box;
        margin-bottom: 0.33rem;
      }
      ul{
        padding: 0 0.58rem 0 0.8rem;
      }
      li{
        line-height: 0.6rem;
        color: #333;
        font-size: 0.28rem;
        span{
          display:inline-block;
        }
        span:nth-child(1){
          float: left;
        }
        span:nth-child(2){
          float: right;
        }
        &::before {
          content: "\02022";
          margin-left: -75px;
          color: #ffc600;
          font-style: normal;
          text-decoration: none;
        }
      }
    }
  }
</style>

