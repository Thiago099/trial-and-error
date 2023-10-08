import {parse} from "./operation-split.js"
export { solveSystem }
const epsilon = 1e-9
import * as math from "mathjs"
function solveSystem(x,y)
{
    x = x.map(parse)
    y = y.map(parse)
    let result = []
    for(let i = 0; i<=x.length-x[0].length;i+=x[0].length)
    {
        const lx = x.slice(i,i+x[0].length)
        const ly = y.slice(i,i+x[0].length)
        let d = math.det(lx)

        if(d == 0 || isNaN(d) || !isFinite(d)) continue

        for(let i = 0; i < x[0].length;i++)
        {
            let dx = math.det(lx.map((item,index)=>item.map((item2,index2)=>index2 == i? ly[index][0] : item2)))
            let current = dx / d
            if(result[i] == null)
            {
                result[i] = current
            }
            else
            {
                if(Math.abs(current - result[i]) > epsilon) return null
            }
        }
    }
    if(result.length == 0) return null
    return result

    // return d
}

