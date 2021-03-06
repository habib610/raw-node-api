/* eslint-disable operator-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* Title: 'Token '
 * Author: habib610
 * Description: CRDU Token operation goes here
 * Date: 24/09/21
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON, createRandomString } = require('../utilities');
// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
  const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

            if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashedpassword = hash(password);
            if (hashedpassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was a problem in the server side!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Password is not valid!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

// @TODO: Authentication
handler._token.get = (requestProperties, callback) => {
    // check the phone number if valid

};

// @TODO: Authentication
handler._token.put = (requestProperties, callback) => {
    // check the phone number if valid

};

// @TODO: Authentication
handler._token.delete = (requestProperties, callback) => {
    // check the phone number if valid

};

module.exports = handler;
