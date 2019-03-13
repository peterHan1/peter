<template>
  <div>
    <div class="container" v-if="visibility">
      <div class="dialog-box">
        <text class="title">{{title}}</text>
        <text v-if="message" class="text">{{message}}</text>
        <div class="close" @click="cancel">
          <image style="width: 30px; height: 30px" src="//cdn1.showjoy.com/images/59/5954b558bd5e4d8fa5c40756099bc1f6.png"></image>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped="">
  .container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
  }
  .dialog-box {
    width: 500px;
    padding-top: 42px;
    padding-bottom: 46px;
    background-color: #fff;
    position: relative;
  }
  .text {
    text-align: center;
    font-size: 30px;
    line-height: 32px;
  }
  .title {
    text-align: center;
    color: rgb(250, 55, 83);
    margin-bottom: 44px;
    font-size: 32px;
  }
  .button-word {
    text-align: center;
    font-size: 30px;
    color: #fff; 
  }
  .close {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
module.exports = {
  props: {
    message: {
      default: ''
    },
    visibility: {
      default: false
    },
    title: {
      default: '标题'
    }
  },
  methods: {
    cancel: function () {
      var self = this;

      // self.visibility = false;
      self.$emit('cancel');
    }
  }
};</script>