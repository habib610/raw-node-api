/* Title: 'Raw node user monitoring API'
* Author: habib610
* Description: RESTFul API to monitor user defined
* Date: 24/09/21
*/

// Dependencies
const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const { handleReqRes } = require('./helpers/handleReqRes')


// App object - module scaffolding
const app = {}

// Configuration
app.config = {
    port: 3000
}

// create server
app.createServer = ()=> {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, ()=> console.log(`server is running port ${app.config.port}`))
}


// handle request response 
app.handleReqRes = handleReqRes

//  calling server
app.createServer()