"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiModel = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiModel = exports.ApiModel = function () {
  function ApiModel() {
    (0, _classCallCheck3.default)(this, ApiModel);
  }

  (0, _createClass3.default)(ApiModel, [{
    key: "get",
    value: function get(id) {
      // eslint-disable-line
      return _promise2.default.resolve({});
    }
  }, {
    key: "find",
    value: function find(params) {
      // eslint-disable-line
      return _promise2.default.resolve([]);
    }
  }, {
    key: "create",
    value: function create(data) {
      // eslint-disable-line
      return _promise2.default.resolve({});
    }
  }, {
    key: "update",
    value: function update(id, data) {
      // eslint-disable-line
      return _promise2.default.resolve({});
    }
  }, {
    key: "remove",
    value: function remove(id) {
      // eslint-disable-line
      return _promise2.default.resolve({});
    }
  }]);
  return ApiModel;
}();