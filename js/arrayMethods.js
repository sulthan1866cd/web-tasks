let arr = [1, 3, 6, 7, 0, 45, 65, 36];
console.log(`arr : ${arr} \n`)

//even numbers
console.log(`even numbers in arr using filter : ${arr.filter((a) => a % 2 == 0)} \n`);

//squares
console.log(`square of all numbers using map:
 ${ arr.map((a) => {
    return a**2;
  })} \n`
);

arr.forEach((a,ind)=>{
    console.log(ind+' = '+a)
})

arr.sort((a,b)=> b-a)

console.log(`array sorted in reverse order using sort: ${arr}`)

console.log(`sum of array using reduce ${arr.reduce((pre,curr)=>{
    return  pre+curr
})}`)


// let sum = 0;
// arr.forEach((a)=>{
//     sum+=a
// })
// console.log(sum)

