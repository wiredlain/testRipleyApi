'use strict';

const { auth } = require('firebase-admin');
const authService = auth();

exports.requiresAuth = async (req, res, next) => {
    const idToken = req.header('FIREBASE_AUTH_TOKEN');

    // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
    let decodedIdToken;

    try {
        decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
        next(error);
        return;
    }

    req.user = decodedIdToken;
    next();
};
//# sourceMappingURL=firebase-middleware.js.map