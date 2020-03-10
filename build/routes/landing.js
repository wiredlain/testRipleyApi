"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _landingConfiguration = require("../services/landingConfiguration");

var _landingConfiguration2 = _interopRequireDefault(_landingConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { client } from '../app';
// import requiresLogin from '../authentication/firebase-middleware';
let router = (0, _express.Router)();
/* GET users listing. */

router.get('/', async (req, res, next) => {
  // const skus = (req.query.skus).trim();
  // const skusKey = `SKUS:${skus}`;
  // client.get(skusKey, (err, result) => {
  //   if (result) {
  //     const resultJSON = JSON.parse(result);
  //     return res.status(200).json(resultJSON);
  //   }
  //   else {
  _landingConfiguration2.default.getDataLanding().then(data => {
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
  }); // }
  // });
  //res.send('respuesta de productos');

});
exports.default = router;
//# sourceMappingURL=landing.js.map