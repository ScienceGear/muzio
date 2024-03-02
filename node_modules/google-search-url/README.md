# **google-search-url**
Parse, sanitize and craft any Google Search URL

# Getting started

```
npm i google-search-url -D

yarn add google-search-url -D
```

## Usage
```js
const gsearch = require('google-search-url');

const input =  {
        location: 'Florida,New York,United States', // canonical name from google's allowed list
        query: ['site:linkedin.com', '"CEO"', 'bank'], // can be a simple string too
        num: 100,
        page: 1,
        shuffle: true, // shuffles query when array as well as queryparams order
        signature: false // wether to include a unique signature for the url (won't matter if shuffled or not)
    }

gsearch.craft(input).url
// > http://google.com/search?num=100&cr=countryUS&hl=en&start=0&lr=lang_en&q=%22CEO%22+site%3Alinkedin.com+bank&uule=w%2BCAIQICIeRmxvcmlkYSxOZXcgWW9yayxVbml0ZWQgU3RhdGVz

gsearch.craft(input).url
// > http://google.com/search?start=0&lr=lang_en&cr=countryUS&num=100&uule=w%2BCAIQICIeRmxvcmlkYSxOZXcgWW9yayxVbml0ZWQgU3RhdGVz&q=site%3Alinkedin.com+%22CEO%22+bank&hl=en

gsearch.craft(input).url
// > http://google.com/search?q=bank+site%3Alinkedin.com+%22CEO%22&lr=lang_en&cr=countryUS&num=100&start=0&uule=w%2BCAIQICIeRmxvcmlkYSxOZXcgWW9yayxVbml0ZWQgU3RhdGVz&hl=en

```

## Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `test`                   | Run tests using jest     |


## Eslint rules
Eslint is a code linter that helps catch minor code quality and style issues.
All rules are configured through `.eslintrc`.


## Data sources
https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=ko
https://developers.google.com/custom-search/docs/json_api_reference?hl=ko#supported-interface-languages
