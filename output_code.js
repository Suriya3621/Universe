
function range(start, end, step = 1) {
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}
console.log("Starting the program...");
var x = 45;
var test1 = "hii";
var test = true;

var num = range(1, 5, 1);
console.log(num);

function greet(name) {
    console.log("Hello, mr." + name);
}

greet("Alice");

function func(name) {
    console.log("Hello, " + name);
}

var fun = func("Suriya");
console.log(fun);

if (test) {
    console.log("It's working");
} else {
    console.log("It's not working");
}

var age1 = 17;
console.log(typeof(x));
var age = age1;

if (age < 18) {
    console.log("You are a minor.");
} else if (age >= 18 && age <= 50) {
    console.log("You are an adult.");
}
else {
    console.log("You are aged.");
}

// For loop exampl

console.log("End of the program.");