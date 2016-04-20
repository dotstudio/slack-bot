'use strict';

const vo = require('vo'); //generetor/yeld
const getChannelId = require('./lib/channel');
const http = require('http');
const URL = 'http://liginc.co.jp/devrel';
const TARGET_CHANNEL_NAME = 'tool';
const CronJob = require('cron').CronJob;
let last_url = '';

module.exports = (bot) => {

  new CronJob('00 00 04 * * *', () => {
    update_check();
  }, null, true, 'Asia/Tokyo');

  function update_check(){
    vo(function* (){
      let update_url = yield _fetch(); //最新記事のURLを取得
      if(last_url === update_url) return '更新無し';
      last_url = update_url;
      let id = yield getChannelId(TARGET_CHANNEL_NAME); //チャンネルID取得
      bot.say({text: '@channel DevRel記事が更新されました！'+update_url, channel: id}); //投稿
      return update_url;
    })((err, result) => {
      if (err) return console.log(err);
      console.log(result);
    });
  }

};

//最新記事を取得
function _fetch(){
  return new Promise((resolve, reject) => {
    http.get(URL, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', (res) => {
        let link = body.match(/<article class="media_tile size-l">\n\t<a href=["|'](.*?)["|']>/)[1];
        if(!link) reject('parse error');
        setTimeout(() => {
          resolve(link);
        },2000);
      });
    }).on('error', (e) => {
      reject(e.message);
    });
  });
}
