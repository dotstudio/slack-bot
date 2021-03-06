'use strict';

let henkan = require('./mdmain');
let qiitapost = require('./qiita');
let qiitadel = require('./qiita-del');
let util = require('../lib/util');

module.exports = (controller) => {
  controller.hears(['henkan'],'direct_message,direct_mention,mention', (bot, message) => {
      bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
      }, (err, res) => {
        if (err) bot.botkit.log('Failed to add emoji reaction :(',err);
      });

      controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
          bot.reply(message,'Hello ' + user.name + '!!');
        } else {

            let tmp = util.urlSampling(message.text);
            let url = tmp.url;
            let domain = tmp.domain;
            // //URL抽出
            // let url = message.text.split(' ')[1];
            // //<http://hoge.com>という形式で来るので<>を削除
            // url = url.replace(/[<|>]/gi, '');
            // //ドメイン判定
            // let domain = url.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i)[3];
            //qiita以外
            if(domain !== 'qiita.com'){
                bot.reply(message, 'qiitaのみ対応です');
            }

            //qiitaなら実行
            else{
              bot.reply(message, 'ゴゴゴゴゴ....');
              henkan(url, (res) => {
                qiitapost(res.title, res.body, (res) => {
                  bot.reply(message, '変換完了です！ '+ res.url);
                  // qiitadel(res.id);
                });
              });
            }

        }
      });
  });
};
