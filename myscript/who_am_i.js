'use strict';

module.exports = (controller) => {
  controller.hears(['what is my name','who am i'],'direct_message,direct_mention,mention', (bot, message) => {
      controller.storage.users.get(message.user, (err, user) => {
          if (user && user.name) {
              bot.reply(message,'Your name is ' + user.name);
          } else {
              bot.reply(message,'I don\'t know yet!');
          }
      });
  });
};
