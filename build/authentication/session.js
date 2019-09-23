'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Session {
    constructor() {
        this.userData = {};
        this.sessionID = '';
    }
    set(obj) {
        this.userData = obj;
    }

    save(client) {
        if (this.sessionID) {
            client.set(this.sessionID, JSON.stringify(this.userData));
            client.expire(this.sessionID, 60 * 60 * 2);
        }
    }
    destroy(client) {
        client.del(this.sessionID);
    }
}
exports.default = Session;
//# sourceMappingURL=session.js.map