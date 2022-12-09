const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let f1, f2, s1, s2;
  let cont = 0;
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    pos = 0;
    let comma = str.indexOf(",");
    let slash = str.indexOf("-");
    let end = str.indexOf("-", comma);

    // Read all of the numbers
    f1 = parseInt(str.substring(0, slash));
    f2 = parseInt(str.substring(slash + 1, comma));
    s1 = parseInt(str.substring(comma + 1, end));
    s2 = parseInt(str.substring(end + 1));

    // Conditions
    if(f1 <= s1 && s2 <= f2){
        cont++;
    }
    else if(s1 <= f1 && f2 <= s2){
        cont++;
    }

  });
  console.log(cont);
});
