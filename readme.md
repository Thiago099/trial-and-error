## Trial and error

This artificial intelligence system has been created with the capability to deduce mathematical operations based on input and output data, and subsequently apply these operations to different sets of data.

It demonstrates exceptional speed when handling straightforward tasks, and its level of complexity adjusts according to the intricacy of the problem it encounters.

The outcome it produces represents the minimal number of operations required to accurately represent the entire training dataset.

## Usage

```js
console.clear();
import { train, generate } from "./index.js"


const rule = ([a, b, c])=>[a*5+c*b, a+c]

let [x,y] = generate(1000, 3, rule, true)

console.time("training")
const model = train(x, y)
console.timeEnd("training") // training: 318.604ms

console.log(model.solutions) // [ 'a*5+b*c', 'a+c' ]

console.log(model.predict([5,2,8])) // [ 41, 13 ]
console.log(rule([5,2,8])) // [ 41, 13 ]

```


## API

### Train Method  
```js
[...]
const model = train(x,y)
[...]
```

#### Parameters

x: array of inputs
example:
```js 
[ [ 8, 1, 9 ], [ 4, 3, 1 ], [ 7, 9, 10 ], [ 11, 9, 7 ], [ 3, 6, 3 ] ]
```
y: array of outputs
example:
```js 
[ [ 49 ], [ 23 ], [ 125 ], [ 118 ], [ 33 ] ]
```

#### output

wrapper object with:
     predict that takes a single input and returns a single output
     property solutions that returns the solutions in human readable form

### generate


```js
[...]
let [x,y] = generate(1000, 3, rule, true)
[...]
```

#### parameters
samples: number of samples

sampleLength: length of the samples

rule: rule for creation of samples

cache: if a cache of the result is wanted(this prevents the results from changing in multiple executions)
#### output
training data on the format accepted by the train function
