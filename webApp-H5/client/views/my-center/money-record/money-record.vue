<template>
  <div class="recode">
    <Header :navLeftTxt="'icon'">资金记录</Header>
    <div class="recodeTop">
      <span>类型/时间</span>
      <span>金额(元)/状态</span>
    </div>
    <ul>
      <li>
        <p>
          <span>充值</span>
          <span>1.00</span>
        </p>
        <p>
          <span>2017-01-10 15:29:00</span>
          <span>成功</span>
          </p>
      </li>
      <li>
        <p>
          <span>充值</span>
          <span>1.00</span>
        </p>
        <p>
          <span>2017-01-10 15:29:00</span>
          <span>成功</span>
          </p>
      </li>
      <li>
        <p>
          <span>充值</span>
          <span>1.00</span>
        </p>
        <p>
          <span>2017-01-10 15:29:00</span>
          <span>成功</span>
          </p>
      </li>
      <li>
        <p>
          <span>充值</span>
          <span>1.00</span>
        </p>
        <p>
          <span>2017-01-10 15:29:00</span>
          <span>成功</span>
          </p>
      </li>
      <li>
        <p>
          <span>充值</span>
          <span>1.00</span>
        </p>
        <p>
          <span>2017-01-10 15:29:00</span>
          <span>成功</span>
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
      line-height: 88px
      background-color: #fff
      padding: 0 30px 
      font-size: 30px
      color: #333
      span:nth-child(2)
        float: right
    ul
      margin-top: 20px
      padding: 0 30px
      background-color: #fff
      li
        border-bottom:1px solid #f2f3f7
        p:nth-child(1)
          line-height: 40px
          color: #333
          font-size: 28px
          padding-top: 20px
          span:nth-child(2)
            float: right
            color: #FF7102
        p:nth-child(2)
          font-size: 24px
          line-height: 33px
          color: #666
          padding: 10px 0 20px
          span:nth-child(2)
            float: right
      li:last-child
        border: none
</style>





















