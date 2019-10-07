import { auth } from 'firebase-admin';
const authService = auth();

export async function requiresAuth(req, res, next) {
    const idToken = req.header('FIREBASE_AUTH_TOKEN');

    // https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken
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