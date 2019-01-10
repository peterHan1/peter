import Tab from './tab.vue'
import TabBar from './tab-bar.vue'

TabBar.install = function(Vue) {
  Vue.component(Tab.name, Tab)
  Vue.component(TabBar.name, TabBar)
}

TabBar.Tab = Tab

export default TabBar
