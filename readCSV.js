const csv = require('csv-parser');
const fs = require('fs');
let prevRow = []
let obj = {};
let finalObject = [];
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
      if(isNaN(row.city)){
        //console.log(row);
        prevRow  =  [row.city];
        if(!obj[prevRow] )
            obj[prevRow] = [];
      }else {
          //prevRow.city.push(row.city);
          //console.log(prevRow[0]);
          obj[prevRow[0]].push(row.city);
      }
  })
  .on('end', () => {
    // let data = JSON.stringify(obj);
    // fs.writeFileSync('data.json', data);

    for(var val in obj){
      if(!(val.includes("-") || val.includes("+"))){
        obj[val].forEach(element => {
          finalObject.push({'city': val, pincode: element})
        });
      }
    }
    fs.writeFileSync('data1.csv', ConvertToCSV(finalObject));
  });

  function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

