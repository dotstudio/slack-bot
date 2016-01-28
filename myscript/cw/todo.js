'use strict';

if (!process.env.chtoken) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

let aa = require('aa');
let request = require('request');
const ROOM_ID = '43484166';

function addTask(text, userList){
  let task = {
    body: text,
    limit: 0,
    to_ids: userList,
  };

  let options = {
      url: `https://api.chatwork.com/v1/rooms/${ROOM_ID}/tasks`,
      headers: {
          'X-ChatWorkToken': process.env.chtoken
      },
      form: task,
      json: true
  };

  return new Promise((resolve,reject) => {
    request.post(options, (error, response, body) => {
      if(error) reject('error: '+ response.statusCode);
      resolve(body);
    });
  });

}

function getMember(){
  let options = {
      url: `https://api.chatwork.com/v1/rooms/${ROOM_ID}/members`,
      headers: {
          'X-ChatWorkToken': process.env.chtoken
      },
      json: true
  };

  return new Promise((resolve,reject) => {
    request.get(options, (error, response, users) => {
      if(error) reject('error: '+ response.statusCode);
      let userList = '';
      for (let i = 0, len = users.length; i < len; i++) {
        userList += users[i].account_id;
        if(len !== i+1) userList += ',';
      }
      resolve(userList);
    });
  });
}

module.exports = (message, cb) => {
  aa(function*() {
    let userList = yield getMember('a.txt');
    let res = yield addTask(message, userList);
    return res;
  }).then(
    function (val) {
      console.info('ok: ',val);
      cb();
    },
    function (err) { console.error('ng: ',err); }
  );
}
