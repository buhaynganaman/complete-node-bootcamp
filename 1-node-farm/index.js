const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////// DAY 3, 4 - SERVER ////////////////////////////////

function replaceElement(temp, product) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
}

const tempOverview = fs.readFileSync(
  `${__dirname}/final/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/final/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/final/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/final/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Ansynchronous Block
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHTML = dataObj.map((el) => replaceElement(tempCard, el)).join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHTML);
    res.end(output);

    // Product Page
  } else if (pathName === "/product") {
    res.end("This is the product");

    // API
  } else if (pathName === "/API") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "yawa-text": "yawa",
    });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>This page cannot be found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});

////////////////////// DAY 2 - FILES SYSTEM ////////////////////////////////

// Blocking, synchronous way
// const text = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(text);

// const textOut = `This is what we know about avocado: ${text}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("File written!");

// const output = fs.readFileSync("./starter/txt/output.txt", "utf-8");
// console.log(output);

// Non-blocking, asynchronous way
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR!");

//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     // console.log(data2);
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
//       // console.log(data3);

//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your File has been created!");

//           fs.readFile("./starter/txt/final.txt", "utf-8", (err, finaldata) => {
//             console.log(finaldata);
//           });
//         }
//       );
//     });
//   });
// });
// console.log("Will Read file!");
