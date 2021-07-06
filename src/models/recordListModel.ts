import type {RecordItem} from '@/custom';

const localStorageItemName = 'recordList';

const recordListModel = {
  clone(data: RecordItem[] | RecordItem){
    return JSON.parse(JSON.stringify(data))
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(data));
  }
};

export default recordListModel;