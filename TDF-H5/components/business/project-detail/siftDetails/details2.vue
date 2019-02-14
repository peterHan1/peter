<template>
  <cube-scroll
    :scrollEvents="['scroll']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div 
      class="free_comp">
      <div class="deatils_title"><span/>保障措施</div>
      <div class="summary_list">
        <div>
          <p><span/>业务保障：</p>
          <p>汽车抵押借贷具有实物抵押保障、借款金额少、周期短等 显著优势。 </p>
        </div>
        <div>
          <p><span/>风控保障：</p>
          <p>通过详尽的贷前审查、谨慎的贷中排查、完善的贷后跟踪， 进行严格的风险控制，把风险控制渗入每一个环节中。坚 持追求所有标的真实、有效，可追溯、可审查。 </p>
        </div>
        <div>
          <p><span/>平台保障：</p>
          <p>卓越的系统架构：使用稳定高效的阿里云服务器，采用双 服务器运行，每15分钟自动备份保存平台数据； <br >管理标准：人员、制度、系统、运营均具备完善的管理标 准体系。 </p>
        </div>
      </div>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  methods: {
    onScroll(pos) {
      if (pos.y > 20) {
        this.pullTxt = '松手，返回标的信息'
        this.pullY = pos.y
      } else {
        this.pullTxt = '下拉释放，返回标的信息'
        this.pullY = pos.y
      }
    },
    onPullingDown() {
      setTimeout(() => {
        this.$emit('downFn')
      }, 100)
    }
  }
}
</script>
<style lang="stylus" scoped>
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.deatils_title
  font-size: $fontsize-medium
  color: $color-gray1
  height: 0.7rem
  line-height: 0.7rem
  border-bottom: 1px solid $color-gray7
  padding-left: 0.3rem
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  span
    display: inline-block
    width: 0.06rem
    height: 0.24rem
    background-color: $color-primary
    border-radius: 20px
    margin-right: 0.14rem
.summary_list
  div
    padding: 0 0.3rem
    p
      span
        display: inline-block
        width: 0.08rem
        height: 0.08rem
        background-color: $color-primary
        border-radius: 0.08rem
        margin-right: 0.15rem
        position: absolute
        left: 0
        top: 45%
  &:nth-child(1)
    padding-top: 0.07rem
  &:nth-child(2)
    padding-bottom: 0.25rem
  p:nth-child(1)
    font-size: $fontsize-small-s
    color: $color-gray3
    margin-top: 0.17rem
    line-height: 0.37rem
    padding-left: 0.23rem
    position: relative
  p:nth-child(2)
    font-size: $fontsize-small-s
    color: $color-gray1
    line-height: 0.37rem
    margin-top: 0.07rem
    padding-left: 0.23rem
.free_comp
  background-color: $color-white
  padding-bottom: 0.35rem
  .summary_list div:nth-child(2)
    padding-bottom: 0
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none      
</style>
