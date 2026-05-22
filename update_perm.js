const https = require('https');

const APP_ID = 'cli_a4c06b84e0b85013';
const APP_SECRET = 'MpgS1n3yMGnV4qXwKk7cLqEoE8fT2pY6';

function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  // Get tenant access token
  const tokenRes = await postRequest('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    app_id: APP_ID,
    app_secret: APP_SECRET
  });

  console.log('Token response:', JSON.stringify(tokenRes, null, 2));

  if (!tokenRes.tenant_access_token) {
    console.log('Failed to get token');
    return;
  }

  const token = tokenRes.tenant_access_token;

  // Add permission for user
  const permRes = await postRequest('https://open.feishu.cn/open-apis/drive/v1/permissions/EeuvbzgmSaBuWps3aUociHq6nvh/members?type=bitable', {
    member_type: 'openid',
    member_id: 'ou_70650e818974238fee66bf2a538dcac3',
    perm: 'edit'
  });

  console.log('Permission response:', JSON.stringify(permRes, null, 2));
}

main().catch(console.error);