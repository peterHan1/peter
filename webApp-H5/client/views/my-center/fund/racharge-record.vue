<template>
  <div class="recode">
    <Header :navLeftTxt="'icon'">充值记录</Header>
    <div class="recodeTop">
      <span>充值金额(元)/时间</span>
      <span>状态</span>
    </div>
    <ul>
      <li>
        <p>
          <span>5000.00</span>
          <span>成功</span>
        </p>
        <p>
          <span>工商银行 尾号0902</span>
          <span> 2018-06-07 10:00</span>
        </p>
      </li>
      <li>
        <p>
          <span>5000.00</span>
          <span>成功</span>
        </p>
        <p>
          <span>工商银行 尾号0902</span>
          <span> 2018-06-07 10:00</span>
        </p>
      </li>
      <li>
        <p>
          <span>5000.00</span>
          <span>成功</span>
        </p>
        <p>
          <span>网银</span>
          <span> 2018-06-07 10:00</span>
        </p>
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
  .recode
    width: 100%
    padding-top: 88px
    .recodeTop
      line-height: 99px
      padding: 0 30px 
      font-size: 28px
      color: #666
      background-color: #f2f3f7
      span:nth-child(2)
        float: right
    ul
      background-color: #fff
      li
        padding: 21px 30px
        border-bottom:1px solid #f2f3f7
        p
          display: flex
          color: #999
          font-size: 28px
          span
            flex: 1
          span:nth-child(1)
            text-align: left
          span:nth-child(2)
            text-align: right
        p:nth-child(1)
          color: #333
          line-height: 50px
          padding-bottom: 8px
          span:nth-child(1)
            font-size: 36px
          span:nth-child(2)
            font-size: 30px
      li:last-child
        border: none
</style>





















