// default function
increment = (a, b = 1) => {
  return a + b;
};

for (let index = 0; index < 10; index = increment(index)) {
  console.log(index);
}
console.log();
for (let index = 0; index < 10; index = increment(index, 3)) {
  console.log(index);
}
//hoisting decleration to top
var increment;

//immidiate invoke function
console.log();

console.log(
  (() => {
    return "inside immidiately invoked function";
  })()
);

//closure
console.log()

const calculater = ()=>{
    const add = (a,b)=>{
        return a+b
    }
    console.log(add(4,5))
}
calculater()
// add is not defined here its in calculater closure
// console.log(add(4,5))