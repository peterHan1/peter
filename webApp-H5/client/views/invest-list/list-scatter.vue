<template>
  <div class="listBox">
    <ul>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">大众帕萨特抵押续贷标 <span class="activity bgSize"></span><span class="double bgSize"></span> </p>
          <div class="listCon">
            <span>8<i>%</i></span>
            <span>1个月</span>
            <span><Button :btnClass="'btnAdd'">立即出借</Button></span>
          </div>
          <div class="bar">
            <b style="width: 50%"></b>
            <span></span>
          </div>
          <p class="listBot">
            <span>满标复审后计息</span>
            <span>剩余可投:100.04元</span>
          </p>
        </router-link>  
      </li>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">哈弗H6抵押续贷标 <span class="collaborate bgSize"></span> </p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span><Button :btnClass="'bthAwait'">20:00开抢</Button></span>
          </div>
          <div class="bar">
            <b></b>
            <span></span>
          </div>
          <p class="listBot">
            <span>满标复审后计息</span>
            <span>剩余可投:6666666.66元</span>
          </p>
        </router-link>  
      </li>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">哈弗H6抵押续贷标 <span class="transfer bgSize"></span> </p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span><Button :btnClass="'bthAwait'">20:00开抢</Button></span>
          </div>
          <div class="bar">
            <b></b>
            <span></span>
          </div>
          <p class="listBot">
            <span>满标复审后计息</span>
            <span>剩余可投:6666666.66元</span>
          </p>
        </router-link>  
      </li>
    </ul>
    <div class="separate"><span>已抢完</span></div>
    <ul class="listOver">
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">丰田皇冠抵押续贷标</p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span><Button :btnClass="'btnGray'">已抢完</Button></span>
          </div>
          <p class="listBot">
            <span>一次性还本付息</span>
            <span>剩余可投:0元</span>
          </p>
        </router-link>  
      </li>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">福特探险者抵押标</p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span><Button :btnClass="'btnGray'">已抢完</Button></span>
          </div>
          <p class="listBot">
            <span>一次性还本付息</span>
            <span>剩余可投:0元</span>
          </p>
        </router-link>  
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
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
.listBox
  li
    padding: 0 30px 0 35px
    border-bottom: 1px solid #F2F3F7
    background-color: #fff
    a
      display: block
    .listTlt
      font-size: 28px
      color: #333
      padding: 35px 0 27px
      display: flex
      align-items: center
      span
        display: inline-block
        width: 105px
        height: 36px
        margin-left: 17px
      .new
        background: url(../../assets/images/invest-list/new.png) no-repeat
      .activity
        background: url(../../assets/images/invest-list/activity.png) no-repeat
      .appoint
        background: url(../../assets/images/invest-list/appoint.png) no-repeat
      .collaborate
        background: url(../../assets/images/invest-list/collaborate.png) no-repeat
      .double
        background: url(../../assets/images/invest-list/double.png) no-repeat
      .transfer
        background: url(../../assets/images/invest-list/transfer.png) no-repeat
      .bgSize
        background-size: 100% 100%
    .listCon
      display: flex
      line-height: 82px
      height: 82px
      overflow: hidden
      span
        flex: 1
      i
        font-size: 36px
      span:nth-child(1)
        font-size: 68px
        color: #FF7102
        text-align: left
      span:nth-child(2)
        font-size: 30px
        color: #333
        text-align: center
        line-height: 110px
      span:nth-child(3)
        text-align: right
    .bar
      padding-top: 25px
      position: relative
      span
        position: absolute
        left: 0
        right: 0
        bottom: 0
        display: block
        height: 4px
        background-color: #E8E8E8
        border-radius: 2px
        z-index: 9
      b
        position: absolute
        left: 0
        bottom: 0
        display: block
        height: 4px
        background: linear-gradient(to right, #FFAC00, #FF7400)
        z-index: 99
        border-radius: 2px
    .listBot
      font-size: 24px
      color: #999
      padding: 15px 0 35px
      span:nth-child(2)
        float: right
  .separate
    text-align: center
    position: relative
    height: 93px
    span
      position: absolute
      left: 50%
      transform: translateX(-50%)
      display: inline-block
      line-height: 93px
      font-size: 24px
      color: #999
      background-color: #f2f3f7
      z-index: 99
      padding: 0 30px
  .separate:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 50%
    border-top: 2px solid #E8E8E8
    z-index: 9
  .listOver
    li
      .listTlt
        color: #999
      .listCon
        span:nth-child(1)
          color: #999
        span:nth-child(2)
          color: #999
        span:nth-child(3)
          b
            background-color: #D8D8D8
</style>
