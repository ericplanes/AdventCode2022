const fs = require('fs');
fs.readFile(process.env.PWD + "/data.txt", function(err, data) {
    if(err) throw err;

    let pointer = 0;
    let array = [];
    const fileData = Array.from(data.toString().split('\n'));
    fileData.forEach(str => {
        if(str === ''){
            pointer++;
            array[pointer] = 0;
        }
        else {
            array[pointer] += parseInt(str)
        }
    })
    array.sort((a, b)  => a - b).reverse()
    console.log(array[0])
})