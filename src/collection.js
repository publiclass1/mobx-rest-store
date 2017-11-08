import { observable, action, runInAction } from 'mobx'
import {BaseModel} from './model'
import {ApiModel} from './api-model'
import _ from 'lodash'


export class Collection {

  @observable models=[]
  model = BaseModel
  api = new ApiModel()

  build(data) {
    let model = new this.model(this, data)
    this.models.push(model)
    return model
  }


  @action
  save(model) {
    if (!model) throw new Error('Invalid save parameters!')

    const data = model.toJS

    if (model.isNew) {
      return this.api.create(data).then(rs => {
        runInAction(() => {
          model.id = _.get(rs, model.getIdName())
          model.isNew = false
          model.merge(rs)
        })

        return model
      })
    } else {
      return this.api.update(model.id, data).then(rs => {
        model.merge(rs)
        return model
      })
    }
  }
}