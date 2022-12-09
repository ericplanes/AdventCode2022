const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let ours,
    enemy,
    points = 0;
  let array = [];
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    ours = str.charCodeAt(2) - 87; // 1 Rock, 2 Paper, 3 Scissors
    enemy = str.charCodeAt(0) - 64; // 1 Rock, 2 Paper, 3 Scissors
    switch (ours) {
      //Loose
      case 1:
        enemy = enemy === 1 ? 3 : enemy - 1;
        points += enemy;
        break;

      //Draw
      case 2:
        points += enemy + 3;
        break;

      //Win
      case 3:
        enemy = enemy === 3 ? 1 : enemy + 1;
        points += enemy + 6;
        break;
    }
  });
  console.log(points);
});
