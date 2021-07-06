const localStorageItemName = 'tagList';

const tagListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]') as string[];
  },
  save(data: string[]) {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(data));
  }
};

export default tagListModel;