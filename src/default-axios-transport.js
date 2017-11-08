import axios from 'axios'
import { ApiModel } from './api-model'


export class AxiosTransportApi extends ApiModel {
  endpoint = '/'
  baseUrl = 'http://localhost/api/v1'

  constructor(endpoint) {
    super()
    this.endpoint = endpoint
  }

  api() {
    return axios.create({
      baseUrl: this.baseUrl,
      timeout: 25000
    })
  }

  get(id) {
    return this.api().get(`${this.endpoint}/${id}`).then(rs => rs.data)
  }

  find(params) {
    return this.api().get(`${this.endpoint}`, {
      params: params
    }).then(rs => rs.data)
  }

  create(data) {
    return this.api().post(this.endpoint, data).then(rs => rs.data)
  }

  update(id, data) {
    return this.api().patch(`${this.endpoint}/${id}`, data).then(rs => rs.data)
  }

  remove(id) {
    return this.api().delete(`${this.endpoint}/${id}`).then(rs => rs.data)
  }
}