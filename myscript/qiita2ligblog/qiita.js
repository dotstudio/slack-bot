'use strict';

let Qiita = require('qiita');
let q = new Qiita({token:process.env.qiitatoken});

module.exports = (title, body, cb) => {
  let postdata = {
    title: title,
    body: body,
    private: true,
    tags: [{name: 'LIGブログ下書き'}]
  };

  q.items.post(postdata, (err, res, body) => {
    if(err){
      console.log(err);
      return;
    }
    console.log('successfully posted to Qiita.');
    cb({url: body.url, id:body.id});
  });
}
