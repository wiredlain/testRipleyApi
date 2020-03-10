"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _constanst = require("../config/constanst");

var _constanst2 = _interopRequireDefault(_constanst);

var _landing = require("../mockup/landing");

var _landing2 = _interopRequireDefault(_landing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getDataLanding: async () => {
    return _landing2.default;
  }
};
//# sourceMappingURL=landingConfiguration.js.map