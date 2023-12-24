const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://34.201.108.53:8080',
            changeOrigin: true,
        })
    );
};