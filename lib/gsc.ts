import { google } from 'googleapis';

export async function getGSCClient(tokens: any) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GSC_CLIENT_ID,
    process.env.GSC_CLIENT_SECRET
  );
  oauth2Client.setCredentials(tokens);
  return google.webmasters({ version: 'v3', auth: oauth2Client });
}
