"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require("firebase-admin");

//const authService = auth();
exports.default = {
  async requiresAuth(req, res, next) {
    const idToken = req.header('FIREBASE_AUTH_TOKEN'); // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken

    let decodedIdToken;

    try {
      decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
      error.status = 403;
      next(error);
      return;
    }

    req.user = decodedIdToken;
    next();
  }

};
//# sourceMappingURL=firebase-middleware.js.map