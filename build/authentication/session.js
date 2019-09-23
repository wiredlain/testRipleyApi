'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);

        this.userData = {};
        this.sessionID = '';
    }

    _createClass(Session, [{
        key: 'set',
        value: function set(obj) {
            this.userData = obj;
        }
    }, {
        key: 'save',
        value: function save(client) {
            if (this.sessionID) {
                client.set(this.sessionID, JSON.stringify(this.userData));
                client.expire(this.sessionID, 60 * 60 * 2);
            }
        }
    }, {
        key: 'destroy',
        value: function destroy(client) {
            client.del(this.sessionID);
        }
    }]);

    return Session;
}();

exports.default = Session;
//# sourceMappingURL=session.js.map