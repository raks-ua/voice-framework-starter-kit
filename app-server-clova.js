'use strict';
//Using for Clova Server
let eventDispatcher = require('voice-framework').eventDispatcher;
let request = require('request');
const crypto = require('crypto');

require('./entity/event/before_request');
require('./entity/event/request');
require('./entity/event/after_request');

require('./app-handlers');

let pemCertificate;
let pemCertificateTime;

exports.run = function (event, callback) {
    eventDispatcher.handleServerAppRequest('clova', event, callback);
};

//openssl dgst -sha256 -verify signature-public-key.pem -signature signature.txt body2.txt
exports.verify = function (signature, certificateUrl, dataBody, callback) {
    //https://clova-cek-requests.line.me/.well-known/signature-public-key.pem
    if (pemCertificateTime && pemCertificateTime >= Date.now() / 1000 - 30 * 60) {
        return verifyPem(pemCertificate, signature, dataBody, callback);
    }

    let t = Date.now();
    request.get(certificateUrl, {
        timeout: 1000,
        strictSSL: false,
    }, (err, res, body) => {
        console.log('[RESPONSE PEM TIME]', (Date.now() - t) / 1000);
        let isValid = false;
        if (err) {
            if (err.code === 'ETIMEDOUT') return verifyPem(pemCertificate, signature, dataBody, callback);
            return callback && callback(err, isValid);
        }
        if (body.error) {
            return callback && callback(body.error, isValid);
        }
        verifyPem(body, signature, dataBody, callback);
    });
};

function verifyPem(pem, signature, data, callback) {
    let p = [];
    let isValid = false;
    p.push(new Promise((resolve, reject) => {
        let isCurValid = false;
        try {
            let verify = crypto.createVerify('RSA-SHA1');
            verify.update(data);
            isCurValid = verify.verify(pem, signature, "base64");
        } catch (e) {
            console.log('[ERR VERIFY]', e);
        }
        resolve(isCurValid);
    }));

    p.push(new Promise((resolve, reject) => {
        let isCurValid = false;
        try {
            let verify = crypto.createVerify('RSA-SHA256');
            verify.update(data);
            isCurValid = verify.verify(pem, signature, "base64");
            console.log('[VERIFY]', isCurValid, signature, data);
        } catch (e) {
            console.log('[ERR VERIFY]', e);
        }
        resolve(isCurValid);
    }));

    Promise.all(p).then((valids) => {
        if (valids[0] === true) isValid = true;
        if (valids[1] === true) isValid = true;

        if (isValid === true) {
            pemCertificate = pem;
            pemCertificateTime = Date.now() / 1000;
        }
        callback && callback(undefined, isValid);
    }).catch((err) => {
        callback && callback(err, isValid);
    });
}