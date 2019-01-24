<template>
  <div class="ucSet">
    <td-header title="密码管理"/>
    <ul>
      <li>
        <span>修改登录密码</span>
        <span>请登录官网或在APP端操作</span>
      </li>
      <li>
        <span>修改交易密码</span>
        <span>请登录官网或在APP端操作</span>
      </li>
      <li>
        <span>忘记交易密码</span>
        <span>请登录官网或在APP端操作</span>
      </li>
    </ul>
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
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .ucSet
    min-height: 100%
    padding-top: 88px
    ul
      padding: 0 30px
      background-color: $color-white
      li
        border-bottom: 1px solid $color-gray5
        font-size: $fontsize-medium
        display: flex
        justify-content: space-between
        line-height: 100px
        span
          color: $color-gray1
        span:nth-child(2)
          color: $color-gray3
      li:last-child
        border: none
</style>
