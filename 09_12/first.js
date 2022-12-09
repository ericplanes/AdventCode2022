class Position {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(o) {
    if (typeof o === typeof this) {
      return this.x === o.x && this.y === o.y;
    }
  }
}

const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let line;
  let setOfMoves = new Set();
  let H = new Position(0, 0);
  let T = new Position(0, 0);
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    line = str.split(" ");
    for (let i = 0; i < parseInt(line[1]); i++) {
      setOfMoves.add(T.x + "-" + T.y);
      switch (line[0]) {
        case "L":
          H.x--;
          break;
        case "R":
          H.x++;
          break;
        case "U":
          H.y++;
          break;
        case "D":
          H.y--;
          break;
      }
      moveT(T, H.x, H.y);
    }
  });
  console.log("Result: " + setOfMoves.size);
});

function moveT(T, relX, relY) {
  let distX = relX - T.x;
  let distY = relY - T.y;

  //Move X (L-R)
  if (Math.abs(distX) > 1) {
    T.x += distX / Math.abs(distX);
    if (distY !== 0) {
      T.y += distY / Math.abs(distY);
    }
  } else if (Math.abs(distY) > 1) {
    T.y += distY / Math.abs(distY);
    if (distX !== 0) {
      T.x += distX / Math.abs(distX);
    }
  }
}