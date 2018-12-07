<template>
  <div class="ucSet">
    <Header :navLeftTxt="'icon'">密码管理</Header>
    <ul>
      <li>
          <div class="pwdTop" @click="loginPwd('loginShow')">
            <span>修改登录密码</span>
            <i class="iconfont" :class="loginShow?'iShow':''">&#xe83d;</i>
          </div>
          <div v-show="loginShow">
            <ul>
              <li><input type="text" placeholder="请输入旧密码" /></li>
              <li><input type="text" placeholder="请输入新密码（6-16位）" /></li>
              <li><input type="text" placeholder="再次输入密码" /></li>
            </ul>
            <p class="">提交修改</p>
          </div>
      </li>
      <li>
        <div>
          <span>修改交易密码</span>
          <i class="iconfont" >&#xe83d;</i>
        </div>
      </li>
      <li>
        <div>
          <span>忘记交易密码</span>
          <i class="iconfont" >&#xe83d;</i>
        </div>
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
        titles: {
          navLeft: 'icon',
          title: '密码管理',
          navRight: ''
        },
        loginShow: false,
        payShow: false
      }
    },
    mounted () {
    },
    methods: {
      loginPwd (inp) {
        if (inp === 'loginShow') {
          this.loginShow = !this.loginShow
        }
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .ucSet
    min-height: 100%
    background-color: #F2F3F7
    padding-top: 88px
    box-sizing: border-box
    ul
      padding: 0 30px
      background-color: #fff
      margin-top: 20px
      li
        div
          overflow: hidden
          border-bottom: 1px solid #E4E4E4
          li
            height: 88px
            box-sizing: border-box
            border-bottom: 1px solid #E4E4E4
            input
              display: block
              padding-left: 10px
              width: 100%
              line-height: 86px
              caret-color:#FF711C
              box-sizing: border-box
              font-size: 28px
            input::-webkit-input-placeholder
              color: #999
            input:-moz-placeholder
              color: #999
            input::-moz-placeholder
              color: #999
            input:-ms-input-placeholder
              color: #999
          .oldPwd
            width: 60%
            float: left
          .forgetPwd
            display: block
            float: right
            line-height: 88px
            color: #FF711C
            font-size: 28px
          p
            width: 90%
            height: 78px
            line-height: 78px
            background-color: #FF711C
            color: #fff
            font-size: 30px
            text-align: center
            border-radius: 5px
            margin: 20px auto
          span
            font-size: 28px
            display: block
            line-height: 88px
            float: left
            color: #333
          i
            font-size: 36px
            color: #B3B3B3
            display: block
            line-height: 88px
            float: right
            transition: all 0.3s
          .iShow
            transform: rotate(90deg);
      li:last-child
        div
          border: none
</style>
