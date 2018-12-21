<template>
  <div class="invite_record">
    <Header navLeftTxt="icon">邀请人记录</Header>
    <div class="record_bottom">
      <p class="tils"><span>直接被邀请人</span><span>直接返现奖励(元)</span><span>间接返奖励(元)</span></p>
      <div>
        <ul id="record">
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
          <li>
            <span>180****1234</span>
            <span>100.00</span>
            <span>60.01</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '邀请人记录'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .invite_record
    height:100%
    position:absolute
    left:0
    top:0
    bottom:0
    right: 0
    padding-top: 0.88rem
    overflow: hidden
    font-family: PingFangSC-Regular
    .record_bottom
      width:100%
      height:100%
      overflow: scroll
      position: fixed
      top:0
      left:0
      span
        display: block
        float:left
        width:33%
        height:100%
        text-align: center
      .tils
        height:.8rem
        line-height: .8rem
        border-bottom: 1px solid #e0e0e0
        padding: 0 .3rem
        background-color: #fff
        span
          font-size: .24rem
          color:#666
          &:first-child
            text-align: left
          &:last-child
            text-align: right
      ul
        padding: 0 .3rem
        padding-bottom: .2rem
        background-color: #fff
        li
          height:.9rem
          border-bottom:1px solid #E0E0E0
          line-height: .9rem
          overflow: hidden
          &:last-child
            border:none
          span
            font-size: .28rem
            color:#333
            &:first-child
              text-align: left
            &:last-child
              text-align: right
</style>