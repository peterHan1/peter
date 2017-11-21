<template lang="html">
  <div class="login-page">
    <mt-header title="美图账号">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="login-container">
      <div class="login-input">
        <div class="input-box">
          <input type="telephone" v-model="tel" class="tel" placeholder="手机号">
        </div>
        <div class="input-box">
          <input type="password" v-model="psw" placeholder="密码">
        </div>
        <mt-button @click="login" type="primary" size="large">登录</mt-button>
      </div>
      <div class="login-icons">
        <p>其他方式登录</p>
        <div class="icons">
          <div class="icon-item">
            <i class="icon weibo"></i>
            <p class="name">新浪微博</p>
          </div>
          <div class="icon-item">
            <i class="icon qq"></i>
            <p class="name">QQ登录</p>
          </div>
        </div>
      </div>
    </div>
    <div class="Copyright">
      ©2017 Meitu, Inc. 美图公司版权所有 闽B2-20040192
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        tel,
        psw
    }
  },
  methods: {
    login : function (e) {
      // let tel = document.querySelector('.tel').value.trim()
      let tel = this.tel.trim()
      let psw = this.psw
      let reg =  /^1\d{10}$/
      if(psw === '') {
        this.$toast({
          message:'密码不能为空',
          position: 'top'
        })
      } else {
        if(reg.test(tel)) {
          this.$store.dispatch('login')
          localStorage.setItem('userTel',tel)
          this.$router.go(-1)
        } else {
          e.preventDefault()
          this.$toast({
            message: '请输入正确格式的手机号',
            position: 'top'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .mint-header{
    font-size: 2rem;
    color: #737373;
    font-weight: 400;
    border-bottom: 2px solid #ed0b13;
  }
  .mint-button--primary{
    background-color: #fc3c60;
  }
  .login-container{
    width: 100%;
    margin-top: 3rem;
  }
  .login-input{
    padding-top: 2rem;
    padding-bottom: 1rem;
    width: 26rem;
    margin: 0 auto;
    border-bottom: 1px solid #dbdbdb;
  }
  .login-input .input-box {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    padding-left: 1rem;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 2rem;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
  }
  .login-input .input-box input {
    width: 100%;
    font-size: 1.6rem;
  }
  .login-icons {
    width: 26rem;
    margin: 0 auto;
  }
  .login-icons p {
    font-size: 1.4rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: #737373;
  }
  .login-icons .icons {
    display: flex;
  }
  .login-icons .icon {
    width: 5rem;
    height: 5rem;
    display: block;
    border-radius: 50%;
    float: left;
    margin-right: 2rem;
    background-size:3rem 3rem;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .login-icons .name {
    display: block;
    font-size: 1.4rem;
    line-height: 2;
  }
  .weibo {
    background: #fc3c60 url(../../assets/images/weibo.png)center center ;
  }
  .qq {
    background: #1578e8 url(../../assets/images/qq.png) center center;
  }
  .Copyright{
    clear:both;
    margin-top: 8rem;
    font-size: 1.2rem;
    /*padding: 3rem;*/
    color: #737373;
    text-align: center;
  }
</style>
