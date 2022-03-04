import { Message } from 'element-ui'
import { RecordItem, Tag } from './../custom.d'
import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/idCreator'
import router from '@/router'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[]
  tagList: Tag[]
  currentTag?: Tag
  createTagErrorFlag: Error | null
  output: string
  currentType?: string
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createTagErrorFlag: null,
    output: '0',
    currentType: '-',
  } as RootState,
  mutations: {
    inputContent(state, input: string) {
      if (state.output.length === 16) {
        return
      }
      if (state.output === '0' && '0123456789'.indexOf(input) >= 0) {
        state.output = input
        return
      }
      if (state.output.indexOf('.') >= 0 && input === '.') {
        return
      }
      state.output += input
    },
    removeOutput(state) {
      if (state.output.length === 1) {
        state.output = '0'
      } else {
        state.output = state.output.slice(0, -1)
      }
    },
    clearOutput(state) {
      state.output = '0'
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem('recordList') || '[]'
      ) as RecordItem[]
      if (!state.recordList || state.recordList.length === 0) {
        store.commit('createRecord', {
          amount: 2,
          createAt: '2022-03-01T02:47:27.821Z',
          notes: '',
          tags: [{ id: '1', name: '公交', type: '-' }],
          type: '-',
        })
        store.commit('createRecord', {
          amount: 16,
          createAt: '2022-02-02T02:47:27.821Z',
          notes: '',
          tags: [{ id: '2', name: '奶茶', type: '-' }],
          type: '-',
        })

        store.commit('createRecord', {
          amount: 500,
          createAt: '2022-03-04T02:56:05.068Z',
          notes: '',
          tags: [{ id: '7', name: '兼职', type: '+' }],
          type: '+',
        })
        store.commit('saveRecords')
      }
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record)
      record2.createAt = new Date()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem(
        'recordList',
        JSON.stringify(state.recordList)
      )
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!store.state.tagList || store.state.tagList.length === 0) {
        store.commit('createTag', { name: '公交', type: '-' })
        store.commit('createTag', { name: '奶茶', type: '-' })
        store.commit('createTag', { name: '地铁', type: '-' })
        store.commit('createTag', { name: '酒吧', type: '-' })
        store.commit('createTag', { name: '工资', type: '+' })
        store.commit('createTag', { name: '彩票', type: '+' })
        store.commit('createTag', { name: '兼职', type: '+' })
      }
    },
    createTag(state, payload: { name: string; type: string }) {
      const { name, type } = payload
      state.createTagErrorFlag = null
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagErrorFlag = new Error('tag name duplicated')
        return
      }
      const id = createId().toString()
      state.tagList.push({ id, name, type })
      store.commit('saveTag')
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.find((t) => t.id === id)
    },
    updateTag(state, payload: { id: string; name: string; type: string }) {
      const { id, name, type } = payload
      console.log(id, name, type)
      const ids = state.tagList.map((item) => item.id)
      if (ids.indexOf(id) >= 0) {
        const otherTags = state.tagList.filter(
          (item) => item.id !== id && item.type === type
        )
        console.log(otherTags)

        const sameTag = otherTags.filter((i) => i.name === name)
        if (sameTag.length > 0) {
          Message.error('标签名已存在')
        } else {
          const tag = state.tagList.filter((i) => i.id === id)[0]
          tag.name = name
          store.commit('saveTag')
          Message({
            message: '更新成功',
            type: 'success',
          })
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      state.tagList.splice(index, 1)
      store.commit('saveTag')
      router.back()
    },
  },
})

export default store
