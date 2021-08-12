import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem) => {
  recordListModel.create(record)
}

window.tagList = tagListModel.fetch()
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名已存在');
  } else if (message === 'success') {
    window.alert('创建成功');
  }
}
window.updateTag = (id:string, name: string) => {
  return tagListModel.update(id, name)
}
window.removeTag = (id:string) => {
  return tagListModel.remove(id)
}
window.findTag = (id:string) => {
  return window.tagList.find(t => t.id === id)
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
