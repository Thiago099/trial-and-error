export { parse, clean }
import * as math from "mathjs"


function clean(x)
{
    return !x.some(x=>isNaN(x) || !isFinite(x))
}

function parse(x)
{
    x = split(x)
    let result = []
    let current = ""
    for(const item of x)
    {
        if(item=="+")
        {
            if(current.length > 0)
            {
                result.push(math.evaluate(current))
                current = ""
            }
        }
        else 
        {
            current += item
        }
    }
    if(current.length > 0)
    {
        result.push(math.evaluate(current))
    }
    return result
}


function split(expression)
{
    if(!isNaN(expression)) return expression.toString()
    const result = []
    let current = ""
    for(const item of expression)
    {
        if(item == "*" || item == "/" || item == "+" || item == "-")
        {
            result.push(current)
            current = ""
            result.push(item)
        }
        else if(item != " ")
        {
            current += item
        }
    }
    if(current != "") result.push(current)
    return result
}
