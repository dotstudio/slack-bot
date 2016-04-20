'use strict'

const request = require('request');
const token = 'xoxp-10947356384-10947356416-35349976402-449a617e2b';
const URL = `https://slack.com/api/channels.list?token=${token}&pretty=1`;

let target_channel_name = 'tool';

request(URL, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    let channels = JSON.parse(body).channels;
    for (let channel of channels) {
      if(channel.name === target_channel_name){
        console.log(`${channel.name}のチャンネルIDは${channel.id}です。`);
      }
    }
  }
});
