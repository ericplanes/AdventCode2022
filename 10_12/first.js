const fs = require("fs");
fs.readFile(process.env.PWD + "/test.txt", function (err, data) {
  if (err) throw err;

  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {});
});
