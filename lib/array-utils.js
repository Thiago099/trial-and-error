export {isValid, transpose}
function isValid(arr) {

    for (let subArr of arr) {
  
      for (let num of subArr) {
  
        if (isNaN(num) || !isFinite(num)) return true;
  
      }
    }
    return false;
}
  
function transpose(arr) {
    return arr[0].map((_, iCol) => arr.map((row) => row[iCol]));
}