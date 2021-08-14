import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';
console.log('我执行了1次')

const store = {
  count: 0,
  addCount(){
    this.count += 1
  },
  ...recordStore,
  ...tagStore

}

export default store