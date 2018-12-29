<template>
  <div class="recode">
    <Header :navLeftTxt="'icon'">提现记录</Header>
    <div class="recodeTop">
      <span>提现金额(元)/类型</span>
      <span>状态/时间</span>
    </div>
    <ul>
      <li>
        <p>
          <span>5000.00 <b>(含3元手续费)</b> </span>
          <span>成功</span>
        </p>
        <p>
          <span>快速到账</span>
          <span>2018-06-07 10:00</span>
        </p>
      </li>
      <li>
        <p>
          <span>5000.00 <b>(含3元手续费)</b> </span>
          <span>成功</span>
        </p>
        <p>
          <span>快速到账</span>
          <span>2018-06-07 10:00</span>
        </p>
      </li>
      <li>
        <p>
          <span>5000.00 <b>(含3元手续费)</b> </span>
          <span>成功</span>
        </p>
        <p>
          <span>快速到账</span>
          <span>2018-06-07 10:00</span>
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
    box-sizing: border-box
    .recodeTop
      line-height: 100px
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
        border-bottom:1px solid #E8E8E8
        overflow: hidden
        p
          display: flex
          font-size: 28px
          color: #999
          span
            flex: 1
          span:nth-child(1)
            text-align: left
          span:nth-child(2)
            text-align: right  
        p:nth-child(1)
          padding-bottom: 10px
          color: #333
          span:nth-child(1)
            font-size: 36px
            b
              font-size: 24px
          span:nth-child(2)
            font-size: 30px
        p:nth-child(2)
          line-height: 40px
      li:last-child
        border: none
</style>





















