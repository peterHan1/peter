使用说明：主要用于审计报告的查看演示，效果，全屏图片通过拖拽分别观看展示
<swiper-slide :items="items"></swiper-slide>
items是父组件中传的图片数组
例如：
import img1 from '../../../assets/images/inform/audit/audit_finance_01.png'
import img2 from '../../../assets/images/inform/audit/audit_finance_02.png'
import img3 from '../../../assets/images/inform/audit/audit_finance_03.png'

items: [img1, img2, img3]