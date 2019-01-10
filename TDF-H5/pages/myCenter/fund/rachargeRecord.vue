<template>
  <div class="recode">
    <td-header title="充值记录"/>
    <div class="recodeTop">
      <span>充值金额(元)/时间</span>
      <span>状态</span>
    </div>
    <ul>
      <li>
        <div>
          <p>5000.00</p>
          <p>工商银行 尾号0902</p>
        </div>
        <div>
          <p>成功</p>
          <p>2018-06-07 10:00</p>
        </div>
      </li>
      <li>
        <div>
          <p>5000.00</p>
          <p>工商银行 尾号0902</p>
        </div>
        <div>
          <p>成功</p>
          <p>2018-06-07 10:00</p>
        </div>
      </li>
      <li>
        <div>
          <p>5000.00</p>
          <p>工商银行 尾号0902</p>
        </div>
        <div>
          <p>成功</p>
          <p>2018-06-07 10:00</p>
        </div>
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
      line-height: 99px
      padding: 0 30px 
      font-size: $fontsize-medium
      color: $color-gray2
      background-color: $color-background
      span:nth-child(2)
        float: right
    ul
      background-color: $color-white
      li
        height: 140px
        padding: 0 30px
        border-bottom:1px solid $color-gray5
        display: flex
        align-items: center
        div
          flex: 1
          text-align: left
          p:nth-child(1)
            font-size: $fontsize-large-xxx
            color: $color-gray1
          p:nth-child(2)
            font-size: $fontsize-medium
            color: $color-gray3
            line-height: 40px
            margin-top: 10px
        div:nth-child(2)
          text-align: right
          p:nth-child(1)
            font-size: $fontsize-large-x
      li:last-child
        border: none
</style>
