'use strict';

// console.log(process.env.token);
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

if (!process.env.qiitatoken) {
    console.log('Error: Specify qiita token in environment');
    process.exit(1);
}

let Botkit = require('./lib/Botkit.js');
let os = require('os');
let controller = Botkit.slackbot({debug: true});
let bot = controller.spawn({token: process.env.token}).startRTM();
let http = require('http');
// let say = require('./myscript/say')(controller);

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');

  bot.say({
    text: 'Mesage',
    channel: 'C0B5VND7D'
  });

}).listen(3000);

require('./myscript/hello')(controller);
require('./myscript/call_me')(controller);
require('./myscript/who_am_i')(controller);
require('./myscript/shutdown')(controller);
require('./myscript/uptime')(controller);
require('./myscript/qiita2ligblog/henkan')(controller);
