<template>
  <div class="ucSet">
    <td-header title="设置"/>
    <ul>
      <li>
        <!--未激活存管-->
        <!-- <router-link to="deposit">
          <span>实名认证</span>
          <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span>
        </router-link> -->
        <!--已实名-->
        <router-link to="/myCenter/set/ucAutonym">
          <span>实名认证</span>
          <span>已认证 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
      </li>
      <li @click="downApp">
        <!-- <router-link to="/bankCard"> -->
        <span>我的银行卡号</span>
        <span>建设银行 尾号6666 <i class="iconfont">&#xe6f2;</i></span>
        <!-- <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span> -->
        <!-- </router-link> -->
      </li>
      <li>
        <span>绑定手机号</span>
        <span>188****2626</span>
      </li>
      <li>
        <span>存管账号</span>
        <span>TD-2017-06-06123456789456123</span>
        <!-- <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span> -->
      </li>
      <li>
        <router-link to="/myCenter/set/xwAccredit">
          <span>业务授权</span>
          <span>已授权 <i class="iconfont">&#xe6f2;</i></span>
          <!-- <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span> -->
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/found/myLevel">
          <span>拓道会员</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/appraisal/indexs">
          <span>风险承受能力测评</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/myCenter/set/setPwd">
          <span>密码管理</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/myCenter/set/about">
          <span>关于拓道</span>
          <i class="iconfont">&#xe6f2;</i>
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
  data() {
    return {}
  },
  mounted() {},
  methods: {
    navLeftFn() {
      this.$router.push({ path: '/myCenter' })
    },
    downApp() {
      this.$App('请在电脑端登录官网或在APP端找更换银行卡', 'brow')
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .ucSet
    padding-top: 88px
    ul
      padding: 0 30px
      background-color: $color-white
      margin-top: 20px
      li
        border-bottom: 1px solid $color-gray5
        overflow: hidden
        a
          display: block
          width: 100%
          height: 100%
          overflow: hidden
        span
          font-size: $fontsize-medium
          display: block
          line-height: 100px
        span:nth-child(1)
          color: $color-gray1
          float: left
        span:nth-child(2)
          color: $color-gray3
          float: right
        i
          font-size: $fontsize-large-xxx
          color: $color-gray3
          display: block
          line-height: 100px
          float: right
      li:last-child
        border: none
    .getOut
      font-size: $fontsize-medium
      color: $color-primary
      line-height: 100px
      background-color: $color-white
      text-align: center
      margin-top: 20px
</style>
