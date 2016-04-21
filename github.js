'use strict';

//bot
const Botkit = require('./lib/Botkit.js');
const getChannelId = require('./myscript/lib/channel');
const os = require('os');
const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({token: process.env.token}).startRTM();
const TARGET_CHANNEL_NAME = 'dotstudio_bot';
const TARGET_GROUP_NAME = 'G12GBE1GF';

//メイン
let exec = require('child_process').exec;
let http = require('http');
const PORT = 3001;
const TIMEOUT = 90000;
let cmd = `cd /home/n0bisuke/slack-bot && git pull origin master && npm i`;

function update(){
  return exec(cmd, {timeout: TIMEOUT}, (error, stdout, stderr) => {
    console.log('stdout: '+(stdout||'none'));
    console.log('stderr: '+(stderr||'none'));

    if(error !== null){
      console.log('exec error: '+error);
    }else{
      sendSlack();
    }
  });
};

function sendSlack(){
  bot.say({
    text: 'ゴゴゴ...\n LIG子がパワーアップしました!!',
    channel: TARGET_GROUP_NAME
  });
}

http.createServer((req, res) => {
  if(req.method == 'POST'){
    update();
  }else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('POST REQUEST ONLY\n');
    console.log('error!');
  }
}).listen(PORT);
