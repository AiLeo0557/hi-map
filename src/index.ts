import { default as MapZhe } from './MapZhe.vue'
import { default as MapZhong } from './MapZhong.vue'

export { MapZhe, MapZhong }
// 组件库的安装方法
export default {
  install(app: any) {
    // 全局注册组件
    app.component('MapZhe', MapZhe)
    app.component('MapZhong', MapZhong)
  }
}