import _ from 'lodash'

const DEMO_DATA = [
  { _id: 1, name: 'john' , level: 1},
  { _id: 2, name: 'wick' , level: 1},
]

class MockApi {
  constructor() {
    this.samples = DEMO_DATA
  }

  get(path, { params }) {
    if (params) {
      return Promise.resolve({
        data: this.samples
      })
    }
    const id = _.last(_.split(path, '/'))
    return Promise.resolve({
      data: _.find(this.samples, { _id: id })
    })
  }

  find() {

  }

  post(path, data) {

    const newData = { ...data, _id: _.random(3, 10), createdAt: new Date() }
    this.samples.push(newData)
    return Promise.resolve({
      data: newData
    })
  }

  update(path, data) {
    return this.patch(path, data)
  }

  patch(path, data) {
    const id = _.last(_.split(path, '/'))
    
    const foundData = _.find(this.samples, { _id: parseInt(id) })

    if (!foundData) {
      return Promise.reject({
        errorCode: 'NOT_FOUND'
      })
    }
    return Promise.resolve({
      data: { ...foundData, ...data, updatedAt: new Date() }
    })
  }

  delete(path) {
    const id = _.last(_.split(path, '/'))
    this.samples = this.samples.filter(person => person._id !== id)

    return Promise.resolve({})
  }


  reset(){
    this.samples = DEMO_DATA
  }
}

export default () => new MockApi()