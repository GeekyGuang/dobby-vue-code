// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名已存在',
}

// You can declare mixins as the same style as components.
@Component
export class tagHelper extends Vue {
  createTag() {
    this.$prompt('请输入标签名', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '标签名不可为空',
    })
      .then(({ value }) => {
        this.$store.commit('createTag', value)
        if (this.$store.state.createTagErrorFlag) {
          this.$message.error(
            map[this.$store.state.createTagErrorFlag.message] || '未知错误'
          )
        } else {
          this.$message({
            message: '创建成功!',
            type: 'success',
          })
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
          customClass: 'msg',
        })
      })
  }
}
