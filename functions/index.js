const { onRequest } = require("firebase-functions/v2/https");

exports.cseProxy = onRequest({ cors: true }, async (req, res) => {
  try {
    const targetPath = req.path.replace(/^\/api\/cse/, '');
    const cseUrl = `https://www.cse.lk/api${targetPath}`;
    
    const response = await fetch(cseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://www.cse.lk',
        'Referer': 'https://www.cse.lk/'
      },
      body: JSON.stringify(req.body || {})
    });

    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.utaslProxy = onRequest({ cors: true }, async (req, res) => {
  try {
    const response = await fetch('https://www.utasl.lk/unit-prices/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    const html = await response.text();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/html');
    res.status(response.status).send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.p2pProxy = onRequest({ cors: true }, async (req, res) => {
  try {
    const targetUrl = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify(req.body || {
        asset: 'USDT',
        fiat: 'LKR',
        tradeType: 'BUY',
        page: 1,
        rows: 5
      })
    });
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
