const register = require('./length-secret');
const { IDENTIFIER } = require('./constants');

/**
 *
 * @param {String} locationCanonicalName - Google canonical location name
 * see https://developers.google.com/adwords/api/docs/appendix/geotargeting?hl=fr&csw=1 of Google Maps
 * @return {string} - uule parameter
 */
module.exports = (locationCanonicalName) => {
    const buffer = Buffer.from(locationCanonicalName);
    const encodedLocationName = buffer.toString('base64');
    const secretPart = register[locationCanonicalName.length];

    return `${IDENTIFIER}${secretPart}${encodedLocationName}`;
};
