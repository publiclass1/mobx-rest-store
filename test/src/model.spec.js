import { Collection, BaseModel, AxiosTransportApi } from '../../src/index'
import assert from 'assert'
import mockApi from './mock-api/index'


var mockAxiosApi = mockApi()

describe('Model', () => {

  /**
   * Initialize
   */
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

  // End of initialization



  it('#build() Generate a new model entry', () => {

    //build a model
    const model = stores.build({ name: 'jhon' })
    assert.equal(model.isNew, true)
    assert.equal(model.get('name'), 'jhon')
    assert.notEqual(model.id, null)
  })

  it('#save() and create an entry if not exist ', (done) => {

    const model = stores.build({ name: 'jhon wick' })
    model.save().then(() => {
      assert.equal(model.isNew, false)
      assert.equal(model.get('name'), 'jhon wick')

      // updatedAt field generated on mockup like on a server
      assert.notEqual(model.get('createdAt'), null)

      done()
    }).catch(e => done(e))
  })


  it('#save() a model and patch if id is exist', (done) => {

    const model = stores.build({ name: 'batman' })
    model.save().then(() => {

      assert.equal(model.isNew, false)
      assert.equal(model.get('name'), 'batman')

      model.set('name', 'Wonderwoman')
      model.save().then(() => {

        assert.equal(model.get('name'), 'Wonderwoman')

        // updatedAt field generated on mockup like on a server
        assert.notEqual(model.get('updatedAt'), null)

        done()
      })

    }).catch(e => done(e))
  })

  it('#getIdName()', () => {
    const model = stores.build({ name: 'the id man' })
    assert.equal(model.getIdName(), '_id')
  })
  it('#getFields() the model fields', () => {
    const model = stores.build({ name: 'the id man' })
    assert.deepEqual(model.getFields(), ['_id', 'name', 'createdAt', 'updatedAt'])
  })

  it('#set(key,value) set a field and value', () => {
    const model = stores.build({})
    model.set('first', 'bat')
    model.set('last', 'man')

    assert.equal(model.get('first'), 'bat')
    assert.equal(model.get('last'), 'man')
  })

  it('#get(key,value) get a value using a key', () => {
    const model = stores.build({ power: 'flying kick' })
    assert.equal(model.get('power'), 'flying kick')
  })

  it('#set(nested.key,value) set a value using a nested.key', () => {
    const model = stores.build({ partner: 'robin' })
    model.set('power.special', 'eating')

    assert.equal(model.get('power').special, 'eating')
  })

  it('#get(nested.key,value) get a value using a nested.key', () => {
    const model = stores.build({ partner: 'robin', power: { level: 100, special: 'round kick' } })

    assert.equal(model.get('power.level'), 100)
  })


  it('#merge()', () => {
    const model = stores.build({ partner: 'robin', power: { level: 100, special: 'round kick' } })

    model.merge({ power: { position: 'top' } })
    assert.equal(model.get('power.position'), 'top')
  })

  it('#remove()', (done) => {
    const model = stores.build({ surename: 'myname' })
    assert.equal(model.get('surename'), 'myname')
    assert.equal(model.removing, false)

    const oldLength = stores.models.length

    model.remove().then((rs) => {

      assert.equal(rs._id, undefined)
      assert.equal(stores.models.length, oldLength - 1)

      done()
    }).catch(e => done(e))
  })

})