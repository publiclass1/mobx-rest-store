import { Collection, BaseModel, AxiosTransportApi } from '../../src/index'
import assert from 'assert'

describe('Transporter', () => {

  let BASE_URL = 'http://localhost:3030/api/v1'
  let ENDPOINT = 'Persons'

  let transportApi = new class TransportMockApi extends AxiosTransportApi {
    baseUrl = BASE_URL
    constructor() {
      super('/Persons')
    }
  }

  let stores = new class Stores extends Collection {
    api = transportApi
  }

  it('Makes a concat BASE_URL and ENDPOINT', () => {

    const API_URL = BASE_URL + '/' + ENDPOINT
    const axiosAPI = stores.api.api().defaults.baseURL + '/' + ENDPOINT
    assert.equal(axiosAPI, API_URL)
  })
})