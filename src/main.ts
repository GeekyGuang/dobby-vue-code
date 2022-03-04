import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import { MessageBox, Message, DatePicker } from 'element-ui'
import './assets/style/element-variables.scss'

Vue.prototype.$msgbox = MessageBox

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.use(DatePicker, { size: 'small' })
Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

window.onload = () => {
  setTimeout(() => window.scrollTo(0, 200), 0)
}

// if (document.documentElement.clientWidth > 500) {
//   window.alert('请在手机端打开本页面，以保证浏览效果')
//   const img = document.createElement('img')
//   img.src = './qrcode.png'
//   img.style.position = 'fixed'
//   img.style.left = '50%'
//   img.style.top = '50%'
//   img.style.transform = 'translate(-50%, -50%)'
//   img.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)'
//   document.body.appendChild(img)
// }
