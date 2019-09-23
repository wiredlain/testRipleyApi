'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('firebase-admin'),
    auth = _require.auth;

var authService = auth();

exports.requiresAuth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var idToken, decodedIdToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        idToken = req.header('FIREBASE_AUTH_TOKEN');

                        // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken

                        decodedIdToken = void 0;
                        _context.prev = 2;
                        _context.next = 5;
                        return authService.verifyIdToken(idToken);

                    case 5:
                        decodedIdToken = _context.sent;
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        next(_context.t0);
                        return _context.abrupt('return');

                    case 12:

                        req.user = decodedIdToken;
                        next();

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 8]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=firebase-middleware.js.map