const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let pos;
  let set;
  const fileData = data.toString();
  
  pos = 0;
  do {
    set = new Set(fileData.substring(pos, pos + 14).split(""));
    pos++;
  } while (set.size < 14);
  console.log("First marker: " + pos);
  console.log("String: " + fileData.substring(pos - 1, pos + 13));
  console.log("Characters processed: " + (pos + 13));
});
