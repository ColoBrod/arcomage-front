// mogrify -resize 178x105\! *.webp

const deck = require('./deck');
const fs = require("fs");


let files = fs.readdirSync("./");
files = files.filter((fileName) => {
  return fileName.match(/\d+\.webp/);
});

deck.forEach((name, i) => {
  fs.renameSync(`${i}.webp`, `${name}.webp`);
})

// files.forEach(moveFile)

// function makeName(originName, i, arr) {  
//   const n = i+1;
//   const reg = /^(\d+)- (.*)$/;
//   const found = originName.match(reg);
//   let XXX = ""
//   const x = n.toString();
//   const zeros = 3 - x.length;
//   for (let i = 0; i < zeros; i++) XXX += "0";
//   XXX += x;
//   // console.log(i+1, found);
//   // console.log(`lesson${n}.mp4`, "=>", `${XXX} - ${found[1]} - ${found[2]}.mp4`);
//   fs.renameSync(`lesson${n}.mp4`, `${XXX} - ${found[1]} - ${found[2]}.mp4`);

//   // console.log(i+1, originName);
// }

// function moveFile(fileName, i) {
//   console.log(i, fileName);
// }


