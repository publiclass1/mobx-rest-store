import { Collection, BaseModel, AxiosTransportApi } from '../../src/index'
import assert from 'assert'
import mockApi from './mock-api/index'


var mockAxiosApi = mockApi()

describe('Collection', () => {

  let transportApi = new class TransportMockApi extends AxiosTransportApi {
    constructor() {
      super('/Persons')
    }

    api() {
      return mockAxiosApi
    }
  }

  class StoreModel extends BaseModel {
    getFields() {
      return ['_id', 'name', 'createdAt', 'updatedAt']
    }
  }

  let stores = new class Stores extends Collection {
    model = StoreModel
    constructor() {
      super()
      this.api = transportApi
    }
  }

  it('#build()', () => {
    const model = stores.build({_id: 20, name: 'jhon cena' })

    assert.equal(model.isNew, false)
    assert.equal(model.get('name'), 'jhon cena')
    assert.equal(model.id, 20)

    model.remove()
  })

  it('#fetch()', (done) => {

    stores.fetch().then(models => {
      //not empty
      assert.notEqual(models, [])

      //2 is the current sample data
      assert.equal(stores.models.length, 2)

      done()
    }).catch(e => {
      done(e)
    })
  })

  it('#findWhere', (done) => {
    stores.fetch().then(() => {
      const model = stores.findWhere({_id: 1})
      
      assert.equal(model.id, 1)
      done()
    }).catch(e=> done(e))
  })

  it('#findAllWhere', (done) => {
    stores.fetch().then(() => {
      const models = stores.findAllWhere({ level: 1})

      //2 is the current sample data has a level 1
      assert.equal(models.length, 2) 
      done()
    }).catch(e=> done(e))
  })


  it('#remove', (done) => {
    const model = stores.build({ name: 'arlong' })

    const oldLength = stores.models.length
    model.remove()
      .then(() => {
        return stores.remove(model).then(() => {
          assert.equal(stores.models.length, oldLength - 1)
          done()
        })
      }).catch(e => done(e))
  })


  it('#save()', done => {
    let model = new StoreModel(stores, { name: 'mill' })

    //Create
    stores.save(model).then(saveModel => {
      //check name
      assert.equal(saveModel.get('name'), 'mill')

      // check if isNew from model changed to false
      assert.equal(saveModel.isNew, false)

      // update the savedModel name to andrew
      return saveModel.set('name', 'andrew')
        .save()
        .then(updatedModel => {

          assert.equal(updatedModel.get('name'), 'andrew')
          // model get and set default value to null
          // and asserting if not equal then the value is a valid date
          assert.notEqual(updatedModel.get('updatedAt', null), null)
          done()
        })

    }).catch(e => {
      done(e)
    })
  })

  it('#clear()', () => {
    stores.clear()
    assert.equal(stores.models.length, 0)
  })


})