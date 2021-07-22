//require('dotenv').config();
const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
        "https://api.openweathermap.org/data/2.5/weather?q=Varanasi&appid=7d5d817a3d79ee66685bad3ad28f56df"
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else {
    res.end("File not found");
  }
});

server.listen(8000, "127.0.0.1");

// const http = require('http');
// const fs = require('fs');
// const requests = require('requests');
// // api.openweathermap.org/data/2.5/weather?q=Pune&appid=7d5d817a3d79ee66685bad3ad28f56df

// // api =7d5d817a3d79ee66685bad3ad28f56df

// const homeFile = fs.readFileSync("home.html", "utf-8");

// const replaceVal =(tempVal, orgVal)=>{
//     let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
//     let temperature = temperature.replace("{%tempmin%}",orgVal.main.temp);

//     let temperature = temperature.replace("{%tempmax%}",orgVal.main.temp);

//     let temperature = temperature.replace("{%location%}",orgVal.main.temp);

//     let temperature = temperature.replace("{%country%}",orgVal.main.temp);

    
// }

// const server = http.createServer((req, res) => {

//     if (req.url == "/") {
//         requests(
//             "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=7d5d817a3d79ee66685bad3ad28f56df"
//         )
//             .on("data",  (chunk)=> {
//                 const objData=JSON.parse(chunk);
//                 const arrData =[objData];
//                 //console.log(arrData[0].main.temp);
//                 const realTime =arrData.map((val)=>{
//                    // replaceVal(homeFile,val);
//                     console.log(val.main)
//                 })
//             })
//             .on("end",  (err)=> {
//                 if (err) return console.log("Connecton closed due to errors", err);

//                 //console.log("end");
//             });
//     }
// });

// server.listen(8000,"127.0.0.1");