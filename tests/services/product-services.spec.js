"use strict"
import chai from 'chai';
import chaiHttp from 'chai-http';
import firebase from '../../src/authentication/firebase'
import requestPromise from 'request-promise';
import { config } from 'dotenv';

let expect = chai.expect;

config();

chai.use(chaiHttp);
const url= 'http://localhost:8000/api';
const uid = 'test-uid';
let customToken = null;
let idToken = null;

describe('Product Service: ',() => {
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

    it('falla porque falta token', (done) => {
            chai.request(url)
            .get('/products/mpm00003017074,2000366985872p')
            .set('Accept', 'application/json')
            .then(function (res) {
                expect(res).to.have.status(403);
                done();
            })
	});
	it('deberia traer productos, con token', (done) => {
		chai.request(url)
            .get('/products/mpm00003017074,2000366985872p')
            .set('FIREBASE_AUTH_TOKEN', idToken)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});