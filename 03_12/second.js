const { group } = require("console");
const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let list = [];
  let result, charList, pos, pos2;
  const fileData = Array.from(data.toString().split("\n"));
  
  //1. Get equivalent character for every group
  pos2 = 0;
  for (let i = 0, j; i < fileData.length; i += 3) {
    charList = [];

    //1.1 Get list of equivalent characters between 1 and 2
    pos = 0;
    for (j = 0; j < fileData[i].length; j++) {
      if (fileData[i + 1].includes(fileData[i][j])) {
        if (!charList.includes(fileData[i][j])) {
          charList[pos] = fileData[i][j];
          pos++;
        }
      }
    }

    //1.2 Get equivalent character between previous list and 3
    pos = 0;
    for (j = 0; j < charList.length; j++) {
      if (fileData[i + 2].includes(charList[j])) {
        list[pos2] = charList[j].charCodeAt(0);
        pos2++;
      }
    }
  }

  //2. Compare groups and
  console.log(list.length * 3)

  //3. Add values
  result = 0;
  list.forEach((value) => {
    if ("a".charCodeAt(0) <= value && value <= "z".charCodeAt(0)) {
      result += value - "a".charCodeAt(0) + 1;
    } else {
      result += value - "A".charCodeAt(0) + 27;
    }
  });
  console.log(result);
});
