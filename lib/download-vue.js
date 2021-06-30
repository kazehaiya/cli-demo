const download = require('download-git-repo');

module.exports = () => {
  return new Promise((res, rej) => {
    download(
      'kazehaiya/vue-typescript-components',
      'repo/demo',
      function (err) {
        err ? rej('下载失败') : res('下载成功');
      }
    );
  });
};
