上拉加载，下拉刷新组件使用说明：
<load-more :load-top="loadTop" :load-bottom="loadBottom" :all-loaded="allLoaded"></load-more>
下拉刷新函数
loadTop(onTopLoaded){
  onTopLoaded() // 每次在执行下拉刷新函数的末日都加加上onTopLoaded(),该函数的作用是，对组件进行一些重新定位的操作，并反馈刷新成功信息，该函数可自定义名称（通过自定义参数名称）
}
上拉加载函数
loadBottom(onBottomLoaded){
  onBottomLoaded()// 每次在执行下拉刷新函数的末日都加加上onBottomLoaded(),该函数的作用是，对组件进行一些重新定位的操作，并反馈刷新成功信息（通过自定义参数名称）
}
上拉加载时的数据是否加载完全，boolean类型,true:已加载完全，false:未加载完全
allLoaded