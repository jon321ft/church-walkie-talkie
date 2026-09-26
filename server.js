const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IS_RAILWAY = !!process.env.PORT || process.env.RAILWAY_STATIC_URL;

app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

app.use(express.static(__dirname));

app.get(['/', '/app', '/app/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (IS_RAILWAY) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('Church Walkie-Talkie server listening on port ' + PORT);
  });
} else {
  const certPath = path.join(__dirname, 'cert.pem');
  const keyPath = path.join(__dirname, 'key.pem');
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    const httpsOpts = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
    https.createServer(httpsOpts, app).listen(8443, '0.0.0.0', () => {
      console.log('Church Walkie-Talkie LAN Server (HTTPS) on port 8443');
    });
    const http = require('http');
    http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://' + req.headers.host.replace(':8080', ':8443') + req.url });
      res.end();
    }).listen(8080, '0.0.0.0');
  } else {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('Church Walkie-Talkie HTTP Server on port ' + PORT);
    });
  }
}