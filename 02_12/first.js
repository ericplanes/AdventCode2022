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
    points += ours;
    switch (ours) {
      // Rock
      case 1:
        switch (enemy) {
          case 1:
            points += 3;
            break;
          case 2:
            points += 0;
            break;
          case 3:
            points += 6;
            break;
        }
        break;

      // Paper
      case 2:
        switch (enemy) {
          case 1:
            points += 6;
            break;
          case 2:
            points += 3;
            break;
          case 3:
            points += 0;
            break;
        }
        break;

      // Scissors
      case 3:
        switch (enemy) {
          case 1:
            points += 0;
            break;
          case 2:
            points += 6;
            break;
          case 3:
            points += 3;
            break;
        }
        break;
    }
  });
  console.log(points);
});
