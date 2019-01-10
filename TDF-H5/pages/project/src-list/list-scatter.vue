<template>
  <div class="listBox">
    <ul>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">大众帕萨特抵押续贷标 <span class="activity bgSize"/><span class="double bgSize"/> </p>
          <div class="listCon">
            <span>8<i>%</i></span>
            <span>1个月</span>
            <span>
              <td-button
                value="立即出借"
              />
            </span>
          </div>
          <div class="bar">
            <b style="width: 50%"/>
            <span/>
          </div>
          <p class="listBot">
            <span>满标复审后计息</span>
            <span>剩余可投:100.04元</span>
          </p>
        </router-link>  
      </li>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">哈弗H6抵押续贷标 <span class="collaborate bgSize"/> </p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span>
              <td-button
                value="20:00开抢"
              />
            </span>
          </div>
          <div class="bar">
            <b/>
            <span/>
          </div>
          <p class="listBot">
            <span>满标复审后计息</span>
            <span>剩余可投:6666666.66元</span>
          </p>
        </router-link>  
      </li>
      <li>
        <router-link to="/scatterDetailsEnter">
          <p class="listTlt">哈弗H6抵押续贷标 <span class="transfer bgSize"/> </p>
          <div class="listCon">
            <span>12.5<i>%</i></span>
            <span>1个月</span>
            <span>
              <td-button
                value="20:00开抢"
              />
            </span>
          </div>
          <div class="bar">
            <b/>
            <span/>
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
            <span>
              <td-button
                :disabled="true"
                value="已抢完"
              />
            </span>
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
            <span>
              <td-button
                :disabled="true"
                value="已抢完"
              />
            </span>
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
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
.listBox
  li
    padding: 0 30px 0 35px
    border-bottom: 1px solid $color-gray5
    background-color: $color-white
    a
      display: block
    .listTlt
      font-size: $fontsize-medium
      color: $color-gray1
      padding: 35px 0 27px
      display: flex
      align-items: center
      span
        display: inline-block
        width: 105px
        height: 36px
        margin-left: 17px
      .new
        background: url(../../../assets/images/invest-list/new.png) no-repeat
      .activity
        background: url(../../../assets/images/invest-list/activity.png) no-repeat
      .appoint
        background: url(../../../assets/images/invest-list/appoint.png) no-repeat
      .collaborate
        background: url(../../../assets/images/invest-list/collaborate.png) no-repeat
      .double
        background: url(../../../assets/images/invest-list/double.png) no-repeat
      .transfer
        background: url(../../../assets/images/invest-list/transfer.png) no-repeat
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
        font-size: $fontsize-large-xxx
      span:nth-child(1)
        font-size: $fontsize-large-xxxxxxxxx
        color: $color-primary
        text-align: left
      span:nth-child(2)
        font-size: $fontsize-large-x
        color: $color-gray1
        text-align: center
        line-height: 110px
      span:nth-child(3)
        text-align: right
        button
          width: 170px
          height: 68px
          line-height: 68px
          font-size: $fontsize-medium
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
        background-color: $color-gray5
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
      font-size: $fontsize-small-ss
      color: $color-gray3
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
      font-size: $fontsize-small-ss
      color: $color-gray3
      background-color: $color-background
      z-index: 99
      padding: 0 30px
  .separate:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 50%
    border-top: 2px solid $color-gray5
    z-index: 9
  .listOver
    li
      .listTlt
        color: $color-gray3
      .listCon
        span:nth-child(1)
          color: $color-gray3
        span:nth-child(2)
          color: $color-gray3
        span:nth-child(3)
          b
            background-color: $color-gray6
</style>
