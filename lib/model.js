'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseModel = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var _mobx = require('mobx');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ID_NAME = '_id';

var BaseModel = exports.BaseModel = (_class = function () {
  function BaseModel(store, data) {
    (0, _classCallCheck3.default)(this, BaseModel);
    this.isNew = false;
    this.id = null;
    this.store = null;

    _initDefineProp(this, 'saving', _descriptor, this);

    _initDefineProp(this, 'saved', _descriptor2, this);

    _initDefineProp(this, 'removing', _descriptor3, this);

    _initDefineProp(this, 'removed', _descriptor4, this);

    _initDefineProp(this, 'fetching', _descriptor5, this);

    _initDefineProp(this, 'fetched', _descriptor6, this);

    this.data = _mobx.observable.map({});

    this.store = store;
    this.id = _lodash2.default.get(data, this.getIdName(), null);

    this.merge(data);

    if (this.id === null) {
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

      var data = (0, _mobx.toJS)(this.data) || {};
      return _lodash2.default.get(data, key, defaultValue);
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      var data = (0, _mobx.toJS)(this.data) || {};
      _lodash2.default.set(data, key, val);
      return this.merge(data);
    }
  }, {
    key: 'merge',
    value: function merge() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_lodash2.default.isPlainObject) throw new Error('Accepts only a plain object e.g. {a: 1}');
      this.data.merge(data);
      return this;
    }
  }, {
    key: 'save',
    value: function save() {
      var _this = this;

      if (!this.store) throw new Error('Store is required!');

      this.saving = true;
      this.saved = false;

      return this.store.save(this).then((0, _mobx.action)(function (model) {
        _this.saving = false;
        _this.saved = true;

        return model;
      }), (0, _mobx.action)(function (e) {
        _this.saving = false;
        return e;
      }));
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this2 = this;

      if (!this.store) throw new Error('Store is required!');
      this.removing = true;
      this.removed = false;

      return this.store.remove(this).then((0, _mobx.action)(function () {
        _this2.removing = false;
        _this2.removed = true;
        return {};
      }), (0, _mobx.action)(function (e) {
        _this2.removing = false;
        return e;
      }));
    }
  }, {
    key: 'toJS',
    get: function get() {
      var _this3 = this;

      var data = {};
      var fields = this.getFields();
      fields.forEach(function (field) {
        return data[field] = _this3.get(field);
      });

      return data;
    }
  }, {
    key: 'toPlainObject',
    get: function get() {
      return (0, _mobx.toJS)(this.data);
    }
  }]);
  return BaseModel;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'saving', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'saved', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'removing', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'removed', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'fetching', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'fetched', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'set', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'set'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'merge', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'merge'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toJS', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toJS'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toPlainObject', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toPlainObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'save', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'save'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'remove'), _class.prototype)), _class);