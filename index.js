/* Title: 'Raw node user monitoring API'
 * Author: habib610
 * Description: RESTFul API to monitor user defined
 * Date: 24/09/21
 */

// Dependencies
const http = require('http');
const colors = require('colors');
const dotenv = require('dotenv');

// const { StringDecoder } = require('string_decoder');
// const url = require('url');
const { handleReqRes } = require('./helpers/handleReqRes');
// const environment = require('./helpers/environments')
// const data = require('./lib/data');
// App object - module scaffolding
const app = {};

// Configuration
dotenv.config();
// app.config = {
//     port: 3000,
// };

// testing creating file
// data.read('test', 'newFile', (err, datas) => {
//     console.log(err, datas);
// });

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(process.env.NODE_ENV, () => {
        console.log(colors.bold.bgBlue(`current environment is  ${process.env.NODE_ENV}`));
    });
};

// handle request response
app.handleReqRes = handleReqRes;

//  calling server
app.createServer();
