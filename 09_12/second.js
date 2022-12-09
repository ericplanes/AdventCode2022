class Position {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let line;
  let setOfMoves = new Set();
  let rope = new Array(10).fill().map((e) => new Position(0, 0));
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    line = str.split(" ");
    for (let i = 0; i < parseInt(line[1]); i++) {
      switch (line[0]) {
        case "L":
          rope[0].x--;
          break;
        case "R":
          rope[0].x++;
          break;
        case "U":
          rope[0].y++;
          break;
        case "D":
          rope[0].y--;
          break;
      }
      //Move rope
      for (let j = 1; j < rope.length; j++) {
        moveT(rope[j], rope[j - 1].x, rope[j - 1].y);
      }
      setOfMoves.add(rope[9].x + " | " + rope[9].y);
    }
  });
  setOfMoves = new Set(
    Array.from(setOfMoves).sort((a, b) => parseInt(a) - parseInt(b))
  );
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
