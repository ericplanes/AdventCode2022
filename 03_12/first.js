const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let first, last;
  let middle;
  let list = [];
  let result;
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    //1. Split array
    middle = str.length / 2;
    first = str.substring(0, middle);
    last = str.substring(middle);

    //2. Find duplicated
    for (let i = 0; i < first.length; i++) {
      if (last.includes(first[i])) {
        list[list.length] = first[i].charCodeAt(0);
        break;
      }
    }

    //3. Add values
    result = 0;
    list.forEach((value) => {
      if ("a".charCodeAt(0) <= value && value <= "z".charCodeAt(0)) {
        result += value - "a".charCodeAt(0) + 1;
      } else {
        result += value - "A".charCodeAt(0) + 27;
      }
    });
  });
  console.log(result);
});
