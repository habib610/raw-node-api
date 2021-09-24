/* Title: 'Not Found'
* Author: habib610
* Description: 404 Not Found 
* Date: 24/09/21
*/

// dependencies 


// module scaffolding 
const handler = {}

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: "Request URL was not found - 404"
    })
}


module.exports = handler