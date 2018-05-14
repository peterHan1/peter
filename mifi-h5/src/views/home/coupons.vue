<template>
 <div class="coupons">
   <p class="txt">优惠券</p>
   <ul>
     <li>
       <div class="couponTop">
         <div class="couponMoney">
           <span>¥</span>
           <span>5</span>
           <span>优惠劵</span>
         </div>
         <div class="couponType">
           <p>只限</p>
           <p>抵用租金</p>
         </div>
       </div>
       <div class="couponBot">
         有效期至  2018-05-21
       </div>
     </li>
     <li class="overdue">
       <div class="couponTop">
         <div class="couponMoney">
           <span>¥</span>
           <span>5</span>
           <span>优惠劵</span>
         </div>
         <div class="couponType">
           <p>只限</p>
           <p>抵用租金</p>
         </div>
       </div>
       <div class="couponBot">
         有效期至  2018-05-21
       </div>
     </li>
   </ul>
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
  .coupons{
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.37rem;
    .txt{
      font-size: 0.28rem;
      color: #979797;
      padding: 0.46rem 0 0.23rem;
    }
    li{
      width: 100%;
      height: 2.75rem;
      background: url(../../assets/img/couponBg.png) no-repeat;
      background-size: 100% 100%;
      margin-bottom: 0.4rem;
      .couponTop{
        width: 100%;
        height: 1.94rem;
        overflow: hidden;
        padding-top: 0.2rem;
        box-sizing: border-box;
        div{
          float: left;
          height: 1.56rem;
        }
        .couponMoney{
          width: 55%;
          border-right: 1px dashed #000;
          line-height: 1.56rem;
          padding-left: 1.08rem;
          box-sizing: border-box;
          span:nth-child(1){
            font-size: 0.5rem;
            color: #000;
            margin-right: 0.1rem;
          }
          span:nth-child(2){
            font-size: 1.5rem;
            color: #ffc600;
            font-family: Impact;
          }
          span:nth-child(3){
            font-size: 0.41rem;
            color: #ffc600;
            writing-mode: vertical-rl;
            line-height: 0.66rem
          }
        }
        .couponType{
          width: 44%;
          padding: 0.33rem 0 0 0.38rem;
          box-sizing: border-box;
          color: #000;
          p{
            line-height: 0.54rem;
            font-size: 0.29rem;
          }
        }
      }
      .couponBot{
        font-size: 0.26rem;
        color: #000;
        text-align: center;
        line-height: 0.72rem;
      }
    }
    li.overdue{
      .couponTop{
        .couponType{
          background: url(../../assets/img/overdueBg.png) no-repeat;
          background-size: 46%;
          background-position: 98% 50%;
        }
        .couponMoney{
          border-color: #c1c1c1;
          span{
            color: #9d9d9d;
          }
        }
        .couponType{
          color: #959595;
        }
      }
      .couponBot{
        color: #959595;
      }
    }
  }
</style>

