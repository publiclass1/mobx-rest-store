'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = undefined;

var _defineProperty2 = require('babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty4 = require('babel-runtime/helpers/defineProperty');

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _mobx = require('mobx');

var _model = require('./model');

var _apiModel = require('./api-model');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty3.default)(target, property, {
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

var Collection = exports.Collection = (_class = function () {
  function Collection() {
    (0, _classCallCheck3.default)(this, Collection);

    _initDefineProp(this, 'fetching', _descriptor, this);

    _initDefineProp(this, 'fetched', _descriptor2, this);

    _initDefineProp(this, 'models', _descriptor3, this);

    this.model = _model.BaseModel;
    this.api = new _apiModel.ApiModel();
  }

  (0, _createClass3.default)(Collection, [{
    key: 'build',
    value: function build(data) {
      var model = new this.model(this, data);

      if (model.isNew) {
        this.models.push(model);
      } else {
        var modelIsFound = this.findWhere((0, _defineProperty5.default)({}, model.getIdName(), model.id));

        if (!modelIsFound) {
          this.models.push(model);
        } else {
          model.merge(modelIsFound.toJS);
        }
      }

      return model;
    }
  }, {
    key: 'findWhere',
    value: function findWhere(predicate) {
      var dataList = this.models;
      return _lodash2.default.find(dataList, function (dl) {
        return _lodash2.default.isMatch(dl.toPlainObject, predicate);
      });
    }
  }, {
    key: 'findAllWhere',
    value: function findAllWhere(predicate) {
      var dataList = this.models;
      return _lodash2.default.filter(dataList, function (dl) {
        return _lodash2.default.isMatch(dl.toPlainObject, predicate);
      });
    }
  }, {
    key: 'get',
    value: function get(id) {
      var _this = this;

      return this.api.get(id).then((0, _mobx.action)(function (data) {
        var model = _this.build(data);
        return model;
      }));
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.api.find(params).then((0, _mobx.action)(function (rs) {
        var models = [];
        for (var k in rs) {
          models.push(_this2.build(rs[k]));
        }
        return models;
      }));
    }
  }, {
    key: 'save',
    value: function save(model) {
      if (!model) throw new Error('Invalid save parameters!');

      var data = model.toJS;

      if (model.isNew) {
        return this.api.create(data).then((0, _mobx.action)(function (rs) {
          model.id = _lodash2.default.get(rs, model.getIdName());
          model.isNew = false;
          model.merge(rs);

          return model;
        }));
      } else {
        return this.api.update(model.id, data).then((0, _mobx.action)(function (rs) {
          model.merge(rs);
          return model;
        }));
      }
    }
  }, {
    key: 'remove',
    value: function remove(model) {
      if (!model) throw new Error('Invalid save parameters!');
      this.models = this.models.filter(function (mdl) {
        return mdl.id !== model.id;
      });
      return this.api.remove(model.id);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.models.length = 0;
    }
  }, {
    key: 'toJS',
    get: function get() {
      return this.models.map(function (model) {
        return model.toJS;
      });
    }
  }]);
  return Collection;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'fetching', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'fetched', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'models', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'findWhere', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'findWhere'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'get', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'get'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'save', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'save'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'remove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clear', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clear'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toJS', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toJS'), _class.prototype)), _class);