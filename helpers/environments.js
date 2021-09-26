/* Title: 'All Environments variable goes here'
* Author: habib610
* Description: All secret environment files manged here
* Date: 24/09/21
*/

// Dependencies



// module  scaffolding 
const environments = {}

environments.staging = {
    port: 3000,
    envName: "Staging"
}
environments.production = {
    port: 5000,
    envName: "Production"
}

const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : "staging"

const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = environmentToExport