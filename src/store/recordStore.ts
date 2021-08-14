import clone from '@/lib/clone'

const localStorageItemName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageItemName) || '[]') as RecordItem[];
    return this.recordList
  },
  createRecord (record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.recordList.push(record2);
    this.saveRecords()
  },
  saveRecords() {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(this.recordList));
  }
}

recordStore.fetchRecords()

export default recordStore