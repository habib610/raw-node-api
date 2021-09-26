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
// const environment = require('./helpers/environments')
const data = require('./lib/data')
// App object - module scaffolding
const app = {}

// Configuration
app.config = {
    port: 3000
}

// testing creating file
data.read("test", 'newFile', (err, data)=> {
    console.log(err, data)
})

// create server
app.createServer = ()=> {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, ()=>{
      console.log(`current environment is  ${app.config.port}`)  
    } )
}


// handle request response 
app.handleReqRes = handleReqRes

//  calling server
app.createServer()