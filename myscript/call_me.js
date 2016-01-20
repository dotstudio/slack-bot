'use strict';

module.exports = (controller) => {
  controller.hears(['call me (.*)'],'direct_message,direct_mention,mention', (bot, message) => {
      let matches = message.text.match(/call me (.*)/i);
      let name = matches[1];
      controller.storage.users.get(message.user, (err, user) => {
          if (!user) {
              user = {
                  id: message.user,
              };
          }
          user.name = name;
          controller.storage.users.save(user, (err, id) => {
              bot.reply(message,'Got it. I will call you ' + user.name + ' from now on.');
          });
      });
  });
};
