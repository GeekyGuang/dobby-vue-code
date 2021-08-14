import createId from '@/lib/idCreator';
const localStorageItemName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]');
    return this.tagList;
  },
  createTag(name: string){
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名已存在')
      return 'duplicated';
    }
    const id = createId().toString()
    this.tagList.push({id, name: name});
    this.save();
    window.alert('创建成功');
    return 'success';
  },
  updateTag(id:string, name: string){
    const ids = this.tagList.map(item => item.id);
    if (ids.indexOf(id) >= 0) {
      const tag = this.tagList.filter(item => item.id === id)[0];
      if (tag.name === name) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  removeTag (id:string) {
    let index = -1
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id){
        index = i
        break
      }
    }
    this.tagList.splice(index, 1)
    this.save()
    return true
  },
  findTag(id:string) {
    return this.tagList.find(t => t.id === id)
  },
  save() {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(this.tagList));
  }
}

tagStore.fetchTags()

export default tagStore