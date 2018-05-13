<template>
 <div class="order">
    <div class="currentTxt">当前使用详情：</div>
    <div class="list">
      <p>
        <span>包月借49元</span>
        <span>使用中<i class="iconfont">&#xe67a;</i></span>
      </p>
      <div v-show="true">
        <ul>
          <li>
            <span></span>
            <span>套餐类型：</span>
            <span>包月49元</span>
          </li>
          <li>
            <span></span>
            <span>使用时长：</span>
            <span>0分钟</span>
          </li>
          <li>
            <span></span>
            <span>预估金额：</span>
            <span>0元</span>
          </li>
          <li>
            <span></span>
            <span>租借时间：</span>
            <span>2018-01-28 12:21:37</span>
          </li>
          <li>
            <span></span>
            <span>租借地点：</span>
            <span>上海大厦</span>
          </li>
          <li>
            <span></span>
            <span>订单编号：</span>
            <span>1422456</span>
          </li>
          <li>
            <span></span>
            <span>设备类型：</span>
            <span>随身MIFI</span>
          </li>
        </ul>
        <div class="renewal">
          续费
        </div>
      </div>
    </div>
    <div class="status">
      <div class="pastTxt">以往使用详情：</div>
      <div class="list" @click="detailShow()">
        <p>
          <span>小时借</span>
          <span>已完成<i class="iconfont">&#xe67b;</i></span>
        </p>
        <div v-show="false">
          <ul>
            <li>
              <span></span>
              <span>套餐类型：</span>
              <span>包月49元</span>
            </li>
            <li>
              <span></span>
              <span>使用时长：</span>
              <span>0分钟</span>
            </li>
            <li>
              <span></span>
              <span>预估金额：</span>
              <span>0元</span>
            </li>
            <li>
              <span></span>
              <span>租借时间：</span>
              <span>2018-01-28 12:21:37</span>
            </li>
            <li>
              <span></span>
              <span>租借地点：</span>
              <span>上海大厦</span>
            </li>
            <li>
              <span></span>
              <span>订单编号：</span>
              <span>1422456</span>
            </li>
            <li>
              <span></span>
              <span>设备类型：</span>
              <span>随身MIFI</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list" @click="detailShow()">
        <p>
          <span>小时借</span>
          <span>已完成<i class="iconfont">&#xe67b;</i></span>
        </p>
        <div v-show="false">
          <ul>
            <li>
              <span></span>
              <span>套餐类型：</span>
              <span>包月49元</span>
            </li>
            <li>
              <span></span>
              <span>使用时长：</span>
              <span>0分钟</span>
            </li>
            <li>
              <span></span>
              <span>预估金额：</span>
              <span>0元</span>
            </li>
            <li>
              <span></span>
              <span>租借时间：</span>
              <span>2018-01-28 12:21:37</span>
            </li>
            <li>
              <span></span>
              <span>租借地点：</span>
              <span>上海大厦</span>
            </li>
            <li>
              <span></span>
              <span>订单编号：</span>
              <span>1422456</span>
            </li>
            <li>
              <span></span>
              <span>设备类型：</span>
              <span>随身MIFI</span>
            </li>
          </ul>
        </div>
      </div>
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
  .order{
    min-height: 100%;
    background-color: #f9f9f9;
    padding: 0.28rem 0.33rem 0.2rem;
    box-sizing: border-box;
    .currentTxt{
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #ff8400;
      padding-left: 0.08rem;
    }
    .list{
      background-color: #fff;
      padding: 0 0.22rem;
      overflow: hidden;
      margin-bottom: 0.28rem;
      p{
        line-height: 0.87rem;
        overflow: hidden;
        span:nth-child(1){
          font-size: 0.3rem;
          color: #333;
          float: left;
        }
        span:nth-child(2){
          font-size: 0.28rem;
          color: #979797;
          float: right;
          i{
            margin-left: 0.1rem;
          }
        }
      }
      ul{
        padding-left: 0.1rem;
        margin-top: -0.18rem;
      }
      li{
        line-height: 0.62rem;
        color: #636262;
        font-size: 0.28rem;
        overflow: hidden;
        position: relative;
        padding: 0 0.05rem 0 0.25rem;
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
      .renewal{
        width: 90%;
        margin: 0.45rem auto 0.4rem;
        line-height: 0.88rem;
        font-size: 0.34rem;
        color: #323232;
        text-align: center;
        border-radius: 5px;
        background-color: #ffc600;
      }
    }
    .status{
      .pastTxt{
        font-size: 0.28rem;
        color: #979797;
        line-height: 0.64rem;
      }
    }
  }
</style>

