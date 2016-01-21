'use strict';

let exec = require('child_process').exec
let http = require('http');

let cmd = `cd ${__dirname} && git pull origin master`; //git>コマンド設定

/*コマンド実行関数*/
function update(){
  return exec(cmd, {timeout: 90000}, (error, stdout, stderr) => {
    console.log('stdout: '+(stdout||'none'));
    console.log('stderr: '+(stderr||'none'));
    if(error !== null) console.log('exec error: '+error);
  });
};

http.createServer(function (req, res) {
  if(req.method == 'POST') update();
}).listen(3000);

update();
