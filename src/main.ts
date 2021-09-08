import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onload = () => {
  setTimeout(() => window.scrollTo(0,200), 0)
}