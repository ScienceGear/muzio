// const parseResources = require('./lib/parse');
const craftResources = require('./lib/craft');
const datasetsResources = require('./lib/datasets');

module.exports = {
    // ...parseResources,
    ...craftResources,
    ...datasetsResources,
};
