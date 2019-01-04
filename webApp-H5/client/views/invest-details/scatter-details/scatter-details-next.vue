<template>
  <div class="scatter">
    <div class="top_nav">
      <ul>
        <li i="0" :class="{on: active[0]}" @click="tabs(0)">项目介绍</li>
        <li i="1" :class="{on: active[1]}" @click="tabs(1)">透明合规</li>
        <li i="2" :class="{on: active[2]}" @click="tabs(2)">出借记录</li>
      </ul>
    </div>
    <drop-move :load-top="loadTop">
      <div class="content">
        <div class="scatter_item introduce" v-if="active[0]">
          <div class="loan_info">
            <div class="title">
              <span></span> 借款人信息
            </div>
            <div class="info_details">
              <p><span><i>姓名</i><b>张**</b></span><span><i>年龄</i><b>46</b></span></p>
              <p><span><i>性别</i><b>男</b></span><span><i>籍贯</i><b>河南</b></span></p>
              <p><span><i>职业</i><b>个体</b></span><span><i>学历</i><b>大专</b></span></p>
              <p><span><i>婚姻状况</i><b>已婚</b></span></p>
            </div>
          </div>
          <div class="item_overview">
            <div class="title">
              <span></span> 项目概述
            </div>
            <div class="overview_info">
              <ul>
                <li>
                  <div>风险评估：</div>
                  <p>项目风险评估结果：A</p>
                </li>
                <li>
                  <div>征信报告：</div>
                  <p>该借款人征信报告中无逾期记录，符合风控要求；</p>
                </li>
                <li>
                  <div>基本状况：</div>
                  <p>主要从事个体行业，借款期间无重大支出，信誉状况良好，无不良记录</p>
                </li>
                <li>
                  <div>生产经营状况：</div>
                  <p>借款人从事个体行业，现业务运转正常</p>
                </li>
                <li>
                  <div>借款用途及还款来源：</div>
                  <p>借款人因经营需要，申请借款2000000元，用于经营流动。还款来源为经营收入</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="car_info">
            <div class="title">
              <span></span> 车辆信息
            </div>
            <div class="info_details">
              <p><span><i>车辆品牌</i><em>宝马X3</em></span><span><i>车辆估价</i><em>200000</em></span></p>
              <p><span><i>购买价格</i><em>300000</em></span><span><i>行驶公里</i><em>31217公里</em></span></p>
            </div>
          </div>
          <div class="check_information">
            <div class="title">
              <span></span> 审核资料
            </div>
            <div class="information_pic">
              <ul>
                <li><img src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li>
                <li><img src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li>
                <li><img src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li>
                <li><img src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li>
                <li><img src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="" /></li>
              </ul>
            </div>
          </div>
          <div class="store_info">
            <div class="title">
              <span></span> 门店信息
            </div>
            <div class="img_area">
              <img src="../../../assets/images/invest/store.png" alt="" />
            </div>
            <p class="name"><i></i>门店名称: <span>嘉兴桐乡店</span></p>
            <p class="addr"><i></i>地址: <span>浙江省嘉兴市桐乡市银菊路6-10号</span></p>
            <p class="call"><i></i>联系电话: <a href="tel:400-85-666-85">400-85-666-85</a></p>
          </div>
        </div>
        <div class="scatter_item" v-else-if="active[1]">
          <div class="safeguard_step">
            <div class="title">
              <span></span> 保障措施
            </div>
            <div class="step_info">
              <p>1.车辆完成合法抵押手续；</p>
              <p>2.车辆在车管所进行登记并安装Gps追踪器，由风控部门进行全程监控；</p>
              <p> 3.多家专业车辆评估机构对比评估，保证评估价格合理；</p>
              <p> 4.电话核实商业保单正常；</p>
              <p> 5.如借款人在借款期间，出现征信异常将通过站内信的方式给予出借人提示。</p>
            </div>
          </div>
          <div class="money_mange">
            <div class="title">
              <span></span> 资金分账管理
            </div>
            <div class="mange_info">
              拓道金服坚守信息中介平台定位，不设资金池。实现平台自有资金与用户资金的账户分设管理和风险隔离，平台与会员资金交易变动交由银行进行管理与监督，平台无法接触交易资金。
            </div>
          </div>
        </div>
        <div class="scatter_item" v-else>
          <ul class="borrow_record" id="borrow_record">
            <li v-for="(item,index) in items" :key="index">
              <p class="phone">{{item.phone}}&nbsp;<span :class="[index === 0?'most':'', index === 1?'less':'', index === 2?'first':'']"></span></p>
              <dl class="info">
                <dt>{{item.money}}</dt>
                <dd>{{item.time}}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </drop-move>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '项目详情'
  },
  data () {
    return {
      active: [true, false, false],
      items: [{phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}, {phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32'}]
    }
  },
  methods: {
    loadTop () {
      window.history.go(-1)
    },
    tabs (index) {
      switch (index) {
        case 0:
          this.active = [true, false, false]
          break
        case 1:
          this.active = [false, true, false]
          break
        case 2:
          this.active = [false, false, true]
          break
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .scatter
    padding-top: 1.78rem
    height: 100%
    .title
      width:100%
      height:.7rem
      line-height: .7rem
      font-size:.28rem
      color:#333333
      border-bottom: 1px solid #E0E0E0
      span
        display: inline-block
        width:.06rem
        height:.24rem
        background-color: #FF7102
        border-radius:.04rem
        margin: 0 .14rem 0 .3rem
        vertical-align: middle
    .top_nav
      width:100%
      height:.9rem
      position: fixed
      background-color: #fff
      z-index: 999
      top:0.88rem
      left:0
      ul
        width:100%
        height:100%
        overflow: hidden
        li
          float: left
          width:33%
          height:.9rem
          font-size: .28rem
          color:#999999
          text-align: center
          line-height: .9rem
          position: relative
          -webkit-tap-highlight-color: transparent
          &.on:after
            content: " "
            width:0.68rem
            height:.06rem
            background-color: #FF7102
            position: absolute
            left: 36%
            bottom: 0
            border-radius:3px
            z-index: 5
          &.on
            color:#FF7B00
    .content
      .scatter_item
        width:100%
        background-color: #fff
        .loan_info .info_details
          width:100%
          border-bottom:.2rem solid #F2F3F7
          p
            height:.37rem
            font-size:.26rem
            padding: 0 .3rem
            margin-bottom:.2rem
            &:first-child
              margin-top:.35rem
          span
            display: block
            float:left
            width:3.45rem
            height:100%
            line-height: .37rem
            i
              margin-right:.47rem
              color:#999999
            b
              font-weight: 200
              color:#333
        .item_overview
          overflow: hidden
          .overview_info
            width:100%
            height:6.14rem
            padding-top: .25rem
            border-bottom:.20rem solid #F2F3F7
            .ts
              margin: .15rem .4rem 0 .4rem
              font-size:.2rem
              color:#999999
            ul
              margin: 0 .4rem 0 .53rem
            li
              position: relative
              margin: 0 0 .16rem 0
              &:after
                content:""
                display: block
                position: absolute
                width:.08rem
                height:.08rem
                border-radius: .08rem
                background-color: #FF7B00
                left:-.25rem
                top:.18rem
              div
                font-size:.26rem
                color:#999999
                margin-bottom: 0.07rem
              p
                font-size:.26rem
                color:#333333
        .car_info
          overflow: hidden
          .info_details
            width:100%
            height:1.35rem
            border-bottom:.2rem solid #F2F3F7
            p
              width:100%
              height:.37rem
              font-size:.26rem
              padding: 0 .3rem
              &:first-child
                margin-top:.35rem
                margin-bottom:.2rem
            span
              display: block
              float:left
              width:3.45rem
              height:100%
              line-height: .37rem
              i
                margin-right:.47rem
                color:#999999
              em
                font-weight: 100
                color:#333
                font-style: normal
        .check_information
          width:100%
          overflow: hidden
          border-bottom: .2rem solid #F2F3F7
          .information_pic
            overflow-x: scroll
            overflow-y: hidden
            white-space:nowrap
            height:1.42rem
            margin: .3rem
            ul li
              display: inline-block
              width:1.9rem
              height:1.42rem
              margin-right:.2rem
              img
                width:100%
                height:100%
        .store_info
          width:100%
          overflow: hidden
          .img_area
            width:6.9rem
            height:3.9rem
            margin:.3rem auto .24rem auto
            img
              width:100%
              height:100%
          .name
            padding: 0 .28rem
            font-size: .26rem
            color:#999999
            margin-bottom:.17rem
            i
              display: inline-block
              width:.3rem
              height:.3rem
              background: url(../../../assets/images/invest/name.png) no-repeat center
              background-size: 100%
              vertical-align: middle
              margin-right:.2rem
          .addr
            padding: 0 .28rem
            font-size: .26rem
            color:#999999
            margin-bottom:.17rem
            i
              display: inline-block
              width:.26rem
              height:.3rem
              background: url(../../../assets/images/invest/addr.png) no-repeat center
              background-size: 100%
              vertical-align: middle
              margin-right:.2rem
            span
              color:#333333
          .call
            padding: 0 .28rem
            font-size: .26rem
            color:#999999
            padding-bottom: .35rem
            border-bottom: .2rem solid #F2F3F7
            i
              display: inline-block
              width:.26rem
              height:.3rem
              background: url(../../../assets/images/invest/phone.png) no-repeat center
              background-size: 100%
              vertical-align: middle
              margin-right:.2rem
            a
              color:#FF7102
        .safeguard_step .step_info
          height:3.42rem
          padding: .24rem .51rem .07rem .31rem
          font-size:.26rem
          color:#333333
          border-bottom:.2rem solid #F2F3F7
          p
            line-height:.4rem
        .money_mange .mange_info
          height:2.17rem
          padding: .24rem .51rem .21rem .31rem
          font-size:.26rem
          color:#333333
        .borrow_record
          margin-bottom: 1rem
          li
            margin: 0 .3rem
            height:1.37rem
            border-bottom:1px solid #E0E0E0
            overflow: hidden
            font-size:.28rem
            color:#333
            &:last-child
              border:none
            .phone
              display: block
              float:left
              width:50%
              height:100%
              line-height:1.37rem
              font-size:.28rem
              color:#333333
              span
                display: inline-block
                vertical-align: middle
                width:.6rem
                height:.3rem
                zoom:0.5
              .most
                background: url(../../../assets/images/invest/most.png) no-repeat center
              .first
                background: url(../../../assets/images/invest/first.png) no-repeat
              .less
                background: url(../../../assets/images/invest/less.png) no-repeat
            .info
              display: block
              float:left
              width:50%
              height:100%
              text-align: right
              dt
                font-size:.28rem
                color:#333
                height:.4rem
                line-height:.4rem
                margin-bottom:.08rem
                margin-top:.29rem
              dd
                font-size:.22rem
                color:#999999
                height:.3rem
                line-height:.3rem
      .introduce
        padding-bottom: 1rem
</style>