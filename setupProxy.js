const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3001', // Remplacez par l'adresse de votre serveur Express
      changeOrigin: true,
    })
  );
};
