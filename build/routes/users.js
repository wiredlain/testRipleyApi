'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _session = require('../authentication/session');

var _session2 = _interopRequireDefault(_session);

var _app = require('../../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  var _req$params = req.params,
      userData = _req$params.userData,
      FIREBASE_AUTH_TOKEN = _req$params.FIREBASE_AUTH_TOKEN;

  var session = new _session2.default();
  session.userData = userData;
  session.sessionID = FIREBASE_AUTH_TOKEN;
  session.save(_app.client);
  res.status(200).send();
});

exports.default = router;
//# sourceMappingURL=users.js.map