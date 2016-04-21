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
const PORT = 3001;
const TIMEOUT = 90000;
let cmd = `cd /home/n0bisuke/slack-bot && git pull origin master && npm i`;

function update(mes){
  return exec(cmd, {timeout: TIMEOUT}, (error, stdout, stderr) => {
    console.log('stdout: '+(stdout||'none'));
    console.log('stderr: '+(stderr||'none'));

    if(error !== null){
      console.log('exec error: '+error);
    }else{
      sendSlack(mes);
    }
  });
};

function sendSlack(mes){
  bot.say({
    text: 'ゴゴゴ...\n LIG子がパワーアップしました!!\n'+mes,
    channel: TARGET_GROUP_NAME
  });
}

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({port: PORT});
server.route({
  method: 'POST',
  path:'/',
  handler: (request, reply) => {
    reply().code(204);
    console.log(request.query);
    console.log('-------\n');
    if(!request.payload.head_commit) return;
    let body = request.payload.head_commit;
    let mes = `${body.message} by @${body.author.username} ${body.url}`;
    update(mes);
  }
});

server.route({
  method: 'GET',
  path:'/',
  handler: (request, reply) => {
    reply().code(204);
    console.log(request.query);
    console.log('-------\n');
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
