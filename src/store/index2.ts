import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';
console.log('我执行了1次')

const store = {
  ...recordStore,
  ...tagStore

}

export default store