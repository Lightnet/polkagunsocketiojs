// var Gun = require('gun'); // in NodeJS
// var Gun = require('gun/gun'); // in React
console.log("public folder polka http.");

console.log(location.host);
console.log(location.href);
//https://socket.io/docs/using-multiple-nodes/
//https://stackoverflow.com/questions/34798085/websocket-connection-to-failed-err-ssl-protocol-error
var socket = io.connect(window.location.origin);

console.log(socket);

socket.on('connect', function () {
  console.log('you have been connected socket.io');
});
socket.on('disconnect', function () {
  console.log('you have been disconnected');
});
socket.on('reconnect', function () {
  console.log('you have been reconnected');
  //if (username) {
    //socket.emit('add user', username);
  //}
});
socket.on('reconnect_error', function () {
  console.log('attempt to reconnect has failed');
});

//console.log(location.host+"/gun");
//console.log(window.location.href+'gun');
var gun = Gun(window.location.origin+'gun');
gun.on('hi', peer => {//peer connect
  console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});

gun.get('mark').put({
  name: "Mark",
  email: "mark@gunDB.io",
});

let doc = document.getElementById('gunjs')
console.log(doc);
console.log("data?");
gun.get('mark').on(function(data, key){
  console.log("update:", data);
  doc.innerText = data.name;
});