const { addCNAME, checkSSLStatus, listDNSRecords, fixDNSRecord } = require('../utils/cloudflare');
const { logEvent } = require('../utils/logger');
const { notifyOperator } = require('../utils/webhook');
const config = require('../../runtime/config/domainOpsConfig.json');

module.exports = async function domainOpsDaemon({ action, domain, subdomain, target }) {
  switch (action) {
    case "add_cname":
      await addCNAME(subdomain, target, config.CLOUDFLARE_ZONE_ID, config.CLOUDFLARE_API_TOKEN);
      logEvent({ type: "dns_update", subdomain, target });
      break;
    case "check_ssl":
      const sslStatus = await checkSSLStatus(domain);
      logEvent({ type: "ssl_status", domain, sslStatus });
      if (!sslStatus.valid) notifyOperator(`SSL invalid for ${domain}`);
      break;
    case "scan_and_heal":
      const records = await listDNSRecords(config.CLOUDFLARE_ZONE_ID, config.CLOUDFLARE_API_TOKEN);
      for (let rec of records) {
        if (!rec.secure || rec.needsFix) {
          await fixDNSRecord(rec, config);
          logEvent({ type: "dns_healed", record: rec });
          notifyOperator(`Healed DNS/SSL issue: ${rec.name}`);
        }
      }
      break;
    default:
      throw new Error("Unknown action for domainOpsDaemon");
  }
};