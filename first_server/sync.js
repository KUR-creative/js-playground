const fs = require("fs");

/*
console.log("A");
const result = fs.readFileSync("sample.txt", "utf8");
console.log(result);
console.log("C");
*/


console.log("A");
const result = fs.readFile("sample.txt", "utf8", (err, result) => {
    console.log(result);
});
sleep(10);
console.log("C");
