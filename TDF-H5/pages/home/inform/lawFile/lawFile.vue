<template>
  <div class="law">
    <td-header title="法律文件"/>
    <h3>法律法规</h3>
    <ul>
      <li>
        <router-link to="/home/inform/lawFile/law-xx">
          <span>互联网信息服务管理办法(2011修订)</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-jd">
          <span>网络借贷信息中介机构业务活动管理暂行办法 </span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-zjdj">
          <span>网络借贷信息中介机构备案登记管理指引</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-zjcg">
          <span>网络借贷资金存管业务指引</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-pl">
          <span>网络借贷信息中介机构业务活动信息披露指引</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
    </ul>
    <h3>规范性文件</h3>
    <ul>
      <li>
        <router-link to="/home/inform/lawFile/law-dx">
          <span>电信和互联网用户个人信息保护规定</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-cj">
          <span>关于促进互联网金融健康发展的指导意见</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
    </ul>
    <h3>监管政策</h3>
    <ul>
      <li>
        <router-link to="/home/inform/lawFile/law-fx">
          <span>P2P网络借贷风险专项整治工作实施方案</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-gf">
          <span>规范互联网信息服务市场秩序若干规定</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-kz">
          <span>开展互联网金融广告及以投资理财名义从事金融活动风险专项整治工作实施方案</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
    </ul>
    <h3>司法解释</h3>
    <ul>
      <li>
        <router-link to="/home/inform/lawFile/law-bl">
          <span>关于办理非法集资刑事案件适用法律若干问题的意见</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-ff">
          <span>最高人民法院关于非法集资刑事案件性质认定问题的通知</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-sl">
          <span>最高人民法院关于审理非法集资刑事案件具体应用法律若干问题的解释</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home/inform/lawFile/law-mj">
          <span>最高人民法院关于审理民间借贷案件适用法律若干问题的规定</span>
          <span class="iconfont fr">&#xe83d;</span>
        </router-link>
      </li>
    </ul>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../assets/images/inform/signature-2.png">
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '法律文件'
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .law
    padding-top: 0.88rem
    overflow: hidden
    h3
      background-color:$color-white
      margin-top: 0.2rem
      padding:0 0.3rem
      font-size: $fontsize-medium
      color: $color-gray1
      height: 0.8rem
      line-height: 0.8rem
      font-weight: normal
      border-bottom: 1px solid $color-gray5
    li
      width:100%
      padding:0.28rem 0.3rem
      border-bottom:1px solid $color-gray5
      background-color:$color-white
      box-sizing: border-box
      position:relative
      a
        display:block
        font-size:$fontsize-small-ss
        color:$color-gray8
        .iconfont
          font-size:$fontsize-small-ss
          position:absolute
          right:0.3rem
          top:35%
      span:nth-child(1)
        width:90%
        display: inline-block
    .inform_signature
      background-color: $color-white
      border-top: 0.2rem solid $color-background
      border-bottom: 0.2rem solid $color-background
      h3
        padding: 0
        margin-top: 0
      div
        padding: 0 0.3rem
      img
        width: 100%
        height: 3.8rem
</style>
