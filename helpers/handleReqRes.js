/* Title: 'Handle Request And Response'
* Author: habib610
* Description: just manage user Request and response function
* Date: 24/09/21
*/

// Dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const { notFoundHandler } = require('../handlers/sampleHandler/notFound');

const routes = require('../routes/routes');



// module  scaffolding 
const handler = {}


handler.handleReqRes = (req, res)=> {
        // response handle
        const parsedUrl = url.parse(req.url, true)
        const path = parsedUrl.pathname;
        const trimmedPath = path.replace(/^\/+|\/+$/g, '')
        const method = req.method.toLowerCase()
        const queryStringObj = parsedUrl.query
        console.log(queryStringObj)
        const headersObj = req.headers;
        const decoder = new StringDecoder('utf-8');
        let realData = ''

        const requestProperties = {
            parsedUrl,
            path,
            trimmedPath,
            method,
            queryStringObj,
            headersObj,
        }

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] :  notFoundHandler

    chosenHandler(requestProperties, (statusCode, payload)=> {

        statusCode = typeof statusCode === 'number' ? statusCode : 500
        payload = typeof payload === 'object' ? payload : {}

        const payloadString = JSON.stringify(payload)
        
        res.writeHead(statusCode)
        res.end(payloadString)
    })

//user data received here 
        req.on('data', (buffer)=> {
             realData += decoder.write(buffer)
        })

        req.on('end', ()=> {    
            realData += decoder.end()
              chosenHandler(requestProperties, (statusCode, payload)=> {

        statusCode = typeof statusCode === 'number' ? statusCode : 500
        payload = typeof payload === 'object' ? payload : {}

        const payloadString = JSON.stringify(payload)
        
        res.writeHead(statusCode)
        res.end(payloadString)
    })
        })
    }


module.exports = handler