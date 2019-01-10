<template>
  <div class="recode">
    <td-header title="资金记录"/>
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
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .recode
    width: 100%
    padding-top: 88px
    .recodeTop
      line-height: 88px
      background-color: $color-white
      padding: 0 30px 
      font-size: $fontsize-large-x
      color: $color-gray1
      span:nth-child(2)
        float: right
    ul
      margin-top: 20px
      padding: 0 30px
      background-color: $color-white
      li
        border-bottom:1px solid $color-gray5
        p:nth-child(1)
          line-height: 40px
          color: $color-gray1
          font-size: $fontsize-medium
          padding-top: 20px
          span:nth-child(2)
            float: right
            color: $color-primary
        p:nth-child(2)
          font-size: $fontsize-small-ss
          line-height: 33px
          color: $color-gray2
          padding: 10px 0 20px
          span:nth-child(2)
            float: right
      li:last-child
        border: none
</style>
