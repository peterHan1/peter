<template>
  <div class="ucSet">
    <Header :navLeftTxt="'icon'">密码管理</Header>
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
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .ucSet
    min-height: 100%
    background-color: #F2F3F7
    padding-top: 88px
    box-sizing: border-box
    ul
      padding: 0 30px
      background-color: #fff
      li
        overflow: hidden
        border-bottom: 1px solid #E4E4E4
        font-size: 28px
        span
          display: block
          line-height: 100px
          float: left
          color: #333
        span:nth-child(2)
          float: right
          color: #999
      li:last-child
        border: none
</style>
