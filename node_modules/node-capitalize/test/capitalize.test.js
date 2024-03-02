const assert = require('assert')
const capitalize = require('../capitalize')

describe('Capitalize', function () {
  it('should capitalize first letter', function () {
    assert.strictEqual(capitalize('your only limit is you'), 'Your only limit is you')
  })

  it('should capitalize first letter in each word', function () {
    assert.strictEqual(capitalize('your only limit is you', true), 'Your Only Limit Is You')
  })

  it('should capitalize first letter with mixed case string', function () {
    assert.strictEqual(capitalize('yOuR oNlY lImIt Is YoU'), 'Your only limit is you')
  })

  it('should capitalize first letter with quotes in a string', function () {
    assert.strictEqual(capitalize(`i'm feeling curious`), `I'm feeling curious`)
  })
})
