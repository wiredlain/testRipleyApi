'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constanst = require('../config/constanst');

var _constanst2 = _interopRequireDefault(_constanst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getProductBySku: async sku => {
        const url = `${_constanst2.default.products}/${sku}`;
        let res = await _axios2.default.get(url).then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
        return res.data || [];
    },

    getProducts: async skus => {
        const url = `${_constanst2.default.products}?partNumbers=${skus}`;
        let res = await _axios2.default.get(url).then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
        return res.data || [];
    }
};
//# sourceMappingURL=productServices.js.map