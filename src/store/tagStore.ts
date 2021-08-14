import tagListModel from '@/models/tagListModel';

export default {
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名已存在');
    } else if (message === 'success') {
      window.alert('创建成功');
    }
  },
  updateTag: (id:string, name: string) => {
    return tagListModel.update(id, name)
  },
  removeTag: (id:string) => {
    return tagListModel.remove(id)
  },
  findTag(id:string) {
    return this.tagList.find(t => t.id === id)
  }
}