<template>
  <div :class="btnClass" @click="btnFun()">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: ['btnClass'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    btnFun () {
      this.$emit('btnFn')
    }
  }
}
</script>

<style lang="stylus" scoped>
  btnPublic(w,c,bg){
    width: w
    display: inline-block
    line-height: 0.74rem
    text-align: center
    font-size: 30px
    border-radius: 37px
    color: c
    background-color: bg
  }
  // 首页按钮
  .btnRule
    btnPublic(100%,#fff,#FF7102)
  .btnRulegary
    btnPublic(100%,#fff,#D8D8D8)
  // 存管结果页按钮
  .btnBorder
    btnPublic(440px,#FF7102,#fff)
    border: 2px solid #FF7102
  // 出借结果页按钮
  .loanBtn
    btnPublic(260px,#fff,#FF7102)
  // 投资列表按钮
  addList(bg){
    display: inline-block
    width: 170px
    line-height: 0.68rem
    font-size: 28px
    border-radius: 34px
    text-align: center
    color: #fff
    background-color: bg
  }
  .btnGray
    addList(#D8D8D8)
  .bthAwait
    addList(#FFAA67)
  .btnAdd
    addList(#FF7102)
  .downApp
    btnPublic(440px,#fff,#FF7102)  
</style>
