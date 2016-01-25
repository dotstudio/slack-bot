// 'use strict';
//
// let Qiita = require('qiita');
// let q = new Qiita({token:process.env.qiitatoken});
//
// module.exports = (id) => {
//   q.items.delete(id, (err, res, body) => {
//     if(err){
//       console.log(err);
//       return;
//     }
//
//     console.log('successfully del to Qiita.');
//   });
// }


'use strict';

let Qiita = require('qiita');
let q = new Qiita({token:process.env.qiitatoken});

console.log(q.items.delete('d252008286cd243844c4'));
// q.items.delete('d252008286cd243844c4', (err, res, body) => {
//   if(err){
//     console.log(err);
//     return;
//   }
//
//   console.log('successfully del to Qiita.');
// });
