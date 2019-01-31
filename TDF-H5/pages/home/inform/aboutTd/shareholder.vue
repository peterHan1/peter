<template>
  <div class="shareholder">
    <td-header title="关于拓道"/>
    <div class="share_top">
      <h3>实际控制人与持股5%以上股东</h3>
      <table
        cellspacing="0"
        cellpadding="0">
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
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  h3
    font-size:$fontsize-medium
    color: $color-gray1
    height:0.8rem
    line-height:0.8rem
    font-weight: normal
    border-bottom: 1px solid $color-gray5
  .shareholder
    background-color: $color-white
    padding: 1.08rem 0.3rem 0.2rem
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    .position
      font-size: $fontsize-small-s
      color:  $color-gray1
      margin-top: 0.2rem
    p
      line-height: 0.42rem
    table
      width: 100%
      font-size: $fontsize-small-ss
      color: $color-gray8
      border-collapse: collapse
      margin: 0.4rem 0
      th
        text-align: left
        padding: 0.3rem 0.2rem
        border: 1px solid $color-gray5
        border-right: none
        font-weight: normal
      td
        padding-right: 0.2rem
        text-align: right
        width: 68%
        border: 1px solid $color-gray5
</style>
