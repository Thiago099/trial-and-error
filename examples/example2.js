console.clear();
import { train} from "../index.js"


let [x,y] = [
    [[1,0,0],[0,1,0],[1,0,1],[0,1,1]],
    [[1,0],[0,1],[0,1],[1,0]]
]

console.time("training")
const model = train(x, y)
console.timeEnd("training") // training: 318.604ms

console.log(model.solutions) // [ 'a*5+b*c', 'a+c' ]

console.log(x.map(x=>[x, model.predict(x)])) // [ 41, 13 ]
// console.log(rule([5, 2, 8])) // [ 41, 13 ]