module.exports = {
  port: 8081,
  open: true,
  logLevel: 'info', // debug, info, silent
  startPath: '/site/index.html',
  index: 'index.html',
  server: {
    baseDir: './',
    directory: true,
    index: 'index.html',
  }
};