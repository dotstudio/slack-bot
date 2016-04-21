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
let controller = Botkit.slackbot({debug: false});
let bot = controller.spawn({token: process.env.token}).startRTM();
let http = require('http');
// let say = require('./myscript/say')(controller);

// controller.spawn({token: process.env.token}).startRTM().say({
//   text: 'Mesage',
//   channel: 'C0B5VND7D'
// });

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');

  bot.say({
    text: 'Mesage',
    channel: 'C0B5VND7D'
  });

}).listen(3000);

let dir = './myscript/';
require(dir+'hello')(controller);
require(dir+'call_me')(controller);
require(dir+'who_am_i')(controller);
require(dir+'shutdown')(controller);
require(dir+'uptime')(controller);
require(dir+'qiita2ligblog/henkan')(controller);
require(dir+'pendingList/app')(controller);
require(dir+'milkcocoaTodo/')(controller);
require(dir+'cw/')(controller);
require(dir+'lig_blog_update')(bot);

// require(dir+'sinchoku')(controller);
