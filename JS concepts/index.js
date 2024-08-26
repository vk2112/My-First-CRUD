const num = [1,2,4,6,7,9,11,13,16,17,18,20];
document.getElementById('input').innerHTML = 'Find missing numbers = ' + num;
document.getElementById('output').innerHTML = 'Missing Numbers are = ' + findMissingNumbers(num);
function findMissingNumbers(num) {
    let missingNumbers = [];
    let maxNum = Math.max(...num);
    let minNum = Math.min(...num);

    for (let i = minNum; i <= maxNum; i++) {
        if (!num.includes(i)) {
            missingNumbers.push(i);
        }
    }
   
    return missingNumbers;
}

console.log(findMissingNumbers(num));

function findMissingNumbers(arr) {
    let missingNumbers = [];
    
    // Sort the array
    arr.sort((a, b) => a - b);
  
    // Iterate through the sorted array
    for (let i = 0; i < arr.length - 1; i++) {
      let current = arr[i];
      let next = arr[i + 1];
  
      // Check if the difference between consecutive numbers is greater than 1
      if (next - current > 1) {
        for (let j = current + 1; j < next; j++) {
          missingNumbers.push(j);
        }
      }
    }
  
    return missingNumbers;
  }
  
  let arr = [1, 2, 4, 6, 7, 9, 10];
  console.log(findMissingNumbers(arr)); // Output: [3, 5, 8]
  

//FizzBuzz function
// function fizzBuzz() {
//     for (let i = 1; i <= 100; i++) {
//         if (i % 3 === 0 && i % 5 === 0) {
// console.log('fizzbuzz');
//         } else if (i % 3 === 0) {
//             console.log('fizz');
//         } else if (i % 5 === 0) {
//             console.log('buzz');
//         } else {
//             console.log(i);
//         }
//     }
// }