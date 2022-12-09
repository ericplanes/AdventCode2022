class Tree {
  height;
  x;
  y;

  constructor(height, x, y) {
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

treeList = [];
const fs = require("fs");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  //Fill treeArray
  const fileData = Array.from(data.toString().split("\n"));
  for (let x = 0; x < fileData.length; x++) {
    fileData[x] = fileData[x].split("");
    treeList[x] = [];
    for (let y = 0; y < fileData[x].length; y++) {
      treeList[x].push(new Tree(parseInt(fileData[x][y]), x, y));
    }
  }

  //Fill array with scenic score
  let tree;
  let isEdgeTree;
  let visibilityMap = [];
  for (let x = 0; x < treeList.length; x++) {
    for (let y = 0; y < treeList[x].length; y++) {
      tree = treeList[x][y];
      isEdgeTree =
        x * y === 0 || x === treeList.length - 1 || y === treeList.length - 1;

      if (!isEdgeTree) {
        visibilityMap.push(visibility(treeList, tree));
      }
    }
  }
  console.log(visibilityMap.sort((a, b) => a - b).reverse()[0]);
});

function visibility(treeList, tree) {
  let visibility =
    computeVisibilityOneSide(
      treeList,
      tree.x + 1,
      tree.y,
      true,
      1,
      tree.height
    ) *
    computeVisibilityOneSide(
      treeList,
      tree.x - 1,
      tree.y,
      true,
      -1,
      tree.height
    ) *
    computeVisibilityOneSide(
      treeList,
      tree.x,
      tree.y + 1,
      false,
      1,
      tree.height
    ) *
    computeVisibilityOneSide(
      treeList,
      tree.x,
      tree.y - 1,
      false,
      -1,
      tree.height
    );
  return visibility;
}

function computeVisibilityOneSide(treeList, x, y, isX, value, height) {
  //Stop
  if (height <= treeList[x][y].height) {
    return 1;
  }

  //Check edge
  if (x * y === 0 || x === treeList.length - 1 || y === treeList.length - 1) {
    return height > treeList[x][y].height ? 1 : 0;
  }

  //Update position
  x = isX ? x + value : x;
  y = isX ? y : y + value;

  return 1 + computeVisibilityOneSide(treeList, x, y, isX, value, height);
}
