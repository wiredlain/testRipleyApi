"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _dotenv = require("dotenv");

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require("./utils/logger");

var _logger2 = _interopRequireDefault(_logger);

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _firebase = require("./authentication/firebase");

var _path = require("path");

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require("./routes/index");

var _index2 = _interopRequireDefault(_index);

var _products = require("./routes/products");

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const router = (0, _express.Router)();

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);

_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

const app = (0, _express2.default)();

const LoggerMiddleware = (req, res, next) => {
  const random = Math.floor(Math.random() * 100) + 1;
  const {
    originalUrl
  } = req;

  if (random < 15 && originalUrl.indexOf('login') === -1) {
    let errorMessage = `Error Code: 500\nMessage: error simulado`;

    _logger2.default.error(`500 - ${errorMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(err.status || 500);
  }

  next();
};

app.use(LoggerMiddleware);
const REDIS_URL = process.env.REDIS_URL;

const client = exports.client = _redis2.default.createClient(REDIS_URL); // view engine setup


app.set('views', (0, _path.join)(__dirname, '../src/views'));
app.set('view engine', 'pug');
app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());

_logger2.default.debug("Overriding 'Express' logger");

app.use((0, _morgan2.default)('combined', {
  stream: _winston2.default.stream.write
}));
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static((0, _path.join)(__dirname, 'public')));
router.use('/', _index2.default);
router.use('/products', _products2.default);
app.use('/api', router); // error handler

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Escribimos el error

  _logger2.default.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);
  res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map