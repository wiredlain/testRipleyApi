"use strict";

var _appRootPath = require("app-root-path");

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define the custom settings for each transport (file, console)
var options = {
  error: {
    level: 'error',
    filename: `${_appRootPath2.default}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}; // instantiate a new Winston Logger with the settings defined above

let logger = _winston2.default.createLogger({
  transports: [new _winston2.default.transports.Console(options.console), new _winston2.default.transports.File(options.error)],
  exitOnError: false // do not exit on handled exceptions

}); // create a stream object with a 'write' function that will be used by `morgan`


logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
module.exports = logger;
//# sourceMappingURL=logger.js.map