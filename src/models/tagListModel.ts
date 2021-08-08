import createId from '@/lib/idCreator';

const localStorageItemName = 'tagList';

type tag = {
  id: string
  name: string
}

type TagListModel = {
  data: tag[],
  fetch: () => tag[],
  create: (name: string) => 'success' | 'duplicated',  // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated',
  remove: (id: string) => boolean,
  save: () => void
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id = createId().toString()
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const ids = this.data.map(item => item.id);
    if (ids.indexOf(id) >= 0) {
      const tag = this.data.filter(item => item.id === id)[0];
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
  remove(id) {
    let index = -1
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id){
        index = i
        break
      }
    }
    this.data.splice(index, 1)
    this.save()
    return true
  },
  save() {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(this.data));
  }
};

export default tagListModel;