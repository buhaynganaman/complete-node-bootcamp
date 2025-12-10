const fs = require("fs");

// Blocking, synchronous way
// const text = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(text);

// const textOut = `This is what we know about avocado: ${text}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("File written!");

// const output = fs.readFileSync("./starter/txt/output.txt", "utf-8");
// console.log(output);

// Non-blocking, asynchronous way
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");

  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    // console.log(data2);
    fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
      // console.log(data3);

      fs.writeFile(
        "./starter/txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log("Your File has been created!");

          fs.readFile("./starter/txt/final.txt", "utf-8", (err, finaldata) => {
            console.log(finaldata);
          });
        }
      );
    });
  });
});
console.log("Will Read file!");
