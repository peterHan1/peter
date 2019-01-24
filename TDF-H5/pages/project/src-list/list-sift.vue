<template>
  <cube-scroll
    ref="contentScroll0"
    :data="content"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <div 
      class="realTime">
      <ul>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
      </ul>
    </div>
    <ul class="listUl">
      <li 
        v-for="(item, index) in content"
        :key="index">
        <router-link to="/project/details/scatterDetails/indexs">
          <p class="listTlt">省心投20170908 <span class="new bgSize"/> </p>
          <div class="listCon">
            <span>10<i>%</i></span>
            <span>12个月</span>
            <span>
              <td-button
                value="立即加入"
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
    </ul>
    <div class="separate"><span>已抢完</span></div>
    <ul class="listUl listOver">
      <li>
        <router-link to="/project/details/scatterDetails/indexs">
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
        <router-link to="/project/details/scatterDetails/indexs">
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
    <template
      slot="pulldown"
      slot-scope="props">
      <div
        v-if="props.pullDownRefresh"
        :style="props.pullDownStyle"
        class="cube-pulldown-wrapper">
        <div
          v-if="props.beforePullDown"
          :style="{paddingTop: props.bubbleY + 'px'}"
          class="before-trigger">
          <span>加载中</span>
        </div>
        <div
          v-else
          class="after-trigger">
          <div
            v-show="props.isPullingDown"
            class="loading">
            <cube-loading/>
          </div>
          <transition name="success">
            <div
              v-show="!props.isPullingDown"
              class="text-wrapper">
              <span class="refresh-text">已更新</span>
            </div>
          </transition>
        </div>
      </div>
    </template>
  </cube-scroll>

</template>
<script>
let cnt = 1
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      },
      content: [
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        }
      ],
      secondStop: 26
    }
  },
  methods: {
    onPullingDown() {
      let idx = this.initialIndex
      console.log(idx)
      setTimeout(() => {
        if (idx == 1) {
          this.imgs.unshift(this.imgs[cnt++ % 3])
        } else {
          this.content.unshift(this.content[cnt++ % 3])
        }

        console.log(idx)
        // if (idx == 0) {
        //   this.$refs.contentScroll0.scrollTo(0, this.secondStopx, 300)
        // } else if (idx == 1) {
        //   this.$refs.contentScroll1.scrollTo(0, this.secondStopx, 300)
        // } else {
        //   this.$refs.contentScroll2.scrollTo(0, this.secondStopx, 300)
        // }
      }, 1000)
    },
    onPullingUp() {
      setTimeout(() => {
        this.content = this.content.concat(imgs)
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.realTime
  height: 68px
  overflow: hidden
  li
    line-height: 68px
    font-size: $fontsize-small-ss
    color: $color-gray3
    text-align: center
.listUl
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
        background: url(../../../assets/images/invest-list/new.png) no-repeat
      .appoint
        background: url(../../../assets/images/invest-list/new.png) no-repeat
      .collaborate
        background: url(../../../assets/images/invest-list/new.png) no-repeat
      .double
        background: url(../../../assets/images/invest-list/new.png) no-repeat
      .transfer
        background: url(../../../assets/images/invest-list/new.png) no-repeat
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
.listOver
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
.separate
  text-align: center
  position: relative
  height: 93px
  &:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 50%
    border-top: 2px solid $color-gray5
  z-index: 9
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
.cube-pulldown-wrapper
  text-align: center
  .before-trigger
    height: auto
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      line-height: 1
      transition: all 0.3s
      color: #666
      padding: 15px 0
      &.rotate
        transform: rotate(180deg)
  .after-trigger
    flex: 1
    margin: 0
    .text-wrapper
      margin: 0 auto
      margin-top: 14px
      padding: 5px 0
      color: #498ec2
      background-color: #d6eaf8
    .loading
      display: inline-block  
    .cube-loading-spinners
      margin: auto
</style>
