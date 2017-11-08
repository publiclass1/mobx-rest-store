import { observable, action, computed ,toJS} from 'mobx'
import uuid from 'uuid'
import _ from 'lodash'

const ID_NAME = '_id'

export class BaseModel {

  isNew = false
  id = null
  store = null

  @observable saving = false
  @observable saved = false
  @observable removing = false
  @observable removed = false
  @observable fetching = false
  @observable fetched = false

  data = observable.map({})

  constructor(store, data) {
    this.store = store
    this.id = _.get(data, this.getIdName(), null)
    
    this.merge(data)

    if (this.id === null) {
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

  @computed
  get toPlainObject(){
    return toJS(this.data)
  }

  @action
  save() {
    if (!this.store) throw new Error('Store is required!')

    this.saving = true
    this.saved = false

    return this.store.save(this)
      .then(action(model => {
        this.saving = false
        this.saved = true
        
        return model
      }), action(e => {
        this.saving = false
        return e
      }))
  }

  @action
  remove() {
    if (!this.store) throw new Error('Store is required!')
    this.removing = true
    this.removed = false

    return this.store.remove(this)
      .then(action(() => {
        this.removing = false
        this.removed = true
        return {}
      }), action((e) => {
        this.removing = false
        return e
      }))
  }
}