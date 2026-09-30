async function testCse() {
  const urls = [
    'https://www.cse.lk/api/tradeSummary',
    'https://www.cse.lk/api/homeMarketData',
    'https://www.cse.lk/api/marketSummary',
    'https://www.cse.lk/api/chartData',
    'https://www.cse.lk/api/topMovers',
    'https://www.cse.lk/api/marketOverview',
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Origin': 'https://pearl-port.web.app',
          'Content-Type': 'application/json'
        }
      });
      console.log(url, 'POST status with browser origin:', res.status, res.headers.get('access-control-allow-origin'));
    } catch (e) {
      console.log(url, 'error:', e.message);
    }
  }

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'https://pearl-port.web.app'
        }
      });
      console.log(url, 'GET status with browser origin:', res.status, res.headers.get('access-control-allow-origin'));
    } catch (e) {
      console.log(url, 'GET error:', e.message);
    }
  }
}

testCse().catch(console.error);
