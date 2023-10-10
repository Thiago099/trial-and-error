console.clear();
import { train} from "../index.js"


let [x,y] = [
    [[1,0,0],[0,1,0],[1,0,1],[0,1,1]],
    [[1,0],[0,1],[0,1],[1,0]]
]

console.time("training")
const model = train(x, y)
console.timeEnd("training")

console.log(model.solutions) 

console.log(x.map(x=>[x, model.predict(x)])) 
