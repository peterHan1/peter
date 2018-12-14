<template>
  <div class="radioBox">
    <div class="radiolist" v-for="option in options.list" :key="option.value" @click="selectRadio(option.value)">
      <span class="radioType iconfont on" v-if="options.status == option.value">&#xe61e;</span>
      <span class="radioType iconfont" v-else>&#xe622;</span>
      <span class="radioTxt">{{option.label}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  props: ['options'],
  data () {
    return {
    }
  },
  mounted () {
    this.radioVal = this.options.status
  },
  methods: {
    selectRadio (data) {
      this.options.status = data
      this.$emit('selectFn', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .radioBox
    padding: 0 40px
    .radiolist
      overflow: hidden
      display: block
      line-height: 70px
      .radioTxt
        font-size: 32px
        color: #333  
      .radioType
        margin-right: 10px
        color: #333
        font-size: 36px
      .on
        color: #ff711c 
</style>
