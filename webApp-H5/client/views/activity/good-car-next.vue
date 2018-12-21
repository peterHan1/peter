<template>
  <div class="joinIn">
    <div class="top">
      <ul>
        <li>
          <div class="div_top">
            <p class="p_top" v-if="active[0]" :class="{color: hasData[0]}">姓名</p>
          </div>
          <div class="div_bot" :class="{activeTitle: active[0]}">
            <input type="text" @focus="onFocus('name')" @blur="onBlur('name')" :placeholder="nameTitle" v-model="name" class="name_inp" />
            <div class="dis_none empty" v-if="active[0]"></div>
          </div>
        </li>
        <li>
          <div class="div_top">
            <p class="p_top" v-if="active[1]" :class="{color: hasData[1]}">联系电话</p>
          </div>
          <div class="div_bot" :class="{activeTitle: active[1]}">
            <input type="number" @focus="onFocus('phone')" @blur="onBlur('phone')" :placeholder="phoneTitle" v-model="phone" class="phone_inp" />
            <div class="dis_none empty" v-if="active[1]"></div>
          </div>
        </li>
        <li>
          <div class="div_top">
            <p class="p_top" v-if="active[2]" :class="{color: hasData[2]}">联系地址</p>
          </div>
          <div class="tex_bot" :class="{activeTitle: active[2]}">
            <textarea class="site_inp" @focus="onFocus('address')" @blur="onBlur('address')" :placeholder="addressTitle" v-model="address"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <p class="txt">填写加盟信息，便于我们更好的沟通合作</p>
    <div class="bot">
      <ul>
        <li class="city" @click="cityShow = !cityShow">
          <div class="div_top">
            <p class="p_top" v-if="hasData[3]" :class="{color: hasData[3]}">合作意向区域</p>
          </div>
          <div class="div_bot" id="city">
            <p class="p_city">{{city}}</p>
            <span class="iconfont">&#xe83d;</span>
          </div>
        </li>
        <li class="citys">
          <div class="div_top">
            <p class="p_top" v-if="active[3]" :class="{color: hasData[4]}">意向区域详细地址</p>
          </div>
          <div class="tex_bot" :class="{activeTitle: active[3]}">
            <textarea class="sites_inp" @focus="onFocus('addressDetail')" @blur="onBlur('addressDetail')" :placeholder="addressDetailTitle" v-model="addressDetail"></textarea>
          </div>
        </li>
        <li class="com_li source_li">
          <div class="div_top">
            <p class="p_top" v-if="hasData[5]" :class="{color: hasData[5]}">分公司投资意向来源</p>
          </div>
          <div class="div_bot" @click="sourceClick">
            <p class="p_city">{{source}}</p>
            <input type="hidden" class="inp_source"/>
            <span class="iconfont">&#xe83d;</span>
          </div>
          <transition name="fade">
            <div class="bot_tab" v-if="sourceShow">
              <span @click.stop="sourceSelect('自由资金')" :class="{on: sourceActive[0]}">自由资金</span>
              <span @click.stop="sourceSelect('部分自由资金')" :class="{on: sourceActive[1]}">部分自由资金</span>
              <span @click.stop="sourceSelect('合作资金')" :class="{on: sourceActive[2]}">合作资金</span>
            </div>
          </transition>
        </li>
        <li class="com_li nature_li">
          <div class="div_top">
            <p class="p_top" v-if="hasData[6]" :class="{color: hasData[6]}">分公司投资性质</p>
          </div>
          <div class="div_bot" @click="typeClick">
            <p class="p_city">{{type}}</p>
            <span class="iconfont">&#xe83d;</span>
          </div>
          <transition name="fade">
            <div class="bot_tab" v-if="typeShow">
              <span @click.stop="typeSelect('个人投资')" :class="{on: typeActive[0]}">个人投资</span>
              <span @click.stop="typeSelect('合伙投资')" :class="{on: typeActive[1]}">合伙投资</span>
              <span @click.stop="typeSelect('其他')" :class="{on: typeActive[2]}">其他</span>
            </div>
          </transition>
        </li>
        <li class="time" @click="dateShow = !dateShow">
          <div class="div_top">
            <p class="p_top p_time" v-if="hasData[7]" :class="{color: hasData[7]}">希望开业时间</p>
          </div>
          <div class="div_bot" id="time">
            <p class="p_city" id="p_time">{{time}}</p>
            <span class="iconfont">&#xe83d;</span>
          </div>
        </li>
        <li>
          <div class="div_top">
            <p class="p_top" v-if="active[4]" :class="{color: hasData[8]}">计划投资总额（元）</p>
          </div>
          <div class="div_bot" :class="{activeTitle: active[4]}">
            <input type="text" @focus="onFocus('invest')" @blur="onBlur('invest')" :placeholder="investTitle " class="money_inp" v-model="invest" @keyup="invest = String(invest).replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')"/>
          </div>
        </li>
        <li class="reason_li">
          <div class="div_top">
            <p class="p_top" v-if="active[5]" :class="{color: hasData[9]}">加盟理由</p>
          </div>
          <div class="tex_bot" :class="{activeTitle: active[5]}">
            <textarea rows="2" class="reason_inp" @focus="onFocus('join')" @blur="onBlur('join')" :placeholder="joinTitle" v-model="join"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="div_btn">
      <span class="btn">申请加盟</span>
      <p>如有问题请咨询拓道客服：<span class="phone">400-998-7666</span></p>
    </div>
    <city-select @cityValue="getCityValue" :city-show="cityShow" @on-close="cityShow = false"></city-select>
    <time-select @dateValue="getDateValue" :date-show="dateShow" @on-close="dateShow = false"></time-select>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '我要加盟'
  },
  data () {
    return {
      nameTitle: '您的姓名',
      phoneTitle: '联系电话',
      addressTitle: '联系地址',
      addressDetailTitle: '意向区域详细地址',
      investTitle: '计划投资总额',
      joinTitle: '加盟理由',
      name: '',
      phone: '',
      address: '',
      city: '合作意向区域',
      addressDetail: '',
      source: '分公司投资意向来源',
      type: '分公司投资性质',
      time: '希望开业时间',
      invest: '',
      join: '',
      sourceShow: false,
      sourceActive: [false, false, false],
      typeShow: false,
      typeActive: [false, false, false],
      hasData: [false, false, false, false, false, false, false, false, false, false],
      active: [false, false, false, false, false, false],
      cityShow: false,
      dateShow: false
    }
  },
  methods: {
    onFocus (type) {
      switch (type) {
        case 'name':
          this.active[0] = true
          this.hasData[0] = false
          this.nameTitle = '请输入您的姓名'
          break
        case 'phone':
          this.active[1] = true
          this.hasData[1] = false
          this.phoneTitle = '请输入联系电话'
          break
        case 'address':
          this.active[2] = true
          this.hasData[2] = false
          this.addressTitle = '请输入联系地址'
          break
        case 'addressDetail':
          this.active[3] = true
          this.hasData[4] = false
          this.addressDetailTitle = '请输入意向区域详细地址'
          break
        case 'invest':
          this.active[4] = true
          this.hasData[8] = false
          this.investTitle = '请输入计划投资总额'
          break
        case 'join':
          this.active[5] = true
          this.hasData[9] = false
          this.joinTitle = '请输入加盟理由'
          break
      }
    },
    onBlur (type) {
      switch (type) {
        case 'name':
          this.nameTitle = '您的姓名'
          if (this.name === '') {
            this.active[0] = false
            this.hasData[0] = false
          } else {
            this.active[0] = true
            this.hasData[0] = true
          }
          break
        case 'phone':
          this.phoneTitle = '联系电话'
          if (this.phone === '') {
            this.active[1] = false
            this.hasData[1] = false
          } else {
            if (!(/^1[345678]\d{9}$/.test(this.phone))) {
              // 请输入正确的手机号
            }
            this.active[1] = true
            this.hasData[1] = true
          }
          break
        case 'address':
          this.addressTitle = '联系地址'
          if (this.address === '') {
            this.active[2] = false
            this.hasData[2] = false
          } else {
            this.active[2] = true
            this.hasData[2] = true
          }
          break
        case 'addressDetail':
          this.addressDetailTitle = '意向区域详细地址'
          if (this.addressDetail === '') {
            this.active[3] = false
            this.hasData[4] = false
          } else {
            this.active[3] = true
            this.hasData[4] = true
          }
          break
        case 'invest':
          this.investTitle = '计划投资总额'
          if (this.invest === '') {
            this.active[4] = false
            this.hasData[8] = false
          } else {
            this.invest = Number(this.invest).toFixed(2)
            this.active[4] = true
            this.hasData[8] = true
          }
          break
        case 'join':
          this.joinTitle = '加盟理由'
          if (this.join === '') {
            this.active[5] = false
            this.hasData[9] = false
          } else {
            this.active[5] = true
            this.hasData[9] = true
          }
          break
      }
    },
    sourceClick () {
      this.sourceShow = !this.sourceShow
      if (this.source === '分公司投资意向来源') {
        this.hasData[5] = false
      } else {
        this.hasData[5] = true
      }
    },
    sourceSelect (type) {
      this.source = type
      this.hasData[5] = true
      if (type === '自由资金') {
        this.sourceActive = [true, false, false]
      } else if (type === '部分自由资金') {
        this.sourceActive = [false, true, false]
      } else {
        this.sourceActive = [false, false, true]
      }
      setTimeout(() => {
        this.sourceShow = !this.sourceShow
      }, 100)
    },
    typeClick () {
      this.typeShow = !this.typeShow
      if (this.type === '分公司投资性质') {
        this.hasData[6] = false
      } else {
        this.hasData[6] = true
      }
    },
    typeSelect (type) {
      this.type = type
      this.hasData[6] = true
      if (type === '个人投资') {
        this.typeActive = [true, false, false]
      } else if (type === '合伙投资') {
        this.typeActive = [false, true, false]
      } else {
        this.typeActive = [false, false, true]
      }
      setTimeout(() => {
        this.typeShow = !this.typeShow
      }, 100)
    },
    investKeyUp () {
      this.invest = this.invest
    },
    getCityValue (value) {
      this.city = value
      this.hasData[3] = true
    },
    getDateValue (value) {
      this.time = value
      this.hasData[7] = true
    }
  }
}
</script>
<style lang="stylus" scoped>
  *
    -webkit-overflow-scrolling: touch
    box-sizing:border-box
  .phone_btn
    width:100%
    border-top:1px solid #e4e4e4
    overflow: hidden
    span
      display: inline-block
      width:45%
      line-height:0.8rem
      text-align:center
      &:nth-child(1)
        border-right: 1px solid #e4e4e4
        cursor:pointer
      a
        display: inline-block
        width:100%
        height:100%
        color:#ff7400
  input,textarea
    -webkit-appearance: normal
    -moz-appearance: normal
    -o-appearance: normal
    appearance: normal
    border:none
    outline:none
  .div_bot input::-webkit-input-placeholder
    color: #626262
  .div_bot input:-moz-placeholder
    color:#626262
  .div_bot input::-moz-placeholder
    color:#626262
  .div_bot input:-ms-input-placeholder
    color:#626262
  .tex_bot textarea::-webkit-input-placeholder
    color: #626262
  .activeTitle input::-webkit-input-placeholder
    color: #ccc
  .activeTitle input:-moz-placeholder
    color:#ccc
  .activeTitle input::-moz-placeholder
    color:#ccc
  .activeTitle input:-ms-input-placeholder
    color:#ccc
  .activeTitle textarea::-webkit-input-placeholder
    color: #ccc
  .activeTitle input::-webkit-input-placeholder
    color: #ccc
  .activeTitle input:-moz-placeholder
    color:#ccc
  .activeTitle input::-moz-placeholder
    color:#ccc
  .activeTitle input:-ms-input-placeholder
    color:#ccc
  .activeTitle textarea::-webkit-input-placeholder
    color: #ccc
  .activeTitle input::-webkit-input-placeholder
    color: #ccc
  .activeTitle input:-moz-placeholder
    color:#ccc
  .activeTitle input::-moz-placeholder
    color:#ccc
  .activeTitle input:-ms-input-placeholder
    color:#ccc
  .activeTitle textarea::-webkit-input-placeholder
    color: #ccc
  .joinIn
    background-color:#f2f3f7
    overflow: hidden
    font-family:"Microsoft YaHei"
    .top
      width:100%
      margin-top:0.2rem
      li
        width:100%
        height:1.1rem
        padding:0 0.3rem
        position:relative
        border-bottom:1px solid #e4e4e4
        overflow:hidden
        background-color:#fff
        font-size:0.26rem
        &:nth-child(3)
          height:1.6rem
          border:none
        .div_top
          height:0.4rem
          overflow: hidden
        .p_top
          line-height:0.5rem
          font-size:0.22rem
          color:#ff7400
        .color
          color:#b6b5b6
        .div_bot
          height:0.66rem
          line-height:0.66rem
          input
            width:100%
            height:100%
            font-size:0.28rem
            color:#212a36
            caret-color:#ff7400
          div
            position:absolute
            right:0
            top:0.4rem
            width:0.24rem
            height:0.24rem
            margin:0.2rem
            background:url(../../assets/images/activity/good-car/x.png) no-repeat
            background-size:100% 100%
            z-index: 999
    .tex_bot
      height:0.96rem
      margin-top:0.18rem
      textarea
        width:100%
        height:100%
        font-family:"Microsoft YaHei"
        resize: none
        outline: none
        border: none
        font-size:0.28rem
        color:#212a36
        caret-color:#ff7400
    .txt
      line-height:0.6rem
      font-size:0.2rem
      color:#7e7e7e
      padding:0 0.3rem
    .inp_bot input::-webkit-input-placeholder
      color: #cacaca
    .inp_bot input:-moz-placeholder
      color:#cacaca
    .inp_bot input::-moz-placeholder
      color:#cacaca
    .inp_bot input:-ms-input-placeholder
      color:#cacaca
    .inp_bot textarea::-webkit-input-placeholder
      color: #cacaca

    .bot li
      width:100%
      height:1.1rem
      padding:0 0.3rem
      border-bottom:1px solid #e4e4e4
      background-color:#fff
      font-size:0.26rem
      .div_top
        height:0.4rem
        overflow: hidden
      .p_top
        line-height:0.5rem
        font-size:0.22rem
        color:#ff7400
      .color
        color:#b6b5b6
      .div_bot
        height:0.66rem
        line-height:0.66rem
      .p_city
        width:92%
        float:left
        color:#626262
        font-size:0.28rem
      span
        float:right
        font-size:0.2rem
        font-weight: normal
      .deg
        transform:rotate(90deg)
      &.citys
        height:1.6rem
      &.com_li
        padding:0
        height:auto
      &.com_li .div_top
        padding:0 0.3rem
      &.com_li .div_bot
        padding:0 0.3rem
      .bot_tab
        width:100%
        height:1rem
        background-color:#f2f3f7
        padding:0.18rem 0
        span
          display:inline-block
          font-size:0.26rem
          margin-left:0.3rem
          padding:0.1rem 0.4rem
          float: left
          border:1px solid #212a36
          color:#212a36
          border-radius:5px
          &.on
            color:#fff
            background-color:#ff7400
            border-color:#ff7400
      &.nature_li .bot_tab span
        width:1.89rem
        padding:0.1rem 0
        text-align:center
        margin-right:0.3rem
      &.nature_li .bot_tab span:nth-child(3)
        margin-right:0
      &.reason_li
        height:1.6rem
        border-bottom: none
    .div_btn
      width:100%
      padding:0 0.3rem 0.5rem
      margin-top:0.6rem
      text-align: center
      .btn
        display: inline-block
        width:100%
        height:0.8rem
        line-height:0.8rem
        text-align:center
        border-radius:5px
        background-color:#cacaca
        color:#fff
    .div_btn .sub_btn
      background-color:#d3b580
    .div_btn
      p
        margin-top:0.16rem
        font-size:0.2rem
        color:#7e7e7e
        text-align:center
      .phone
        color:#ff7400
        font-size:0.26rem
      .log
        display: inline-block
        width:1.92rem
        height:0.23rem
        margin:1rem 0 0.4rem 0
        background:url(../../assets/images/activity/good-car/log.png) no-repeat
        background-size:100% 100%
  .fade-enter-active
    transition: opacity .1s
  .fade-leave-active
    transition: opacity .4s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>