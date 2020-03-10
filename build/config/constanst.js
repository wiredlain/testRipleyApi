"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const API_URLS = {
  products: `${process.env.API_URL}/getProductDetailsJson`
};
exports.default = API_URLS;
//# sourceMappingURL=constanst.js.map