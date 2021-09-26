/* Title: 'Routes Handler '
 * Author: habib610
 * Description: Routes Handle goes here
 * Date: 24/09/21
 */

// dependencies
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is sample Request URL',
    });
};
module.exports = handler;
