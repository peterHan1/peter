<template>
  <div class="accredit">
    <Header :navLeftTxt="'icon'">业务授权</Header>
    <ul>
      <li>
        <p>Q1.业务授权是什么？</p>
        <p>属于银行存管升级后，存管系统的一个功能，针对出借人在平台进行出借过程中，若出借人需要使用自动投标的功能，则必须进行授权。</p>
      </li>
      <li>
        <p>Q2.业务授权的金额是什么？</p>
        <p>出借人授权后单笔可出借的最大金额</p>
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
  .accredit
    padding-top: 88px
    box-sizing: border-box
    ul
      padding: 0 30px
      background-color: #fff
      margin-top: 20px
      li
        border-bottom: 1px solid #E8E8E8
        overflow: hidden
        padding: 20px 0
        font-size: 26px
        p:nth-child(1)
          color: #000
          line-height: 50px
        p:nth-child(2)
         color: #666
         text-align: justify
      li:last-child
        border: none
</style>
