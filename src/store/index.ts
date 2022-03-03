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
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createTagErrorFlag: null,
    output: '0',
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
        store.commit('createTag', '公交')
        store.commit('createTag', '奶茶')
        store.commit('createTag', '地铁')
        store.commit('createTag', '酒吧')
      }
    },
    createTag(state, name: string) {
      state.createTagErrorFlag = null
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagErrorFlag = new Error('tag name duplicated')
        return
      }
      const id = createId().toString()
      state.tagList.push({ id, name: name })
      store.commit('saveTag')
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.find((t) => t.id === id)
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload
      const ids = state.tagList.map((item) => item.id)
      if (ids.indexOf(id) >= 0) {
        const tag = state.tagList.filter((item) => item.id === id)[0]
        if (tag.name === name) {
          window.alert('标签名重复')
        } else {
          tag.name = name
          store.commit('saveTag')
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
