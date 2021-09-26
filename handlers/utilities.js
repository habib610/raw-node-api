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

module.exports = utilities;
