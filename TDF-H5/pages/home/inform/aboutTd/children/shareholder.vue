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
    height:80px
    line-height:80px
    font-weight: normal
    border-bottom: 1px solid $color-gray5
  .shareholder
    background-color: $color-white
    padding: 108px 30px 20px
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    .position
      font-size: $fontsize-small-s
      color:  $color-gray1
      margin-top: 20px
    p
      line-height: 42px
    table
      width: 100%
      font-size: $fontsize-small-ss
      color: $color-gray8
      border-collapse: collapse
      margin: 40px 0
      th
        text-align: left
        padding: 30px 20px
        border: 1px solid $color-gray5
        border-right: none
        font-weight: normal
      td
        padding-right: 20px
        text-align: right
        width: 68%
        border: 1px solid $color-gray5
</style>
