<template>
  <div class="myInvest">
    <Header :navLeftTxt="'icon'">出借记录</Header>
    <div class="bondList">
      <ul>
        <li>
				<router-link to="/mySiftDetails" >
          <p>
            <span>宝马X6抵押续贷标 <b>No.2018110006688</b> </span>
            <span>还款中</span>
          </p>
          <div>
            <p><span>8,888.88</span><span>66.66</span></p>
            <p><span>出借金额(元)</span><span>收益(元)</span></p>            
          </div>
          <p>
            <span>出借时间：<i>2018.12.12 12:12</i></span>
            <span>到期时间：<i>2019-12-13</i></span>
          </p>
          </router-link>
        </li>
      </ul>
    </div>
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
      navRightFn () {
        this.$router.push({path: '/bondExplain'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .myInvest
    width: 100%
    padding-top: 88px
    box-sizing: border-box
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
