import {parse} from "./system-solver-pre-process.js"
export { solveSystem }

import * as math from "mathjs"
function solveSystem(x,y)
{
    x = x.map(parse)
    y = y.map(parse)
    let localWeights = []
    for(let i = 0; i<=x.length-x[0].length;i+=x[0].length)
    {

        const lx = x.slice(i,i+x[0].length)
        const ly = y.slice(i,i+x[0].length)
        let d = math.det(lx)

        if(d == 0 || isNaN(d) || !isFinite(d)) continue

        let localWeight = []

        for(let i = 0; i < x[0].length;i++)
        {
            let dx = math.det(lx.map((item,index)=>item.map((item2,index2)=>index2 == i? ly[index][0] : item2)))
            if(isNaN(d) || !isFinite(d)) continue
            let current = dx / d
            if(localWeight[i] == null)
            {
                localWeight[i] = current
            }
        }
        if(localWeight.length > 0)
        localWeights.push(localWeight)
    }
    if(localWeights.length == 0) return null
    let weights = []
    for(const item of localWeights)
    {
        for(let i = 0; i < item.length; i++)
        {
            if(weights[i] == null) weights[i] = 0
            weights[i] += item[i]
        }
    }
    for(const index in weights)
    {
        weights[index] /= localWeights.length
    }


    let error = 0
    for(let i = 0; i < x.length; i++)
    {
        let sum = 0;
        for(let j = 0; j < weights.length-1; j++)
        {
            sum += x[i][j] * weights[j]
        }
        sum+= weights[weights.length-1]
        error += Math.abs((y[i][0]-sum)/ y.length)

    }
    return {weights, error}

    // return d
}

