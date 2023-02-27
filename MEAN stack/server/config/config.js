const path = require('path');
const rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }
}