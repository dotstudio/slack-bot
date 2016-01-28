'use strict';

let util = require('../lib/util');
let MilkCocoa = require('milkcocoa');
let milkcocoa = new MilkCocoa('flagijwpzikk.mlkcca.com');
let ds = milkcocoa.dataStore('todo');

module.exports = (controller) => {
  controller.hears(['addtask'],'direct_message,direct_mention,mention', (bot, message) => {
      controller.storage.users.get(message.user, (err, user) => {
        console.log(message.user);
          if (user && user.name) {
              bot.reply(message,'Hello ' + user.name + '!!');
          } else {
            bot.startConversation(message, (err, convo) => {
              convo.say('Hello!');
              convo.say('Start conversation!');
              convo.ask('How are you?', (response, convo) => {
                convo.say('You said:' + response.text);
                convo.next();
              });
            });

            // let inputdata = message.text.split(' ');
            // if(inputdata.length !== 4){
            //   bot.reply(message,'使い方は`@ligco addtask 締切日 コメント URL`です。');
            // }else{
            //   let url = inputdata[3].replace(/[<|>]/gi, '');
            //   let savedata = {
            //     limit: inputdata[1],
            //     comment: inputdata[2],
            //     chaturl: url
            //   }
            //   ds.push(savedata, (err, pushed) =>{
            //     bot.reply(message, `タスクを追加しました。 id: ${pushed.id}`);
            //   });
            // }

          }
      });
  });
};
