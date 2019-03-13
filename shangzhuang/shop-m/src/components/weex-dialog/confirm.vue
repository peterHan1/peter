<template>
  <div>
    <div v-if="visibility == true" class="container">
      <div class="dialog-box">
        <text class="text">{{message}}</text>
        <div class="button-box">
          <div class="button-left" @click="cancel">
            <text class="button-word">{{cancelWord}}</text>
          </div>
          <div class="button-right" @click="confirm">
            <text class="button-word">{{confirmWord}}</text>
          </div>
        </div>
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
    width: 510;
    padding-top: 60;
    padding-left: 30;
    padding-right: 30;
    padding-bottom: 160;
    background-color: #fff;
    position: relative;
  }
  .button-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 510;
    height: 100;
    flex-direction: row;
  }
  .button-left {
    flex: 1;
    background-color: #000;
    justify-content: center;
  }
  .button-right {
    flex: 1;
    background-color: #f93450;
    justify-content: center;
  }
  .text {
    text-align: center;
    font-size: 30;
    line-height: 32;
  }
  .button-word {
    text-align: center;
    font-size: 30;
    color: #fff; 
  }
</style>

<script>
module.exports = {
  props: {
    message: {
      default: '标题'
    },
    cancelWord: {
      default: '取消'
    },
    confirmWord: {
      default: '确定'
    },
    visibility: {
      default: 'hide'
    },
    paramObj: {
      default: function () {
        return {};
      }
    }
  },
  methods: {
    cancel: function () {
      var self = this;

      // self.visibility = false;
      self.$emit('confirm.onCancel');
    },
    confirm: function () {
      var self = this;

      self.$emit('confirm.onConfirm', { paramObj: self.paramObj });
    }
  }
};</script>