const axios = require('axios');

async function addCNAME(subdomain, target, zoneId, apiToken) {
  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
  await axios.post(url, {
    type: 'CNAME',
    name: subdomain,
    content: target,
    ttl: 3600,
    proxied: true
  }, {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  });
}

async function checkSSLStatus(domain) {
  const https = require('https');
  return new Promise((resolve) => {
    const req = https.request({ host: domain, method: 'GET', port: 443 }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve({
        valid: res.socket.authorized,
        subject: cert.subject,
        valid_to: cert.valid_to
      });
    });
    req.on('error', () => resolve({ valid: false }));
    req.end();
  });
}

async function listDNSRecords(zoneId, apiToken) {
  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
  const res = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${apiToken}` }
  });
  return res.data.result;
}

async function fixDNSRecord(record, config) {
  const url = `https://api.cloudflare.com/client/v4/zones/${config.CLOUDFLARE_ZONE_ID}/dns_records/${record.id}`;
  await axios.patch(url, {
    proxied: true,
    content: record.content
  }, {
    headers: {
      'Authorization': `Bearer ${config.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
}

module.exports = { addCNAME, checkSSLStatus, listDNSRecords, fixDNSRecord };