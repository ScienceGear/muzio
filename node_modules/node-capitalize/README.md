# node-capitalize

To capitalize the first letter or first letter of all words in a string.

## Installation

To install node-capitalize, use [npm](http://github.com/npm/npm):

```
npm i node-capitalize -S
```

## Usage

```javascript
import capitalize from 'node-capitalize';

capitalize('your only limit is you');
/* 'Your only limit is you' */

capitalize('your only limit is you', true);
/* 'Your Only Limit Is You' */

capitalize('yOuR oNlY lImIt Is YoU');
/* 'Your only limit is you' */

capitalize(`i'm feeling curious`);
/* `I'm feeling curious` */
```

## Options
- `string` - define the string to capitalize. (default: 32)
- `words` - define whether the output should be capitalize first letter in each word. (default: false) [OPTIONAL]

## Tests

```
npm install
npm test
```