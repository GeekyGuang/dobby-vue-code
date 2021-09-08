// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

const map:{[key: string]: string} = {
  'tag name duplicated': '标签名重复了'
}

// You can declare mixins as the same style as components.
@Component
export class tagHelper extends Vue {
  createTag(){
    const name = window.prompt('请输入标签名');
    if (!name) {
      window.alert('标签名不可为空')
      return
    }
    this.$store.commit('createTag', name)
    if (this.$store.state.createTagErrorFlag){
      window.alert(map[this.$store.state.createTagErrorFlag.message] || '未知错误')
    } else {
      window.alert('创建成功');
    }
  }
}