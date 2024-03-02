/* eslint-disable max-len */
const qs = require('querystring');
const hashMe = require('object-hash');
const createUULE = require('create-uule');
const constants = require('./constants');
const utils = require('./utils');
const datasets = require('./datasets');

function makeQuery(params, options) {
    let { query: q } = params || {};

    if (!q) throw new Error('Query is required');

    if (Array.isArray(q)) {
        if (options.shuffle) {
            q = utils.shuffleArray(q);
        }
        q = q.join(' ');
    }

    return { q };
}

function makeAdvancedParameters(params) {
    const { ludocid, lsig } = params || {};

    return {
        ludocid,
        lsig,
    };
}

function makeLocalisation(params) {
    const { uule, gl, hl, lr, cr } = params || {};

    return {
        uule,
        /*
            gl: Geolocation of end user.

            The gl parameter value is a two-letter country code.
            The gl parameter boosts search results whose country of origin matches the parameter value.
            See the Country Codes page for a list of valid values.

            Specifying a gl parameter value should lead to more relevant results.
            This is particularly true for international customers and, even more specifically, for customers
            in English- speaking countries other than the United States.
        */
        gl,
        /*
            hl: Sets the user interface language.

            Explicitly setting this parameter improves the performance and the quality of your search results.
        */
        hl,
        /*
            lr: Restricts the search to documents written in a particular language
        */
        lr,
        /*
            cr: Restricts search results to documents originating in a particular country.
            You may use Boolean operators in the cr parameter's value.

            Google Search determines the country of a document by analyzing:
            - the top-level domain (TLD) of the document's URL
            - the geographic location of the Web server's IP address
        */
        cr,
    };
}

function makeAdvancedFilters(params) {
    // eslint-disable-next-line prefer-const
    let { tbs, safe, nfpr, filter } = params || {};
    /*
    For instance, https://www.google.com/webhp?tbs=qdr:d will open a Google Search homepage from which you can search to restrict results to the past day (24 hours).

    The tbs= parameter can take the following values:
    qdr:h (past hour)
    qdr:d (past day)
    qdr:w (past week)
    qdr:m (past month)
    qdr:y (past year)

    You can specify intermediate time periods by adding a number:
    qdr:h12 (past 12 hours)
    qdr:d3 (past 3 days)
    qdr:w2 (past 2 weeks)
    qdr:m6 (past 6 months)
    qdr:m2 (past 2 years)
    */

    // if (!['ACTIVE', 'OFF'].includes(safe)) {
    //     safe = 'OFF';
    // }

    filter = utils.convertValueToNumber(filter);

    return {
        tbs,
        safe,
        nfpr,
        filter,
    };
}

function makeSearchType(params) {
    const { tbm } = params || {};
    // It can be set to:
    // (no tbm parameter): regular Google Search,
    // isch: Google Images API,
    // lcl - Google Local API
    // vid: Google Videos API,
    // nws: Google News API,
    // shop: Google Shopping API,
    // or any other Google service.

    return {
        tbm,
    };
}

function makePagination(params) {
    // eslint-disable-next-line prefer-const
    let { num, start, page, ijn } = params || {};

    if (num !== undefined) {
        if (page !== undefined && start === undefined) {
            start = num * (page - 1);
        }
    }

    return {
        start,
        num,
        ijn,
    };
}

function makeDevice(params) {
    // eslint-disable-next-line prefer-const
    let { biw, bih, mobile, xmobile } = params || {};

    if (mobile !== undefined && xmobile === undefined) {
        xmobile = utils.convertValueToNumber(mobile);
    }

    return {
        xmobile,
        biw,
        bih,
    };
}

function parseLocation(params) {
    // eslint-disable-next-line prefer-const
    let { hostname, location, uule, country, cr, gl, hl, lr } = params || {};

    if (location) {
        const countryCandidate = datasets.findCountry(location);

        if (!countryCandidate) {
            throw new Error(`The location isn't valid. Please check the spelling.`);
        }

        if (!country) {
            country = countryCandidate;
        }

        // If countryCandidate is not empty, it means that the canonical name is legit
        if (!uule && countryCandidate) {
            uule = createUULE(location);
        }
    }

    if (country) {
        if (!gl) gl = datasets.findGL(country);
        if (!cr) cr = datasets.findCR(country);
        if (!hl) hl = datasets.findHL(country) || 'en';
        if (!lr) lr = datasets.findLR(country);
    }

    if (!hostname) {
        hostname = datasets.findHostname(country) || constants.GOOGLE_DEFAULT_HOSTNAME;
    }

    return { hostname, uule, cr, gl, hl, lr };
}

function craft(options) {
    const {
        protocol = constants.HTTP_PROTOCOL, override, exclude,
        shuffle = true, sign = false,
        ...googleOptions
    } = options || {};

    const { hostname, uule, cr, gl, hl, lr } = parseLocation(options);

    const params = { uule, cr, gl, hl, lr, ...googleOptions };

    const url = `${protocol}://www.${hostname}${constants.GOOGLE_SEARCH_PATH}`;

    const search = {
        ...makeQuery(params, { shuffle }),
        ...makeAdvancedParameters(params),
        ...makeAdvancedFilters(params),
        ...makeLocalisation(params),
        ...makeSearchType(params),
        ...makePagination(params),
        ...makeDevice(params),
        ...(override || {}),
    };

    const hash = sign ? hashMe(search) : undefined;

    const organized = utils.organizeObject(search, { exclude, shuffle });

    return {
        url: `${url}?${qs.stringify(organized)}`,
        signature: hash,
    };
}

module.exports = { craft };
