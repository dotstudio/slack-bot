'use strict';

//bot
const Botkit = require('./lib/Botkit.js');
const getChannelId = require('./myscript/lib/channel');
const os = require('os');
const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({token: process.env.token}).startRTM();
const TARGET_CHANNEL_NAME = 'dotstudio_bot';

//メイン
let exec = require('child_process').exec;
let http = require('http');
const PORT = 3001;
const TIMEOUT = 90000;
let cmd = `cd ${__dirname}/slack-bot && git pull origin master && npm i`;

function update(){
  return exec(cmd, {timeout: TIMEOUT}, (error, stdout, stderr) => {
    console.log('stdout: '+(stdout||'none'));
    console.log('stderr: '+(stderr||'none'));
    if(error !== null){
      console.log('exec error: '+error);
    }else{

      //slackに更新通知
      getChannelId(TARGET_CHANNEL_NAME)
      .then(
        id => {
          bot.say({
            text: 'ゴゴゴ...\n LIG子がパワーアップしました。',
            channel: id
          });
          console.log('ok');
        },id => {
          console.log('error');
        }
      );
    }
  });
};

http.createServer((req, res) => {
  if(req.method == 'POST'){
    update();
  }else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('POST REQUEST ONLY\n');
    console.log('error!');
  }
}).listen(PORT);
