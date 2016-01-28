'use strict';

let todo = require('./todo');

module.exports = (controller) => {
  controller.hears(['addcw'],'direct_message,direct_mention,mention', (bot, message) => {
      controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
          bot.reply(message,'Hello ' + user.name + '!!');
        } else {
          let input = message.text.split(' ');
          let mes = '';
          let time = parseInt( new Date(input[1]) /1000 );
          for (let i = 2, len = input.length; i < len; i++) {
            mes += input[i]+' ';
          }
          console.log(mes);
          todo(mes,time, () => {
            bot.reply(message, 'チャットワークにタスク追加しました。');
          });
        }
      });
  });
};
