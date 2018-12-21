<template>
  <div class="bondBox">
    <Header :navLeftTxt="'icon'" :navRightTxt="'&#xe833;'" @navRightFn="navRightFn()" :navRightIcon="'icon'">债权转让</Header>
    <div class="bondList">
      <ul>
        <li>
          <p>
            <span>宝马X6抵押续贷标 <b>No.2018110006688</b> </span>
            <span>还款中</span>
          </p>
          <p>
            <span>出借金额：666.66元</span>
            <span>到期收益：88.88元</span>
          </p>
          <p>
            <span>出借时间：2018.12.12 12:12</span>
            <span>到期时间：2019-12-13</span>
          </p>
        </li>
        <li>
          <p>
            <span>宝马X6抵押续贷标 <b>No.2018110006688</b> </span>
            <span>还款中</span>
          </p>
          <p>
            <span>出借金额：666.66元</span>
            <span>到期收益：88.88元</span>
          </p>
          <p>
            <span>出借时间：2018.12.12 12:12</span>
            <span>到期时间：2019-12-13</span>
          </p>
        </li>
        <li>
          <p>
            <span>宝马X6抵押续贷标 <b>No.2018110006688</b> </span>
            <span>还款中</span>
          </p>
          <p>
            <span>出借金额：666.66元</span>
            <span>到期收益：88.88元</span>
          </p>
          <p>
            <span>出借时间：2018.12.12 12:12</span>
            <span>到期时间：2019-12-13</span>
          </p>
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
  .bondBox
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .bondList
      li
        background-color: #fff
        margin-top: 20px
        p
          font-size: 28px
          color: #333
          line-height: 70px
          padding: 0 30px
          overflow: hidden
          b
            font-size: 22px
            color: #999
          span:nth-child(1)
            float: left  
          span:nth-child(2)
            float: right
        p:nth-child(3)
          font-size: 22px
          color: #999
          border-top: 1px solid #f2f3f7  
</style>





















