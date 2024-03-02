const shorthash = require('shorthash2');
const utils = require('./utils');

const hostnames = require('./data/hostnames_by_country.json');
const geotargetsByCountry = require('./data/geotarget_hashes_by_country.json');
const languagesByCountry = require('./data/languages_by_country.json');

const availableCRs = require('./data/available_cr_countries.json');
const availableGLs = require('./data/available_gl_languages.json');
const availableLRs = require('./data/available_lr_languages.json');
const availableHLs = require('./data/available_hl_languages.json');

const countriesByGeotarget = Object.keys(geotargetsByCountry).reduce((acc, country) => {
    for (const geotarget of geotargetsByCountry[country]) acc[geotarget] = country;
    return acc;
}, {});

// eslint-disable-next-line max-len
const findCountry = (canonicalName) => countriesByGeotarget[shorthash(canonicalName)];
const findLanguages = (countryCode) => (languagesByCountry[countryCode] || []);
const isValidLocation = (location) => Object.keys(countriesByGeotarget).includes(shorthash(location));

const findLR = (countryCode) => {
    for (const language of findLanguages(countryCode)) {
        const exists = availableLRs.includes(language.toLowerCase());
        if (exists) {
            return `lang_${language}`;
        }
    }
};

const findHL = (countryCode) => {
    for (const language of findLanguages(countryCode)) {
        const exists = availableHLs.includes(language.toLowerCase());
        if (exists) {
            return language;
        }
    }
};

const findGL = (countryCode) => {
    for (const language of findLanguages(countryCode)) {
        const exists = availableGLs.includes(language.toLowerCase());
        if (exists) {
            return language;
        }
    }
};

const findCR = (countryCode) => {
    if (availableCRs.includes(countryCode)) {
        return `country${countryCode}`;
    }
};

const findMainCountry = (locations) => {
    // return findCountry(locations[0])
    return utils.findMostCommonItem(locations.map((location) => [findCountry(location)]));
};

const findMainLanguage = (locations) => {
    // return findLanguages(findCountry(locations[0]))
    return utils.findMostCommonItem(locations.map((location) => findLanguages(findCountry(location))));
};

const findCommonLanguages = (locations) => {
    const languagesByLocation = locations.map((location) => findLanguages(findCountry(location)));
    let intersectedLocations = languagesByLocation.pop();
    for (const languages of languagesByLocation) {
        intersectedLocations = utils.intersection(intersectedLocations, languages);
    }
    return intersectedLocations;
};

const findCommonLanguage = (locations) => findCommonLanguages(locations)[0];

const findHostname = (country) => hostnames[(country || '').toUpperCase()];

module.exports = {
    findHostname,
    findCountry,
    findLanguages,
    findCommonLanguages,
    findCommonLanguage,
    findMainCountry,
    findMainLanguage,
    findLR,
    findHL,
    findGL,
    findCR,
    isValidLocation,
};
