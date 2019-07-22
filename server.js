// https://github.com/lukeed/polka
// https://dev.to/kvng_zeez/introducing-polka-a-micro-web-server-3p55
// https://www.npmjs.com/package/polka
// https://github.com/lukeed/polka/blob/master/examples/with-socketio/index.js

//working polka server gun and socket

//if you did not config env it will null default
var { PORT=8080, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
console.log("dev: "+dev);

const polka = require('polka');
const sirv = require('sirv');
const compression = require('compression');
const Gun = require('gun');
//const uuidv4 = require('uuid/v4');
//const helmet  = require('helmet');
const app = polka();
app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(Gun.serve);
//app.listen(PORT); //this will return polka
//const io = require('socket.io')(app.server);
const { server } = app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on localhost:`+PORT);
});
//===============================================
// gun db
var gun = Gun({
  file: 'data',
  web:server //http server
});
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  console.log('disconnected from peer!');
});
//===============================================
//socket.io
//https://socket.io/docs/server-api/
var options = {
  pingTimeout: 3000,
  pingInterval: 3000,
  //transports: ['websocket'],
  allowUpgrades: false,
  upgrade: false,
  cookie: false
};
const io = require('socket.io')(server,options);//

io.on('connection', socket => {
  console.log("connect client socket.io");
  // when the user disconnects.. perform this
	socket.on('disconnect', _ => {
    console.log("disconnect client socket.io");
	});
});
console.log("server.js ...");