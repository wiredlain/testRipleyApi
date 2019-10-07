"use strict"
import chai from 'chai';
import chaiHttp from 'chai-http';
import firebase from '../../src/authentication/firebase'
import requestPromise from 'request-promise';
import { config } from 'dotenv';

let expect = chai.expect;
const url= 'http://localhost:8000/api';
config();
const uid = 'test-uid';
let customToken = null;
let idToken = null;

chai.use(chaiHttp);

describe('Routes: ',() => {
    before(async() => {
        try {
            customToken = await firebase.auth().createCustomToken(uid)
            const res = await requestPromise({
                url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_APIKEY}`,
                method: 'POST',
                body: {
                    token: customToken,
                    returnSecureToken: true
                },
                json: true,
            });
            idToken = res.idToken;
        } catch(error) {
            //idToken = null;
        }
    });

    it('falla porque no viene con parametros', (done) => {
        chai.request(url)
        .get('/products/')
        .set('Accept', 'application/json')
        .then(function (res) {
            expect(res).to.have.status(404);
            done();
        })
    });
    it('viene con parametros, exitoso', (done) => {
        chai.request(url)
        .get('/products/mpm00003017074,2000366985872p')
        .set('Accept', 'application/json')
        .set('FIREBASE_AUTH_TOKEN', idToken)
        .then(function (res) {
            expect(res).to.have.status(200);
            done();
        })
    });
});