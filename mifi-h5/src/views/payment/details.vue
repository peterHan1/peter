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
    <div class="currentTxt">当前使用详情：</div>
    <div id="list">
      <p @click="detailShow($event)">
        <span>包月借49元</span>
        <span>使用中<i class="iconfont">&#xe67a;</i></span>
      </p>
      <div>
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
    <div class="status">
      <div class="pastTxt">以往使用详情：</div>
      <div id="list" :class="showClass">
        <p @click="detailShow($event)">
          <span>小时借</span>
          <span>已完成<i class="iconfont">&#xe67a;</i></span>
        </p>
        <div>
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
      <div id="list" :class="showClass">
        <p @click="detailShow($event)">
          <span>小时借</span>
          <span>已完成<i class="iconfont">&#xe67a;</i></span>
        </p>
        <div>
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
        showClass: 'listShow'
      }
    },
    methods: {
      detailShow (obj) {
        let clas = obj.currentTarget.parentNode.className
        if (clas === 'listShow') {
          obj.currentTarget.parentNode.className = 'listShows'
        } else {
          obj.currentTarget.parentNode.className = 'listShow'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .details{
    min-height: 100%;
    background-color: #f9f9f9;
    padding: 0.28rem 0.33rem 0.2rem;
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
    .currentTxt{
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #ff8400;
      padding-left: 0.08rem;
      margin-top: 0.2rem;
    }
    #list{
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
            display: inline-block;
            margin-left: 0.1rem;
            transition: transform 0.2s ease-in;
          }
        }
      }
      ul{
        padding-left: 0.1rem;
      }
      li{
        line-height: 0.62rem;
        color: #636262;
        overflow: hidden;
        position: relative;
        padding: 0 0.05rem 0 0.25rem;
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
    .listShow{
      height: 0.87rem;
      overflow: hidden;
      p{
        i{
          transform: rotate(180deg);
        }
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

