export class ApiModel {
  get(id) {
    return Promise.resolve({})
  }

  find(queryString) {
    return Promise.resolve([])
  }

  create(data) {
    return Promise.resolve({})
  }

  update(id, data) {
    return Promise.resolve({})
  }

  remove(id) {
    return Promise.resolve({})
  }
}