'use strict';

let http = require('http');
const URL = require('../lib/config').ligblogapi;

module.exports = (controller) => {
  controller.hears(['pendingList'],'direct_message,direct_mention,mention', (bot, message) => {
      // bot.api.reactions.add({
      //     timestamp: message.ts,
      //     channel: message.channel,
      //     name: 'robot_face',
      // }, (err, res) => {
      //     if (err) bot.botkit.log('Failed to add emoji reaction :(',err);
      // });

      controller.storage.users.get(message.user, (err, user) => {
          if (user && user.name) {
              bot.reply(message,'Hello ' + user.name + '!!');
          } else {
            apiget((items)=>{
              console.log(items);
              let mes = `レビュー待ちリスト\n`;
              for (let item of items) {
                mes += `・ ”${item.display_name}”の"${item.post_title}"。 ${item.guid}\n`;
              }
              bot.reply(message, mes);
            });
          }
      });
  });
};

function apiget(cb){
  http.get(URL, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', (res) => {
        res = JSON.parse(body);
        cb(res);
    });
  }).on('error', (e) => {
    console.log(e.message); //エラー時
  });
}
