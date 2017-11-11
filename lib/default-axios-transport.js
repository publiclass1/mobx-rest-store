'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxiosTransportApi = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _apiModel = require('./api-model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AxiosTransportApi = exports.AxiosTransportApi = function (_ApiModel) {
  (0, _inherits3.default)(AxiosTransportApi, _ApiModel);

  function AxiosTransportApi(endpoint) {
    (0, _classCallCheck3.default)(this, AxiosTransportApi);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AxiosTransportApi.__proto__ || (0, _getPrototypeOf2.default)(AxiosTransportApi)).call(this));

    _this.endpoint = '/';
    _this.baseUrl = 'http://localhost/api/v1';

    _this.endpoint = endpoint;
    return _this;
  }

  (0, _createClass3.default)(AxiosTransportApi, [{
    key: 'api',
    value: function api() {
      return _axios2.default.create({
        baseURL: this.baseUrl,
        timeout: 25000
      });
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this.api().get(this.endpoint + '/' + id).then(function (rs) {
        return rs.data;
      });
    }
  }, {
    key: 'find',
    value: function find(params) {
      return this.api().get('' + this.endpoint, {
        params: params
      }).then(function (rs) {
        return rs.data;
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.api().post(this.endpoint, data).then(function (rs) {
        return rs.data;
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      return this.api().patch(this.endpoint + '/' + id, data).then(function (rs) {
        return rs.data;
      });
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      return this.api().delete(this.endpoint + '/' + id).then(function (rs) {
        return rs.data;
      });
    }
  }]);
  return AxiosTransportApi;
}(_apiModel.ApiModel);