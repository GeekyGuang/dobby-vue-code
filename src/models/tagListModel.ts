const localStorageItemName = 'tagList';

type tag = {
  id: string
  name: string
}

type TagListModel = {
  data: tag[],
  fetch: () => tag[],
  create: (name: string) => 'success' | 'duplicated',  // 联合类型
  save: () => void
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name)
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(this.data));
  }
};

export default tagListModel;