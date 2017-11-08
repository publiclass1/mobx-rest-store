'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiModel = require('./api-model');

var _model = require('./model');

var _collection = require('./collection');

var _defaultAxiosTransport = require('./default-axios-transport');

exports.default = {
  ApiModel: _apiModel.ApiModel,
  BaseModel: _model.BaseModel,
  Collection: _collection.Collection,
  AxiosTransportApi: _defaultAxiosTransport.AxiosTransportApi
};