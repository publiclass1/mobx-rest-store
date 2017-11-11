[![Build Status](https://travis-ci.org/publiclass1/mobx-rest-store.svg?branch=master)](https://travis-ci.org/publiclass1/mobx-rest-store)

# mobx-rest-store
A mobx based collection and model inspired by backbonejs, and @mobx-rest


## Installation
npm
```
npm install --save mobx-rest-store mobx
```

yarn
```
yarn add mobx-rest-store
```

## Usage

```js
import { Collection, BaseModel, AxiosTransportApi } from 'mobx-rest-store'

class StoreModel extends BaseModel {
  getFields() {
    return ['_id', 'name', 'createdAt', 'updatedAt']
  }
}

class MyAPITransporter extends AxiosTransportApi{
  baseUrl='http://my.api.com'
}

let personApi = new class TransportMockApi extends MyAPITransporter {
  constructor() {
    super('/Persons')
  }
}

let stores = new class Stores extends Collection {
  model = StoreModel
  constructor() {
    super()
    this.api = personApi
  }
}


// Create new Person Model
const model = stores.build({name: 'Juan'})

// make changes
model.set('name', 'Peter')
model.save().then(()=>{
  console.log('saved')
}).catch(e=>{
  console.error(e)
})

// remove
model.remove().then(()=>{
  console.log('removed')
}).catch(e=>{
  console.error(e)
})

```