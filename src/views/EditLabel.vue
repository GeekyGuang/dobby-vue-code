<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="back"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name"
                @update:value="getName"
                field-name="标签名"
                placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除</Button>
      <Button @click="update">更新</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue{
  name = ''

  getName(name: string): void {
    this.name = name
  } 

  get currentTag() {
    return this.$store.state.currentTag
  }

  created(){
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',this.$route.params.id)
    this.name = this.currentTag.name
    this.$store.state.currentType = this.currentTag.type
    if (!this.currentTag) {
      this.$router.replace('/404')
    }
  }

  update():void {
    if(this.name === '') {
      this.$message({
        message: '标签名不可为空',
        type: 'warning'
      });
      return
    }
    if(this.currentTag){
      this.$store.commit('updateTag',{id:this.currentTag.id, name: this.name, type: this.currentTag.type })
    }
  }

  remove():void {
    this.$confirm('是否删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.currentTag) {
            this.$store.commit('removeTag',this.currentTag.id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch((e) => {
            console.log(e.message)    
        });

  }

  back():void {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #16b6ae;
  >.title{}
  >.leftIcon{
    width: 24px;
    height: 24px;
  }
  >.rightIcon{
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  .button:nth-child(1) {
    margin-right: 8px;
    background: #ff9cab;
  }
  text-align: center;
  padding: 16px;
  margin-top: 44px;
}
</style>