class Type {
  add = (a, b) => {
    console.log("simple add: ")
    return a + b;
  };
}

class Num extends Type {
  add = (a, b) => {
    console.log("number add: ")
    return Number(a) + Number(b);
  };
}
class Str extends Type {
  add = (a, b) => {
    console.log("string concat")
    return String(a) + String(b);
  };
}

const type = new Type();
console.log(type.add(2, 5));
console.log(type.add("5", "6"));

const num = new Num();
console.log(num.add("8", "2"));

const str = new Str();
console.log(str.add(6, 3));
