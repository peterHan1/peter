<template>
  <div class="ucSet">
    <Header :navLeftTxt="'&#xe687;'" @navLeftFn="navLeftFn()">设置</Header>

    <ul>
      <li>
        <!--未激活存管-->
        <!-- <router-link to="deposit">
          <span>实名认证</span>
          <span>未激活存管账户 <i class="iconfont">&#xe83d;</i></span>
        </router-link> -->
        <!--已实名-->
        <router-link to="ucAutonym">
          <span>实名认证</span>
          <span>已认证 <i class="iconfont">&#xe83d;</i></span>
        </router-link>
      </li>
      <li>
        <router-link to="bankCard">
          <span>我的银行卡号</span>
          <span>建设银行 尾号6666 <i class="iconfont">&#xe83d;</i></span>
          <!-- <span>未激活存管账户 <i class="iconfont">&#xe83d;</i></span> -->
        </router-link>
      </li>
      <li>
        <span>绑定手机号</span>
        <span>188****2626</span>
      </li>
      <li>
        <span>存管账号</span>
        <span>TD-2017-06-06123456789456123</span>
        <!-- <span>未激活存管账户 <i class="iconfont">&#xe83d;</i></span> -->
      </li>
      <li>
        <router-link to="accredit">
          <span>业务授权</span>
          <span>已授权 <i class="iconfont">&#xe83d;</i></span>
          <!-- <span>未激活存管账户 <i class="iconfont">&#xe83d;</i></span> -->
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="">
          <span>拓道会员</span>
          <i class="iconfont">&#xe83d;</i>
        </router-link>
      </li>
      <li>
        <router-link to="appraisal/index">
          <span>风险承受能力测评</span>
          <i class="iconfont">&#xe83d;</i>
        </router-link>
      </li>
      <li>
        <router-link to="setPwd">
          <span>密码管理</span>
          <i class="iconfont">&#xe83d;</i>
        </router-link>
      </li>
      <li>
        <router-link to="tdAbout">
          <span>关于拓道</span>
          <i class="iconfont">&#xe83d;</i>
        </router-link>
      </li>
    </ul>
    <div class="getOut">安全退出</div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      navLeftFn () {
        this.$router.push({path: '/myCenter'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .ucSet
    padding-top: 88px
    box-sizing: border-box
    ul
      padding: 0 30px
      background-color: #fff
      margin-top: 20px
      li
        border-bottom: 1px solid #E8E8E8
        overflow: hidden
        height: 100px
        a
          display: block
          width: 100%
          height: 100%
          overflow: hidden
        span
          font-size: 28px
          display: block
          line-height: 100px
        span:nth-child(1)
          color: #333
          float: left
        span:nth-child(2)
          color: #999
          float: right
        i
          font-size: 36px
          color: #999
          display: block
          line-height: 100px
          float: right
      li:last-child
        border: none
    .getOut
      font-size: 28px
      color: #FF7102
      line-height: 100px
      background-color: #fff
      text-align: center
      margin-top: 20px
</style>
