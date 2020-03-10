"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _productServices = require("../services/productServices");

var _productServices2 = _interopRequireDefault(_productServices);

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import requiresLogin from '../authentication/firebase-middleware';
let router = (0, _express.Router)();
/* GET users listing. */

router.get('/', async (req, res, next) => {
  console.log(Object.keys(req.query));
  const skus = Object.keys(req.query)[0].replace(/['"{}]/g, '').replace('productId:', '');
  console.log("skus: " + skus);
  const skusKey = `SKUS:${skus}`; // client.get(skusKey, (err, result) => {
  // if (result) {
  //   const resultJSON = JSON.parse(result);
  //   return res.status(200).json(resultJSON);
  // }
  // else {

  _productServices2.default.getProducts(skus).then(data => {
    const responseJSON = data; // client.setex(skusKey, 120, JSON.stringify(responseJSON));
    // responseJSON.forEach(item => {
    //   const skuKey = `SKU:${item.partNumber.toLocaleLowerCase()}`;
    //   client.setex(skuKey, 120, item);
    // });

    return res.status(200).json(responseJSON);
  }).catch(err => {
    console.log('err', err);
    return res.status(err.response.status || 404).json({
      error: err.message
    });
  }); //}
  // });
  //res.send('respuesta de productos');

});
exports.default = router;
//# sourceMappingURL=products.js.map