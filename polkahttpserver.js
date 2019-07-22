// https://github.com/lukeed/polka
// https://dev.to/kvng_zeez/introducing-polka-a-micro-web-server-3p55
// https://www.npmjs.com/package/polka
// https://github.com/lukeed/polka/blob/master/examples/with-socketio/index.js

// add over lay for server
// const server = http.createServer();
// const app = polka({server});

const http = require('http');
const polka = require('polka');
const sirv = require('sirv');
const compression = require('compression');
//const io = require('socket.io');
//const uuidv4 = require('uuid/v4');
//const helmet  = require('helmet');
const Gun = require('gun');
//if you did not config env it will null default
var { PORT=8080, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const server = http.createServer();
const app = polka({server});
//const io = require('socket.io')(server);
app.use(sirv('static', { dev }));
app.use(compression({ threshold: 0 }));
app.use(Gun.serve);
app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on localhost:`+PORT);
});

const gun = Gun({
  file: 'data',
  web:server
});
console.log("gun init...");
//console.log(gun);
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});
//const io = require('socket.io')(server);
//https://stackoverflow.com/questions/20428162/configuring-simplest-node-js-socket-io-express-server
var options = {
  pingTimeout: 3000,
  pingInterval: 3000,
  //transports: ['websocket'],
  allowUpgrades: false,
  upgrade: false,
  cookie: false
};
const io = require('socket.io')(server,options);

io.on('connection', socket => {
  console.log("connect client  socket.io");
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

