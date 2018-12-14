<template>
  <div class="getPoint">
    <Header navLeftTxt="icon">赚积分</Header>
    <ul class="con">
      <!-- <li v-for="item in items">
        <p>每成功投资1000元赠送<span>1</span>积分</p>
        <p>可累计</p>
        <router-link to="">去出借<span class="iconfont">&#xe83d;</span></router-link>
      </li> -->
      <li>
        <p>每成功投资1000元赠送<span>1</span>积分</p>
        <p>可累计</p>
        <router-link to="">去出借&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>每日签到赠送<span>1</span>积分</p>
        <p>每日首次有效</p>
        <router-link to="">去签到&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>绑定手机赠送<span>10</span>积分</p>
        <p>首次有效</p>
        <router-link to="">去出借&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>首次成功充值赠送<span>30</span>积分</p>
        <p>可累计</p>
        <router-link to="">去充值&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>首次成功投标赠送<span>40</span>积分</p>
        <p>可累计</p>
        <router-link to="">去投标&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP1赠送<span>20</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP2赠送<span>200</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP3赠送<span>300</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP4赠送<span>500</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP5赠送<span>1000</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP6赠送<span>2000</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>成为VIP7赠送<span>3000</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
      <li>
        <p>邀请好友赠送<span>0</span>积分</p>
        <p>首次有效</p>
        <router-link to="">已获得&nbsp;<span class="iconfont">&#xe83d;</span></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '赚积分'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .getPoint
    font-family: PingFangSC-Regular
    padding-top: 0.9rem
    position: relative
    .con
      background: #fff
      padding-left: 0.3rem
      li
        width: 100%
        height: 1.5rem
        position: relative
        overflow: hidden
        border-bottom: 1px solid #E8E8E8
        p:first-child
          font-size: 0.36rem
          color: #000
          margin: 0.2rem 0 0.2rem
          span
            color: #fd7b15
        p:nth-child(2)
          font-size: 0.3rem
          color: #999
        a
          display: block
          padding-right: 0.3rem
          height: 1.5rem
          font-size: 0.28rem
          color: #fd7b15
          line-height: 1.5rem
          position: absolute
          top: 0
          right: 0
          span
            font-size: 0.26rem
            color: #999
</style>