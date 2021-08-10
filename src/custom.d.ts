type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,
  createAt?: Date
}

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

interface Window {
  tagList: tag[];
}