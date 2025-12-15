const envApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE_URL = envApiUrl
  ? envApiUrl.endsWith('/')
    ? envApiUrl
    : `${envApiUrl}/`
  : 'https://wemeson.cloud/ticket/api/';
