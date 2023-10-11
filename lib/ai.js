import { isValid, transpose } from "./array-utils.js"
import { solveSystem } from "./system-solver.js"
export { train }
export * from './data-generator.js'
const epsilon = 1e-9
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


function train(x,y, threshold=epsilon)
{
    if(isValid(x)) throw new Error("X contains NaN or Infinity, the data cant be processed")
    if(isValid(y)) throw new Error("Y contains NaN or Infinity, the data cant be processed")


    let ctx = structuredClone(transpose(x))
    let cty = structuredClone(transpose(y))

    let cti = ctx.map((_,i)=>i)

    let result = []

    for(const yy of cty)
    {
        result.push(
            evaluate(yy)
        )

        return new wrapper(result)
    
        function evaluate(y)
        {
    
            while(true)
            {
                const newCandidate = getCandidates()
                implement(newCandidate)
                console.log(newCandidate.operationLog,newCandidate.error)
                if(newCandidate.error < threshold)
                {
                    return newCandidate
                } 
            }
    
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
                    candidate.solution = solution.weights
                    candidate.error = solution.error
                }
            }
        
            function getCandidates()
            {
                var length = Math.floor(Math.random()*10)

                var data = [randomElement(cti)]

                for(let i = 0; i<length;i++)
                {
                    const item = randomElement(cti);
                    const op = randomElement(Object.keys(usedOperations))
                    data.push(op,item)
                }
                return {operationLog:data}
            }
        }

        function randomElement(arr)
        {
            return arr[Math.floor(Math.random()*arr.length)]
        }
    
        function getRandomElementsFromArray(arr, count) {
            if (arr.length < count) {
              throw new Error("Array doesn't have enough elements to pick " + count + " different ones.");
            }
          
            const shuffled = arr.slice(); // Create a shallow copy to avoid modifying the original array.
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements randomly.
            }
          
            return shuffled.slice(0, count); // Take the first 'count' elements from the shuffled array.
          }
    }




}

