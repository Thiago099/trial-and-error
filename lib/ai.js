import { isValid, transpose } from "./array-utils.js"
import { solveSystem } from "./system-solver.js"
export { train }
export * from './data-generator.js'
class wrapper{
    constructor(solutions)
    {
        this.output = []
        this.solutions = []
        for(const solution of solutions)
        {
            let result = []
            let current = ""
            for(const item of solution.operationLog)
            {
                if(item == "+")
                {
                    result.push(current)
                    current = ""
                }
                else if(item == "/" || item == "*")
                {
                    current += item
                }
                else
                {
                    current += `i[${item}]`
                }
            }
            result.push(current)
            let out = []
            for(let i = 0; i<result.length; i++)
            {
                if(solution.solution[i] == 0)
                {
                    continue
                }
                else if(solution.solution[i] == 1)
                {
                    out.push(result[i])
                }
                else
                {
                    out.push(`${result[i]}*${solution.solution[i]}`)
                }
            }
            const lastSolution = solution.solution[solution.solution.length-1]
            if(lastSolution != 0)
            {
                out.push(lastSolution)
            }
            var localResult = out.join("+")
            this.solutions.push(localResult.replace(/i\[(\d+)\]/g,(_,x)=>String.fromCharCode(Number(x) + 96 + 1)))
            this.output.push(new Function("i","return "+localResult))
        }
    }
    predict(input) {
        return this.output.map(x=>x(input))
        
    }
}


const usedOperations = {
    "+":(source, value) => source + value,
    "*":(source, value) => source * value,
    "/":(source, value) => source / value,
}


function train(x,y)
{
    if(isValid(x)) throw new Error("X contains NaN or Infinity, the data cant be processed")
    if(isValid(y)) throw new Error("Y contains NaN or Infinity, the data cant be processed")


    let ctx = structuredClone(transpose(x))
    let cty = structuredClone(transpose(y))

    let result = []

    for(const yy of cty)
    {
        let initialCandidates = getInitialCandidates()
        result.push(
            evaluate(initialCandidates, yy)
        )

    }

    return new wrapper(result)

    function evaluate(inputCandidates, y)
    {

        let first = []
        for(const newCandidate of inputCandidates)
        {
            implement(newCandidate)
            if(newCandidate.ok)
            {
                return newCandidate
            }
            const candidates = getCandidates(newCandidate.operationLog)
            
            first.push(...candidates)
        }


        if(first.length > 0)
        {
            let possibility = evaluate(first, y)
            if(possibility.ok)
            {
                return possibility
            }
        }

        return null

        function implement(candidate)
        {
            let list = []
            let variableCount = 0
            for(const variable of x)
            {
                let current = ""
                variableCount = 0
                for(let key of candidate.operationLog)
                {
                    if(!isNaN(key))
                    {
                        current+=variable[key]
                        
                    }
                    else
                    {
                        current+=key
                    }
                }
                current += "+1"
                list.push(current)
            }
            let solution = solveSystem(list, y)

            if(solution != null)
            {
                candidate.solution = solution
                candidate.ok = true
            }
            else
            {
                candidate.ok = false
            }
        }
    
        function getCandidates(data)
        {
            let candidates = []
            for(const index in ctx)
            {
                let item = ctx[index]
                for(const [key, value] of Object.entries(usedOperations))
                {
                    const operationLog = data.concat([key, index])
                    const candidate = {operationLog}
    
                    
                    candidates.push(candidate)
                }
            }

            return candidates
        }
    }
    function getInitialCandidates()
    {
        let candidates = []
        for(const index in ctx)
        {
            const operationLog = [index]
            const candidate = {operationLog}
            candidates.push(candidate)
        }
        return candidates
    }


}

