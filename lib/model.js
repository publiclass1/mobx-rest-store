'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseModel = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

var _mobx = require('mobx');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ID_NAME = '_id';

var BaseModel = exports.BaseModel = (_class = function () {
  function BaseModel(store, data) {
    (0, _classCallCheck3.default)(this, BaseModel);
    this.isNew = true;
    this.id = null;
    this.store = null;
    this.data = _mobx.observable.map({});

    this.store = store;
    this.id = data[this.getIdName()];
    this.data = data;
    if (!this.id) {
      this.isNew = true;
      this.id = _uuid2.default.v4();
    }
  }

  (0, _createClass3.default)(BaseModel, [{
    key: 'getIdName',
    value: function getIdName() {
      return ID_NAME;
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      return [];
    }
  }, {
    key: 'get',
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var data = toJS(this.data) || {};
      return _.get(data, key, defaultValue);
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      var data = toJS(this.data) || {};
      _.set(data, key, val);
      return this.merge(data);
    }
  }, {
    key: 'merge',
    value: function merge() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_.isPlainObject) throw new Error('Accepts only a plain object e.g. {a: 1}');
      this.data.merge(data);
      return this;
    }
  }, {
    key: 'save',
    value: function save() {
      if (!this.store) throw new Error('Store is required!');
      return this.store.save(this);
    }
  }, {
    key: 'toJS',
    get: function get() {
      var _this = this;

      var data = {};
      var fields = this.getFields();
      fields.forEach(function (field) {
        return data[field] = _this.get(field);
      });

      return data;
    }
  }]);
  return BaseModel;
}(), (_applyDecoratedDescriptor(_class.prototype, 'set', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'set'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'merge', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'merge'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toJS', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toJS'), _class.prototype)), _class);