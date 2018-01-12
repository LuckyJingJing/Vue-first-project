// 一、导入第三方包
import Vue from 'vue'
//三、导入根组件
import App from './component/App.vue'

//
new Vue({
  el:"#App",
  //挂载根组件
  render:function(createElement){
    return createElement(App)
  }
})