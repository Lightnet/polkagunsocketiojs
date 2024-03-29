
var fs = require("fs");
var path = require("path");
const http = require("http");
const Gun = require("gun");
var { PORT = 8080, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
console.log("dev: " + dev);
//console.log(process.versions.node);
//create server
const server = http.createServer(function(request, response) {
  //console.log("request starting...");
  if (Gun.serve(request, response)) {//get gun.js ex. <script src="/gun.js">
    return;
  } // filters gun requests!
  //handle files as public folder
  var filePath = "." + request.url;
  if (filePath === "./") filePath = "./index.html";

  var extname = path.extname(filePath);
  var contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
    default:
      contentType = "text/html";
  }

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile("./404.html", function(error, content) {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n"
        );
        response.end();
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});

var gun = Gun({
  file: "data",
  //web:app.server //server
  web: server
});
gun.on("hi", peer => {
  //peer connect
  //console.log('connect peer to',peer);
  //console.log("peer connect!");
});
gun.on("bye", peer => {
  // peer disconnect
  //console.log('disconnected from', peer);
  //console.log("disconnected from peer!");
});
/*
gun.get("mark").put({
  name: "Mark",
  email: "mark@gunDB.io"
});
console.log("data?");
gun.get("mark").on(function(data, key) {
  console.log("update:", data);
});
*/
var options = {
  pingTimeout: 3000,
  pingInterval: 3000,
  //transports: ['websocket'],
  allowUpgrades: false,
  upgrade: false,
  cookie: false
};
const io = require('socket.io')(server,options);//
server.listen(PORT);
console.log("localhost:"+PORT);

io.on('connection', socket => {
  console.log("connect client socket.io");
  // when the user disconnects.. perform this
  socket.on('disconnect', _ => {
    console.log("disconnect client socket.io");
    //if (added) {
      //--numUsers;
      // echo globally that this client has left
      //socket.broadcast.emit('user left', { numUsers, username:socket.username });
    //}
  });
});