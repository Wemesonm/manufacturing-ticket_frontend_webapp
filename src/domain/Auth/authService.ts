import {setAuthorizationHeader} from '@/src/api';

import {authAdapter} from './authAdapter';
import {authApi} from './authApi';
import {AuthCredentials, SignInPayload} from './authTypes';

async function signIn(payload: SignInPayload): Promise<AuthCredentials> {
  const tokenPair = await authApi.signIn(payload);
  const authCredentials = authAdapter.toAuthCredentials(tokenPair);
  setAuthorizationHeader(authCredentials.accessToken);
  return authCredentials;
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthCredentials> {
  const tokenPair = await authApi.refreshToken({refresh: refreshToken});
  const authCredentials = authAdapter.toAuthCredentials(tokenPair);
  setAuthorizationHeader(authCredentials.accessToken);
  return authCredentials;
}

async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    await authApi.verifyToken({token});
    return true;
  } catch {
    return false;
  }
}

function removeAccessToken() {
  setAuthorizationHeader(null);
}

export const authService = {
  signIn,
  refreshAccessToken,
  verifyAccessToken,
  applyAccessToken: setAuthorizationHeader,
  removeAccessToken,
  isRefreshTokenRequest: authApi.isRefreshTokenRequest,
};
