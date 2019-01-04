<template>
  <div class="shareholder">
    <Header navLeftTxt="icon">关于拓道</Header>
    <div class="share_top">
      <h3>实际控制人与持股5%以上股东</h3>
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th>实际控制人</th>
          <td>张罗军</td>
        </tr>
        <tr>
          <th>持股5%以上股东</th>
          <td>浙江拓道网络技术有限公司(占比100%)</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '关于拓道'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  h3
    font-size:0.28rem
    color:#212a36
    height:0.8rem
    line-height:0.8rem
    font-weight: normal
    border-bottom: 1px solid #e4e4e4
  .shareholder
    background-color: white
    padding: 1.08rem 0.3rem 0.2rem
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    .position
      font-size: 0.26rem
      color: #212a36
      margin-top: 0.2rem
    p
      line-height: 0.42rem
    table
      width: 100%
      font-size: 0.24rem
      color: #626262
      border-collapse: collapse
      margin: 0.4rem 0
      th
        text-align: left
        padding: 0.3rem 0.2rem
        border: 1px solid #e4e4e4
        border-right: none
        font-weight: normal
      td
        padding-right: 0.2rem
        text-align: right
        width: 68%
        border: 1px solid #e4e4e4
</style>