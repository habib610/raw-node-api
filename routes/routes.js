/* Title: 'Routes'
 * Author: habib610
 * Description: All routes managed here
 * Date: 24/09/21
 */

// dependencies
const { sampleHandler } = require('../handlers/sampleHandler/sampleHandler');
const { userHandler } = require('../handlers/userHandler/userHandler');
// module scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
