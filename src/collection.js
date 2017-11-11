import { observable, action, toJS, computed } from 'mobx'
import { BaseModel } from './model'
import { ApiModel } from './api-model'
import _ from 'lodash'


export class Collection {

  @observable fetching = false
  @observable fetched = false

  @observable models = []
  model = BaseModel
  api = new ApiModel()


  getIdName() {
    const model = new this.model(this, {})
    return model.getIdName()
  }

  build(data) {
    let model = new this.model(this, data)

    if (model.isNew) {
      this.models.push(model)
    } else {
      let modelIsFound = this.findWhere({ [model.getIdName()]: model.id })

      if (!modelIsFound) {
        this.models.push(model)
      } else {
        model.merge(modelIsFound.toJS)
      }
    }

    return model
  }

  @action
  findWhere(predicate) {
    const dataList = this.models
    return _.find(dataList, (dl) => _.isMatch(dl.toPlainObject, predicate))
  }

  findAllWhere(predicate) {
    const dataList = this.models
    return _.filter(dataList, (dl) => _.isMatch(dl.toPlainObject, predicate))
  }

  @action
  get(id, requestToServer = false) {

    let model = null
    if (!requestToServer) {
      model = this.findWhere({ [this.getIdName()]: id })
      if(model){
        return Promise.resolve(model)
      }
    }
    
    return this.api.get(id).then(action(data => {
      const model = this.build(data)
      return model
    }))

  }

  fetch(params = {}) {
    return this.api.find(params)
      .then(action(rs => {
        let models = []
        for (let k in rs) {
          models.push(
            this.build(rs[k])
          )
        }
        return models
      }))
  }

  @action
  save(model) {
    if (!model) throw new Error('Invalid save parameters!')

    const data = model.toJS

    if (model.isNew) {
      return this.api.create(data)
        .then(action(rs => {
          model.id = _.get(rs, model.getIdName())
          model.isNew = false
          model.merge(rs)

          return model
        }))
    } else {
      return this.api.update(model.id, data)
        .then(action(rs => {
          model.merge(rs)
          return model
        }))
    }
  }

  @action
  remove(model) {
    if (!model) throw new Error('Invalid save parameters!')
    this.models = this.models.filter(mdl => mdl.id !== model.id)
    return this.api.remove(model.id)
  }

  @action
  clear() {
    this.models.length = 0
  }

  @computed
  get toJS() {
    return this.models.map(model => model.toJS)
  }
}