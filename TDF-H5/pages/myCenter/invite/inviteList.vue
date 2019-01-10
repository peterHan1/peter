<template>
  <div class="invite">
    <td-header title="邀请人记录"/>
    <div class="inviteList">
      <ul>
        <div>
          <li>
            <span>直接被邀请人</span>
            <span>直接返现奖励(元)</span>
            <span>间接返现奖励(元)</span>
          </li>
        </div>
        <div>
          <li>
            <span>134****9086</span>
            <span>6.66</span>
            <span>10.00</span>
          </li>
          <li>
            <span>134****9086</span>
            <span>6.66</span>
            <span>10.00</span>
          </li>
          <li>
            <span>134****9086</span>
            <span>6.66</span>
            <span>10.00</span>
          </li>
          <li>
            <span>134****9086</span>
            <span>6.66</span>
            <span>10.00</span>
          </li>
          <li>
            <span>134****9086</span>
            <span>6.66</span>
            <span>-</span>
          </li>
        </div>
      </ul>
    </div>
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
  .invite
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .inviteList
      background-color: $color-white
      ul
        div
          padding: 0 30px
        li
          display: flex
          border-bottom: 1px solid #e8e8e8
          span
            flex: 1
            text-align: center
            line-height: 90px
            font-size: $fontsize-medium
            color: $color-gray1
          span:first-child
            text-align: left
          span:last-child
            text-align: right 
        div:nth-child(1)
          border-bottom: 1px solid #e8e8e8
          li
            border: none
            span
              line-height: 82px
              font-size: $fontsize-small-ss
              color: $color-gray3
</style>
