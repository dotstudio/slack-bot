'use strict'

//Slackのチャンネル名からIDを取得
const request = require('request');
const TOKEN = process.env.channel_list_token;
const URL = `https://slack.com/api/channels.list?token=${TOKEN}&pretty=1`;

function getChannelId(target_channel_name){
  return new Promise((resolve, reject) => {
    request(URL, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let channels = JSON.parse(body).channels;
        for (let channel of channels) {
          if(channel.name === target_channel_name){
            resolve(channel.id);
          }
        }
      }
    });
  });
}

module.exports = getChannelId;
