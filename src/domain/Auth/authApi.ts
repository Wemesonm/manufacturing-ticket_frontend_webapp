import {api} from '@/src/api';

import {
  RefreshTokenPayload,
  SignInPayload,
  TokenPairAPI,
  VerifyTokenPayload,
} from './authTypes';

const SIGN_IN_PATH = 'authentication/token/';
const REFRESH_PATH = 'authentication/token/refresh/';
const VERIFY_PATH = 'authentication/token/verify/';

async function signIn(payload: SignInPayload): Promise<TokenPairAPI> {
  const response = await api.post<TokenPairAPI>(SIGN_IN_PATH, payload);
  return response.data;
}

async function refreshToken(
  payload: RefreshTokenPayload,
): Promise<TokenPairAPI> {
  const response = await api.post<TokenPairAPI>(REFRESH_PATH, payload);
  return response.data;
}

async function verifyToken(payload: VerifyTokenPayload): Promise<void> {
  await api.post(VERIFY_PATH, payload);
}

function isRefreshTokenRequest(url?: string): boolean {
  return Boolean(url && url.includes(REFRESH_PATH));
}

export const authApi = {
  signIn,
  refreshToken,
  verifyToken,
  isRefreshTokenRequest,
};
