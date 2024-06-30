const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://pclp3skl-5129.euw.devtunnels.ms`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://pclp3skl-5129.euw.devtunnels.ms';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    ws: true,
    target: target,
    secure: false,
    changeOrigin: true,
    onProxyReqWs: (proxyReq, req, socket, options, head) => {
      socket.on('error', function (err) {
        console.warn('Socket error using onProxyReqWs event', err);
      });
    },
    onError(err) {
      console.log('Suppressing WDS proxy connection error:', err);
    },
  },
  {
    context: ['/oauth2'],
    target: 'https://accounts.google.com',
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log('Proxying request:', req.url);
    },
    onError(err) {
      console.log('Suppressing OAuth proxy connection error:', err);
    },
  },
];

module.exports = PROXY_CONFIG;
