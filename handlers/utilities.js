/* eslint-disable comma-dangle */
/* Title: 'Utilities'
 * Author: habib610
 * Description: Parse JSON DATA
 * Date: 26/09/21
 */

// Dependencies
const crypto = require('crypto');
const dotenv = require('dotenv');
// module scaffolding
const utilities = {};
dotenv.config();

utilities.parseJSON = (jsonData) => {
    let output;
    try {
        output = JSON.parse(jsonData);
    } catch (error) {
        output = {};
    }
    return output;
};
utilities.hash = (strPass) => {
    if (typeof strPass === 'string') {
        const hash = crypto
            .createHmac('sha256', process.env.SECRET_KEY)
            .update(strPass)
            .digest('hex');
        return hash;
    }
    return false;
};

// create random string
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

    if (length) {
        const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i = 1; i <= length; i += 1) {
            const randomCharacter = possiblecharacters.charAt(
                Math.floor(Math.random() * possiblecharacters.length)
            );
            output += randomCharacter;
        }
        return output;
    }
    return false;
};
module.exports = utilities;
