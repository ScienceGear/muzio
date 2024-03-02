# fn-mt
Functional implementation of Mersenne Twister

## Usage

```typescript
import { newRandGen, randNext, randRange } from 'fn-mt'

const gen = newRandGen(42)

const [n1, gen1] = randNext(gen)
const [n2, gen2] = randNext(gen1)
const [n3, gen3] = randNext(gen2)

console.log(n1)
console.log(n2)
console.log(n3)

// same generator generate same number
const [n4, gen4] = randNext(gen2)

console.log(n4)

// ranged int
const [n5, gen5] = randRange(0, 6, gen4)

console.log(n5) // generate integer from 0 to 5
```
