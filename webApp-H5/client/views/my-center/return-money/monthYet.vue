<template>
  <div class="month_list">
    <div class="month_money">本月已回总额(元) <span>{{returnList.totalMoney}}</span> <b>(本{{returnList.principal}}+息{{returnList.interest}})</b></div>
    <ul>
      <li v-for="(item,index) in returnList.dayList" @click="showList(index)" :class="returnList.dayList[index].show?'rotate':''" :key="item.value">
          <div class="month_day">{{item.dayDate}}</div>
          <div class="day_money">
            <p><span>{{item.dayTotalMoney}}</span>元<i class="iconfont">&#xe83d;</i></p>
            <p v-show="item.show">(本{{item.dayPrincipal}}+息{{item.dayInterest}})</p>
          </div>
          <div class="list_box" v-show="item.show">
            <div class="list_details" v-for="lists in item.list" :key="lists.value">
              <p>{{lists.money}} <b>（本{{lists.principal}}+息{{lists.interest}}）</b> <span>{{lists.status}}</span></p>
              <p>
                <b>{{lists.periods}}</b>
                <b>{{lists.name}}</b>
                </p>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['returnList'],
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      showList (i) {
        this.returnList.dayList[i].show = !this.returnList.dayList[i].show
      }
    },
    components: {
    }
  }
</script>
<style lang="stylus" scoped>
  .month_list
    background-color: #fff
    .month_money
      font-size: 0.26rem
      color: #333
      padding: 0.2rem 0.3rem
      border-bottom: 1px solid #E8E8E8
      box-sizing: border-box
      span
        font-size: 0.3rem
        color: #FC862A
      b
        font-size: 0.24rem
        color: #999
          
    ul
      padding: 0 0.3rem
      li
        border-bottom: 1px solid #E8E8E8
        color: #333
        font-size: 0.3rem
        overflow: hidden
        div
          display: inline-block
        .month_day
          float: left
          position: relative
          padding-left: 0.27rem
          line-height: 0.9rem
        .month_day:before
          content: ''
          display: block
          width: 0.12rem
          height: 0.12rem
          background-color: #FC862A
          position: absolute
          left: 0
          top: 50%
          margin-top: -0.06rem
          border-radius: 20px
        .day_money
          float: right
          margin-top: 0.22rem
          i
            margin-left: 0.23rem
            display: inline-block
            transition: all 0.3s
          p
            text-align: right  
          p:nth-child(2)
            font-size: 0.24rem
            color: #999
            padding:0.1rem 0.5rem 0.19rem 0;
        .list_box
          width: 100%    
        .list_details
          width: 100%
          border-top: 1px solid #E8E8E8
          padding: 0.3rem 0 0.2rem 0.3rem
          box-sizing: border-box
          p
            font-size: 0.3rem
            line-height: 0.36rem
            padding-bottom: 0.1rem
            b
              font-size: 0.24rem
              color: #999
              vertical-align: text-top
            span
              color: #50A723 
              font-size: 0.24rem
              float: right
            b:nth-child(2)
              float: right 
      .rotate
        i
          transform: rotate(90deg);
</style>
