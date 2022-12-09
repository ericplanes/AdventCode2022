const fs = require("fs");
const { stdout } = require("process");
fs.readFile(process.env.PWD + "/data.txt", function (err, data) {
  if (err) throw err;

  let stack = new Array(9).fill().map((e) => []);
  let movements = [];
  let pos = 0;
  let line;
  let answer;
  let amount, source, destination;

  //Process all the data and fill variables
  const fileData = Array.from(data.toString().split("\n"));
  fileData.forEach((str) => {
    //From 0 to 7, prepare and fill stacks
    if (pos < 8) {
      //Read line and split positions
      line = str.match(/.{1,4}/g);
      for (let i = 0; i < line.length; i++) {
        line[i] = line[i].trim();
        if (line[i] != "") {
          stack[i].push(line[i]);
        }
      }
    }
    //Read all the movements and fill an array
    else if (9 < pos) {
      line = str.split(" ");
      movements.push([line[1], line[3], line[5]]);
    }
    pos++;
  });
  
  //Flip to reorder correctly the stacks
  stack.map((e) => e.reverse());

  //Logic of the movements [X,Y,Z] X=amount, Y=source, Z=destination
  movements.forEach((e) => {
    amount = e[0];
    source = e[1] - 1;
    destination = e[2] - 1;

    for (let i = 0; i < amount; i++) {
      stack[destination].push(stack[source].pop());
    }
  });

  //Compute answer and print it
  answer = "";
  for (let i = 0; i < stack.length; i++) {
    line = stack[i].pop()[1];
    answer += line;
  }
  console.log(answer);
});