"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _productServices = require("../services/productServices");

var _productServices2 = _interopRequireDefault(_productServices);

var _app = require("../app");

var _firebaseMiddleware = require("../authentication/firebase-middleware");

var _firebaseMiddleware2 = _interopRequireDefault(_firebaseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = (0, _express.Router)();
/* GET users listing. */

router.get('/:skus', _firebaseMiddleware2.default.requiresAuth, async (req, res, next) => {
  const skus = req.params.skus.trim();
  const skusKey = `SKUS:${skus}`;

  _app.client.get(skusKey, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      _productServices2.default.getProducts(skus).then(data => {
        const responseJSON = data;

        _app.client.setex(skusKey, 120, JSON.stringify(responseJSON));

        responseJSON.forEach(item => {
          const skuKey = `SKU:${item.partNumber.toLocaleLowerCase()}`;

          _app.client.setex(skuKey, 120, item);
        });
        return res.status(200).json(responseJSON);
      }).catch(err => {
        return res.status(err.response.status || 404).json({
          error: err.message
        });
      });
    }
  }); //res.send('respuesta de productos');

});
exports.default = router;
//# sourceMappingURL=products.js.map