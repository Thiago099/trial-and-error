console.clear();
import {train, generate} from "./index.js"


const rule = ([a,b,c])=>[a*5+c*b, a+c]

let [x,y] = generate(1000,3, rule,true)

console.time("training")
const model = train(x,y)
console.timeEnd("training")

console.log(model.solutions)

console.log(model.predict([5,2,8])) 
console.log(rule([5,2,8]))