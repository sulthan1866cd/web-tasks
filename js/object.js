//object loop
function printObj(obj) {
  for (const key in obj) {
    //bracket access
    console.log(`${key} = ${obj[key]}`);
  }
  console.log()
};

const array = [23,53,34,53,34]
for (let i of array) {
    console.log(i)
    
}
//object creation
let obj = { name: "sulthan", age: 20 };

console.log(`before new key :`);
printObj(obj);

//add new key
obj.doSomthing = function() {
  console.log("doing somthing");
};

console.log(`after new key `);
printObj(obj);

//delete key
delete obj.age;

console.log(`after deleting key`);
printObj(obj);
