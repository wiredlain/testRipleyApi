'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _productServices = require('../../services/productServices');

var _productServices2 = _interopRequireDefault(_productServices);

var _app = require('../../app');

var _firebaseMiddleware = require('../authentication/firebase-middleware');

var _firebaseMiddleware2 = _interopRequireDefault(_firebaseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express.Router)();

/* GET users listing. */
router.get('/:skus', _firebaseMiddleware2.default.requiresAuth, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var skus, skusKey;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            skus = req.params.skus.trim();
            skusKey = 'SKUS:' + skus;


            _app.client.get(skusKey, function (err, result) {
              if (result) {
                var resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
              } else {
                _productServices2.default.getProducts(skus).then(function (data) {
                  var responseJSON = data;
                  _app.client.setex(skusKey, 120, JSON.stringify(responseJSON));
                  responseJSON.forEach(function (item) {
                    var skuKey = 'SKU:' + item.partNumber.toLocaleLowerCase();
                    _app.client.setex(skuKey, 120, item);
                  });
                  return res.status(200).json(responseJSON);
                }).catch(function (err) {
                  console.log(err.message);

                  return res.status(err.response.status || 404).json({ error: err.message });
                });
              }
            });
            //res.send('respuesta de productos');

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/by-id/:sku', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var sku, skuKey;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sku = req.params.sku.trim();
            skuKey = 'SKU:' + sku;


            _app.client.get(skuKey, function (err, result) {
              if (result) {
                var resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
              } else {
                _productServices2.default.getProductBySku(sku).then(function (data) {
                  var responseJSON = data;
                  _app.client.setex(skuKey, 120, responseJSON);
                  return res.status(200).json(responseJSON);
                }).catch(function (err) {
                  return res.status(err.response.status).json({ error: err.message });
                });
              }
            });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=products.js.map