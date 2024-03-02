# UULE generator
Generates the uule parameter that determines location for Google results.

##Example usage
### NodeJs
```javascript
const createUule = require('create-uule');

const uule = createUule('Amsterdam,North Holland,Netherlands'); // Canonical name of the location
```
### CLI
```bash
npm i create-uule -g

```
```bash
create-uule "Washington,District of Columbia,United States"
```
To get the canonical name of location see - https://developers.google.com/adwords/api/docs/appendix/geotargeting?hl=fr&csw=1
or you can find the name in the Google maps.