'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor;

var _mobx = require('mobx');

var _model = require('./model');

var _apiModel = require('./api-model');

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

var Collection = exports.Collection = (_class = function () {
  function Collection() {
    (0, _classCallCheck3.default)(this, Collection);

    _initDefineProp(this, 'models', _descriptor, this);

    this.model = _model.BaseModel;
    this.api = new _apiModel.ApiModel();
  }

  (0, _createClass3.default)(Collection, [{
    key: 'build',
    value: function build(data) {
      var model = new this.model(this, data);
      this.models.push(model);
      return model;
    }
  }, {
    key: 'save',
    value: function save(model) {
      if (!model) throw new Error('Invalid save parameters!');

      var data = model.toJS;

      if (model.isNew) {
        return this.api.create(data).then(function (rs) {
          (0, _mobx.runInAction)(function () {
            model.id = _lodash2.default.get(rs, model.getIdName());
            model.isNew = false;
            model.merge(rs);
          });

          return model;
        });
      } else {
        return this.api.update(model.id, data).then(function (rs) {
          model.merge(rs);
          return model;
        });
      }
    }
  }]);
  return Collection;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'models', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'save', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'save'), _class.prototype)), _class);