<template>
  <div class="bondList">
    <ul>
      <li>
        <router-link to="/mySiftDetails" >
          <p>
            <span>省心投20190101</span>
          </p>
          <div>
            <p><span>8,888.88</span><span>66.66</span></p>
            <p><span>加入金额(元)</span><span>参考收益(元)</span></p>            
          </div>
          <p>
            <span>加入时间：<i>2018.12.12 12:12</i></span>
            <span>预计退出时间：<i>2019-12-13</i></span>
          </p>
        </router-link>
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
.bondList
  li
    background-color: #fff
    margin-top: 20px
    padding: 0 30px
    p
      font-size: 28px
      color: #333
      line-height: 80px
      overflow: hidden
      i
        color: #666
      b
        font-size: 24px
      span:nth-child(1)
        float: left
      span:nth-child(2)
        float: right
    p:nth-child(1)
      span:nth-child(2)
        color: #999
    p:nth-child(3)
      font-size: 24px
      color: #999
      border-top: 1px solid #E8E8E8
    div
      padding-bottom: 20px
      p:nth-child(1)
        line-height: 50px
        span:nth-child(1)
          font-size: 42px
          color: #FF7102
        span:nth-child(2)
          font-size: 36px
          color: #333
      p:nth-child(2)
        margin-top: 5px
        line-height: 33px
        font-size: 24px
        color: #ccc
</style>
