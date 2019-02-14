<template>
  <div class="recode">
    <td-header 
      :returnUrl="false"
      title="资金记录" 
      url="myCenter-center"/>
    <div class="recodeTop">
      <span>类型/时间</span>
      <span>金额(元)/状态</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="content.length > 0">
        <li 
          v-for="(item,index) in content" 
          :key="index">
          <p>
            <span>{{ item.type }}</span>
            <span>{{ item.money }}</span>
          </p>
          <p>
            <span>{{ item.addtime }}</span>
            <span>成功</span>
          </p>
        </li>
      </ul>
      <div 
        v-else
        class="data-status">
        <data-status
          status="null"
          statusTxt="暂无资金记录"/>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { getAccountLogById } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      },
      content: [],
      page: 1,
      item: 12
    }
  },
  mounted() {
    if (this.$store.state.accessId && this.$store.state.accessKey) {
      this.getList()
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    getList() {
      const params = { item: this.item, page: this.page }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      getAccountLogById(this.$axios, params, commenParams).then(res => {
        let list = res.content.dataRows
        for (let i in list) {
          this.content.push(list[i])
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.content = []
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      this.page++
      setTimeout(() => {
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.recode
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 188px
  .recodeTop
    position: absolute
    top: 88px
    left: 0
    right: 0
    padding: 0 30px 
    line-height: 88px
    background-color: $color-white
    font-size: $fontsize-large-x
    color: $color-gray2
    display: flex
    justify-content: space-between
  ul
    margin-top: 20px
    padding: 0 30px
    background-color: $color-white
    li
      border-bottom:1px solid $color-gray5
      p
        display: flex
        justify-content: space-between
      p:nth-child(1)
        line-height: 40px
        color: $color-gray1
        font-size: $fontsize-medium
        padding-top: 20px
        span:nth-child(2)
          color: $color-primary
      p:nth-child(2)
        font-size: $fontsize-small-ss
        line-height: 33px
        color: $color-gray2
        padding: 10px 0 20px
    li:last-child
      border: none
  .data-status
    position: fixed
    left: 0
    right: 0
    top: 40%
    transform: translateY(-50%)    
</style>
