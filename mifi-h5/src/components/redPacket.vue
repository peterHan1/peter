<template>
  <div class="packet" v-show="isShow">
    <div class="shade"></div>
    <div class="packetBox">
      <div :class="clasName">
        <div class="closeBtn" @click="closeFn()">关闭</div>
        <div class="apartBtn" @click="apartMoney()" v-show="apartShow"></div>
        <div class="packetMes" v-show="packetmesShow">
          <p>现金红包</p>
          <div>
            ￥<span>8</span>
          </div>
          <b>红包已放入您的余额，请打开我的钱包查看</b>
          <router-link to="/purse">查看红包</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShow: true,
        clasName: 'packetBg',
        apartShow: true,
        packetmesShow: false
      }
    },
    methods: {
      closeFn () {
        this.isShow = false
      },
      apartMoney () {
        this.clasName = 'apartBg'
        this.apartShow = false
        this.packetmesShow = true
      }
    }
  }
</script>
<style scoped lang="less">
  .packet{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    .shade{
      background: #000;
      opacity: 0.3;
      z-index: 98;
      width: 100%;
      height: 100%;
    }
    .packetBox{
      width: 90%;
      height: 57%;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translateX(-50%) translateY(-50%);
      .closeBtn{
        display: inline-block;
        width: 10%;
        line-height: 0.6rem;
        text-align: center;
        position: absolute;
        top: 0;
        right: 20%;
        font-size: 0.2rem;
        color: #d5c495;
      }
      .apartBtn{
        height: 58%;
        position: absolute;
        top: 10%;
        left: 17%;
        right: 17%;
      }
      .packetBg{
        width: 100%;
        height: 100%;
        background: url(../assets/img/packet_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
      .apartBg{
        width: 100%;
        height: 100%;
        background: url(../assets/img/apartBg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        .packetMes{
          position: absolute;
          top: 7%;
          left: 17%;
          right: 17%;
          text-align: center;
          p{
            font-size: 0.24rem;
            color: #d5c495;
          }
          div{
            color: #d5c495;
            line-height: 2.3rem;
            font-size: 0.4rem;
            span{
              font-size: 0.9rem;
              font-style: Impact;
            }
          }
          b{
            display: block;
            font-size: 0.12rem;
            color: #000;
          }
          a{
            line-height: 0.8rem;
            font-size: 0.22rem;
            color: #b7a05f;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>

