import { Router } from 'express';
import Session from '../authentication/session';
import { client } from '../../app';
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const { userData, FIREBASE_AUTH_TOKEN } = req.params;
  let session = new Session();
  session.userData = userData;
  session.sessionID = FIREBASE_AUTH_TOKEN;
  session.save(client);
  res.status(200).send();
});

export default router;
