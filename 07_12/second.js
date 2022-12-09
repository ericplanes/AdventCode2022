class Directory {
  name;
  value;
  seen;
  list = [];

  constructor(name) {
    this.name = name;
    this.value = 0;
    this.seen = false;
  }

  addToValue(value) {
    this.value += value;
  }

  addToList(dir) {
    this.list.push(dir);
  }
}

function computeValues(n, directoryList) {
  let element = directoryList[n];
  element.seen = true;

  //Directory without sons
  if (element.list.length === 0) {
    return element.value;
  }

  //Compute the weight of the sons and add it to the current directory
  for (let i = 0; i < element.list.length; i++) {
    element.addToValue(
      computeValues(
        directoryList.findIndex(
          (dir) => dir.name === element.list[i] && !dir.seen
        ),
        directoryList
      )
    );
  }

  //Return the final value of the directory
  return element.value;
}

//Main code
const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let line, element;
  let directoryList = [];
  let weightList = [];
  let dir;
  let result = 0;

  // First, generate a list of directory and sons
  const fileData = data.toString().split("\n$ ls\n");
  fileData.forEach((str) => {
    line = str.split("\n");
    line.forEach((e) => {
      element = e.split(" ");

      //Check cd operation on a new directory
      if (element[0] === "$" && element[2] !== "..") {
        dir = new Directory(element[2]);
        directoryList.push(dir);
      } else if (element[2] !== "..") {
        if (element[0] === "dir") {
          dir.addToList(element[1]);
        } else {
          dir.addToValue(parseInt(element[0]));
        }
      }
    });
  });
  
  /* --------PART MODIFIED FOR SECOND PROBLEM-------- */
  //Second, parse directories and compute real weights
  computeValues(0, directoryList);

  //Sort from smaller to bigger value
  directoryList.sort((a, b) => a.value - b.value);

  //Find directory
  let neededSpace = directoryList.pop().value - 40000000;

  let i;
  for (i = 0; directoryList[i].value < neededSpace; i++);
  console.log(directoryList[i].value);
});
