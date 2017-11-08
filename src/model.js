import { observable, action, computed } from 'mobx'
import uuid from 'uuid'

const ID_NAME = '_id'

export class BaseModel {

  isNew = true
  id = null
  store = null

  data = observable.map({})

  constructor(store, data) {
    this.store = store
    this.id = data[this.getIdName()]
    this.data = data
    if (!this.id) {
      this.isNew = true
      this.id = uuid.v4()
    }
  }

  getIdName() { return ID_NAME }
  getFields() { return [] }

  get(key, defaultValue = null) {
    const data = toJS(this.data) || {}
    return _.get(data, key, defaultValue)
  }

  @action
  set(key, val) {
    let data = toJS(this.data) || {}
    _.set(data, key, val)
    return this.merge(data)
  }

  @action
  merge(data = {}) {
    if (!_.isPlainObject) throw new Error('Accepts only a plain object e.g. {a: 1}')
    this.data.merge(data)
    return this
  }

  @computed
  get toJS() {
    let data = {}
    const fields = this.getFields()
    fields.forEach(field => data[field] = this.get(field))

    return data
  }

  save() {
    if (!this.store) throw new Error('Store is required!')
    return this.store.save(this)
  }
}