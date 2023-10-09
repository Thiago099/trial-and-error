console.clear();
import { train, generate } from "../index.js"

const rule = ([a, b, c]) => [a * 5 + c * b, a + c ]

let [x,y] = generate(0, 10, 1000, 3, rule, true)

console.time("training")
const model = train(x, y, 1)
console.timeEnd("training") // training: 318.604ms

console.log(model.solutions) // [ 'a*5+b*c', 'a+c' ]

console.log(model.predict([5, 2, 8])) // [ 41, 13 ]
console.log(rule([5, 2, 8])) // [ 41, 13 ]