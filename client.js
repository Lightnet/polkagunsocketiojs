// var Gun = require('gun'); // in NodeJS
// var Gun = require('gun/gun'); // in React
console.log("root folder");

var socket = io();
//var socket = io('http://localhost:8080', { transports: ['websocket'] });
//var socket = io('ws://localhost:8080', { transports: ['websocket'] });
//var socket = io('http://localhost:8080', { transports: ['websocket'] });
console.log(socket);

socket.on('connect', function () {
  console.log('you have been connected');
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
console.log(window.location.href+'gun');
var gun = Gun(window.location.href+'gun');

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