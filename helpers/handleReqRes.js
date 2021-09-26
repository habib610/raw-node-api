/* Title: 'Handle Request And Response'
 * Author: habib610
 * Description: just manage user Request and response function
 * Date: 24/09/21
 */

// Dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const { notFoundHandler } = require('../handlers/sampleHandler/notFound');
const { parseJSON } = require('../handlers/utilities');

const routes = require('../routes/routes');

// module  scaffolding
const handler = {};
handler.handleReqRes = (req, res) => {
    // response handle
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObj = req.headers;
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObj,
    };

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    // user data received here
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties, (statusCode, payload) => {
            const resStatusCode = typeof statusCode === 'number' ? statusCode : 500;
            const resPayload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(resPayload);

            // res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(resStatusCode);
            res.end(payloadString);
        });
    });
};
module.exports = handler;
