'use strict'

module.exports = {
  urlSampling: (input) => {
    //URL抽出
    let url = input.split(' ')[1];
    //<http://hoge.com>という形式で来るので<>を削除
    url = url.replace(/[<|>]/gi, '');
    //ドメイン判定
    let domain = url.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i)[3];
    return {url:url, domain:domain};
  },

  noop: () => {

  }

}
