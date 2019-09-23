'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constanst = require('../config/constanst');

var _constanst2 = _interopRequireDefault(_constanst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    getProductBySku: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sku) {
            var url, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            url = _constanst2.default.products + '/' + sku;

                            console.log(url);
                            _context.next = 4;
                            return _axios2.default.get(url).then(function (data) {
                                return data;
                            }).catch(function (err) {
                                throw err;
                            });

                        case 4:
                            res = _context.sent;
                            return _context.abrupt('return', res.data || []);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function getProductBySku(_x) {
            return _ref.apply(this, arguments);
        }

        return getProductBySku;
    }(),

    getProducts: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(skus) {
            var url, res;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            url = _constanst2.default.products + '?partNumbers=' + skus;

                            console.log(url);
                            _context2.next = 4;
                            return _axios2.default.get(url).then(function (data) {
                                return data;
                            }).catch(function (err) {
                                throw err;
                            });

                        case 4:
                            res = _context2.sent;
                            return _context2.abrupt('return', res.data || []);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        function getProducts(_x2) {
            return _ref2.apply(this, arguments);
        }

        return getProducts;
    }()
};
//# sourceMappingURL=productServices.js.map