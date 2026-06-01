import { google } from 'googleapis';

export function getOAuthClient(tokens?: any) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GSC_CLIENT_ID,
    process.env.GSC_CLIENT_SECRET,
    process.env.NEXTAUTH_URL + '/api/auth/callback/google'
  );

  if (tokens) oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

export async function getGSCData(tokens: any, siteUrl: string, startDate: string, endDate: string) {
  const auth = getOAuthClient(tokens);
  const webmasters = google.webmasters({ version: 'v3', auth });

  const res = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 5000,
    },
  });

  return res.data.rows || [];
}
